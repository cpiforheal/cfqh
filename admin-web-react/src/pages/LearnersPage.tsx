import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Button, Card, Drawer, Result, Segmented, Space, Spin, Tag, Typography } from 'antd';
import ProTable from '@ant-design/pro-table';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
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

function getColumns(collectionKey: string): ProColumns<LearnerRecord>[] {
  const sharedAction: ProColumns<LearnerRecord> = {
    title: '操作',
    valueType: 'option',
    key: 'option',
    fixed: 'right',
    width: 120,
    render: (_, record) => [<a key="view">查看</a>]
  };

  if (collectionKey === 'appUsers') {
    return [
      { title: '关键词', dataIndex: 'keyword', hideInTable: true },
      {
        title: '学习用户',
        dataIndex: 'nickname',
        width: 220,
        search: false,
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
        valueType: 'select',
        valueEnum: {
          active: { text: '正常使用', status: 'Success' },
          disabled: { text: '已停用', status: 'Default' }
        }
      },
      {
        title: '最近访问',
        dataIndex: 'lastSeenAt',
        width: 180,
        search: false,
        render: (_, record) => formatDateTime(record.lastSeenAt || record.updatedAt)
      },
      sharedAction
    ];
  }

  if (collectionKey === 'studyProfiles') {
    return [
      { title: '关键词', dataIndex: 'keyword', hideInTable: true },
      {
        title: '用户',
        dataIndex: 'userId',
        width: 220,
        search: false,
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
        valueType: 'select',
        fieldProps: {
          options: [
            { label: 'math', value: 'math' },
            { label: 'medical', value: 'medical' }
          ]
        }
      },
      {
        title: '目标',
        dataIndex: 'target',
        width: 220,
        search: false,
        render: (_, record) => String(record.target || record.goal || '未填写')
      },
      {
        title: '更新时间',
        dataIndex: 'updatedAt',
        width: 180,
        search: false,
        render: (_, record) => formatDateTime(record.updatedAt || record._updatedAt || record.createdAt)
      },
      sharedAction
    ];
  }

  if (collectionKey === 'questionProgress') {
    return [
      { title: '关键词', dataIndex: 'keyword', hideInTable: true },
      {
        title: '用户 / 题目',
        dataIndex: 'userId',
        width: 240,
        search: false,
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
        valueType: 'select',
        fieldProps: {
          options: [
            { label: 'math', value: 'math' },
            { label: 'medical', value: 'medical' }
          ]
        }
      },
      {
        title: '掌握度',
        dataIndex: 'accuracy',
        width: 120,
        search: false,
        render: (_, record) => `${Number(record.accuracy || record.correctRate || 0)}%`
      },
      {
        title: '更新时间',
        dataIndex: 'updatedAt',
        width: 180,
        search: false,
        render: (_, record) => formatDateTime(record.updatedAt || record._updatedAt || record.createdAt)
      },
      sharedAction
    ];
  }

  return [
    { title: '关键词', dataIndex: 'keyword', hideInTable: true },
    {
      title: '用户',
      dataIndex: 'userId',
      width: 220,
      search: false,
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
      search: false,
      render: (_, record) => formatDateTime(record.updatedAt || record._updatedAt || record.createdAt)
    },
    sharedAction
  ];
}

export function LearnersPage({ auth }: LearnersPageProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const [detailRecord, setDetailRecord] = useState<LearnerRecord | null>(null);
  const actionRef = useRef<ActionType>();
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

  const columns = useMemo(() => {
    const defs = getColumns(currentTab).map((column) =>
      column.key === 'option'
        ? {
            ...column,
            render: (_: unknown, record: LearnerRecord) => [
              <a
                key="view"
                onMouseEnter={() => {
                  void preloadRecordPreviewDrawer();
                }}
                onFocus={() => {
                  void preloadRecordPreviewDrawer();
                }}
                onClick={() => {
                  void preloadRecordPreviewDrawer();
                  setDetailRecord(record);
                }}
              >
                查看
              </a>
            ]
          }
        : column
    );
    return defs;
  }, [currentTab]);

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

  useEffect(() => {
    if (learnersQuery.data) {
      actionRef.current?.reload();
    }
  }, [learnersQuery.data]);

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

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Card className="hero-card">
        <Typography.Text className="eyebrow">学习与运营</Typography.Text>
        <Typography.Title level={3} style={{ marginTop: 0 }}>
          学习用户主控区已切到正式 ProTable
        </Typography.Title>
        <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
          当前阶段以读为主，先让你能集中查看用户、学习概况、做题状态和错题队列。后续再补批量动作和深度编辑。
        </Typography.Paragraph>
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
              actionRef.current?.reload();
            }}
          />
          <Space wrap>
            <Tag color="processing">{learnerTabs.find((item) => item.key === currentTab)?.label}</Tag>
            <Button href="/" target="_blank">
              去旧后台看完整维护入口
            </Button>
          </Space>
        </Space>
      </Card>

      <ProTable<LearnerRecord>
        rowKey={(record) => stableRowKey(record, ['_id', 'userId', 'questionId', 'paperId', 'nickname'])}
        actionRef={actionRef}
        cardBordered
        columns={columns}
        params={{ keyword, direction, status, current, pageSize, tab: currentTab }}
        loading={learnersQuery.isFetching}
        columnsState={{
          persistenceKey: `cfqh-react-${currentTab}-columns`,
          persistenceType: 'localStorage'
        }}
        options={{
          density: true,
          reload: async (_event, action) => {
            await learnersQuery.refetch();
            action?.reload();
          },
          setting: true
        }}
        scroll={{ x: 980 }}
        search={{ labelWidth: 'auto', defaultCollapsed: false }}
        pagination={{
          current,
          pageSize,
          showSizeChanger: true,
          onChange: (page, size) => {
            setSearchParams(compactSearchParams(searchParams, { page, pageSize: size }));
          }
        }}
        request={async (params) => {
          const tableCurrent = Math.max(1, Number(params.current || current));
          const tablePageSize = Math.max(1, Number(params.pageSize || pageSize));
          const items = learnersQuery.data || [];
          const keywordValue = normalizeKeyword(params.keyword);
          const nextItems = items
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
            .filter((item) => (!params.direction ? true : String(item.direction || '') === String(params.direction)))
            .filter((item) => (!params.status ? true : String(item.status || '') === String(params.status)))
            .sort((left, right) => {
              const leftTime = new Date(String(left.updatedAt || left._updatedAt || left.createdAt || 0)).getTime();
              const rightTime = new Date(String(right.updatedAt || right._updatedAt || right.createdAt || 0)).getTime();
              return rightTime - leftTime;
            });

          return {
            success: true,
            total: nextItems.length,
            data: paginate(nextItems, tableCurrent, tablePageSize)
          };
        }}
        beforeSearchSubmit={(values) => {
          setSearchParams(
            compactSearchParams(searchParams, {
              keyword: String(values.keyword || ''),
              direction: String(values.direction || ''),
              status: String(values.status || ''),
              page: 1
            })
          );
          return values;
        }}
        onReset={() => {
          setSearchParams(compactSearchParams(new URLSearchParams(), { tab: currentTab }));
        }}
        toolbar={{
          title: learnerTabs.find((item) => item.key === currentTab)?.label || '学习数据'
        }}
      />

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
