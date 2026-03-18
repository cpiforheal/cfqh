import { Image, Text, View } from '@tarojs/components';
import { ui } from '../../styles/ui';
import { resolveMediaUrl } from '../../utils/media';

export default function PageHero(props) {
  const imageUrl = resolveMediaUrl({
    url: props.imageUrl,
    seed: props.imageSeed,
    fallbackSize: '900/600'
  });
  const compact = Boolean(props.compact);
  const contentPaddingTop = compact ? '8rpx' : '18rpx';
  const chipPadding = compact ? '7rpx 16rpx' : '8rpx 18rpx';
  const titleSize = compact ? '42rpx' : ui.type.hero;
  const titleMargin = compact ? '8rpx' : '10rpx';
  const descSize = compact ? ui.type.meta : ui.type.body;
  const descLineHeight = compact ? 1.62 : 1.78;
  const descWidth = compact ? '100%' : '560rpx';

  return (
    <View
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderBottomLeftRadius: ui.radius.hero,
        borderBottomRightRadius: ui.radius.hero,
        background: props.background || 'linear-gradient(180deg, #334266 0%, #18233f 56%, #0d1730 100%)',
        padding: `${compact ? '24rpx' : '34rpx'} ${ui.spacing.page} ${compact ? '54rpx' : '108rpx'}`
      }}
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
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
          top: props.bubbleTop || (compact ? '10rpx' : '26rpx'),
          width: props.bubbleSize || (compact ? '168rpx' : '220rpx'),
          height: props.bubbleSize || (compact ? '168rpx' : '220rpx'),
          borderRadius: ui.radius.pill,
          backgroundColor: props.bubbleColor || 'rgba(91,77,255,0.14)'
        }}
      />

      <View style={{ position: 'relative', zIndex: 2, padding: `${contentPaddingTop} 8rpx 0` }}>
        {(props.chip || props.headerRight) ? (
          <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: compact ? '16rpx' : '30rpx' }}>
            {props.chip ? (
              <View
                style={{
                  display: 'inline-flex',
                  padding: chipPadding,
                  borderRadius: ui.radius.pill,
                  backgroundColor: 'rgba(255,255,255,0.12)',
                  border: '1rpx solid rgba(255,255,255,0.18)'
                }}
              >
                <Text style={{ fontSize: compact ? ui.type.note : ui.type.chip, color: '#dbe4ff', fontWeight: 600 }}>{props.chip}</Text>
              </View>
            ) : <View />}
            {props.headerRight ? <View>{props.headerRight}</View> : null}
          </View>
        ) : null}
        <Text
          style={{
            display: 'block',
            fontSize: titleSize,
            lineHeight: 1.12,
            color: '#ffffff',
            fontWeight: 900,
            marginBottom: titleMargin
          }}
        >
          {props.title}
        </Text>
        <Text
          style={{
            display: 'block',
            fontSize: descSize,
            lineHeight: descLineHeight,
            color: '#d7e0f3',
            width: descWidth,
            maxWidth: '100%'
          }}
        >
          {props.desc}
        </Text>
        {props.children ? <View style={{ marginTop: compact ? '18rpx' : '24rpx' }}>{props.children}</View> : null}
      </View>
    </View>
  );
}
