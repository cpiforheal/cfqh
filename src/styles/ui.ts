export const ui = {
  colors: {
    background: '#f3f5fb',
    surface: '#ffffff',
    surfaceGradient: 'linear-gradient(180deg, #ffffff 0%, #fbfcff 100%)',
    surfaceMuted: '#f8fafc',
    text: '#0f172a',
    textSubtle: '#334155',
    textMuted: '#64748b',
    textSoft: '#94a3b8',
    accent: '#5b4dff',
    accentSoft: '#eef2ff',
    accentLine: '#7c83ff',
    darkGradient: 'linear-gradient(135deg, #111d3f 0%, #0f1936 60%, #0a1229 100%)',
    darkText: '#cbd5e1',
    border: 'rgba(226,232,240,0.82)'
  },
  radius: {
    hero: '56rpx',
    xl: '40rpx',
    lg: '34rpx',
    md: '32rpx',
    sm: '24rpx',
    pill: '999rpx'
  },
  type: {
    hero: '52rpx',
    section: '34rpx',
    cardTitle: '30rpx',
    subtitle: '26rpx',
    body: '22rpx',
    meta: '20rpx',
    note: '18rpx',
    chip: '20rpx',
    stat: '38rpx',
    button: '26rpx'
  },
  spacing: {
    page: '24rpx',
    pageCompact: '20rpx',
    section: '42rpx',
    block: '16rpx',
    inner: '28rpx'
  },
  shadow: {
    card: '0 12rpx 24rpx rgba(148,163,184,0.10)',
    cardRaised: '0 14rpx 30rpx rgba(148,163,184,0.12)',
    dark: '0 16rpx 30rpx rgba(15,23,42,0.18)',
    accent: '0 18rpx 36rpx rgba(79,70,229,0.28)'
  }
};

export const pageStyle = {
  minHeight: '100vh',
  backgroundColor: ui.colors.background,
  paddingBottom: '48rpx'
};

export const surfaceCardStyle = {
  background: ui.colors.surfaceGradient,
  borderRadius: ui.radius.md,
  boxShadow: ui.shadow.card,
  border: `1rpx solid ${ui.colors.border}`
};

export const elevatedSurfaceCardStyle = {
  background: ui.colors.surfaceGradient,
  borderRadius: ui.radius.lg,
  boxShadow: ui.shadow.cardRaised,
  border: `1rpx solid ${ui.colors.border}`
};

export const darkPanelStyle = {
  background: ui.colors.darkGradient,
  borderRadius: ui.radius.lg,
  boxShadow: ui.shadow.dark
};
