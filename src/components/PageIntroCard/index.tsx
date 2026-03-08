import { Text, View } from '@tarojs/components';
import { elevatedSurfaceCardStyle, ui } from '../../styles/ui';

export default function PageIntroCard(props) {
  return (
    <View
      style={{
        margin: props.margin || `-54rpx ${ui.spacing.page} 0`,
        position: 'relative',
        zIndex: 3
      }}
    >
      <View
        style={{
          ...elevatedSurfaceCardStyle,
          padding: props.padding || '28rpx 24rpx'
        }}
      >
        <Text
          style={{
            display: 'block',
            fontSize: ui.type.subtitle,
            color: ui.colors.text,
            fontWeight: 800,
            marginBottom: '10rpx'
          }}
        >
          {props.title}
        </Text>
        <Text
          style={{
            display: 'block',
            fontSize: ui.type.body,
            lineHeight: 1.78,
            color: ui.colors.textMuted
          }}
        >
          {props.desc}
        </Text>
      </View>
    </View>
  );
}
