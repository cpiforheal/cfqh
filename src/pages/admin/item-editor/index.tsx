import Taro, { getCurrentInstance } from '@tarojs/taro';
import { Button, Text, Textarea, View } from '@tarojs/components';
import { useEffect, useState } from 'react';
import { deleteAdminItem, getAdminItem, getEmptyItemTemplate, saveAdminItem } from '../../../services/admin';
import { pageStyle, surfaceCardStyle, ui } from '../../../styles/ui';

export default function AdminItemEditor() {
  const params = getCurrentInstance().router?.params || {};
  const collection = params.collection || 'directions';
  const id = params.id || '';
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        if (id) {
          const data = await getAdminItem(collection, id);
          setValue(JSON.stringify(data || getEmptyItemTemplate(collection), null, 2));
        } else {
          setValue(JSON.stringify(getEmptyItemTemplate(collection), null, 2));
        }
      } catch (error) {
        Taro.showToast({ title: error.message || '读取失败', icon: 'none' });
        setValue(JSON.stringify(getEmptyItemTemplate(collection), null, 2));
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [collection, id]);

  async function handleSave() {
    try {
      setSaving(true);
      const parsed = JSON.parse(value);
      const result = await saveAdminItem(collection, parsed);
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
          集合：{collection}
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
        <Button type="primary" loading={saving || loading} onClick={handleSave} style={{ marginTop: '20rpx', marginBottom: id ? '14rpx' : '0' }}>
          保存条目
        </Button>
        {id ? <Button onClick={handleDelete}>软删除条目</Button> : null}
      </View>
    </View>
  );
}
