import { useMemo, useState } from 'react';
import { App, Button, Card, Drawer, Form, Input, Popconfirm, Result, Select, Space, Spin, Tag, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { AuthState } from '../api';
import { api } from '../api';
import { formatDateTime } from '../utils';

type AccountsPageProps = {
  auth: AuthState;
};

type AdminUserRecord = {
  _id?: string;
  name: string;
  role: 'viewer' | 'editor' | 'publisher' | 'admin' | 'owner';
  roleLabel?: string;
  status: 'active' | 'disabled';
  loginAccount: string;
  hasPassword?: boolean;
  authChannels?: string[];
  lastLoginAt?: string;
  updatedAt?: string;
  createdAt?: string;
};

type AdminUserFormValues = {
  name: string;
  loginAccount: string;
  role: AdminUserRecord['role'];
  status: AdminUserRecord['status'];
  password?: string;
};

const roleOptions = [
  { label: '查看者', value: 'viewer' },
  { label: '编辑老师', value: 'editor' },
  { label: '发布老师', value: 'publisher' },
  { label: '管理员', value: 'admin' },
  { label: '系统所有者', value: 'owner' }
] as const;

const roleCapabilityMap: Record<AdminUserRecord['role'], string[]> = {
  viewer: ['查看'],
  editor: ['查看', '编辑'],
  publisher: ['查看', '编辑', '发布'],
  admin: ['查看', '编辑', '发布', '账号管理'],
  owner: ['查看', '编辑', '发布', '账号管理']
};

const statusOptions = [
  { label: '启用', value: 'active' },
  { label: '停用', value: 'disabled' }
] as const;

const defaultFormValues: AdminUserFormValues = {
  name: '',
  loginAccount: '',
  role: 'editor',
  status: 'active',
  password: ''
};

function normalizeAdminUser(raw: Record<string, unknown>): AdminUserRecord {
  const role = String(raw.role || 'editor') as AdminUserRecord['role'];
  const status = String(raw.status || 'active') === 'disabled' ? 'disabled' : 'active';
  const normalizedRole = roleOptions.some((item) => item.value === role) ? role : 'editor';

  return {
    _id: String(raw._id || ''),
    name: String(raw.name || ''),
    role: normalizedRole,
    roleLabel: String(
      raw.roleLabel || roleOptions.find((item) => item.value === normalizedRole)?.label || '编辑老师'
    ),
    status,
    loginAccount: String(raw.loginAccount || ''),
    hasPassword: Boolean(raw.hasPassword),
    authChannels: Array.isArray(raw.authChannels) ? raw.authChannels.map((item) => String(item)) : ['web'],
    lastLoginAt: String(raw.lastLoginAt || ''),
    updatedAt: String(raw.updatedAt || ''),
    createdAt: String(raw.createdAt || '')
  };
}

export function AccountsPage({ auth }: AccountsPageProps) {
  const { message } = App.useApp();
  const queryClient = useQueryClient();
  const [form] = Form.useForm<AdminUserFormValues>();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUserRecord | null>(null);

  const usersQuery = useQuery({
    queryKey: ['collection', 'adminUsers'],
    queryFn: () => api.listCollection('adminUsers')
  });

  const createMutation = useMutation({
    mutationFn: (payload: Record<string, unknown>) => api.createCollectionItem('adminUsers', payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['collection', 'adminUsers'] });
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Record<string, unknown> }) =>
      api.updateCollectionItem('adminUsers', id, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['collection', 'adminUsers'] });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.deleteCollectionItem('adminUsers', id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['collection', 'adminUsers'] });
    }
  });

  const users = useMemo(() => (usersQuery.data || []).map((item) => normalizeAdminUser(item)), [usersQuery.data]);
  const activeCount = users.filter((item) => item.status === 'active').length;
  const currentUserId = String(auth.user?._id || '');

  if (!auth.permissions.canManageUsers) {
    return <Result status="403" title="暂无账号管理权限" subTitle="账号模块需要管理用户权限才能进入。" />;
  }

  if (usersQuery.isError) {
    return <Result status="error" title="账号列表读取失败" subTitle="请稍后刷新重试，或检查当前数据服务是否正常。" />;
  }

  function openCreateDrawer() {
    setEditingUser(null);
    form.setFieldsValue(defaultFormValues);
    setDrawerOpen(true);
  }

  function openEditDrawer(record: AdminUserRecord) {
    setEditingUser(record);
    form.setFieldsValue({
      name: record.name,
      loginAccount: record.loginAccount,
      role: record.role,
      status: record.status,
      password: ''
    });
    setDrawerOpen(true);
  }

  async function handleSave() {
    const values = await form.validateFields();
    const payload: Record<string, unknown> = {
      name: values.name.trim(),
      loginAccount: values.loginAccount.trim(),
      role: values.role,
      status: values.status
    };

    if (String(values.password || '').trim()) {
      payload.password = String(values.password).trim();
    }

    if (editingUser?._id) {
      await updateMutation.mutateAsync({
        id: editingUser._id,
        payload
      });
      message.success('账号已保存');
    } else {
      await createMutation.mutateAsync(payload);
      message.success('账号已创建');
    }

    setDrawerOpen(false);
    setEditingUser(null);
    form.resetFields();
  }

  async function handleDelete(record: AdminUserRecord) {
    if (!record._id) return;
    await deleteMutation.mutateAsync(record._id);
    message.success('账号已删除');
  }

  const columns: ProColumns<AdminUserRecord>[] = [
    {
      title: '老师 / 账号',
      dataIndex: 'name',
      width: 280,
      render: (_, record) => (
        <Space direction="vertical" size={2}>
          <Space size={8} wrap>
            <Typography.Text strong>{record.name || '未命名老师'}</Typography.Text>
            {record._id === currentUserId ? <Tag color="processing">当前登录</Tag> : null}
          </Space>
          <Typography.Text type="secondary">{record.loginAccount || '未设置登录账号'}</Typography.Text>
        </Space>
      )
    },
    {
      title: '老师姓名',
      dataIndex: 'name',
      hideInTable: true
    },
    {
      title: '登录账号',
      dataIndex: 'loginAccount',
      hideInTable: true
    },
    {
      title: '角色',
      dataIndex: 'role',
      width: 140,
      valueType: 'select',
      valueEnum: Object.fromEntries(roleOptions.map((item) => [item.value, { text: item.label }])),
      render: (_, record) => <Tag color={record.role === 'owner' || record.role === 'admin' ? 'processing' : 'default'}>{record.roleLabel}</Tag>
    },
    {
      title: '可做什么',
      dataIndex: 'capabilities',
      search: false,
      width: 260,
      render: (_, record) => (
        <Space wrap>
          {roleCapabilityMap[record.role].map((item) => (
            <Tag key={item} bordered={false}>
              {item}
            </Tag>
          ))}
        </Space>
      )
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 120,
      valueType: 'select',
      valueEnum: {
        active: { text: '启用', status: 'Success' },
        disabled: { text: '停用', status: 'Default' }
      },
      render: (_, record) => <Tag color={record.status === 'active' ? 'success' : 'default'}>{record.status === 'active' ? '启用' : '停用'}</Tag>
    },
    {
      title: '密码',
      dataIndex: 'hasPassword',
      width: 120,
      search: false,
      render: (_, record) => (
        <Tag color={record.hasPassword ? 'success' : 'warning'}>{record.hasPassword ? '已设置' : '未设置'}</Tag>
      )
    },
    {
      title: '最近登录',
      dataIndex: 'lastLoginAt',
      width: 180,
      search: false,
      render: (_, record) => formatDateTime(record.lastLoginAt)
    },
    {
      title: '最近更新',
      dataIndex: 'updatedAt',
      width: 180,
      search: false,
      render: (_, record) => formatDateTime(record.updatedAt || record.createdAt)
    },
    {
      title: '操作',
      key: 'option',
      width: 160,
      valueType: 'option',
      fixed: 'right',
      render: (_, record) => [
        <a key="edit" onClick={() => openEditDrawer(record)}>
          编辑
        </a>,
        <Popconfirm
          key="delete"
          title="确定删除这个后台账号吗？"
          description="删除后该老师将无法继续登录后台。"
          onConfirm={() => handleDelete(record)}
          okButtonProps={{ danger: true, loading: deleteMutation.isPending }}
          disabled={!record._id}
        >
          <a style={{ color: '#cf1322' }}>删除</a>
        </Popconfirm>
      ]
    }
  ];

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Card className="hero-card">
        <Space direction="vertical" size="small" style={{ width: '100%' }}>
          <div>
            <Typography.Text className="eyebrow">账号管理主控区</Typography.Text>
            <Typography.Title level={3} style={{ marginTop: 0, marginBottom: 8 }}>
              先建账号，再分角色
            </Typography.Title>
            <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
              主表只回答三个问题：这是谁、能做什么、现在是否启用；具体密码和角色调整都放在抽屉里改。
            </Typography.Paragraph>
          </div>

          <Space wrap>
            <Tag color="processing">{`后台账号 ${users.length} 个`}</Tag>
            <Tag color="success">{`启用中 ${activeCount} 个`}</Tag>
            <Tag>{auth.permissions.canManageUsers ? '当前账号可管理成员' : '当前账号只读'}</Tag>
          </Space>
        </Space>
      </Card>

      {usersQuery.isLoading ? (
        <div className="center-screen">
          <Spin size="large" />
        </div>
      ) : (
        <Card className="home-workspace-card">
          <ProTable<AdminUserRecord>
            rowKey="_id"
            columns={columns}
            request={async (params) => {
              const keyword = String(params.name || params.loginAccount || '').trim().toLowerCase();
              const role = String(params.role || '').trim();
              const status = String(params.status || '').trim();
              const filtered = users.filter((item) => {
                const matchKeyword =
                  !keyword ||
                  item.name.toLowerCase().includes(keyword) ||
                  item.loginAccount.toLowerCase().includes(keyword);
                const matchRole = !role || item.role === role;
                const matchStatus = !status || item.status === status;
                return matchKeyword && matchRole && matchStatus;
              });
              return {
                data: filtered,
                success: true,
                total: filtered.length
              };
            }}
            params={{ dataVersion: usersQuery.dataUpdatedAt }}
            search={{ labelWidth: 88, defaultCollapsed: false }}
            scroll={{ x: 1460 }}
            options={{ density: true, fullScreen: false, reload: false, setting: true }}
            pagination={{ pageSize: 10, showSizeChanger: false }}
            toolBarRender={() => [
              <Button key="create" type="primary" icon={<PlusOutlined />} onClick={openCreateDrawer}>
                新建老师账号
              </Button>
            ]}
          />
        </Card>
      )}

      <Drawer
        title={editingUser ? `编辑账号：${editingUser.name || editingUser.loginAccount}` : '新建老师账号'}
        width={540}
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          setEditingUser(null);
        }}
        destroyOnClose
        extra={
          <Space>
            <Button
              onClick={() => {
                setDrawerOpen(false);
                setEditingUser(null);
              }}
            >
              取消
            </Button>
            <Button type="primary" loading={createMutation.isPending || updateMutation.isPending} onClick={handleSave}>
              保存
            </Button>
          </Space>
        }
      >
        <Form form={form} layout="vertical" initialValues={defaultFormValues}>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <div className="home-workspace-tip">
              <Typography.Text strong>{editingUser ? '修改这个老师账号' : '先把老师账号建起来'}</Typography.Text>
              <Typography.Paragraph type="secondary" style={{ marginBottom: 0, marginTop: 8 }}>
                {editingUser
                  ? '密码可以留空，留空就代表继续沿用原密码。'
                  : '新建账号时请至少填老师姓名、登录账号和一个 6 位以上的密码。'}
              </Typography.Paragraph>
            </div>

            <Form.Item name="name" label="老师姓名" rules={[{ required: true, message: '请填写老师姓名' }]}>
              <Input placeholder="例如 张老师" />
            </Form.Item>
            <Form.Item name="loginAccount" label="登录账号" rules={[{ required: true, message: '请填写登录账号' }]}>
              <Input placeholder="例如 zhanglaoshi" autoComplete="off" />
            </Form.Item>
            <Form.Item
              name="password"
              label={editingUser ? '重置密码（可留空）' : '登录密码'}
              rules={
                editingUser
                  ? [{ min: 6, message: '如需修改密码，请至少输入 6 位', warningOnly: true }]
                  : [
                      { required: true, message: '请设置登录密码' },
                      { min: 6, message: '登录密码至少 6 位' }
                    ]
              }
            >
              <Input.Password placeholder={editingUser ? '留空则不修改密码' : '至少 6 位'} autoComplete="new-password" />
            </Form.Item>
            <Form.Item name="role" label="角色" rules={[{ required: true, message: '请选择角色' }]}>
              <Select options={roleOptions as unknown as { label: string; value: string }[]} />
            </Form.Item>
            <Form.Item name="status" label="启停状态" rules={[{ required: true, message: '请选择启停状态' }]}>
              <Select options={statusOptions as unknown as { label: string; value: string }[]} />
            </Form.Item>
          </Space>
        </Form>
      </Drawer>
    </Space>
  );
}
