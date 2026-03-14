import { Text, View } from '@tarojs/components';

type Props = {
  source?: string;
  updatedAt?: string;
  revision?: string;
};

function getSourceLabel(source?: string) {
  if (source === 'local-preview') return '本地预览';
  if (source === 'cloud') return '云端内容';
  if (source === 'fallback') return '本地兜底';
  return '内容状态';
}

function formatTime(value?: string) {
  if (!value) return '等待同步';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '时间未知';

  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');
  const second = String(date.getSeconds()).padStart(2, '0');

  return `${month}-${day} ${hour}:${minute}:${second}`;
}

export default function CmsSyncBadge(props: Props) {
  const label = getSourceLabel(props.source);
  const syncText = formatTime(props.updatedAt);
  const revisionText = props.revision ? props.revision.split(':').pop() : '';

  return (
    <View style={{ margin: '20rpx 24rpx 0' }}>
      <View
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10rpx',
          padding: '10rpx 16rpx',
          borderRadius: '999rpx',
          backgroundColor: 'rgba(238,249,251,0.96)',
          border: '1rpx solid rgba(1,193,217,0.18)',
          boxShadow: '0 8rpx 18rpx rgba(1,193,217,0.08)'
        }}
      >
        <Text style={{ fontSize: '22rpx', color: '#019db2', fontWeight: 700 }}>{label}</Text>
        <Text style={{ fontSize: '22rpx', color: '#64748b' }}>同步 {syncText}</Text>
        {revisionText ? <Text style={{ fontSize: '20rpx', color: '#94a3b8' }}>#{revisionText}</Text> : null}
      </View>
    </View>
  );
}
