import { Navigator, Text, View } from '@tarojs/components';

export default function PageCtaCard(props) {
  return (
    <View
      style={{
        margin: props.margin || '42rpx 24rpx 0',
        borderRadius: '34rpx',
        padding: '36rpx 30rpx 34rpx',
        background: props.background || 'linear-gradient(135deg, #111d3f 0%, #0f1936 60%, #0a1229 100%)',
        boxShadow: '0 16rpx 30rpx rgba(15,23,42,0.18)',
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
          borderRadius: '999rpx',
          backgroundColor: 'rgba(91,77,255,0.14)'
        }}
      />

      <Text
        style={{
          position: 'relative',
          display: 'block',
          fontSize: '36rpx',
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
          fontSize: '22rpx',
          lineHeight: 1.75,
          color: '#cbd5e1',
          marginBottom: '26rpx',
          width: '520rpx',
          maxWidth: '100%'
        }}
      >
        {props.desc}
      </Text>
      <Navigator
        url={props.url || '/pages/about/index'}
        openType={props.openType || 'switchTab'}
        style={{
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: '220rpx',
          height: '82rpx',
          padding: '0 30rpx',
          borderRadius: '26rpx',
          backgroundColor: '#ffffff',
          boxShadow: '0 12rpx 24rpx rgba(15,23,42,0.16)'
        }}
      >
        <Text style={{ fontSize: '26rpx', color: '#0f172a', fontWeight: 800 }}>
          {props.buttonText || '立即咨询'}
        </Text>
      </Navigator>
      {props.footnote ? (
        <Text
          style={{
            position: 'relative',
            display: 'block',
            marginTop: '18rpx',
            fontSize: '18rpx',
            color: '#94a3b8'
          }}
        >
          {props.footnote}
        </Text>
      ) : null}
    </View>
  );
}
