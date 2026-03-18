import { View } from '@tarojs/components';
import { ui } from '../styles/ui';

interface SkeletonScreenProps {
  type?: 'card' | 'list' | 'hero' | 'full';
  count?: number;
}

export default function SkeletonScreen({ type = 'full', count = 3 }: SkeletonScreenProps) {
  const skeletonBase = {
    background: 'linear-gradient(90deg, rgba(226,232,240,0.4) 0%, rgba(226,232,240,0.7) 50%, rgba(226,232,240,0.4) 100%)',
    backgroundSize: '200% 100%',
    animation: 'skeleton-shimmer 1.5s ease-in-out infinite',
    borderRadius: ui.radius.md
  };

  if (type === 'hero') {
    return (
      <View style={{ padding: '28rpx 24rpx' }}>
        <View style={{ ...skeletonBase, height: '280rpx', marginBottom: '24rpx' }} />
        <View style={{ ...skeletonBase, height: '40rpx', width: '60%', marginBottom: '16rpx' }} />
        <View style={{ ...skeletonBase, height: '32rpx', width: '80%' }} />
      </View>
    );
  }

  if (type === 'card') {
    return (
      <View style={{ padding: '28rpx 24rpx' }}>
        {Array.from({ length: count }).map((_, index) => (
          <View
            key={index}
            style={{
              ...skeletonBase,
              height: '180rpx',
              marginBottom: '24rpx'
            }}
          />
        ))}
      </View>
    );
  }

  if (type === 'list') {
    return (
      <View style={{ padding: '28rpx 24rpx' }}>
        {Array.from({ length: count }).map((_, index) => (
          <View
            key={index}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: '24rpx'
            }}
          >
            <View style={{ ...skeletonBase, width: '120rpx', height: '120rpx', marginRight: '20rpx' }} />
            <View style={{ flex: 1 }}>
              <View style={{ ...skeletonBase, height: '36rpx', width: '70%', marginBottom: '12rpx' }} />
              <View style={{ ...skeletonBase, height: '28rpx', width: '90%' }} />
            </View>
          </View>
        ))}
      </View>
    );
  }

  // full - 完整页面骨架屏
  return (
    <View style={{ padding: '28rpx 24rpx' }}>
      {/* Hero 区域 */}
      <View style={{ ...skeletonBase, height: '280rpx', marginBottom: '32rpx' }} />

      {/* 统计卡片 */}
      <View style={{ display: 'flex', flexDirection: 'row', gap: '16rpx', marginBottom: '32rpx' }}>
        <View style={{ ...skeletonBase, flex: 1, height: '120rpx' }} />
        <View style={{ ...skeletonBase, flex: 1, height: '120rpx' }} />
        <View style={{ ...skeletonBase, flex: 1, height: '120rpx' }} />
      </View>

      {/* 内容卡片 */}
      {Array.from({ length: 3 }).map((_, index) => (
        <View
          key={index}
          style={{
            ...skeletonBase,
            height: '200rpx',
            marginBottom: '24rpx'
          }}
        />
      ))}
    </View>
  );
}
