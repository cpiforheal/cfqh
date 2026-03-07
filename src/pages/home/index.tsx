import { Image, Navigator, Text, View } from '@tarojs/components';
import BottomNav from '@/components/BottomNav';

const quickLinks = [
  { label: '机构介绍', url: '/pages/about/index', tone: 'bg-indigo-50 text-indigo-600' },
  { label: '开设方向', url: '/pages/courses/index', tone: 'bg-slate-100 text-slate-700' },
  { label: '师资团队', url: '/pages/teachers/index', tone: 'bg-slate-100 text-slate-700' },
  { label: '办学成果', url: '/pages/success/index', tone: 'bg-slate-100 text-slate-700' }
];

const advantages = [
  { title: '专职教研团队', desc: '全职老师跟班答疑，内容与考纲同步迭代。' },
  { title: '沉浸式校区', desc: '吃住学一体化，减少干扰，提高复习效率。' },
  { title: '自研内部教材', desc: '围绕专转本考点整理，强化重点与易错点。' },
  { title: '严格督学体系', desc: '阶段测评、日清周测，帮助稳定推进。' }
];

export default function HomePage() {
  return (
    <View className="page bg-slate-50">
      <View className="relative overflow-hidden rounded-b-3xl bg-slate-900 px-4 pb-20 pt-16">
        <Image
          src="https://picsum.photos/seed/university/900/700"
          className="absolute left-0 top-0 h-full w-full"
          mode="aspectFill"
          style={{ opacity: 0.24 }}
        />
        <View
          className="absolute left-0 top-0 h-full w-full"
          style={{ background: 'linear-gradient(180deg, rgba(15,23,42,0.20), rgba(15,23,42,0.86))' }}
        />
        <View className="relative z-10">
          <View className="mb-5 inline-flex rounded-full border border-slate-500 bg-slate-800 px-3 py-1">
            <Text className="text-xs font-medium text-white">江苏专转本权威培训品牌</Text>
          </View>
          <Text className="mb-3 block text-3xl font-extrabold text-white">专注专转本</Text>
          <Text className="mb-6 block text-sm leading-6 text-slate-200">
            聚焦医护与高数专项方向，以精细化教研和督学体系帮助学员稳定提分。
          </Text>
          <Navigator
            url="/pages/about/index"
            className="inline-flex rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white"
          >
            了解机构实力
          </Navigator>
        </View>
      </View>

      <View className="relative z-10 mx-4 -mt-8">
        <View className="grid grid-cols-3 gap-3 rounded-3xl bg-white p-5 text-center shadow-lg">
          <View>
            <Text className="block text-2xl font-black text-slate-900">核心</Text>
            <Text className="mt-1 block text-xs text-slate-500">全职名师教研</Text>
          </View>
          <View>
            <Text className="block text-2xl font-black text-slate-900">精品</Text>
            <Text className="mt-1 block text-xs text-slate-500">小班精细教学</Text>
          </View>
          <View>
            <Text className="block text-2xl font-black text-slate-900">高上岸</Text>
            <Text className="mt-1 block text-xs text-slate-500">多方向覆盖</Text>
          </View>
        </View>
      </View>

      <View className="mx-4 mt-6 grid grid-cols-4 gap-3">
        {quickLinks.map((item) => (
          <Navigator key={item.url} url={item.url}>
            <View className="flex items-center justify-center">
              <View className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.tone}`}>
                <View className="h-3 w-3 rounded-full bg-current" />
              </View>
            </View>
            <Text className="mt-2 block text-center text-xs font-medium text-slate-700">{item.label}</Text>
          </Navigator>
        ))}
      </View>

      <View className="mx-4 mt-10">
        <View className="mb-4 flex items-center">
          <View className="mr-2 h-4 w-1 rounded-full bg-indigo-600" />
          <Text className="text-lg font-bold text-slate-900">四大办学优势</Text>
        </View>
        <View className="grid grid-cols-2 gap-3">
          {advantages.map((item) => (
            <View key={item.title} className="rounded-3xl border border-slate-100 bg-white p-4 shadow-sm">
              <View className="mb-2 h-5 w-5 rounded-full bg-indigo-100" />
              <Text className="mb-1 block text-sm font-bold text-slate-900">{item.title}</Text>
              <Text className="block text-xs leading-5 text-slate-500">{item.desc}</Text>
            </View>
          ))}
        </View>
      </View>

      <View className="mx-4 mt-10">
        <View className="mb-4 flex items-end justify-between">
          <View className="flex items-center">
            <View className="mr-2 h-4 w-1 rounded-full bg-indigo-600" />
            <Text className="text-lg font-bold text-slate-900">沉浸式学习环境</Text>
          </View>
          <Navigator url="/pages/about/index">
            <Text className="text-xs font-medium text-slate-500">查看更多</Text>
          </Navigator>
        </View>
        <View className="grid grid-cols-2 gap-2">
          <View className="relative h-32 overflow-hidden rounded-3xl">
            <Image src="https://picsum.photos/seed/classroom1/400/300" className="h-full w-full" mode="aspectFill" />
            <View className="absolute bottom-0 left-0 right-0 bg-slate-900 px-3 py-2" style={{ opacity: 0.84 }}>
              <Text className="text-xs font-bold text-white">多媒体教室</Text>
            </View>
          </View>
          <View className="relative h-32 overflow-hidden rounded-3xl">
            <Image src="https://picsum.photos/seed/dorm1/400/300" className="h-full w-full" mode="aspectFill" />
            <View className="absolute bottom-0 left-0 right-0 bg-slate-900 px-3 py-2" style={{ opacity: 0.84 }}>
              <Text className="text-xs font-bold text-white">标准化宿舍</Text>
            </View>
          </View>
          <View className="relative col-span-2 h-32 overflow-hidden rounded-3xl">
            <Image src="https://picsum.photos/seed/library/700/400" className="h-full w-full" mode="aspectFill" />
            <View className="absolute bottom-0 left-0 right-0 bg-slate-900 px-3 py-2" style={{ opacity: 0.84 }}>
              <Text className="text-xs font-bold text-white">自习室与答疑区</Text>
            </View>
          </View>
        </View>
      </View>

      <View className="mx-4 mb-6 mt-10">
        <View className="mb-4 flex items-center">
          <View className="mr-2 h-4 w-1 rounded-full bg-indigo-600" />
          <Text className="text-lg font-bold text-slate-900">核心专业方向</Text>
        </View>

        <Navigator url="/pages/courses/index" className="block">
          <View className="mb-3 rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
            <View className="mb-2 flex items-start justify-between">
              <Text className="text-base font-bold text-slate-900">医护大类方向</Text>
              <Text className="rounded-md bg-indigo-100 px-2 py-1 text-xs font-bold text-indigo-600">
                优势王牌
              </Text>
            </View>
            <Text className="mb-3 block text-xs leading-5 text-slate-500">
              覆盖解剖、生理等核心课程与公共课同步辅导，适合目标明确的医护类学员。
            </Text>
            <Text className="text-xs font-medium text-indigo-600">查看方向详情</Text>
          </View>
        </Navigator>

        <Navigator url="/pages/courses/index" className="block">
          <View className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
            <View className="mb-2 flex items-start justify-between">
              <Text className="text-base font-bold text-slate-900">高数专项突破</Text>
              <Text className="rounded-md bg-slate-100 px-2 py-1 text-xs font-bold text-slate-600">
                重点建设
              </Text>
            </View>
            <Text className="mb-3 block text-xs leading-5 text-slate-500">
              从零基础到冲刺阶段的系统化提分路线，适合理工与经管类考生。
            </Text>
            <Text className="text-xs font-medium text-slate-600">查看方向详情</Text>
          </View>
        </Navigator>
      </View>

      <BottomNav />
    </View>
  );
}
