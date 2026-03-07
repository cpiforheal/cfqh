import { Navigator, Text, View } from '@tarojs/components';
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
    <View className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-100 bg-white safe-bottom">
      <View className="flex h-16 items-center justify-around px-2">
        {tabs.map((item) => {
          const isActive = current === item.url;

          return (
            <Navigator key={item.url} url={item.url} className="flex-1">
              <View className="flex h-16 flex-col items-center justify-center">
                <View
                  className={`h-2 w-2 rounded-full ${
                    isActive ? 'bg-indigo-600' : 'bg-slate-300'
                  }`}
                />
                <Text
                  className={`mt-1 text-xs font-medium ${
                    isActive ? 'text-indigo-600' : 'text-slate-500'
                  }`}
                >
                  {item.label}
                </Text>
              </View>
            </Navigator>
          );
        })}
      </View>
    </View>
  );
}
