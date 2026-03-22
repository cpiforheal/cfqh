import Taro from '@tarojs/taro';
import { Button, Text, View } from '@tarojs/components';
import { adminListOptions, adminPageOptions } from '../../../config/content';
import { seedInitialData } from '../../../services/admin';
import { pageStyle, surfaceCardStyle, ui } from '../../../styles/ui';

export default function AdminDashboardPage() {
  async function handleSeed(replace) {
    try {
      Taro.showLoading({ title: '处理中' });
      await seedInitialData({ replace });
      Taro.hideLoading();
      Taro.showToast({ title: replace ? '已重置并导入' : '已补充导入', icon: 'success' });
    } catch (error) {
      Taro.hideLoading();
      Taro.showToast({ title: error.message || '操作失败', icon: 'none' });
    }
  }

  return (
    <View style={{ ...pageStyle, padding: '28rpx 24rpx 56rpx' }}>
      <View style={{ ...surfaceCardStyle, padding: '28rpx', borderRadius: ui.radius.lg, marginBottom: '24rpx' }}>
        <Text style={{ display: 'block', fontSize: ui.type.section, color: ui.colors.text, fontWeight: 900, marginBottom: '12rpx' }}>
          页面单例编辑
        </Text>
        {adminPageOptions.map((item) => (
          <View
            key={item.key}
            onClick={() => Taro.navigateTo({ url: `/pages/admin/page-editor/index?pageKey=${item.key}` })}
            style={{
              padding: '22rpx 18rpx',
              borderRadius: ui.radius.sm,
              border: '1rpx solid rgba(226,232,240,0.9)',
              marginBottom: '14rpx',
              backgroundColor: '#ffffff'
            }}
          >
            <Text style={{ fontSize: ui.type.body, color: ui.colors.text, fontWeight: 700 }}>{item.label}</Text>
          </View>
        ))}
      </View>

      <View style={{ ...surfaceCardStyle, padding: '28rpx', borderRadius: ui.radius.lg, marginBottom: '24rpx' }}>
        <Text style={{ display: 'block', fontSize: ui.type.section, color: ui.colors.text, fontWeight: 900, marginBottom: '12rpx' }}>
          列表内容管理
        </Text>
        {adminListOptions.map((item) => (
          <View
            key={item.collection}
            onClick={() => Taro.navigateTo({ url: `/pages/admin/list-editor/index?collection=${item.collection}` })}
            style={{
              padding: '22rpx 18rpx',
              borderRadius: ui.radius.sm,
              border: '1rpx solid rgba(226,232,240,0.9)',
              marginBottom: '14rpx',
              backgroundColor: '#ffffff'
            }}
          >
            <Text style={{ fontSize: ui.type.body, color: ui.colors.text, fontWeight: 700 }}>{item.label}</Text>
          </View>
        ))}
      </View>

      <View style={{ ...surfaceCardStyle, padding: '28rpx', borderRadius: ui.radius.lg, marginBottom: '24rpx' }}>
        <Text style={{ display: 'block', fontSize: ui.type.section, color: ui.colors.text, fontWeight: 900, marginBottom: '12rpx' }}>
          📚 题库数据管理
        </Text>
        <Text style={{ display: 'block', fontSize: ui.type.body, lineHeight: 1.8, color: ui.colors.textMuted, marginBottom: '20rpx' }}>
          支持从Excel、CSV、纯文本等多种格式导入题库数据，系统会自动清洗和标准化数据。
        </Text>
        <Button
          type="primary"
          onClick={() => Taro.navigateTo({ url: '/pages/admin/question-bank-import/index' })}
          style={{ marginBottom: '14rpx' }}
        >
          📁 导入题库数据
        </Button>
      </View>

      <View style={{ ...surfaceCardStyle, padding: '28rpx', borderRadius: ui.radius.lg }}>
        <Text style={{ display: 'block', fontSize: ui.type.section, color: ui.colors.text, fontWeight: 900, marginBottom: '12rpx' }}>
          初始化与同步
        </Text>
        <Text style={{ display: 'block', fontSize: ui.type.body, lineHeight: 1.8, color: ui.colors.textMuted, marginBottom: '20rpx' }}>
          补充导入会保留已存在内容；重置导入会用当前前端静态数据覆盖数据库现有数据。
        </Text>
        <Button type="primary" onClick={() => handleSeed(false)} style={{ marginBottom: '14rpx' }}>
          补充导入种子数据
        </Button>
        <Button onClick={() => handleSeed(true)}>重置并重新导入</Button>
      </View>
    </View>
  );
}
