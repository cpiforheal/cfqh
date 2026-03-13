import Taro, { getCurrentInstance } from '@tarojs/taro';
import { Button, Text, View } from '@tarojs/components';
import { useEffect, useState } from 'react';
import { getAdminCollectionFormSchema, validateAdminFormData } from '../../../config/adminFormSchemas';
import ContentForm from '../../../components/admin/ContentForm';
import { deleteAdminItem, getAdminItem, getEmptyItemTemplate, saveAdminItem } from '../../../services/admin';
import { pageStyle, surfaceCardStyle, ui } from '../../../styles/ui';

export default function AdminItemEditor() {
  const params = getCurrentInstance().router?.params || {};
  const collection = params.collection || 'directions';
  const id = params.id || '';
  const schema = getAdminCollectionFormSchema(collection);
  const [value, setValue] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        if (id) {
          const data = await getAdminItem(collection, id);
          setValue(data || getEmptyItemTemplate(collection));
        } else {
          setValue(getEmptyItemTemplate(collection));
        }
      } catch (error) {
        Taro.showToast({ title: error.message || '读取失败', icon: 'none' });
        setValue(getEmptyItemTemplate(collection));
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [collection, id]);

  async function handleSave() {
    try {
      setSaving(true);
      const validationMessage = validateAdminFormData(schema, value);
      if (validationMessage) {
        throw new Error(validationMessage);
      }
      const result = await saveAdminItem(collection, value);
      Taro.showToast({ title: '保存成功', icon: 'success' });
      if (!id && result && result.id) {
        Taro.redirectTo({ url: `/pages/admin/item-editor/index?collection=${collection}&id=${result.id}` });
      }
    } catch (error) {
      Taro.showToast({ title: error.message || '保存失败', icon: 'none' });
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!id) return;
    try {
      await deleteAdminItem(collection, id);
      Taro.showToast({ title: '已删除', icon: 'success' });
      Taro.navigateBack();
    } catch (error) {
      Taro.showToast({ title: error.message || '删除失败', icon: 'none' });
    }
  }

  return (
    <View style={{ ...pageStyle, padding: '28rpx 24rpx 48rpx' }}>
      <View style={{ ...surfaceCardStyle, padding: '28rpx', borderRadius: ui.radius.lg }}>
        <Text style={{ display: 'block', fontSize: ui.type.section, color: ui.colors.text, fontWeight: 900, marginBottom: '10rpx' }}>
          {id ? '编辑条目' : '新增条目'}
        </Text>
        <Text style={{ display: 'block', fontSize: ui.type.meta, color: ui.colors.textMuted, marginBottom: '18rpx' }}>
          集合：{collection} · 当前为结构化表单编辑
        </Text>
        <ContentForm value={value} onChange={setValue} schema={schema} />
        <Button type="primary" loading={saving || loading} onClick={handleSave} style={{ marginTop: '20rpx', marginBottom: id ? '14rpx' : '0' }}>
          保存条目
        </Button>
        {id ? <Button onClick={handleDelete}>软删除条目</Button> : null}
      </View>
    </View>
  );
}
