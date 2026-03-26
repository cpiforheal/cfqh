import { Alert, App, Button, Card, Form, Input, Space, Tag, Typography } from 'antd';
import { LockOutlined, MoonOutlined, SafetyCertificateOutlined, SunOutlined, UserOutlined } from '@ant-design/icons';
import { api, type AuthState, type HealthPayload } from '../api';
import type { ThemeMode } from '../App';

type LoginPageProps = {
  auth: AuthState;
  health: HealthPayload | undefined;
  onSuccess: () => void;
  themeMode: ThemeMode;
  onToggleTheme: () => void;
};

type LoginFormValues = {
  name?: string;
  loginAccount: string;
  password: string;
};

export function LoginPage({ auth, health, onSuccess, themeMode, onToggleTheme }: LoginPageProps) {
  const [form] = Form.useForm<LoginFormValues>();
  const { message } = App.useApp();

  async function handleFinish(values: LoginFormValues) {
    if (auth.bootstrapRequired) {
      await api.bootstrap({
        name: values.name || '系统管理员',
        loginAccount: values.loginAccount,
        password: values.password
      });
      message.success('初始化管理员成功，正在进入工作台');
      onSuccess();
      return;
    }

    await api.login({
      loginAccount: values.loginAccount,
      password: values.password
    });
    message.success('登录成功');
    onSuccess();
  }

  return (
    <div className="auth-screen">
      <div className="auth-hero">
        <Space wrap align="center" className="auth-hero-top">
          <Tag color="blue">/react-admin/</Tag>
          <Button
            icon={themeMode === 'dark' ? <SunOutlined /> : <MoonOutlined />}
            onClick={onToggleTheme}
            className="theme-toggle"
          >
            {themeMode === 'dark' ? '明亮模式' : '暗色模式'}
          </Button>
        </Space>
        <Typography.Title>3200 后台 React 验证版</Typography.Title>
        <Typography.Paragraph>
          这一版先把登录、工作台、帖子 ProTable 和学习用户主控区迁过来，旧后台仍保留在根路径。
        </Typography.Paragraph>
        <Space wrap>
          <Tag color={auth.cloudReady ? 'cyan' : 'gold'}>{auth.modeLabel}</Tag>
          {health?.writeTargetLabel ? <Tag>{health.writeTargetLabel}</Tag> : null}
        </Space>
      </div>
      <Card className="auth-card" bordered={false}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Typography.Text className="eyebrow">
              {auth.bootstrapRequired ? '首次初始化' : '后台登录'}
            </Typography.Text>
            <Typography.Title level={3} style={{ marginTop: 8 }}>
              {auth.bootstrapRequired ? '创建第一个管理员' : '使用后台账号登录'}
            </Typography.Title>
            <Typography.Paragraph type="secondary">
              {auth.bootstrapRequired
                ? '云端 CMS 已接通，先创建首个 owner 账号，后续老师账号可在旧后台继续维护。'
                : auth.writeNotice || '沿用现有 Cookie 会话与权限体系。'}
            </Typography.Paragraph>
          </div>

          {!auth.cloudReady ? (
            <Alert
              type="warning"
              showIcon
              message="云端模式未就绪"
              description={auth.writeNotice || '当前环境未准备好正式登录写入。'}
            />
          ) : null}

          <Form form={form} layout="vertical" onFinish={handleFinish} disabled={!auth.cloudReady}>
            {auth.bootstrapRequired ? (
              <Form.Item
                label="姓名"
                name="name"
                rules={[{ required: true, message: '请填写管理员姓名' }]}
                initialValue="系统管理员"
              >
                <Input prefix={<SafetyCertificateOutlined />} placeholder="例如：系统管理员" />
              </Form.Item>
            ) : null}
            <Form.Item
              label="登录账号"
              name="loginAccount"
              rules={[{ required: true, message: '请填写登录账号' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="请输入后台账号" autoComplete="username" />
            </Form.Item>
            <Form.Item
              label="登录密码"
              name="password"
              rules={[{ required: true, message: '请填写登录密码' }]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="至少 6 位" autoComplete="current-password" />
            </Form.Item>
            <Button type="primary" htmlType="submit" block size="large">
              {auth.bootstrapRequired ? '创建并进入后台' : '登录后台'}
            </Button>
          </Form>

          <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
            旧后台仍可继续使用：
            <a href="/" target="_blank" rel="noreferrer">
              http://127.0.0.1:3200/
            </a>
          </Typography.Paragraph>
        </Space>
      </Card>
    </div>
  );
}
