import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import {
  Button,
  Card,
  Drawer,
  Form,
  Input,
  Result,
  Segmented,
  Select,
  Space,
  Spin,
  Table,
  Tag,
  Typography,
  type TableColumnsType,
  type TablePaginationConfig
} from 'antd';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import type { AuthState } from '../api';
import { api } from '../api';
import { learnerTabs } from '../config';
import {
  compactSearchParams,
  formatDateTime,
  matchesKeyword,
  normalizeKeyword,
  paginate,
  scheduleIdleTask,
  stableRowKey
} from '../utils';

const RecordPreviewDrawer = lazy(() =>
  import('../components/RecordPreviewDrawer').then((module) => ({ default: module.RecordPreviewDrawer }))
);

type LearnersPageProps = {
  auth: AuthState;
};

type LearnerRecord = Record<string, unknown>;

function preloadRecordPreviewDrawer() {
  return import('../components/RecordPreviewDrawer');
}

function getColumns(collectionKey: string, onView: (record: LearnerRecord) => void): TableColumnsType<LearnerRecord> {
  const sharedAction = {
    title: '操作',
    key: 'option',
    fixed: 'right' as const,
    width: 120,
    render: (_: unknown, record: LearnerRecord) => (
      <Button
        type="link"
        size="small"
        onMouseEnter={() => {
          void preloadRecordPreviewDrawer();
        }}
        onFocus={() => {
          void preloadRecordPreviewDrawer();
        }}
        onClick={() => {
          void preloadRecordPreviewDrawer();
          onView(record);
        }}
      >
        查看
      </Button>
    )
  };

  if (collectionKey === 'appUsers') {
    return [
      {
        title: '学习用户',
        dataIndex: 'nickname',
        width: 220,
        render: (_, record) => (
          <Space direction="vertical" size={2}>
            <Typography.Text strong>{String(record.nickname || record.displayName || '未命名用户')}</Typography.Text>
            <Typography.Text type="secondary">{String(record.userId || record._id || '-')}</Typography.Text>
          </Space>
        )
      },
      {
        title: '登录来源',
        dataIndex: 'authProvider',
        width: 150,
        render: (_, record) => String(record.authProvider || record.source || 'wechat-cloud')
      },
      {
        title: '状态',
        dataIndex: 'status',
        width: 120,
        render: (_, record) =>
          String(record.status || '') === 'active' ? <Tag color="success">正常使用</Tag> : <Tag>已停用</Tag>
      },
      {
        title: '最近访问',
        dataIndex: 'lastSeenAt',
        width: 180,
        render: (_, record) => formatDateTime(record.lastSeenAt || record.updatedAt)
      },
      sharedAction
    ];
  }

  if (collectionKey === 'studyProfiles') {
    return [
      {
        title: '用户',
        dataIndex: 'userId',
        width: 220,
        render: (_, record) => (
          <Space direction="vertical" size={2}>
            <Typography.Text strong>{String(record.nickname || record.userId || '未命名用户')}</Typography.Text>
            <Typography.Text type="secondary">{String(record.userId || record._id || '-')}</Typography.Text>
          </Space>
        )
      },
      {
        title: '科目方向',
        dataIndex: 'direction',
        width: 140,
        render: (_, record) => String(record.direction || '-')
      },
      {
        title: '目标',
        dataIndex: 'target',
        width: 220,
        render: (_, record) => String(record.target || record.goal || '未填写')
      },
      {
        title: '更新时间',
        dataIndex: 'updatedAt',
        width: 180,
        render: (_, record) => formatDateTime(record.updatedAt || record._updatedAt || record.createdAt)
      },
      sharedAction
    ];
  }

  if (collectionKey === 'questionProgress') {
    return [
      {
        title: '用户 / 题目',
        dataIndex: 'userId',
        width: 240,
        render: (_, record) => (
          <Space direction="vertical" size={2}>
            <Typography.Text strong>{String(record.userId || '未知用户')}</Typography.Text>
            <Typography.Text type="secondary">{String(record.questionId || record.paperId || record._id || '-')}</Typography.Text>
          </Space>
        )
      },
      {
        title: '方向',
        dataIndex: 'direction',
        width: 140,
        render: (_, record) => String(record.direction || '-')
      },
      {
        title: '掌握度',
        dataIndex: 'accuracy',
        width: 120,
        render: (_, record) => `${Number(record.accuracy || record.correctRate || 0)}%`
      },
      {
        title: '更新时间',
        dataIndex: 'updatedAt',
        width: 180,
        render: (_, record) => formatDateTime(record.updatedAt || record._updatedAt || record.createdAt)
      },
      sharedAction
    ];
  }

  return [
    {
      title: '用户',
      dataIndex: 'userId',
      width: 220,
      render: (_, record) => (
        <Space direction="vertical" size={2}>
          <Typography.Text strong>{String(record.userId || record.nickname || '未知用户')}</Typography.Text>
          <Typography.Text type="secondary">{String(record.questionId || record._id || '-')}</Typography.Text>
        </Space>
      )
    },
    {
      title: '阶段',
      dataIndex: 'stage',
      width: 140
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 140
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      width: 180,
      render: (_, record) => formatDateTime(record.updatedAt || record._updatedAt || record.createdAt)
    },
    sharedAction
  ];
}

