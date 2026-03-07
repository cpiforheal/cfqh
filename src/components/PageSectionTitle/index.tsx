import { Text, View } from '@tarojs/components';

export default function PageSectionTitle(props) {
  return (
    <View style={{ display: 'flex', alignItems: 'center', marginBottom: props.marginBottom || '24rpx' }}>
      <View
        style={{
          width: '10rpx',
          height: '34rpx',
          borderRadius: '999rpx',
          backgroundColor: '#4f46e5',
          marginRight: '14rpx'
        }}
      />
      <Text style={{ fontSize: '34rpx', fontWeight: 800, color: '#0f172a' }}>{props.children}</Text>
    </View>
  );
}
