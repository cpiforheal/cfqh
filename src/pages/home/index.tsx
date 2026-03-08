import { Image, Navigator, Text, View } from '@tarojs/components';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDidShow } from '@tarojs/taro';
import PageCtaCard from '../../components/PageCtaCard';
import PageSectionTitle from '../../components/PageSectionTitle';
import fallbackContent from '../../data/contentFallback';
import { getPublicContent } from '../../services/content';
import { pageStyle, surfaceCardStyle, ui } from '../../styles/ui';

const defaultHomePage = fallbackContent.pages.home;
const defaultDirections = fallbackContent.directions;

function mapHomeDirections(page, allDirections) {
  const featuredIds = page?.featuredDirectionIds || [];
  const source = featuredIds.length
    ? featuredIds
        .map((id) => (allDirections || []).find((item) => item._id === id))
        .filter(Boolean)
    : (allDirections || []).filter((item) => item.isFeatured);

  return source.map((item) => ({
    title: item.name,
    tag: item.homeTag || item.featuredTag || '',
    tagColor: item.homeCard?.tagColor || '#4f46e5',
    tagBackground: item.homeCard?.tagBackground || '#eef2ff',
    headerBackground: item.homeCard?.headerBackground || '#f7f5ff',
    iconColor: item.homeCard?.iconColor || '#5b4dff',
    iconType: item.iconType === 'pulse' ? 'medical' : item.iconType,
    desc: item.summary || ''
  }));
}

function getInitialHomeState() {
  return {
    site: fallbackContent.site,
    page: defaultHomePage,
    directions: defaultDirections
  };
}

