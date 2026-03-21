import { Image, Text, View } from '@tarojs/components';
import { useCallback, useEffect, useMemo, useState } from 'react';
import PageCtaCard from '../../components/PageCtaCard';
import PageSectionTitle from '../../components/PageSectionTitle';
import fallbackContent from '../../data/contentFallback';
import { useCmsAutoRefresh } from '../../hooks/useCmsAutoRefresh';
import { getPublicContent } from '../../services/content';
import { elevatedSurfaceCardStyle, pageStyle, surfaceCardStyle, ui } from '../../styles/ui';
import { resolveMediaUrl } from '../../utils/media';

const defaultTeachersPage = fallbackContent.pages.teachers;
const defaultTeachers = fallbackContent.teachers;

function getInitialTeachersState() {
  return {
    site: fallbackContent.site,
    page: defaultTeachersPage,
    teachers: defaultTeachers
  };
}

function buildTeacherBadges(teacher, features) {
  return [
    teacher?.tag,
    ...(teacher?.specialties || []),
    ...(features || []).map((item) => item.title)
  ]
    .filter(Boolean)
    .slice(0, 4);
}

function HeroMetric(props) {
  return (
    <View
      style={{
        flex: 1,
        minWidth: 0,
        borderRadius: ui.radius.sm,
        padding: '22rpx 18rpx',
        background: 'rgba(255,255,255,0.68)',
        border: '1rpx solid rgba(255,255,255,0.72)',
        boxShadow: '0 18rpx 36rpx rgba(125,146,183,0.12)',
        boxSizing: 'border-box'
      }}
    >
      <Text
        style={{
          display: 'block',
          fontSize: ui.type.note,
          color: '#61708b',
          fontWeight: 700,
          marginBottom: '10rpx'
        }}
      >
        {props.label}
      </Text>
      <Text
        style={{
          display: 'block',
          fontSize: ui.type.subtitle,
          color: ui.colors.text,
          fontWeight: 900,
          lineHeight: 1.28
        }}
      >
        {props.value}
      </Text>
    </View>
  );
}

function SupportTag(props) {
  return (
    <View
      style={{
        marginRight: '12rpx',
        marginBottom: '12rpx',
        padding: '10rpx 18rpx',
        borderRadius: ui.radius.pill,
        backgroundColor: '#f5f7fb',
        border: '1rpx solid rgba(203,213,225,0.72)'
      }}
    >
      <Text style={{ fontSize: ui.type.note, color: '#43526a', fontWeight: 700 }}>{props.children}</Text>
    </View>
  );
}

