import { useEffect, useMemo } from 'react';
import { Button, Drawer, Empty, Form, Input, Select, Space, Typography } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import type { DirectionOption, HomePageContent, HomeSectionId, LinkOpenType } from './types';

type HomeSectionEditorDrawerProps = {
  open: boolean;
  sectionId: HomeSectionId | null;
  page: HomePageContent;
  directions: DirectionOption[];
  saving: boolean;
  canWrite: boolean;
  onClose: () => void;
  onSave: (patch: Partial<HomePageContent>) => Promise<void>;
};

type SectionValues = {
  hero: HomePageContent['hero'];
  overviewStats: HomePageContent['overviewStats'];
  quickLinks: HomePageContent['quickLinks'];
  featuredDirectionIds: HomePageContent['featuredDirectionIds'];
  advantages: HomePageContent['advantages'];
  environmentSection: HomePageContent['environmentSection'];
  cta: HomePageContent['cta'];
};

const openTypeOptions: Array<{ label: string; value: LinkOpenType }> = [
  { label: '页面跳转 navigate', value: 'navigate' },
  { label: '底部 Tab 切换 switchTab', value: 'switchTab' },
  { label: '重定向 redirectTo', value: 'redirectTo' },
  { label: '重启页面 reLaunch', value: 'reLaunch' }
];

const sectionTitles: Record<HomeSectionId, string> = {
  hero: '首页大屏主视觉',
  stats: '首屏数据卡',
  quickLinks: '首页四个功能入口',
  directions: '热门方向',
  advantages: '学习支持',
  environment: '校区环境',
  cta: '底部咨询区'
};

const sectionNotes: Record<HomeSectionId, string> = {
  hero: '学生打开首页最先看到这里，建议先把标题、亮点和首个按钮说清楚。',
  stats: '这里建议只保留 3 张最强的数据卡，让首页首屏信息一眼就明白。',
  quickLinks: '功能入口建议放老师最常让学生点击的 4 个路径，尽量保持短标题。',
  directions: '这里只负责选哪两张方向卡显示，卡片的详细文案要去帖子模块维护。',
  advantages: '学习支持是老师最适合写“为什么值得了解”的地方，建议用口语化描述。',
  environment: '这里展示校区环境图片，建议用新手老师也能辨认的地点名称。',
  cta: '底部咨询区是最后承接位，建议写清楚适合谁来咨询、点按钮之后想得到什么。'
};

const itemButtonStyle = { marginTop: 12 };

function SectionListHeader({
  title,
  count,
  max,
  onAdd,
  disabled
}: {
  title: string;
  count: number;
  max: number;
  onAdd: () => void;
  disabled: boolean;
}) {
  return (
    <Space style={{ width: '100%', justifyContent: 'space-between' }}>
      <Typography.Text strong>
        {title} {count ? `(${count}/${max})` : ''}
      </Typography.Text>
      <Button type="dashed" icon={<PlusOutlined />} onClick={onAdd} disabled={disabled || count >= max}>
        新增一项
      </Button>
    </Space>
  );
}

