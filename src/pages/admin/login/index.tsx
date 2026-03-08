import Taro from '@tarojs/taro';
import { Button, Text, View } from '@tarojs/components';
import { useEffect, useState } from 'react';
import { getAdminAuth, seedInitialData } from '../../../services/admin';
import { pageStyle, surfaceCardStyle, ui } from '../../../styles/ui';

export default function AdminLoginPage() {
  const [state, setState] = useState({ loading: true, isAdmin: false, bootstrapRequired: false, openid: '' });
  const [busy, setBusy] = useState(false);

  async function refresh() {
    setBusy(true);
    try {
      const result = await getAdminAuth();
      setState({
        loading: false,
        isAdmin: !!result.isAdmin,
        bootstrapRequired: !!result.bootstrapRequired,
        openid: result.openid || ''
      });
    } catch (error) {
      setState({ loading: false, isAdmin: false, bootstrapRequired: true, openid: '' });
      Taro.showToast({ title: '请先部署云函数', icon: 'none' });
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  async function handleBootstrap() {
    setBusy(true);
    try {
      await seedInitialData({ replace: false });
      Taro.showToast({ title: '初始化完成', icon: 'success' });
      await refresh();
    } catch (error) {
      Taro.showToast({ title: error.message || '初始化失败', icon: 'none' });
    } finally {
      setBusy(false);
    }
  }

  function goDashboard() {
    Taro.navigateTo({ url: '/pages/admin/dashboard/index' });
  }

  return (
    <View style={{ ...pageStyle, padding: '32rpx 24rpx 48rpx' }}>
      <View style={{ ...surfaceCardStyle, padding: '32rpx', borderRadius: ui.radius.lg }}>
        <Text style={{ display: 'block', fontSize: ui.type.hero, color: ui.colors.text, fontWeight: 900, marginBottom: '14rpx' }}>
          后台管理入口
        </Text>
        <Text style={{ display: 'block', fontSize: ui.type.body, lineHeight: 1.8, color: ui.colors.textMuted, marginBottom: '28rpx' }}>
          当前版本先提供可用的内容编辑能力：页面单例编辑、列表内容编辑、初始化种子数据。
        </Text>

        <View style={{ marginBottom: '22rpx' }}>
          <Text style={{ fontSize: ui.type.meta, color: ui.colors.textSoft }}>当前用户 OpenID</Text>
          <Text style={{ display: 'block', marginTop: '8rpx', fontSize: ui.type.body, color: ui.colors.text, fontWeight: 700 }}>
            {state.openid || '等待云函数返回'}
          </Text>
        </View>

        <View style={{ marginBottom: '28rpx' }}>
          <Text style={{ fontSize: ui.type.meta, color: ui.colors.textSoft }}>状态</Text>
          <Text style={{ display: 'block', marginTop: '8rpx', fontSize: ui.type.body, color: ui.colors.text, fontWeight: 700 }}>
            {state.loading ? '正在检测权限' : state.isAdmin ? '已授权管理员' : state.bootstrapRequired ? '未初始化管理员' : '当前账号无后台权限'}
          </Text>
        </View>

        {state.isAdmin ? (
          <Button type="primary" loading={busy} onClick={goDashboard}>
            进入后台
          </Button>
        ) : null}

        {!state.isAdmin && state.bootstrapRequired ? (
          <Button type="primary" loading={busy} onClick={handleBootstrap}>
            初始化数据库并成为首个管理员
          </Button>
        ) : null}

        {!state.isAdmin && !state.bootstrapRequired ? (
          <Button loading={busy} onClick={refresh}>
            重新检测权限
          </Button>
        ) : null}
      </View>
    </View>
  );
}
