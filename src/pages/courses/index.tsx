import { Text, View } from '@tarojs/components';
import { useCallback, useEffect, useMemo, useState } from 'react';
import SubjectPageShell from '../../components/SubjectPageShell';
import fallbackContent from '../../data/contentFallback';
import { useCmsAutoRefresh } from '../../hooks/useCmsAutoRefresh';
import { getPublicContent } from '../../services/content';

const defaultMaterialsPage = fallbackContent.pages.materials;
const defaultMaterialPackages = fallbackContent.materialPackages;

function inferCategoryKey(value, fallback = 'all') {
  const raw = String(value || '').trim();
  if (!raw) return fallback;
  const normalized = raw.toLowerCase();
  if (normalized.includes('system') || normalized.includes('course') || normalized.includes('系统班')) return 'system_course';
  if (normalized.includes('sprint') || normalized.includes('camp') || normalized.includes('冲刺')) return 'sprint_camp';
  if (normalized.includes('book') || normalized.includes('paper') || normalized.includes('教材') || normalized.includes('书')) return 'paper_book';
  if (normalized.includes('asset') || normalized.includes('resource') || normalized.includes('资料')) return 'resource_pack';
  return fallback;
}

function normalizeMaterialsPage(page) {
  if (!page) {
    return defaultMaterialsPage;
  }

  return {
    ...defaultMaterialsPage,
    ...page,
    header: { ...defaultMaterialsPage.header, ...(page.header || {}) },
    heroSection: { ...(defaultMaterialsPage.heroSection || {}), ...(page.heroSection || {}) },
    directionTabs: Array.isArray(page.directionTabs) && page.directionTabs.length ? page.directionTabs : defaultMaterialsPage.directionTabs,
    categoryTabs: Array.isArray(page.categoryTabs) && page.categoryTabs.length ? page.categoryTabs : defaultMaterialsPage.categoryTabs,
    stageTabs: Array.isArray(page.stageTabs) && page.stageTabs.length ? page.stageTabs : defaultMaterialsPage.stageTabs,
    mainSection: { ...defaultMaterialsPage.mainSection, ...(page.mainSection || {}) },
    shelfSection: { ...defaultMaterialsPage.shelfSection, ...(page.shelfSection || {}) },
    consultBar: { ...defaultMaterialsPage.consultBar, ...(page.consultBar || {}) }
  };
}

function normalizeMallProduct(value, index = 0) {
  const price = Number(value?.price || 0);
  const originPrice = Number(value?.originPrice || 0);
  return {
    _id: value?._id ? String(value._id) : `fallback-product-${index + 1}`,
    direction: String(value?.direction || 'math'),
    stage: String(value?.stage || 'foundation'),
    categoryKey: inferCategoryKey(value?.categoryKey || value?.productType || value?.title || value?.productName),
    productName: String(value?.productName || value?.title || ''),
    productSubTitle: String(value?.productSubTitle || value?.target || ''),
    productDescription: String(value?.productDescription || value?.solves || ''),
    coverMark: String(value?.coverMark || value?.badge || String.fromCharCode(65 + (index % 26))),
    coverLabel: String(value?.coverLabel || value?.productType || '资料包'),
    price,
    originPrice,
    isFree: value?.isFree === true || price <= 0,
    salesLabel: String(value?.salesLabel || ''),
    buttonText: String(value?.buttonText || '查看详情'),
    sortOrder: Number(value?.sortOrder || value?.sort || (index + 1) * 10),
    status: String(value?.status || 'draft')
  };
}

function buildCompatProductsFromLegacy(packages) {
  return (packages || []).map((item, index) =>
    normalizeMallProduct(
      {
        ...item,
        productName: item?.title,
        productSubTitle: item?.target,
        productDescription: item?.solves,
        productType: item?.productType || item?.type || 'resource_pack',
        coverMark: item?.coverMark || item?.badge || String.fromCharCode(65 + (index % 26)),
        coverLabel: item?.coverLabel || item?.type || '资料包',
        salesLabel: item?.salesLabel || '',
        buttonText: item?.buttonText || '查看详情',
        status: item?.status === 'published' ? 'online' : item?.status
      },
      index
    )
  );
}

function getInitialMaterialsState() {
  return {
    site: fallbackContent.site,
    page: defaultMaterialsPage,
    mallProducts: buildCompatProductsFromLegacy(defaultMaterialPackages)
  };
}

