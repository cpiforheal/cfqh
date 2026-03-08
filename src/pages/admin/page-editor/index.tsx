import Taro, { getCurrentInstance } from '@tarojs/taro';
import { Button, Text, Textarea, View } from '@tarojs/components';
import { useEffect, useMemo, useState } from 'react';
import { adminPageOptions } from '../../../config/content';
import { getAdminPage, getEmptyPageContent, saveAdminPage } from '../../../services/admin';
import { pageStyle, surfaceCardStyle, ui } from '../../../styles/ui';

export default function AdminPageEditor() {
  const params = getCurrentInstance().router?.params || {};
  const pageKey = params.pageKey || 'home';
  const pageLabel = useMemo(() => {
    const matched = adminPageOptions.find((item) => item.key === pageKey);
    return matched ? matched.label : pageKey;
  }, [pageKey]);
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await getAdminPage(pageKey);
        setValue(JSON.stringify(data || getEmptyPageContent(pageKey), null, 2));
      } catch (error) {
        setValue(JSON.stringify(getEmptyPageContent(pageKey), null, 2));
        Taro.showToast({ title: error.message || '读取失败', icon: 'none' });
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [pageKey]);

  async function handleSave() {
    try {
      setSaving(true);
      const parsed = JSON.parse(value);
      await saveAdminPage(pageKey, parsed);
      Taro.showToast({ title: '保存成功', icon: 'success' });
    } catch (error) {
      Taro.showToast({ title: error.message || '保存失败', icon: 'none' });
    } finally {
      setSaving(false);
    }
  }

  return (
    <View style={{ ...pageStyle, padding: '28rpx 24rpx 48rpx' }}>
      <View style={{ ...surfaceCardStyle, padding: '28rpx', borderRadius: ui.radius.lg }}>
        <Text style={{ display: 'block', fontSize: ui.type.section, color: ui.colors.text, fontWeight: 900, marginBottom: '10rpx' }}>
          {pageLabel} JSON 编辑
        </Text>
        <Text style={{ display: 'block', fontSize: ui.type.meta, color: ui.colors.textMuted, marginBottom: '18rpx' }}>
          当前阶段先用原始 JSON 编辑，优先打通内容链路。
        </Text>
        <Textarea
          value={value}
          onInput={(event) => setValue(event.detail.value)}
          maxlength={-1}
          style={{
            width: '100%',
            minHeight: '980rpx',
            backgroundColor: '#0f172a',
            color: '#e2e8f0',
            borderRadius: '24rpx',
            padding: '24rpx',
            boxSizing: 'border-box',
            fontSize: '22rpx',
            lineHeight: 1.7
          }}
        />
        <Button type="primary" loading={saving || loading} onClick={handleSave} style={{ marginTop: '20rpx' }}>
          保存页面内容
        </Button>
      </View>
    </View>
  );
}