function TeacherSpotlightCard(props) {
  return (
    <View
      style={{
        ...surfaceCardStyle,
        borderRadius: '34rpx',
        padding: '28rpx 24rpx',
        boxSizing: 'border-box',
        marginBottom: props.isLast ? '0' : '18rpx',
        boxShadow: '0 20rpx 34rpx rgba(148,163,184,0.12)'
      }}
    >
      <View style={{ display: 'flex', alignItems: 'flex-start' }}>
        <Image
          src={resolveMediaUrl({
            url: props.avatarUrl,
            seed: props.avatarSeed || props._id || props.name,
            fallbackSize: '240/240'
          })}
          mode="aspectFill"
          style={{
            width: '108rpx',
            height: '108rpx',
            borderRadius: ui.radius.pill,
            marginRight: '20rpx',
            flexShrink: 0,
            boxShadow: '0 12rpx 24rpx rgba(148,163,184,0.18)'
          }}
        />
        <View style={{ flex: 1, minWidth: 0 }}>
          <View style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', marginBottom: '10rpx' }}>
            <Text style={{ fontSize: ui.type.cardTitle, color: ui.colors.text, fontWeight: 800, marginRight: '14rpx' }}>{props.name}</Text>
            {props.tag ? (
              <View
                style={{
                  display: 'inline-flex',
                  padding: '8rpx 14rpx',
                  borderRadius: ui.radius.pill,
                  backgroundColor: '#edf4ff'
                }}
              >
                <Text style={{ fontSize: ui.type.note, color: '#3564a8', fontWeight: 700 }}>{props.tag}</Text>
              </View>
            ) : null}
          </View>
          <Text style={{ display: 'block', fontSize: ui.type.meta, color: '#57657d', marginBottom: '14rpx' }}>{props.role}</Text>
          {props.intro ? (
            <Text style={{ display: 'block', fontSize: ui.type.note, lineHeight: 1.72, color: ui.colors.textMuted, marginBottom: '16rpx' }}>
              {props.intro}
            </Text>
          ) : null}
          <View style={{ display: 'flex', flexWrap: 'wrap' }}>
            {(props.specialties || []).slice(0, 4).map((item) => (
              <SupportTag key={`${props.name}-${item}`}>{item}</SupportTag>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}

export default function TeachersPage() {
  const [content, setContent] = useState(getInitialTeachersState());
  const [, setLoadState] = useState({ source: 'fallback', error: '', updatedAt: '', revision: '' });

  const loadContent = useCallback(() => {
    let mounted = true;

    getPublicContent('teachers')
      .then((payload) => {
        if (!mounted || !payload) return;
        setContent({
          site: payload.site || fallbackContent.site,
          page: payload.page || defaultTeachersPage,
          teachers: payload.teachers && payload.teachers.length ? payload.teachers : defaultTeachers
        });
        setLoadState({
          source: payload.__meta?.source || 'cloud',
          error: '',
          updatedAt: payload.__meta?.updatedAt || '',
          revision: payload.__meta?.revision || ''
        });
      })
      .catch((error) => {
        if (!mounted) return;
        setLoadState({
          source: 'error',
          error: error && error.message ? error.message : '云端内容读取失败',
          updatedAt: '',
          revision: ''
        });
      });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const cleanup = loadContent();
    return cleanup;
  }, [loadContent]);

  useCmsAutoRefresh(loadContent);

  const hero = content.page?.hero || defaultTeachersPage.hero;
  const introCard = content.page?.introCard || defaultTeachersPage.introCard;
  const features = content.page?.features || defaultTeachersPage.features;
  const teachers = content.teachers || defaultTeachers;
  const cta = content.page?.cta || defaultTeachersPage.cta;
  const featuredTeacher = teachers[0];
  const supportTeachers = teachers.slice(1);
  const heroBadges = useMemo(() => buildTeacherBadges(featuredTeacher, features), [featuredTeacher, features]);

  return (
    <View
      style={{
        ...pageStyle,
        background: 'linear-gradient(180deg, #f4f6fb 0%, #edf4ff 34%, #f8fafc 100%)'
      }}
    >
      <View
        style={{
          position: 'relative',
          overflow: 'hidden',
          borderBottomLeftRadius: ui.radius.hero,
          borderBottomRightRadius: ui.radius.hero,
          padding: `32rpx ${ui.spacing.page} 92rpx`,
          background: 'linear-gradient(180deg, #eef5ff 0%, #eaf1ff 42%, #f7f9fd 100%)'
        }}
      >
        <View
          style={{
            position: 'absolute',
            right: '-56rpx',
            top: '-34rpx',
            width: '260rpx',
            height: '260rpx',
            borderRadius: ui.radius.pill,
            background: 'rgba(166,196,255,0.28)'
          }}
        />
        <View
          style={{
            position: 'absolute',
            left: '-84rpx',
            bottom: '-96rpx',
            width: '280rpx',
            height: '280rpx',
            borderRadius: ui.radius.pill,
            background: 'rgba(255,255,255,0.58)'
          }}
        />

        <View style={{ position: 'relative', zIndex: 2 }}>
          <View
            style={{
              display: 'inline-flex',
              padding: '10rpx 18rpx',
              borderRadius: ui.radius.pill,
              backgroundColor: 'rgba(255,255,255,0.72)',
              border: '1rpx solid rgba(255,255,255,0.82)',
              marginBottom: '24rpx'
            }}
          >
            <Text style={{ fontSize: ui.type.note, color: '#54719b', fontWeight: 700 }}>{hero.chip}</Text>
          </View>

          <Text
            style={{
              display: 'block',
              fontSize: ui.type.hero,
              lineHeight: 1.14,
              color: ui.colors.text,
              fontWeight: 900,
              marginBottom: '14rpx'
            }}
          >
            {hero.title}
          </Text>
          <Text
            style={{
              display: 'block',
              fontSize: ui.type.body,
              lineHeight: 1.78,
              color: '#5f6d84',
              width: '560rpx',
              maxWidth: '100%',
              marginBottom: '26rpx'
            }}
          >
            {hero.desc}
          </Text>

          <View style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '28rpx' }}>
            {heroBadges.map((item) => (
              <SupportTag key={item}>{item}</SupportTag>
            ))}
          </View>

          <View
            style={{
              ...elevatedSurfaceCardStyle,
              padding: '34rpx 28rpx 30rpx',
              boxShadow: '0 28rpx 48rpx rgba(163,177,204,0.16)'
            }}
          >
            <Text
              style={{
                display: 'block',
                textAlign: 'center',
                fontSize: ui.type.note,
                color: '#7690b1',
                fontWeight: 700,
                marginBottom: '18rpx'
              }}
            >
              代表老师
            </Text>
            <View style={{ display: 'flex', justifyContent: 'center', marginBottom: '20rpx' }}>
              <Image
                src={resolveMediaUrl({
                  url: featuredTeacher?.avatarUrl,
                  seed: featuredTeacher?.avatarSeed || featuredTeacher?._id || featuredTeacher?.name,
                  fallbackSize: '360/360'
                })}
                mode="aspectFill"
                style={{
                  width: '208rpx',
                  height: '208rpx',
                  borderRadius: ui.radius.pill,
                  boxShadow: '0 22rpx 38rpx rgba(151,170,196,0.22)'
                }}
              />
            </View>
            <Text
              style={{
                display: 'block',
                textAlign: 'center',
                fontSize: ui.type.section,
                color: ui.colors.text,
                fontWeight: 900,
                marginBottom: '10rpx'
              }}
            >
              {featuredTeacher?.name || '老师团队'}
            </Text>
            <Text
              style={{
                display: 'block',
                textAlign: 'center',
                fontSize: ui.type.body,
                color: '#55657d',
                marginBottom: featuredTeacher?.tag ? '14rpx' : '0'
              }}
            >
              {featuredTeacher?.role || '方向主讲'}
            </Text>
            {featuredTeacher?.tag ? (
              <View style={{ display: 'flex', justifyContent: 'center' }}>
                <View
                  style={{
                    display: 'inline-flex',
                    padding: '10rpx 18rpx',
                    borderRadius: ui.radius.pill,
                    backgroundColor: '#edf4ff'
                  }}
                >
                  <Text style={{ fontSize: ui.type.note, color: '#416aab', fontWeight: 700 }}>{featuredTeacher.tag}</Text>
                </View>
              </View>
            ) : null}
          </View>
        </View>
      </View>

      <View style={{ margin: `-40rpx ${ui.spacing.page} 0`, position: 'relative', zIndex: 4 }}>
        <View style={{ display: 'flex', justifyContent: 'space-between' }}>
          <HeroMetric label="老师协同方式" value={introCard.title} />
          <View style={{ width: '18rpx' }} />
          <HeroMetric label="带学感受" value="讲课、答疑、督学同频推进" />
        </View>
      </View>

      <View style={{ margin: `${ui.spacing.section} ${ui.spacing.page} 0` }}>
        <PageSectionTitle lineColor="#8ba7d8">老师怎么带你学</PageSectionTitle>
        <View
          style={{
            ...surfaceCardStyle,
            borderRadius: ui.radius.lg,
            padding: '30rpx 26rpx',
            marginBottom: '18rpx',
            boxShadow: '0 22rpx 38rpx rgba(148,163,184,0.12)'
          }}
        >
          <Text style={{ display: 'block', fontSize: ui.type.section, color: ui.colors.text, fontWeight: 900, marginBottom: '12rpx' }}>
            {introCard.title}
          </Text>
          <Text style={{ display: 'block', fontSize: ui.type.body, lineHeight: 1.82, color: ui.colors.textMuted }}>
            {introCard.desc}
          </Text>
        </View>

        {features.map((item, index) => (
          <View
            key={item.title}
            style={{
              ...surfaceCardStyle,
              display: 'flex',
              alignItems: 'flex-start',
              padding: '24rpx',
              marginBottom: index === features.length - 1 ? '0' : '16rpx',
              borderRadius: ui.radius.md,
              boxShadow: '0 18rpx 34rpx rgba(148,163,184,0.10)'
            }}
          >
            <View
              style={{
                width: '18rpx',
                height: '18rpx',
                marginTop: '10rpx',
                marginRight: '16rpx',
                borderRadius: ui.radius.pill,
                background: index === 0 ? '#7ba4df' : index === 1 ? '#9db3dc' : '#c1d0e8',
                flexShrink: 0
              }}
            />
            <View style={{ flex: 1 }}>
              <Text style={{ display: 'block', fontSize: ui.type.cardTitle, color: ui.colors.text, fontWeight: 800, marginBottom: '8rpx' }}>
                {item.title}
              </Text>
              <Text style={{ display: 'block', fontSize: ui.type.body, color: ui.colors.textMuted, lineHeight: 1.78 }}>
                {item.desc}
              </Text>
            </View>
          </View>
        ))}
      </View>

      {supportTeachers.length ? (
        <View style={{ margin: `${ui.spacing.section} ${ui.spacing.page} 0` }}>
          <PageSectionTitle lineColor="#8ba7d8">其余老师与协同支持</PageSectionTitle>
          {supportTeachers.map((teacher, index) => (
            <TeacherSpotlightCard key={teacher._id || teacher.name} {...teacher} isLast={index === supportTeachers.length - 1} />
          ))}
        </View>
      ) : null}

      <PageCtaCard
        title={cta.title}
        desc={cta.desc}
        buttonText={cta.buttonText}
        footnote={cta.footnote}
        background="linear-gradient(135deg, #203250 0%, #16253f 100%)"
        orbColor="rgba(167,197,255,0.18)"
      />
    </View>
  );
}