function formatPrice(item) {
  if (item.isFree || Number(item.price || 0) <= 0) {
    return '免费领取';
  }
  return `¥ ${Number(item.price || 0)}`;
}

function CategoryChip(props) {
  return (
    <View
      onClick={props.onClick}
      hoverClass="hover-scale-active"
      className={`hover-scale animate-fade-up animate-delay-${props.index % 10}`}
      style={{
        minHeight: '68rpx',
        padding: '0 26rpx',
        borderRadius: '999rpx',
        background: props.active ? '#16223a' : 'rgba(255,255,255,0.92)',
        border: props.active ? '1rpx solid rgba(15,23,42,0.16)' : '1rpx solid rgba(203,213,225,0.9)',
        boxShadow: props.active ? '0 14rpx 28rpx rgba(15,23,42,0.12)' : '0 10rpx 22rpx rgba(148,163,184,0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Text style={{ fontSize: '22rpx', color: props.active ? '#ffffff' : '#52657f', fontWeight: 800 }}>{props.label}</Text>
    </View>
  );
}

function ProductCard(props) {
  const item = props.item;

  return (
    <View
      className={`hover-scale animate-fade-up animate-delay-${props.index % 10}`}
      hoverClass="hover-scale-active"
      style={{
        borderRadius: '34rpx',
        padding: '24rpx',
        background: 'rgba(255,255,255,0.94)',
        border: '1rpx solid rgba(226,232,240,0.86)',
        boxShadow: '0 18rpx 36rpx rgba(148,163,184,0.1)',
        display: 'flex',
        gap: '20rpx',
        alignItems: 'center',
        backdropFilter: 'blur(18rpx)'
      }}
    >
      <View
        style={{
          width: '146rpx',
          height: '146rpx',
          borderRadius: '28rpx',
          background: 'linear-gradient(180deg, #edf3ff 0%, #f7faff 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          flexShrink: 0,
          border: '1rpx solid rgba(226,232,240,0.92)'
        }}
      >
        <Text style={{ fontSize: '54rpx', color: '#94a3b8', fontWeight: 900 }}>{String(item.coverMark || 'A').slice(0, 1)}</Text>
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: '36rpx',
            background: 'rgba(148,163,184,0.92)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Text style={{ fontSize: '18rpx', color: '#ffffff', fontWeight: 700 }}>{item.coverLabel || '资料包'}</Text>
        </View>
      </View>

      <View style={{ flex: 1, minWidth: 0 }}>
        <Text style={{ display: 'block', fontSize: '24rpx', color: '#0f172a', fontWeight: 900, lineHeight: 1.45 }}>
          {item.productName || '未命名商品'}
        </Text>
        <Text
          style={{
            display: 'block',
            marginTop: '8rpx',
            fontSize: '18rpx',
            color: '#8ea0ba',
            fontWeight: 700,
            lineHeight: 1.6
          }}
        >
          {item.productSubTitle || item.productDescription || '请在后台补充这张商品卡的说明'}
        </Text>
        <View style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: '24rpx', gap: '20rpx' }}>
          <View>
            <Text style={{ display: 'block', fontSize: '24rpx', color: '#ffb3c2', fontWeight: 900 }}>{formatPrice(item)}</Text>
            {!!item.salesLabel && (
              <Text style={{ display: 'block', marginTop: '8rpx', fontSize: '18rpx', color: '#94a3b8', fontWeight: 700 }}>
                {item.salesLabel}
              </Text>
            )}
          </View>
          <View
            className="hover-scale"
            style={{
              minWidth: '148rpx',
              height: '62rpx',
              padding: '0 24rpx',
              borderRadius: '18rpx',
              background: '#16223a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <Text style={{ fontSize: '22rpx', color: '#ffffff', fontWeight: 800 }}>{item.buttonText || '查看详情'}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default function CoursesPage() {
  const [content, setContent] = useState(getInitialMaterialsState());
  const [activeCategory, setActiveCategory] = useState(defaultMaterialsPage.categoryTabs?.[0]?.key || 'all');

  const loadContent = useCallback(() => {
    let mounted = true;

    getPublicContent('materials')
      .then((payload) => {
        if (!mounted || !payload) return;
        const compatProducts =
          payload.mallProducts?.length
            ? payload.mallProducts.map((item, index) => normalizeMallProduct(item, index))
            : buildCompatProductsFromLegacy(payload.materialPackages?.length ? payload.materialPackages : defaultMaterialPackages);
        setContent({
          site: payload.site || fallbackContent.site,
          page: normalizeMaterialsPage(payload.page),
          mallProducts: compatProducts
        });
      })
      .catch(() => {
        if (!mounted) return;
        setContent(getInitialMaterialsState());
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

  const page = content.page || defaultMaterialsPage;
  const categoryTabs = page.categoryTabs?.length ? page.categoryTabs : defaultMaterialsPage.categoryTabs;
  const availableCategoryKeys = categoryTabs.map((item) => item.key);

  useEffect(() => {
    if (!availableCategoryKeys.includes(activeCategory)) {
      setActiveCategory(availableCategoryKeys[0] || 'all');
    }
  }, [activeCategory, availableCategoryKeys]);

  return (
    <SubjectPageShell title={page.heroSection?.title || '精选好课'} subtitle={page.header?.title || ''}>
      {({ subject }) => {
        const visibleProducts = (content.mallProducts || [])
          .filter((item) => item.direction === subject)
          .filter((item) => item.status === 'online' || item.status === 'pending' || item.status === 'draft')
          .sort((left, right) => Number(left.sortOrder || 0) - Number(right.sortOrder || 0));

        const filteredProducts =
          activeCategory === 'all'
            ? visibleProducts
            : visibleProducts.filter((item) => item.categoryKey === activeCategory);

        return (
          <View className="animate-cross-fade">
            <View style={{ display: 'flex', gap: '14rpx', flexWrap: 'wrap', marginBottom: '26rpx' }}>
              {categoryTabs.map((item, index) => (
                <CategoryChip
                  key={item.key}
                  label={item.label}
                  active={item.key === activeCategory}
                  index={index}
                  onClick={() => setActiveCategory(item.key)}
                />
              ))}
            </View>

            <View style={{ display: 'flex', flexDirection: 'column', gap: '20rpx' }}>
              {filteredProducts.map((item, index) => (
                <ProductCard key={item._id || `${item.productName}-${index}`} item={item} index={index + 1} />
              ))}
            </View>

            {!filteredProducts.length ? (
              <View
                className="animate-fade-up animate-delay-2"
                style={{
                  marginTop: '24rpx',
                  borderRadius: '30rpx',
                  padding: '28rpx',
                  background: 'rgba(255,255,255,0.86)',
                  border: '1rpx solid rgba(226,232,240,0.88)',
                  boxShadow: '0 14rpx 30rpx rgba(148,163,184,0.08)'
                }}
              >
                <Text style={{ display: 'block', fontSize: '24rpx', color: '#0f172a', fontWeight: 800 }}>这个分类下暂时还没有上架商品</Text>
                <Text style={{ display: 'block', marginTop: '10rpx', fontSize: '18rpx', color: '#8ea0ba', fontWeight: 700 }}>
                  老师可以去 3200 后台商城主控区里继续补充这组商品卡。
                </Text>
              </View>
            ) : null}

            <View
              className="hover-scale animate-fade-up animate-delay-5"
              hoverClass="hover-scale-active"
              style={{
                marginTop: '28rpx',
                borderRadius: '30rpx',
                padding: '24rpx 26rpx',
                background: 'linear-gradient(135deg, #16223a 0%, #24324f 100%)',
                boxShadow: '0 20rpx 40rpx rgba(15,23,42,0.18)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '20rpx'
              }}
            >
              <View style={{ flex: 1, minWidth: 0 }}>
                <Text style={{ display: 'block', fontSize: '24rpx', color: '#ffffff', fontWeight: 900 }}>
                  {page.consultBar?.title || '不知道怎么选？'}
                </Text>
                <Text style={{ display: 'block', marginTop: '10rpx', fontSize: '18rpx', color: 'rgba(226,232,240,0.9)', lineHeight: 1.6 }}>
                  {page.consultBar?.desc || '专业老师会帮你按当前基础推荐合适的资料和课程'}
                </Text>
              </View>
              <View
                style={{
                  minWidth: '144rpx',
                  height: '64rpx',
                  padding: '0 22rpx',
                  borderRadius: '18rpx',
                  background: 'rgba(255,255,255,0.12)',
                  border: '1rpx solid rgba(255,255,255,0.18)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Text style={{ fontSize: '22rpx', color: '#ffffff', fontWeight: 800 }}>{page.consultBar?.buttonText || '免费咨询'}</Text>
              </View>
            </View>
          </View>
        );
      }}
    </SubjectPageShell>
  );
}