export function HomeSectionEditorDrawer({
  open,
  sectionId,
  page,
  directions,
  saving,
  canWrite,
  onClose,
  onSave
}: HomeSectionEditorDrawerProps) {
  const [form] = Form.useForm<SectionValues>();

  const initialValues = useMemo<SectionValues>(
    () => ({
      hero: page.hero,
      overviewStats: page.overviewStats,
      quickLinks: page.quickLinks,
      featuredDirectionIds: page.featuredDirectionIds,
      advantages: page.advantages,
      environmentSection: page.environmentSection,
      cta: page.cta
    }),
    [page]
  );

  useEffect(() => {
    if (!open) return;
    form.setFieldsValue(initialValues);
  }, [form, initialValues, open, sectionId]);

  async function handleSubmit() {
    if (!sectionId) return;
    const values = await form.validateFields();
    const patch: Partial<HomePageContent> = {};

    if (sectionId === 'hero') patch.hero = values.hero;
    if (sectionId === 'stats') patch.overviewStats = values.overviewStats;
    if (sectionId === 'quickLinks') patch.quickLinks = values.quickLinks;
    if (sectionId === 'directions') patch.featuredDirectionIds = values.featuredDirectionIds;
    if (sectionId === 'advantages') patch.advantages = values.advantages;
    if (sectionId === 'environment') patch.environmentSection = values.environmentSection;
    if (sectionId === 'cta') patch.cta = values.cta;

    await onSave(patch);
  }

  function renderStatsEditor() {
    return (
      <Form.List name="overviewStats">
        {(fields, { add, remove }) => (
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <SectionListHeader title="数据卡" count={fields.length} max={3} onAdd={() => add({ value: '', label: '', note: '' })} disabled={!canWrite} />
            {fields.map((field, index) => (
              <div className="home-editor-item" key={field.key}>
                <Typography.Text strong>第 {index + 1} 张数据卡</Typography.Text>
                <Form.Item name={[field.name, 'value']} label="数值" rules={[{ required: true, message: '请填写数值' }]}>
                  <Input placeholder="例如 92.3%" disabled={!canWrite} />
                </Form.Item>
                <Form.Item name={[field.name, 'label']} label="标签" rules={[{ required: true, message: '请填写标签' }]}>
                  <Input placeholder="例如 上岸率" disabled={!canWrite} />
                </Form.Item>
                <Form.Item name={[field.name, 'note']} label="补充说明">
                  <Input placeholder="例如 2025 届实际数据" disabled={!canWrite} />
                </Form.Item>
                <Button danger icon={<DeleteOutlined />} onClick={() => remove(field.name)} disabled={!canWrite} style={itemButtonStyle}>
                  删除这张卡
                </Button>
              </div>
            ))}
          </Space>
        )}
      </Form.List>
    );
  }

  function renderQuickLinksEditor() {
    return (
      <Form.List name="quickLinks">
        {(fields, { add, remove }) => (
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <SectionListHeader
              title="功能入口"
              count={fields.length}
              max={4}
              onAdd={() => add({ label: '', desc: '', url: '', openType: 'navigate', icon: '' })}
              disabled={!canWrite}
            />
            {fields.map((field, index) => (
              <div className="home-editor-item" key={field.key}>
                <Typography.Text strong>第 {index + 1} 个入口</Typography.Text>
                <Form.Item name={[field.name, 'label']} label="入口标题" rules={[{ required: true, message: '请填写入口标题' }]}>
                  <Input placeholder="例如 每日一题" disabled={!canWrite} />
                </Form.Item>
                <Form.Item name={[field.name, 'desc']} label="入口说明">
                  <Input placeholder="例如 在学每日打卡" disabled={!canWrite} />
                </Form.Item>
                <Form.Item name={[field.name, 'url']} label="跳转地址" rules={[{ required: true, message: '请填写跳转地址' }]}>
                  <Input placeholder="/pages/question-bank/daily-question/index" disabled={!canWrite} />
                </Form.Item>
                <Form.Item name={[field.name, 'openType']} label="跳转方式">
                  <Select options={openTypeOptions} disabled={!canWrite} />
                </Form.Item>
                <Form.Item name={[field.name, 'icon']} label="图标标识">
                  <Input placeholder="例如 daily / paper / wrongbook" disabled={!canWrite} />
                </Form.Item>
                <Button danger icon={<DeleteOutlined />} onClick={() => remove(field.name)} disabled={!canWrite} style={itemButtonStyle}>
                  删除这个入口
                </Button>
              </div>
            ))}
          </Space>
        )}
      </Form.List>
    );
  }

  function renderDirectionsEditor() {
    return (
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
          这里只决定首页展示哪两张方向卡，卡片里的标题、摘要、亮点和按钮内容需要到“帖子”模块继续维护。
        </Typography.Paragraph>
        <Form.Item
          name="featuredDirectionIds"
          label="首页展示的热门方向"
          rules={[
            { required: true, message: '请至少选择 1 个方向' },
            {
              validator: async (_, value) => {
                if (Array.isArray(value) && value.length <= 2) {
                  return;
                }
                throw new Error('首页建议只保留 2 张热门方向卡');
              }
            }
          ]}
        >
          <Select
            mode="multiple"
            maxCount={2}
            placeholder="选择首页要展示的方向"
            options={directions.map((item) => ({
              label: `${item.name}${item.category ? ` · ${item.category}` : ''}`,
              value: item.id
            }))}
            disabled={!canWrite}
          />
        </Form.Item>
        {directions.length ? null : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="还没有读取到帖子条目，暂时无法选择热门方向。" />}
      </Space>
    );
  }

  function renderAdvantagesEditor() {
    return (
      <Form.List name="advantages">
        {(fields, { add, remove }) => (
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <SectionListHeader
              title="学习支持卡片"
              count={fields.length}
              max={4}
              onAdd={() => add({ icon: '', title: '', desc: '' })}
              disabled={!canWrite}
            />
            {fields.map((field, index) => (
              <div className="home-editor-item" key={field.key}>
                <Typography.Text strong>第 {index + 1} 张支持卡</Typography.Text>
                <Form.Item name={[field.name, 'title']} label="标题" rules={[{ required: true, message: '请填写标题' }]}>
                  <Input placeholder="例如 答疑有人盯" disabled={!canWrite} />
                </Form.Item>
                <Form.Item name={[field.name, 'desc']} label="说明" rules={[{ required: true, message: '请填写说明' }]}>
                  <Input.TextArea rows={3} placeholder="建议用老师平时会说的话去写，避免太技术化。" disabled={!canWrite} />
                </Form.Item>
                <Form.Item name={[field.name, 'icon']} label="图标标识">
                  <Input placeholder="例如 team / book / check" disabled={!canWrite} />
                </Form.Item>
                <Button danger icon={<DeleteOutlined />} onClick={() => remove(field.name)} disabled={!canWrite} style={itemButtonStyle}>
                  删除这张支持卡
                </Button>
              </div>
            ))}
          </Space>
        )}
      </Form.List>
    );
  }

  function renderEnvironmentEditor() {
    return (
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Form.Item name={['environmentSection', 'title']} label="环境区标题">
          <Input placeholder="例如 校区环境" disabled={!canWrite} />
        </Form.Item>
        <Form.Item name={['environmentSection', 'subtitle']} label="环境区补充说明">
          <Input placeholder="例如 到校学习 / 住宿 / 教室环境" disabled={!canWrite} />
        </Form.Item>
        <Form.List name={['environmentSection', 'cards']}>
          {(fields, { add, remove }) => (
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <SectionListHeader
                title="环境图片"
                count={fields.length}
                max={2}
                onAdd={() => add({ label: '', imageUrl: '', imageSeed: '' })}
                disabled={!canWrite}
              />
              {fields.map((field, index) => (
                <div className="home-editor-item" key={field.key}>
                  <Typography.Text strong>第 {index + 1} 张环境图</Typography.Text>
                  <Form.Item name={[field.name, 'label']} label="图片名称" rules={[{ required: true, message: '请填写图片名称' }]}>
                    <Input placeholder="例如 多媒体教室" disabled={!canWrite} />
                  </Form.Item>
                  <Form.Item name={[field.name, 'imageUrl']} label="图片地址">
                    <Input placeholder="https://..." disabled={!canWrite} />
                  </Form.Item>
                  <Form.Item name={[field.name, 'imageSeed']} label="备用图片种子">
                    <Input placeholder="例如 classroom1 / dorm1" disabled={!canWrite} />
                  </Form.Item>
                  <Button danger icon={<DeleteOutlined />} onClick={() => remove(field.name)} disabled={!canWrite} style={itemButtonStyle}>
                    删除这张环境图
                  </Button>
                </div>
              ))}
            </Space>
          )}
        </Form.List>
      </Space>
    );
  }

  function renderContent() {
    if (!sectionId) {
      return <Empty description="请选择要编辑的首页区块" image={Empty.PRESENTED_IMAGE_SIMPLE} />;
    }

    if (sectionId === 'hero') {
      return (
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Form.Item name={['hero', 'chip']} label="顶部小角标" rules={[{ required: true, message: '请填写小角标' }]}>
            <Input placeholder="例如 护理 / 助产 / 医护背景同学" disabled={!canWrite} />
          </Form.Item>
          <Form.Item name={['hero', 'title']} label="第一行主标题" rules={[{ required: true, message: '请填写第一行主标题' }]}>
            <Input placeholder="例如 想冲江苏专转本？" disabled={!canWrite} />
          </Form.Item>
          <Form.Item name={['hero', 'highlightTitle']} label="第二行主标题" rules={[{ required: true, message: '请填写第二行主标题' }]}>
            <Input placeholder="例如 先判断方向，再安排课程" disabled={!canWrite} />
          </Form.Item>
          <Form.Item name={['hero', 'desc']} label="首屏说明" rules={[{ required: true, message: '请填写首屏说明' }]}>
            <Input.TextArea rows={4} placeholder="建议直接写学生打开首页第一眼最该知道的话。" disabled={!canWrite} />
          </Form.Item>
          <Form.Item name={['hero', 'tags']} label="首屏标签">
            <Select mode="tags" tokenSeparators={[',', '，', '\n']} placeholder="输入后回车，可填写 2-4 个短标签" disabled={!canWrite} />
          </Form.Item>
          <Form.Item name={['hero', 'secondaryNote']} label="按钮下方短提示">
            <Input placeholder="例如 先选方向，再做训练" disabled={!canWrite} />
          </Form.Item>
          <Form.Item name={['hero', 'backgroundImageSeed']} label="背景图种子">
            <Input placeholder="例如 university" disabled={!canWrite} />
          </Form.Item>
          <Form.Item name={['hero', 'primaryButton', 'text']} label="主按钮文案" rules={[{ required: true, message: '请填写按钮文案' }]}>
            <Input placeholder="例如 了解课程安排" disabled={!canWrite} />
          </Form.Item>
          <Form.Item name={['hero', 'primaryButton', 'url']} label="主按钮跳转地址" rules={[{ required: true, message: '请填写按钮跳转地址' }]}>
            <Input placeholder="/pages/courses/index" disabled={!canWrite} />
          </Form.Item>
          <Form.Item name={['hero', 'primaryButton', 'openType']} label="主按钮跳转方式">
            <Select options={openTypeOptions} disabled={!canWrite} />
          </Form.Item>
        </Space>
      );
    }

    if (sectionId === 'stats') return renderStatsEditor();
    if (sectionId === 'quickLinks') return renderQuickLinksEditor();
    if (sectionId === 'directions') return renderDirectionsEditor();
    if (sectionId === 'advantages') return renderAdvantagesEditor();
    if (sectionId === 'environment') return renderEnvironmentEditor();

    return (
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Form.Item name={['cta', 'title']} label="咨询区标题" rules={[{ required: true, message: '请填写咨询区标题' }]}>
          <Input placeholder="例如 先聊清楚，再决定报哪条线" disabled={!canWrite} />
        </Form.Item>
        <Form.Item name={['cta', 'desc']} label="咨询区说明" rules={[{ required: true, message: '请填写咨询区说明' }]}>
          <Input.TextArea rows={4} placeholder="建议说清楚学生点击咨询之后会得到什么帮助。" disabled={!canWrite} />
        </Form.Item>
        <Form.Item name={['cta', 'buttonText']} label="咨询按钮文案" rules={[{ required: true, message: '请填写按钮文案' }]}>
          <Input placeholder="例如 预约咨询" disabled={!canWrite} />
        </Form.Item>
        <Form.Item name={['cta', 'footnote']} label="底部补充提示">
          <Input placeholder="例如 方向判断 · 课程安排 · 学情评估" disabled={!canWrite} />
        </Form.Item>
      </Space>
    );
  }

  return (
    <Drawer
      open={open}
      width={560}
      title={sectionId ? sectionTitles[sectionId] : '首页区块编辑'}
      onClose={onClose}
      destroyOnClose
      extra={
        <Space>
          <Button onClick={onClose}>取消</Button>
          <Button type="primary" onClick={() => void handleSubmit()} loading={saving} disabled={!canWrite}>
            保存这个区块
          </Button>
        </Space>
      }
    >
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
          {sectionId ? sectionNotes[sectionId] : '请从首页区块中选择一个需要编辑的区域。'}
        </Typography.Paragraph>
        <Form form={form} layout="vertical" disabled={!canWrite}>
          {renderContent()}
        </Form>
      </Space>
    </Drawer>
  );
}
