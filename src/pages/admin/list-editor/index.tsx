import Taro, { getCurrentInstance } from '@tarojs/taro';
import { Button, Text, View } from '@tarojs/components';
import { useEffect, useMemo, useState } from 'react';
import { adminListOptions } from '../../../config/content';
import { getAdminList } from '../../../services/admin';
import { pageStyle, surfaceCardStyle, ui } from '../../../styles/ui';

function pickTitle(item) {
  return item.title || item.name || item.label || item._id || '未命名';
}

export default function AdminListEditor() {
  const params = getCurrentInstance().router?.params || {};
  const collection = params.collection || 'directions';
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const label = useMemo(() => {
    const matched = adminListOptions.find((item) => item.collection === collection);
    return matched ? matched.label : collection;
  }, [collection]);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await getAdminList(collection);
        setItems(data || []);
      } catch (error) {
        Taro.showToast({ title: error.message || '读取失败', icon: 'none' });
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [collection]);

  return (
    <View style={{ ...pageStyle, padding: '28rpx 24rpx 48rpx' }}>
      <View style={{ ...surfaceCardStyle, padding: '28rpx', borderRadius: ui.radius.lg }}>
        <Text style={{ display: 'block', fontSize: ui.type.section, color: ui.colors.text, fontWeight: 900, marginBottom: '10rpx' }}>
          {label}
        </Text>
        <Text style={{ display: 'block', fontSize: ui.type.meta, color: ui.colors.textMuted, marginBottom: '18rpx' }}>
          共 {items.length} 条，可直接进入单条 JSON 编辑。
        </Text>
        <Button
          type="primary"
          onClick={() => Taro.navigateTo({ url: `/pages/admin/item-editor/index?collection=${collection}` })}
          style={{ marginBottom: '18rpx' }}
        >
          新增条目
        </Button>
        {items.map((item) => (
          <View
            key={item._id}
            onClick={() => Taro.navigateTo({ url: `/pages/admin/item-editor/index?collection=${collection}&id=${item._id}` })}
            style={{
              padding: '20rpx 18rpx',
              borderRadius: ui.radius.sm,
              border: '1rpx solid rgba(226,232,240,0.9)',
              marginBottom: '14rpx',
              backgroundColor: '#ffffff'
            }}
          >
            <Text style={{ display: 'block', fontSize: ui.type.body, color: ui.colors.text, fontWeight: 700, marginBottom: '6rpx' }}>
              {pickTitle(item)}
            </Text>
            <Text style={{ fontSize: ui.type.meta, color: ui.colors.textMuted }}>
              {item.status || 'draft'} · sort {item.sort || 0}
            </Text>
          </View>
        ))}
        {!loading && items.length === 0 ? (
          <Text style={{ fontSize: ui.type.body, color: ui.colors.textSoft }}>当前集合暂无数据。</Text>
        ) : null}
      </View>
    </View>
  );
}
