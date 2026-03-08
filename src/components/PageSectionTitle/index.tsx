import { Text, View } from '@tarojs/components';
import { ui } from '../../styles/ui';

export default function PageSectionTitle(props) {
  return (
    <View style={{ display: 'flex', alignItems: 'center', marginBottom: props.marginBottom || '24rpx' }}>
      <View
        style={{
          width: '10rpx',
          height: '34rpx',
          borderRadius: ui.radius.pill,
          backgroundColor: props.lineColor || ui.colors.accentLine,
          marginRight: '14rpx'
        }}
      />
      <Text style={{ fontSize: ui.type.section, fontWeight: 800, color: ui.colors.text }}>{props.children}</Text>
    </View>
  );
}