function QuickIcon(props) {
  const commonWrap = {
    width: '88rpx',
    height: '88rpx',
    borderRadius: '26rpx',
    background: 'linear-gradient(180deg, #ffffff 0%, ' + props.background + ' 100%)',
    border: '1rpx solid rgba(226,232,240,0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 14rpx',
    boxShadow: '0 8rpx 18rpx rgba(148,163,184,0.10)'
  };

  const lineColor = props.color;
  const lineWidth = '2.5rpx';

  if (props.type === 'building') {
    return (
      <View style={commonWrap}>
        <View
          style={{
            width: '34rpx',
            height: '40rpx',
            borderWidth: lineWidth,
            borderStyle: 'solid',
            borderColor: lineColor,
            borderRadius: '6rpx',
            position: 'relative',
            boxSizing: 'border-box'
          }}
        >
          <View
            style={{
              position: 'absolute',
              left: '5rpx',
              bottom: '-3rpx',
              width: '8rpx',
              height: '14rpx',
              borderWidth: lineWidth,
              borderStyle: 'solid',
              borderColor: lineColor,
              borderBottomWidth: '0',
              borderRadius: '6rpx 6rpx 0 0',
              boxSizing: 'border-box'
            }}
          />
          <View
            style={{
              position: 'absolute',
              left: '7rpx',
              top: '7rpx',
              width: '3rpx',
              height: '3rpx',
              borderRadius: '999rpx',
              backgroundColor: lineColor,
              boxShadow:
                '10rpx 0 0 ' +
                lineColor +
                ', 0 10rpx 0 ' +
                lineColor +
                ', 10rpx 10rpx 0 ' +
                lineColor +
                ', 0 20rpx 0 ' +
                lineColor +
                ', 10rpx 20rpx 0 ' +
                lineColor
            }}
          />
        </View>
      </View>
    );
  }

  if (props.type === 'compass') {
    return (
      <View style={commonWrap}>
        <View
          style={{
            width: '38rpx',
            height: '38rpx',
            borderRadius: '999rpx',
            borderWidth: lineWidth,
            borderStyle: 'solid',
            borderColor: lineColor,
            position: 'relative',
            boxSizing: 'border-box'
          }}
        >
          <View
            style={{
              position: 'absolute',
              left: '14rpx',
              top: '8rpx',
              width: '6rpx',
              height: '16rpx',
              borderTopLeftRadius: '10rpx',
              borderTopRightRadius: '10rpx',
              borderBottomLeftRadius: '10rpx',
              borderBottomRightRadius: '10rpx',
              borderWidth: lineWidth,
              borderStyle: 'solid',
              borderColor: lineColor,
              transform: 'rotate(28deg)',
              boxSizing: 'border-box'
            }}
          />
          <View
            style={{
              position: 'absolute',
              left: '16rpx',
              top: '14rpx',
              width: '3rpx',
              height: '3rpx',
              borderRadius: '999rpx',
              backgroundColor: lineColor
            }}
          />
        </View>
      </View>
    );
  }

  if (props.type === 'team') {
    return (
      <View style={commonWrap}>
        <View style={{ position: 'relative', width: '42rpx', height: '34rpx' }}>
          <View
            style={{
              position: 'absolute',
              left: '4rpx',
              top: '0',
              width: '9rpx',
              height: '9rpx',
              borderRadius: '999rpx',
              borderWidth: lineWidth,
              borderStyle: 'solid',
              borderColor: lineColor
            }}
          />
          <View
            style={{
              position: 'absolute',
              right: '4rpx',
              top: '0',
              width: '9rpx',
              height: '9rpx',
              borderRadius: '999rpx',
              borderWidth: lineWidth,
              borderStyle: 'solid',
              borderColor: lineColor
            }}
          />
          <View
            style={{
              position: 'absolute',
              left: '0',
              top: '16rpx',
              width: '15rpx',
              height: '10rpx',
              borderWidth: lineWidth,
              borderStyle: 'solid',
              borderColor: lineColor,
              borderTopWidth: '0',
              borderRadius: '0 0 999rpx 999rpx'
            }}
          />
          <View
            style={{
              position: 'absolute',
              right: '0',
              top: '16rpx',
              width: '15rpx',
              height: '10rpx',
              borderWidth: lineWidth,
              borderStyle: 'solid',
              borderColor: lineColor,
              borderTopWidth: '0',
              borderRadius: '0 0 999rpx 999rpx'
            }}
          />
          <View
            style={{
              position: 'absolute',
              left: '14rpx',
              top: '5rpx',
              width: '9rpx',
              height: '9rpx',
              borderRadius: '999rpx',
              borderWidth: lineWidth,
              borderStyle: 'solid',
              borderColor: lineColor
            }}
          />
          <View
            style={{
              position: 'absolute',
              left: '11rpx',
              top: '18rpx',
              width: '19rpx',
              height: '11rpx',
              borderWidth: lineWidth,
              borderStyle: 'solid',
              borderColor: lineColor,
              borderTopWidth: '0',
              borderRadius: '0 0 999rpx 999rpx'
            }}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={commonWrap}>
      <View
        style={{
          width: '42rpx',
          height: '40rpx',
          position: 'relative',
          boxSizing: 'border-box'
        }}
      >
        <View
          style={{
            position: 'absolute',
            left: '8rpx',
            top: '7rpx',
            width: '24rpx',
            height: '15rpx',
            borderWidth: lineWidth,
            borderStyle: 'solid',
            borderColor: lineColor,
            borderTopWidth: '0',
            borderRadius: '0 0 12rpx 12rpx',
            boxSizing: 'border-box'
          }}
        />
        <View
          style={{
            position: 'absolute',
            left: '4rpx',
            top: '6rpx',
            width: '7rpx',
            height: '7rpx',
            borderTopWidth: lineWidth,
            borderLeftWidth: lineWidth,
            borderBottomWidth: lineWidth,
            borderStyle: 'solid',
            borderColor: lineColor,
            borderTopLeftRadius: '8rpx',
            borderBottomLeftRadius: '8rpx',
            borderRightWidth: '0',
            boxSizing: 'border-box'
          }}
        />
        <View
          style={{
            position: 'absolute',
            right: '4rpx',
            top: '6rpx',
            width: '7rpx',
            height: '7rpx',
            borderTopWidth: lineWidth,
            borderRightWidth: lineWidth,
            borderBottomWidth: lineWidth,
            borderStyle: 'solid',
            borderColor: lineColor,
            borderTopRightRadius: '8rpx',
            borderBottomRightRadius: '8rpx',
            borderLeftWidth: '0',
            boxSizing: 'border-box'
          }}
        />
        <View
          style={{
            position: 'absolute',
            left: '18rpx',
            top: '23rpx',
            width: '5rpx',
            height: '9rpx',
            backgroundColor: lineColor,
            borderRadius: '999rpx'
          }}
        />
        <View
          style={{
            position: 'absolute',
            left: '10rpx',
            bottom: '2rpx',
            width: '20rpx',
            height: '3rpx',
            backgroundColor: lineColor,
            borderRadius: '999rpx'
          }}
        />
        <View
          style={{
            position: 'absolute',
            left: '14rpx',
            bottom: '6rpx',
            width: '12rpx',
            height: '5rpx',
            borderWidth: lineWidth,
            borderStyle: 'solid',
            borderColor: lineColor,
            borderBottomWidth: '0',
            borderRadius: '6rpx 6rpx 0 0',
            boxSizing: 'border-box'
          }}
        />
      </View>
    </View>
  );
}

function AdvantageIcon(props) {
  const color = '#5b4dff';
  const lineWidth = '2.5rpx';

  if (props.type === 'team') {
    return (
      <View style={{ position: 'relative', width: '38rpx', height: '30rpx' }}>
        <View
          style={{
            position: 'absolute',
            left: '2rpx',
            top: '1rpx',
            width: '9rpx',
            height: '9rpx',
            borderRadius: '999rpx',
            borderWidth: lineWidth,
            borderStyle: 'solid',
            borderColor: color
          }}
        />
        <View
          style={{
            position: 'absolute',
            right: '2rpx',
            top: '1rpx',
            width: '9rpx',
            height: '9rpx',
            borderRadius: '999rpx',
            borderWidth: lineWidth,
            borderStyle: 'solid',
            borderColor: color
          }}
        />
        <View
          style={{
            position: 'absolute',
            left: '13rpx',
            top: '0',
            width: '10rpx',
            height: '10rpx',
            borderRadius: '999rpx',
            borderWidth: lineWidth,
            borderStyle: 'solid',
            borderColor: color
          }}
        />
        <View
          style={{
            position: 'absolute',
            left: '0',
            top: '15rpx',
            width: '14rpx',
            height: '9rpx',
            borderWidth: lineWidth,
            borderStyle: 'solid',
            borderColor: color,
            borderTopWidth: '0',
            borderRadius: '0 0 999rpx 999rpx'
          }}
        />
        <View
          style={{
            position: 'absolute',
            right: '0',
            top: '15rpx',
            width: '14rpx',
            height: '9rpx',
            borderWidth: lineWidth,
            borderStyle: 'solid',
            borderColor: color,
            borderTopWidth: '0',
            borderRadius: '0 0 999rpx 999rpx'
          }}
        />
        <View
          style={{
            position: 'absolute',
            left: '10rpx',
            top: '16rpx',
            width: '18rpx',
            height: '10rpx',
            borderWidth: lineWidth,
            borderStyle: 'solid',
            borderColor: color,
            borderTopWidth: '0',
            borderRadius: '0 0 999rpx 999rpx'
          }}
        />
      </View>
    );
  }

  if (props.type === 'building') {
    return (
      <View style={{ position: 'relative', width: '32rpx', height: '34rpx' }}>
        <View
          style={{
            width: '24rpx',
            height: '28rpx',
            borderWidth: lineWidth,
            borderStyle: 'solid',
            borderColor: color,
            borderRadius: '5rpx',
            position: 'absolute',
            right: '0',
            bottom: '0',
            boxSizing: 'border-box'
          }}
        >
          <View
            style={{
              position: 'absolute',
              left: '4rpx',
              top: '5rpx',
              width: '3rpx',
              height: '3rpx',
              borderRadius: '999rpx',
              backgroundColor: color,
              boxShadow: '7rpx 0 0 ' + color + ', 0 7rpx 0 ' + color + ', 7rpx 7rpx 0 ' + color
            }}
          />
        </View>
        <View
          style={{
            position: 'absolute',
            left: '0',
            bottom: '0',
            width: '11rpx',
            height: '16rpx',
            borderWidth: lineWidth,
            borderStyle: 'solid',
            borderColor: color,
            borderRadius: '5rpx 5rpx 0 0',
            borderBottomWidth: '0',
            boxSizing: 'border-box'
          }}
        />
      </View>
    );
  }

  if (props.type === 'book') {
    return (
      <View style={{ position: 'relative', width: '34rpx', height: '28rpx' }}>
        <View
          style={{
            position: 'absolute',
            left: '0',
            top: '2rpx',
            width: '15rpx',
            height: '22rpx',
            borderWidth: lineWidth,
            borderStyle: 'solid',
            borderColor: color,
            borderRightWidth: '1rpx',
            borderRadius: '5rpx 0 0 5rpx',
            boxSizing: 'border-box'
          }}
        />
        <View
          style={{
            position: 'absolute',
            right: '0',
            top: '2rpx',
            width: '15rpx',
            height: '22rpx',
            borderWidth: lineWidth,
            borderStyle: 'solid',
            borderColor: color,
            borderLeftWidth: '1rpx',
            borderRadius: '0 5rpx 5rpx 0',
            boxSizing: 'border-box'
          }}
        />
        <View
          style={{
            position: 'absolute',
            left: '16rpx',
            top: '5rpx',
            width: '2rpx',
            height: '17rpx',
            backgroundColor: color,
            borderRadius: '999rpx'
          }}
        />
      </View>
    );
  }

  return (
    <View style={{ position: 'relative', width: '30rpx', height: '34rpx' }}>
      <View
        style={{
          position: 'absolute',
          left: '5rpx',
          top: '3rpx',
          width: '20rpx',
          height: '22rpx',
          borderWidth: lineWidth,
          borderStyle: 'solid',
          borderColor: color,
          borderRadius: '7rpx 7rpx 9rpx 9rpx',
          boxSizing: 'border-box'
        }}
      />
      <View
        style={{
          position: 'absolute',
          left: '12rpx',
          top: '11rpx',
          width: '6rpx',
          height: '5rpx',
          borderLeftWidth: lineWidth,
          borderBottomWidth: lineWidth,
          borderStyle: 'solid',
          borderColor: color,
          transform: 'rotate(-45deg)'
        }}
      />
      <View
        style={{
          position: 'absolute',
          left: '12rpx',
          bottom: '0',
          width: '6rpx',
          height: '8rpx',
          borderLeftWidth: lineWidth,
          borderRightWidth: lineWidth,
          borderBottomWidth: lineWidth,
          borderStyle: 'solid',
          borderColor: color,
          borderRadius: '0 0 4rpx 4rpx',
          boxSizing: 'border-box'
        }}
      />
    </View>
  );
}

function DirectionIcon(props) {
  if (props.type === 'medical') {
    return (
      <View
        style={{
          position: 'relative',
          width: '28rpx',
          height: '24rpx'
        }}
      >
        <View
          style={{
            position: 'absolute',
            left: '0',
            top: '12rpx',
            width: '7rpx',
            height: '3rpx',
            borderRadius: '999rpx',
            backgroundColor: props.color
          }}
        />
        <View
          style={{
            position: 'absolute',
            left: '6rpx',
            top: '6rpx',
            width: '4rpx',
            height: '10rpx',
            borderTopWidth: '3rpx',
            borderRightWidth: '3rpx',
            borderStyle: 'solid',
            borderColor: props.color,
            transform: 'rotate(24deg)'
          }}
        />
        <View
          style={{
            position: 'absolute',
            left: '11rpx',
            top: '12rpx',
            width: '5rpx',
            height: '3rpx',
            borderRadius: '999rpx',
            backgroundColor: props.color
          }}
        />
        <View
          style={{
            position: 'absolute',
            left: '15rpx',
            top: '6rpx',
            width: '4rpx',
            height: '10rpx',
            borderTopWidth: '3rpx',
            borderRightWidth: '3rpx',
            borderStyle: 'solid',
            borderColor: props.color,
            transform: 'rotate(-24deg)'
          }}
        />
        <View
          style={{
            position: 'absolute',
            right: '0',
            top: '12rpx',
            width: '7rpx',
            height: '3rpx',
            borderRadius: '999rpx',
            backgroundColor: props.color
          }}
        />
      </View>
    );
  }

  return (
    <View
      style={{
        position: 'relative',
        width: '24rpx',
        height: '28rpx',
        borderWidth: '3rpx',
        borderStyle: 'solid',
        borderColor: props.color,
        borderRadius: '5rpx',
        boxSizing: 'border-box'
      }}
    >
      <View
        style={{
          position: 'absolute',
          left: '4rpx',
          top: '4rpx',
          width: '3rpx',
          height: '3rpx',
          borderRadius: '1rpx',
          backgroundColor: props.color,
          boxShadow:
            '6rpx 0 0 ' +
            props.color +
            ', 12rpx 0 0 ' +
            props.color +
            ', 0 6rpx 0 ' +
            props.color +
            ', 6rpx 6rpx 0 ' +
            props.color +
            ', 12rpx 6rpx 0 ' +
            props.color +
            ', 0 12rpx 0 ' +
            props.color +
            ', 6rpx 12rpx 0 ' +
            props.color +
            ', 12rpx 12rpx 0 ' +
            props.color
        }}
      />
    </View>
  );
}

export default function HomePage() {
  const [content, setContent] = useState(getInitialHomeState());
  const [loadState, setLoadState] = useState({ source: 'fallback', error: '' });

  const loadContent = useCallback(() => {
    let mounted = true;

    getPublicContent('home')
      .then((payload) => {
        if (!mounted || !payload) return;
        setContent({
          site: payload.site || fallbackContent.site,
          page: payload.page || defaultHomePage,
          directions: (payload.directions && payload.directions.length ? payload.directions : defaultDirections)
        });
        setLoadState({
          source: payload.__meta?.source || 'cloud',
          error: ''
        });
      })
      .catch((error) => {
        if (!mounted) return;
        setLoadState({
          source: 'error',
          error: error && error.message ? error.message : '云端内容读取失败'
        });
      });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const cleanup = loadContent();
    return cleanup;
  }, []);

  useDidShow(() => {
    loadContent();
  });

  const hero = content.page?.hero || defaultHomePage.hero;
  const stats = content.page?.overviewStats || defaultHomePage.overviewStats;
  const quickLinks = content.page?.quickLinks || defaultHomePage.quickLinks;
  const advantages = content.page?.advantages || defaultHomePage.advantages;
  const directions = useMemo(() => mapHomeDirections(content.page || defaultHomePage, content.directions || defaultDirections), [content]);
  const environmentCards = content.page?.environmentSection?.cards || defaultHomePage.environmentSection.cards;
  const bottomEnvironmentCard = environmentCards[2] || environmentCards[0];
  const moreDirectionCard = content.page?.moreDirectionCard || defaultHomePage.moreDirectionCard;
  const cta = content.page?.cta || defaultHomePage.cta;

  return (
    <View style={pageStyle}>
      {loadState.error ? (
        <View
          style={{
            margin: '18rpx 24rpx 0',
            padding: '16rpx 18rpx',
            borderRadius: '18rpx',
            backgroundColor: '#fff7ed',
            border: '1rpx solid #fdba74'
          }}
        >
          <Text style={{ fontSize: ui.type.meta, color: '#9a3412', fontWeight: 700 }}>
            云端内容未加载成功：{loadState.error}
          </Text>
        </View>
      ) : null}

      <View
        style={{
          position: 'relative',
          overflow: 'hidden',
          borderBottomLeftRadius: '64rpx',
          borderBottomRightRadius: '64rpx',
          padding: `24rpx ${ui.spacing.page} 132rpx`,
          background: 'linear-gradient(180deg, #33415f 0%, #1c2946 48%, #0b1530 100%)'
        }}
      >
        <Image
          src={`https://picsum.photos/seed/${hero.backgroundImageSeed || 'university'}/900/700`}
          mode="aspectFill"
          style={{
            position: 'absolute',
            right: '-52rpx',
            bottom: '-14rpx',
            width: '456rpx',
            height: '584rpx',
            opacity: 0.16
          }}
        />
        <View
          style={{
            position: 'absolute',
            left: '-130rpx',
            top: '-94rpx',
            width: '360rpx',
            height: '360rpx',
            borderRadius: '999rpx',
            backgroundColor: 'rgba(116,128,255,0.18)'
          }}
        />
        <View
          style={{
            position: 'absolute',
            right: '-26rpx',
            top: '136rpx',
            width: '232rpx',
            height: '232rpx',
            borderRadius: '999rpx',
            backgroundColor: 'rgba(59,130,246,0.08)'
          }}
        />
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: '180rpx',
            background: 'linear-gradient(180deg, rgba(8,15,32,0) 0%, rgba(8,15,32,0.46) 100%)'
          }}
        />

        <View style={{ position: 'relative', zIndex: 2, padding: '22rpx 10rpx 0' }}>
          <View
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '8rpx 16rpx',
              borderRadius: '999rpx',
              backgroundColor: 'rgba(255,255,255,0.11)',
              border: '1rpx solid rgba(255,255,255,0.2)',
              marginBottom: '30rpx'
            }}
          >
            <View
              style={{
                width: '12rpx',
                height: '12rpx',
                borderRadius: '999rpx',
                borderWidth: '2rpx',
                borderStyle: 'solid',
                borderColor: '#c7d2fe',
                marginRight: '10rpx'
              }}
            />
            <Text style={{ fontSize: ui.type.chip, color: '#e2e8f0', fontWeight: 600 }}>{hero.chip}</Text>
          </View>

          <View
            style={{
              position: 'absolute',
              right: '10rpx',
              top: '24rpx',
              padding: '8rpx 14rpx',
              borderRadius: '999rpx',
              backgroundColor: 'rgba(255,255,255,0.1)',
              border: '1rpx solid rgba(255,255,255,0.14)'
            }}
          >
            <Text style={{ fontSize: ui.type.note, color: '#d7def0', fontWeight: 700 }}>
              {loadState.source === 'cloud' ? '云端内容' : '本地内容'}
            </Text>
          </View>

          <View style={{ marginBottom: '18rpx' }}>
            <Text
              style={{
                display: 'block',
                fontSize: '50rpx',
                lineHeight: 1.14,
                color: '#ffffff',
                fontWeight: 900,
                letterSpacing: '-1rpx'
              }}
            >
              {hero.title}
            </Text>
            <Text
              style={{
                display: 'block',
                fontSize: '46rpx',
                lineHeight: 1.16,
                color: '#8b90ff',
                fontWeight: 900,
                letterSpacing: '-1rpx',
                marginTop: '4rpx'
              }}
            >
              {hero.highlightTitle}
            </Text>
          </View>

          <Text
            style={{
              display: 'block',
              width: '500rpx',
              maxWidth: '100%',
              fontSize: ui.type.meta,
              lineHeight: 1.8,
              color: '#d8e1f2',
              marginBottom: '24rpx'
            }}
          >
            {hero.desc}
          </Text>

          <View style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', marginBottom: '18rpx' }}>
            <Navigator
              url={hero.primaryButton?.url || '/pages/about/index'}
              openType={hero.primaryButton?.openType || 'navigate'}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '214rpx',
                height: '78rpx',
                padding: '0 26rpx',
                borderRadius: '24rpx',
                background: 'linear-gradient(90deg, #5b4dff 0%, #4f46e5 100%)',
                boxShadow: '0 14rpx 28rpx rgba(79,70,229,0.26)',
                boxSizing: 'border-box'
              }}
            >
              <Text style={{ fontSize: ui.type.body, color: '#ffffff', fontWeight: 800 }}>
                {hero.primaryButton?.text || '了解机构实力'}
              </Text>
            </Navigator>
            <Text
              style={{
                marginLeft: '18rpx',
                fontSize: ui.type.note,
                color: '#cbd5e1',
                marginTop: '8rpx'
              }}
            >
              {hero.secondaryNote || '集训管理 · 跟踪答疑'}
            </Text>
          </View>

          <View style={{ display: 'flex', flexWrap: 'wrap' }}>
            {(hero.tags || []).map((item, index) => (
              <View
                key={item}
                style={{
                  marginRight: index === 2 ? '0' : '12rpx',
                  marginBottom: '10rpx',
                  padding: '9rpx 14rpx',
                  borderRadius: '999rpx',
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  border: '1rpx solid rgba(255,255,255,0.12)'
                }}
              >
                <Text style={{ fontSize: ui.type.note, color: '#d7def0', fontWeight: 600 }}>{item}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      <View style={{ margin: '-60rpx 24rpx 0', position: 'relative', zIndex: 3 }}>
        <View
          style={{
            ...surfaceCardStyle,
            borderRadius: '36rpx',
            padding: '20rpx 18rpx',
            boxShadow: '0 12rpx 24rpx rgba(148,163,184,0.10)'
          }}
        >
          <Text
            style={{
              display: 'block',
              fontSize: ui.type.note,
              color: ui.colors.textSoft,
              fontWeight: 700,
              letterSpacing: '1rpx',
              textAlign: 'center',
              marginBottom: '12rpx'
            }}
          >
            机构概览
          </Text>
          <View style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'space-between' }}>
            {stats.map((item, index) => (
              <View
                key={item.value}
                style={{
                  flex: 1,
                  padding: '0 10rpx',
                  borderRight: index === stats.length - 1 ? 'none' : '1rpx solid #e2e8f0',
                  boxSizing: 'border-box'
                }}
              >
                <Text
                  style={{
                    display: 'block',
                    textAlign: 'center',
                    fontSize: ui.type.note,
                    color: ui.colors.textMuted,
                    fontWeight: 700,
                    marginBottom: '6rpx'
                  }}
                >
                  {item.label}
                </Text>
                <Text
                  style={{
                    display: 'block',
                    textAlign: 'center',
                    fontSize: '38rpx',
                    color: ui.colors.text,
                    fontWeight: 900,
                    lineHeight: 1.1
                  }}
                >
                  {item.value}
                </Text>
                <Text
                  style={{
                    display: 'block',
                    textAlign: 'center',
                    fontSize: ui.type.note,
                    color: ui.colors.textMuted,
                    marginTop: '6rpx'
                  }}
                >
                  {item.note}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      <View style={{ margin: '34rpx 24rpx 0', display: 'flex', justifyContent: 'space-between' }}>
        {quickLinks.map((item) => (
          <Navigator
            key={item.url}
            url={item.url}
            openType={item.openType || 'switchTab'}
            style={{
              width: '23%',
              display: 'block',
              textAlign: 'center'
            }}
          >
            <View
              style={{
                background: item.cardBackground,
                borderRadius: '30rpx',
                padding: '20rpx 10rpx 18rpx',
                boxShadow: '0 10rpx 18rpx rgba(148,163,184,0.07)',
                border: '1rpx solid rgba(226,232,240,0.85)'
              }}
            >
              <QuickIcon type={item.icon} color={item.accent} background={item.background} />
              <Text
                style={{
                  display: 'block',
                  fontSize: ui.type.body,
                  color: item.accent,
                  fontWeight: 700,
                  marginBottom: '6rpx'
                }}
              >
                {item.label}
              </Text>
              <Text
                style={{
                  display: 'block',
                  fontSize: ui.type.note,
                  color: '#64748b',
                  lineHeight: 1.45,
                  padding: '0 4rpx'
                }}
              >
                {item.desc}
              </Text>
            </View>
          </Navigator>
        ))}
      </View>

      <View style={{ margin: '44rpx 24rpx 0' }}>
        <PageSectionTitle lineColor="#8a92ff">四大学习优势</PageSectionTitle>
        <View style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {advantages.map((item) => (
            <View
              key={item.title}
              style={{
                width: '48.2%',
                marginBottom: '16rpx',
                padding: '24rpx 22rpx 22rpx',
                borderRadius: '32rpx',
                background: 'linear-gradient(180deg, #ffffff 0%, #fbfcff 100%)',
                boxShadow: '0 10rpx 18rpx rgba(148,163,184,0.07)',
                border: '1rpx solid rgba(226,232,240,0.75)',
                boxSizing: 'border-box'
              }}
            >
              <View
                style={{
                  width: '42rpx',
                  height: '42rpx',
                  borderRadius: '14rpx',
                  backgroundColor: '#f6f7ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '18rpx'
                }}
              >
                <AdvantageIcon type={item.icon} />
              </View>
              <Text
                style={{
                  display: 'block',
                  fontSize: ui.type.subtitle,
                  color: ui.colors.text,
                  fontWeight: 800,
                  marginBottom: '8rpx'
                }}
              >
                {item.title}
              </Text>
              <Text
                style={{
                  display: 'block',
                  fontSize: ui.type.meta,
                  lineHeight: 1.7,
                  color: ui.colors.textMuted
                }}
              >
                {item.desc}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={{ margin: '44rpx 24rpx 0' }}>
        <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24rpx' }}>
          <PageSectionTitle marginBottom="0" lineColor="#8a92ff">沉浸式学习环境</PageSectionTitle>
          <Navigator url="/pages/about/index" openType="navigate">
            <Text style={{ fontSize: ui.type.body, color: ui.colors.textMuted, marginTop: '-18rpx' }}>查看更多</Text>
          </Navigator>
        </View>

        <View
          style={{
            ...surfaceCardStyle,
            padding: '16rpx',
            borderRadius: '34rpx'
          }}
        >
          <Text
            style={{
              display: 'block',
              fontSize: ui.type.note,
              color: ui.colors.textMuted,
              marginBottom: '12rpx'
            }}
          >
            学习与生活空间
          </Text>
          <View style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10rpx' }}>
            {environmentCards.slice(0, 2).map((item) => (
              <View
                key={item.label}
                style={{
                  width: '48.5%',
                  height: '238rpx',
                  borderRadius: '26rpx',
                  overflow: 'hidden',
                  position: 'relative'
                }}
              >
                <Image
                  src={`https://picsum.photos/seed/${item.imageSeed || item.seed}/400/320`}
                  mode="aspectFill"
                  style={{ width: '100%', height: '100%' }}
                />
                <View
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    padding: '18rpx 22rpx',
                    background: 'linear-gradient(180deg, rgba(15,23,42,0) 0%, rgba(15,23,42,0.82) 100%)'
                  }}
                >
                  <Text style={{ color: '#ffffff', fontSize: ui.type.body, fontWeight: 700 }}>{item.label}</Text>
                </View>
              </View>
            ))}
          </View>

          <View
            style={{
              height: '238rpx',
              borderRadius: '26rpx',
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            <Image
              src={`https://picsum.photos/seed/${bottomEnvironmentCard.imageSeed || bottomEnvironmentCard.seed}/700/400`}
              mode="aspectFill"
              style={{ width: '100%', height: '100%' }}
            />
            <View
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                padding: '18rpx 22rpx',
                background: 'linear-gradient(180deg, rgba(15,23,42,0) 0%, rgba(15,23,42,0.82) 100%)'
              }}
            >
              <Text style={{ color: '#ffffff', fontSize: ui.type.body, fontWeight: 700 }}>
                {bottomEnvironmentCard.label}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={{ margin: '40rpx 20rpx 0' }}>
        <PageSectionTitle lineColor="#5b4dff">核心专业方向</PageSectionTitle>
        <View style={{ marginBottom: '18rpx', padding: '0 6rpx' }}>
          <Text
            style={{
              display: 'block',
              fontSize: ui.type.meta,
              lineHeight: 1.7,
              color: ui.colors.textMuted
            }}
          >
            {content.page?.directionsIntro || defaultHomePage.directionsIntro}
          </Text>
        </View>
        {directions.map((item, index) => (
          <Navigator
            key={item.title}
            url="/pages/courses/index"
            openType="switchTab"
            style={{ display: 'block', marginBottom: index === directions.length - 1 ? '0' : '24rpx' }}
          >
            <View
              style={{
                background: index === 0 ? 'linear-gradient(180deg, #ffffff 0%, #fbfcff 100%)' : '#ffffff',
                borderRadius: '40rpx',
                padding: index === 0 ? '36rpx 34rpx 32rpx' : '34rpx 32rpx 30rpx',
                minHeight: '286rpx',
                boxShadow: index === 0 ? '0 18rpx 34rpx rgba(102,116,255,0.14)' : '0 12rpx 22rpx rgba(148,163,184,0.10)',
                border: '1rpx solid rgba(226,232,240,0.92)',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {index === 0 ? (
                <View
                  style={{
                    position: 'absolute',
                    right: '-28rpx',
                    top: '-24rpx',
                    width: '170rpx',
                    height: '170rpx',
                    borderRadius: '999rpx',
                    backgroundColor: 'rgba(91,77,255,0.08)'
                  }}
                />
              ) : null}
              <View>
                <View
                  style={{
                    backgroundColor: item.headerBackground,
                    borderRadius: '24rpx',
                    padding: '18rpx 18rpx',
                    marginBottom: '26rpx',
                    position: 'relative',
                    zIndex: 2
                  }}
                >
                  <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ display: 'flex', alignItems: 'center', flex: 1, paddingRight: '20rpx' }}>
                      <View style={{ marginRight: '18rpx', flexShrink: 0 }}>
                        <DirectionIcon type={item.iconType} color={item.iconColor} />
                      </View>
                      <Text style={{ fontSize: '34rpx', color: '#0f172a', fontWeight: 800 }}>{item.title}</Text>
                    </View>
                    <Text
                      style={{
                        fontSize: ui.type.note,
                        color: item.tagColor,
                        backgroundColor: item.tagBackground,
                        padding: '8rpx 16rpx',
                        borderRadius: '999rpx',
                        fontWeight: 700,
                        flexShrink: 0
                      }}
                    >
                      {item.tag}
                    </Text>
                  </View>
                </View>
                <Text
                  style={{
                    display: 'block',
                    fontSize: ui.type.meta,
                    width: '88%',
                    lineHeight: 1.72,
                    color: ui.colors.textMuted,
                    position: 'relative',
                    zIndex: 2
                  }}
                >
                  {item.desc}
                </Text>
              </View>
              <View
                style={{
                  marginTop: '22rpx',
                  paddingTop: '18rpx',
                  borderTop: '1rpx solid rgba(226,232,240,0.7)',
                  position: 'relative',
                  zIndex: 2
                }}
              >
                <Text style={{ fontSize: ui.type.meta, color: index === 0 ? '#4f46e5' : ui.colors.textSubtle, fontWeight: 700 }}>
                  查看方向详情 ›
                </Text>
              </View>
            </View>
          </Navigator>
        ))}

        <View
          style={{
            marginTop: '20rpx',
            background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)',
            borderRadius: '40rpx',
            padding: '30rpx 30rpx 28rpx',
            minHeight: '220rpx',
            border: '1rpx solid rgba(226,232,240,0.95)',
            boxSizing: 'border-box'
          }}
        >
          <View
            style={{
              backgroundColor: '#eef2f7',
              borderRadius: '24rpx',
              padding: '14rpx 16rpx',
              marginBottom: '18rpx',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <View style={{ display: 'flex', alignItems: 'center', flex: 1, paddingRight: '18rpx' }}>
              <View
                style={{
                  width: '28rpx',
                  height: '28rpx',
                  borderWidth: '3rpx',
                  borderStyle: 'solid',
                  borderColor: '#94a3b8',
                  borderRadius: '6rpx',
                  marginRight: '18rpx',
                  boxSizing: 'border-box'
                }}
              />
              <Text style={{ fontSize: '30rpx', color: '#94a3b8', fontWeight: 800 }}>{moreDirectionCard.title}</Text>
            </View>
            <Text
              style={{
                fontSize: ui.type.note,
                color: '#64748b',
                backgroundColor: '#e2e8f0',
                padding: '8rpx 14rpx',
                borderRadius: '999rpx',
                fontWeight: 700
              }}
            >
              {moreDirectionCard.tag}
            </Text>
          </View>
          <Text
            style={{
              display: 'block',
              width: '88%',
              fontSize: ui.type.meta,
              lineHeight: 1.7,
              color: '#94a3b8'
            }}
          >
            {moreDirectionCard.desc}
          </Text>
        </View>
      </View>

      <PageCtaCard
        title={cta.title}
        desc={cta.desc}
        buttonText={cta.buttonText}
        footnote={cta.footnote}
        margin="38rpx 24rpx 0"
        background="linear-gradient(135deg, #162445 0%, #101a36 100%)"
      />

      <Navigator
        url="/pages/about/index"
        openType="navigate"
        style={{
          position: 'fixed',
          right: '26rpx',
          bottom: '182rpx',
          width: '88rpx',
          height: '88rpx',
          borderRadius: '999rpx',
          background: 'linear-gradient(180deg, #ff8a1f 0%, #ff6a00 100%)',
          boxShadow: '0 12rpx 24rpx rgba(255,106,0,0.28)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 20
        }}
      >
        <View
          style={{
            position: 'absolute',
            width: '104rpx',
            height: '104rpx',
            borderRadius: '999rpx',
            border: '1rpx solid rgba(255,186,120,0.24)'
          }}
        />
        <View
          style={{
            width: '40rpx',
            height: '40rpx',
            borderRadius: '999rpx',
            borderWidth: '4rpx',
            borderStyle: 'solid',
            borderColor: '#ffffff',
            position: 'relative',
            boxSizing: 'border-box'
          }}
        >
          <View
            style={{
              position: 'absolute',
              right: '-4rpx',
              bottom: '-7rpx',
              width: '12rpx',
              height: '12rpx',
              borderBottom: '4rpx solid #ffffff',
              borderRight: '4rpx solid #ffffff',
              transform: 'rotate(42deg)'
            }}
          />
        </View>
      </Navigator>
    </View>
  );
}
