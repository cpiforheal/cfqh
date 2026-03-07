import { View, Navigator } from '@tarojs/components';
import { useRouter } from '@tarojs/taro';

const tabs = [
  { url: '/pages/home/index', label: '首页' },
  { url: '/pages/courses/index', label: '方向' },
  { url: '/pages/teachers/index', label: '师资' },
  { url: '/pages/success/index', label: '成果' },
  { url: '/pages/about/index', label: '关于' }
];

export default function BottomNav() {
  const router = useRouter();
  const current = router?.path ? `/${router.path.replace(/^\/?/, '')}` : '';

  return (
    <View className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100">
      <View className="flex justify-around items-center h-16 px-2">
        {tabs.map((item) => {
          const isActive = current === item.url;
          return (
            <Navigator
              key={item.url}
              url={item.url}
              className={`flex-1 text-center text-xs font-medium ${
                isActive ? 'text-blue-600' : 'text-slate-500'
              }`}
            >
              {item.label}
            </Navigator>
          );
        })}
      </View>
    </View>
  );
}
