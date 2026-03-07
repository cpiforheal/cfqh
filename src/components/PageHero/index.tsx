import { Image, Text, View } from '@tarojs/components';

export default function PageHero(props) {
  return (
    <View
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderBottomLeftRadius: '56rpx',
        borderBottomRightRadius: '56rpx',
        background: props.background || 'linear-gradient(180deg, #334266 0%, #18233f 56%, #0d1730 100%)',
        padding: '34rpx 24rpx 108rpx'
      }}
    >
      {props.imageSeed ? (
        <Image
          src={`https://picsum.photos/seed/${props.imageSeed}/900/600`}
          mode="aspectFill"
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            opacity: 0.18
          }}
        />
      ) : null}

      <View
        style={{
          position: 'absolute',
          right: props.bubbleRight || '-40rpx',
          top: props.bubbleTop || '26rpx',
          width: props.bubbleSize || '220rpx',
          height: props.bubbleSize || '220rpx',
          borderRadius: '999rpx',
          backgroundColor: props.bubbleColor || 'rgba(91,77,255,0.14)'
        }}
      />

      <View style={{ position: 'relative', zIndex: 2, padding: '18rpx 8rpx 0' }}>
        <View
          style={{
            display: 'inline-flex',
            padding: '8rpx 18rpx',
            borderRadius: '999rpx',
            backgroundColor: 'rgba(255,255,255,0.12)',
            border: '1rpx solid rgba(255,255,255,0.18)',
            marginBottom: '30rpx'
          }}
        >
          <Text style={{ fontSize: '20rpx', color: '#dbe4ff', fontWeight: 600 }}>{props.chip}</Text>
        </View>
        <Text
          style={{
            display: 'block',
            fontSize: '56rpx',
            lineHeight: 1.12,
            color: '#ffffff',
            fontWeight: 900,
            marginBottom: '10rpx'
          }}
        >
          {props.title}
        </Text>
        <Text
          style={{
            display: 'block',
            fontSize: '26rpx',
            lineHeight: 1.85,
            color: '#d7e0f3',
            width: '560rpx',
            maxWidth: '100%'
          }}
        >
          {props.desc}
        </Text>
      </View>
    </View>
  );
}
