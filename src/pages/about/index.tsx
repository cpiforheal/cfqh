import { Image, Text, View } from '@tarojs/components';
import BottomNav from '@/components/BottomNav';

export default function AboutPage() {
  return (
    <View className="page bg-slate-50">
      <View className="relative overflow-hidden bg-slate-900 px-4 pb-10 pt-14">
        <Image
          src="https://picsum.photos/seed/campus/900/600"
          className="absolute left-0 top-0 h-full w-full"
          mode="aspectFill"
          style={{ opacity: 0.24 }}
        />
        <View
          className="absolute left-0 top-0 h-full w-full"
          style={{ background: 'linear-gradient(180deg, rgba(15,23,42,0.2), rgba(15,23,42,0.86))' }}
        />
        <View className="relative z-10">
          <Text className="mb-2 block text-2xl font-extrabold text-white">关于我们</Text>
          <Text className="block text-xs text-slate-300">专注专转本，提供系统化备考服务</Text>
        </View>
      </View>

      <View className="p-4">
        <View className="mb-4 rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
          <Text className="mb-2 block text-sm font-bold text-slate-900">品牌理念</Text>
          <Text className="block text-xs leading-5 text-slate-500">
            以高标准教研与精细化服务为核心，帮助学员建立稳定的备考节奏。
          </Text>
        </View>

        <View className="mb-4 rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
          <Text className="mb-2 block text-sm font-bold text-slate-900">服务体系</Text>
          <Text className="block text-xs leading-5 text-slate-500">
            课程规划、阶段测评、专项提升、全程督学四个环节协同推进。
          </Text>
        </View>

        <View className="rounded-3xl bg-slate-900 p-5">
          <Text className="mb-2 block text-sm font-bold text-white">校区环境</Text>
          <Text className="mb-4 block text-xs leading-5 text-slate-200">
            沉浸式学习与生活配套，保障备考效率与日常作息管理。
          </Text>
          <View className="grid grid-cols-2 gap-2">
            <Image src="https://picsum.photos/seed/campus1/400/300" className="h-24 w-full rounded-2xl" mode="aspectFill" />
            <Image src="https://picsum.photos/seed/campus2/400/300" className="h-24 w-full rounded-2xl" mode="aspectFill" />
          </View>
        </View>
      </View>

      <BottomNav />
    </View>
  );
}
