import { Image, Text, View } from '@tarojs/components';
import { useCallback, useEffect, useState } from 'react';
import PageCtaCard from '../../components/PageCtaCard';
import PageHero from '../../components/PageHero';
import PageIntroCard from '../../components/PageIntroCard';
import PageSectionTitle from '../../components/PageSectionTitle';
import fallbackContent from '../../data/contentFallback';
import { useCmsAutoRefresh } from '../../hooks/useCmsAutoRefresh';
import { getPublicContent } from '../../services/content';
import { pageStyle, surfaceCardStyle, ui } from '../../styles/ui';
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

export default function TeachersPage() {
  const [content, setContent] = useState(getInitialTeachersState());
  const [loadState, setLoadState] = useState({ source: 'fallback', error: '' });

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
  }, [loadContent]);

  useCmsAutoRefresh(loadContent);

  const hero = content.page?.hero || defaultTeachersPage.hero;
  const introCard = content.page?.introCard || defaultTeachersPage.introCard;
  const features = content.page?.features || defaultTeachersPage.features;
  const teachers = content.teachers || defaultTeachers;
  const cta = content.page?.cta || defaultTeachersPage.cta;

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

      <PageHero
        chip={hero.chip}
        title={hero.title}
        desc={hero.desc}
        background="linear-gradient(180deg, #31415f 0%, #17233f 56%, #0d1730 100%)"
        imageUrl={hero.imageUrl}
        imageSeed={hero.imageSeed}
      />

      <PageIntroCard title={introCard.title} desc={introCard.desc} />

      <View style={{ margin: '20rpx 24rpx 0' }}>
        <View
          style={{
            display: 'inline-flex',
            padding: '8rpx 14rpx',
            borderRadius: ui.radius.pill,
            backgroundColor: '#eef2ff'
          }}
        >
          <Text style={{ fontSize: ui.type.note, color: '#4f46e5', fontWeight: 700 }}>
            {loadState.source === 'local-preview' ? '本地预览' : loadState.source === 'cloud' ? '云端内容' : '本地内容'}
          </Text>
        </View>
      </View>

      <View style={{ margin: '38rpx 24rpx 0' }}>
        <PageSectionTitle lineColor="#8a92ff">核心优势</PageSectionTitle>
        {features.map((item, index) => (
          <View
            key={item.title}
            style={{
              ...surfaceCardStyle,
              marginBottom: index === features.length - 1 ? '0' : ui.spacing.block,
              padding: '28rpx 24rpx'
            }}
          >
            <Text
              style={{
                display: 'block',
                fontSize: ui.type.cardTitle,
                color: ui.colors.text,
                fontWeight: 800,
                marginBottom: '10rpx'
              }}
            >
              {item.title}
            </Text>
            <Text
              style={{
                display: 'block',
                fontSize: ui.type.body,
                color: ui.colors.textMuted,
                lineHeight: 1.8
              }}
            >
              {item.desc}
            </Text>
          </View>
        ))}
      </View>

      <View style={{ margin: `${ui.spacing.section} ${ui.spacing.pageCompact} 0` }}>
        <PageSectionTitle lineColor="#8a92ff">老师阵容</PageSectionTitle>
        <View style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {teachers.map((teacher) => (
            <View
              key={teacher._id || teacher.name}
              style={{
                ...surfaceCardStyle,
                width: '48.2%',
                marginBottom: '18rpx',
                padding: '28rpx 24rpx',
                boxSizing: 'border-box'
              }}
            >
              <Image
                src={resolveMediaUrl({
                  url: teacher.avatarUrl,
                  seed: teacher.avatarSeed || teacher._id || teacher.name,
                  fallbackSize: '240/240'
                })}
                mode="aspectFill"
                style={{
                  width: '112rpx',
                  height: '112rpx',
                  borderRadius: ui.radius.pill,
                  marginBottom: '18rpx'
                }}
              />
              <Text
                style={{
                  display: 'block',
                  fontSize: ui.type.cardTitle,
                  color: ui.colors.text,
                  fontWeight: 800,
                  marginBottom: '8rpx'
                }}
              >
                {teacher.name}
              </Text>
              <Text
                style={{
                  display: 'block',
                  fontSize: ui.type.body,
                  color: ui.colors.textMuted,
                  marginBottom: teacher.intro ? '10rpx' : '16rpx'
                }}
              >
                {teacher.role}
              </Text>
              {teacher.intro ? (
                <Text
                  style={{
                    display: 'block',
                    fontSize: ui.type.meta,
                    color: ui.colors.textSoft,
                    lineHeight: 1.7,
                    marginBottom: '16rpx'
                  }}
                >
                  {teacher.intro}
                </Text>
              ) : null}
              {teacher.tag ? (
                <View
                  style={{
                    display: 'inline-flex',
                    padding: '10rpx 16rpx',
                    borderRadius: ui.radius.pill,
                    backgroundColor: ui.colors.accentSoft
                  }}
                >
                  <Text style={{ fontSize: ui.type.meta, color: ui.colors.accent, fontWeight: 700 }}>
                    {teacher.tag}
                  </Text>
                </View>
              ) : null}
            </View>
          ))}
        </View>
      </View>

      <PageCtaCard title={cta.title} desc={cta.desc} buttonText={cta.buttonText} footnote={cta.footnote} />
    </View>
  );
}
