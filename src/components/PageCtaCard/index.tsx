import { Navigator, Text, View } from '@tarojs/components';
import { darkPanelStyle, ui } from '../../styles/ui';

export default function PageCtaCard(props) {
  return (
    <View
      style={{
        margin: props.margin || `${ui.spacing.section} ${ui.spacing.page} 0`,
        borderRadius: ui.radius.lg,
        padding: '36rpx 30rpx 34rpx',
        background: props.background || darkPanelStyle.background,
        boxShadow: darkPanelStyle.boxShadow,
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <View
        style={{
          position: 'absolute',
          right: '-56rpx',
          top: '-48rpx',
          width: '220rpx',
          height: '220rpx',
          borderRadius: ui.radius.pill,
          backgroundColor: 'rgba(91,77,255,0.14)'
        }}
      />

      <Text
        style={{
          position: 'relative',
          display: 'block',
          fontSize: '34rpx',
          color: '#ffffff',
          fontWeight: 900,
          marginBottom: '14rpx'
        }}
      >
        {props.title}
      </Text>
      <Text
        style={{
          position: 'relative',
          display: 'block',
          fontSize: ui.type.body,
          lineHeight: 1.78,
          color: ui.colors.darkText,
          marginBottom: '26rpx',
          width: '520rpx',
          maxWidth: '100%'
        }}
      >
        {props.desc}
      </Text>
      <Navigator
        url={props.url || '/pages/about/index'}
        openType={props.openType || 'navigate'}
        style={{
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: '220rpx',
          height: '82rpx',
          padding: '0 30rpx',
          borderRadius: ui.radius.sm,
          backgroundColor: '#ffffff',
          boxShadow: '0 12rpx 24rpx rgba(15,23,42,0.16)'
        }}
      >
        <Text style={{ fontSize: ui.type.button, color: ui.colors.text, fontWeight: 800 }}>
          {props.buttonText || '立即咨询'}
        </Text>
      </Navigator>
      {props.footnote ? (
        <Text
          style={{
            position: 'relative',
            display: 'block',
            marginTop: '18rpx',
            fontSize: ui.type.note,
            color: ui.colors.textSoft
          }}
        >
          {props.footnote}
        </Text>
      ) : null}
    </View>
  );
}
