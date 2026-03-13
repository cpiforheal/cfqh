import Taro, { getCurrentInstance } from '@tarojs/taro';
import { Button, Text, View } from '@tarojs/components';
import { useEffect, useMemo, useState } from 'react';
import { adminPageOptions } from '../../../config/content';
import { getAdminPageFormSchema, validateAdminFormData } from '../../../config/adminFormSchemas';
import ContentForm from '../../../components/admin/ContentForm';
import { getAdminPage, getEmptyPageContent, saveAdminPage } from '../../../services/admin';
import { pageStyle, surfaceCardStyle, ui } from '../../../styles/ui';

export default function AdminPageEditor() {
  const params = getCurrentInstance().router?.params || {};
  const pageKey = params.pageKey || 'home';
  const pageLabel = useMemo(() => {
    const matched = adminPageOptions.find((item) => item.key === pageKey);
    return matched ? matched.label : pageKey;
  }, [pageKey]);
  const schema = useMemo(() => getAdminPageFormSchema(pageKey), [pageKey]);
  const [value, setValue] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await getAdminPage(pageKey);
        setValue(data || getEmptyPageContent(pageKey));
      } catch (error) {
        setValue(getEmptyPageContent(pageKey));
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
      const validationMessage = validateAdminFormData(schema, value);
      if (validationMessage) {
        throw new Error(validationMessage);
      }
      await saveAdminPage(pageKey, value);
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
          {pageLabel} 表单编辑
        </Text>
        <Text style={{ display: 'block', fontSize: ui.type.meta, color: ui.colors.textMuted, marginBottom: '18rpx' }}>
          当前保持原有页面样式不变，仅将内容编辑方式升级为结构化表单。
        </Text>
        <ContentForm value={value} onChange={setValue} schema={schema} />
        <Button type="primary" loading={saving || loading} onClick={handleSave} style={{ marginTop: '20rpx' }}>
          保存页面内容
        </Button>
      </View>
    </View>
  );
}
