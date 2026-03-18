import Taro from '@tarojs/taro';
import { Text, View } from '@tarojs/components';
import { ui } from '../../styles/ui';

export default function PageHomeButton(props: { label?: string }) {
  return (
    <View
      onClick={() => {
        Taro.switchTab({ url: '/pages/home/index' });
      }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '176rpx',
        height: '64rpx',
        padding: '0 22rpx',
        borderRadius: ui.radius.pill,
        backgroundColor: '#ffffff',
        border: '1rpx solid rgba(15,118,110,0.16)',
        boxSizing: 'border-box'
      }}
    >
      <Text style={{ fontSize: ui.type.note, color: '#115e59', fontWeight: 800 }}>
        {props.label || '返回首页'}
      </Text>
    </View>
  );
}
