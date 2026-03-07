import { Image, Text, View } from '@tarojs/components';

const stats = [
  { value: '高', label: '上岸率' },
  { value: '精', label: '小班制' },
  { value: '强', label: '口碑力' }
];

const stories = [
  { title: '2025 上岸分享', desc: '医护方向高分录取案例' },
  { title: '2024 上岸分享', desc: '高数专项突破案例' },
  { title: '2023 上岸分享', desc: '跨考逆袭经验' }
];

export default function SuccessPage() {
  return (
    <View className="page bg-slate-50">
      <View className="bg-white px-4 pb-4 pt-12 shadow-sm">
        <Text className="mb-1 block text-2xl font-extrabold text-slate-900">办学成果</Text>
        <Text className="block text-xs text-slate-500">历年上岸表现与学员反馈持续积累。</Text>
      </View>

      <View className="p-4">
        <View className="mb-4 grid grid-cols-3 gap-3">
          {stats.map((item) => (
            <View
              key={item.label}
              className="border border-slate-100 bg-white p-4 text-center"
              style={{ borderRadius: '28rpx' }}
            >
              <Text className="block text-2xl font-black text-slate-900">{item.value}</Text>
              <Text className="block text-xs text-slate-500">{item.label}</Text>
            </View>
          ))}
        </View>

        <View className="mb-4 bg-slate-900 p-5" style={{ borderRadius: '30rpx' }}>
          <Text className="mb-2 block text-sm font-bold text-white">上岸故事</Text>
          <Text className="block text-xs leading-5 text-slate-200">
            医护方向保持稳定表现，高数专项也形成了清晰的提分路径与复盘案例。
          </Text>
        </View>

        {stories.map((item) => (
          <View
            key={item.title}
            className="mb-3 flex border border-slate-100 bg-white p-4"
            style={{ borderRadius: '28rpx' }}
          >
            <Image
              src="https://picsum.photos/seed/success/200/200"
              className="mr-3 h-16 w-16"
              style={{ borderRadius: '20rpx' }}
              mode="aspectFill"
            />
            <View className="flex-1 justify-center">
              <Text className="mb-1 block text-sm font-bold text-slate-900">{item.title}</Text>
              <Text className="block text-xs text-slate-500">{item.desc}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