export function LearnersPage({ auth }: LearnersPageProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const [filterForm] = Form.useForm();
  const [detailRecord, setDetailRecord] = useState<LearnerRecord | null>(null);
  const currentTab = learnerTabs.some((item) => item.key === searchParams.get('tab')) ? searchParams.get('tab')! : 'appUsers';
  const keyword = searchParams.get('keyword') || '';
  const direction = searchParams.get('direction') || '';
  const status = searchParams.get('status') || '';
  const current = Math.max(1, Number(searchParams.get('page') || 1));
  const pageSize = Math.max(1, Number(searchParams.get('pageSize') || 10));

  const learnersQuery = useQuery({
    queryKey: ['collection', currentTab],
    queryFn: () => api.listCollection(currentTab)
  });

  const columns = useMemo(
    () =>
      getColumns(currentTab, (record) => {
        setDetailRecord(record);
      }),
    [currentTab]
  );

  useEffect(() => {
    filterForm.setFieldsValue({
      keyword,
      direction,
      status
    });
  }, [direction, filterForm, keyword, status]);

  useEffect(() => {
    const remainingTabs = learnerTabs.filter((item) => item.key !== currentTab);
    return scheduleIdleTask(() => {
      remainingTabs.forEach((item) => {
        void queryClient.prefetchQuery({
          queryKey: ['collection', item.key],
          queryFn: () => api.listCollection(item.key),
          staleTime: 30_000
        });
      });
    });
  }, [currentTab, queryClient]);

  const filteredItems = useMemo(() => {
    const items = learnersQuery.data || [];
    const keywordValue = normalizeKeyword(keyword);
    return items
      .filter((item) =>
        matchesKeyword(item, keywordValue, [
          'nickname',
          'displayName',
          'userId',
          'questionId',
          'paperId',
          'target',
          'goal',
          'status'
        ])
      )
      .filter((item) => (!direction ? true : String(item.direction || '') === direction))
      .filter((item) => (!status ? true : String(item.status || '') === status))
      .sort((left, right) => {
        const leftTime = new Date(String(left.updatedAt || left._updatedAt || left.createdAt || 0)).getTime();
        const rightTime = new Date(String(right.updatedAt || right._updatedAt || right.createdAt || 0)).getTime();
        return rightTime - leftTime;
      });
  }, [direction, keyword, learnersQuery.data, status]);

  const pagedItems = useMemo(() => paginate(filteredItems, current, pageSize), [current, filteredItems, pageSize]);

  if (!auth.permissions.canManageUsers) {
    return (
      <Result
        status="403"
        title="当前账号暂无学习数据查看权限"
        subTitle="学习用户、做题状态和错题队列需要管理用户权限才能访问。"
      />
    );
  }

  if (learnersQuery.isError) {
    return <Result status="error" title="学习数据读取失败" subTitle="请稍后刷新重试，或检查当前账号是否仍具备查看权限。" />;
  }

  function applyFilters(values: Record<string, unknown>) {
    setSearchParams(
      compactSearchParams(searchParams, {
        tab: currentTab,
        keyword: String(values.keyword || ''),
        direction: String(values.direction || ''),
        status: String(values.status || ''),
        page: 1
      })
    );
  }

  function handleTableChange(pagination: TablePaginationConfig) {
    setSearchParams(
      compactSearchParams(searchParams, {
        tab: currentTab,
        page: pagination.current || 1,
        pageSize: pagination.pageSize || pageSize
      })
    );
  }

  const directionOptions = [
    { label: '全部方向', value: '' },
    { label: 'math', value: 'math' },
    { label: 'medical', value: 'medical' }
  ];

  const statusOptions =
    currentTab === 'appUsers'
      ? [
          { label: '全部状态', value: '' },
          { label: '正常使用', value: 'active' },
          { label: '已停用', value: 'disabled' }
        ]
      : [
          { label: '全部状态', value: '' },
          { label: '已完成', value: 'done' },
          { label: '进行中', value: 'active' }
        ];

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Card className="hero-card">
        <Space direction="vertical" size="small" style={{ width: '100%' }}>
          <div>
            <Typography.Text className="eyebrow">学习与运营</Typography.Text>
            <Typography.Title level={3} style={{ marginTop: 0, marginBottom: 8 }}>
              先筛选，再快速查看记录
            </Typography.Title>
            <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
              这一页重点是快速过滤、快速定位和快速判断状态，不在首屏堆太多说明。
            </Typography.Paragraph>
          </div>
          <div className="workspace-status-row">
            <Tag color="processing">{learnerTabs.find((item) => item.key === currentTab)?.label}</Tag>
            <Tag color="default">详情面板已接入</Tag>
            <Button href="/" target="_blank">
              去旧后台看完整入口
            </Button>
          </div>
        </Space>
      </Card>

      <Card bodyStyle={{ paddingBottom: 8 }}>
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Segmented
            block
            value={currentTab}
            options={learnerTabs.map((item) => ({ label: item.label, value: item.key }))}
            onChange={(value) => {
              setSearchParams(
                compactSearchParams(searchParams, {
                  tab: String(value),
                  page: 1
                })
              );
            }}
          />
        </Space>
      </Card>

      <Card title={learnerTabs.find((item) => item.key === currentTab)?.label || '学习数据'}>
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Form form={filterForm} layout="inline" onFinish={applyFilters}>
            <Form.Item name="keyword" style={{ minWidth: 220 }}>
              <Input allowClear placeholder="搜索用户、题目、目标" />
            </Form.Item>
            <Form.Item name="direction" style={{ minWidth: 140 }}>
              <Select allowClear placeholder="全部方向" options={directionOptions} />
            </Form.Item>
            <Form.Item name="status" style={{ minWidth: 140 }}>
              <Select allowClear placeholder="全部状态" options={statusOptions} />
            </Form.Item>
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  筛选
                </Button>
                <Button
                  onClick={() => {
                    filterForm.resetFields();
                    setSearchParams(compactSearchParams(new URLSearchParams(), { tab: currentTab }));
                  }}
                >
                  重置
                </Button>
                <Button
                  onClick={async () => {
                    await learnersQuery.refetch();
                  }}
                >
                  刷新
                </Button>
              </Space>
            </Form.Item>
          </Form>

          <Table<LearnerRecord>
            rowKey={(record) => stableRowKey(record, ['_id', 'userId', 'questionId', 'paperId', 'nickname'])}
            columns={columns}
            dataSource={pagedItems}
            loading={learnersQuery.isFetching}
            scroll={{ x: 980 }}
            onChange={handleTableChange}
            pagination={{
              current,
              pageSize,
              total: filteredItems.length,
              showSizeChanger: true
            }}
          />
        </Space>
      </Card>

      {detailRecord ? (
        <Suspense
          fallback={
            <Drawer open width={560} title="记录详情" onClose={() => setDetailRecord(null)}>
              <div className="center-screen" style={{ minHeight: 220 }}>
                <Spin size="large" />
              </div>
            </Drawer>
          }
        >
          <RecordPreviewDrawer
            open
            width={560}
            title="记录详情"
            record={detailRecord}
            onClose={() => setDetailRecord(null)}
          />
        </Suspense>
      ) : null}
    </Space>
  );
}
