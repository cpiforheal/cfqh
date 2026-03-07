import { ScrollView, Text, View } from '@tarojs/components';
import BottomNav from '@/components/BottomNav';

const categories = ['全部方向', '医护大类', '高数专项', '更多筹备'];
const medicalItems = ['核心专业课精讲', '历年真题与考点串讲', '公共课同步辅导', '全职教研答疑'];
const mathItems = ['基础到公式定理讲解', '典型例题剖析', '阶段测评与复盘', '小班精细教学'];

export default function CoursesPage() {
  return (
    <View className="page bg-slate-50">
      <View className="bg-white px-4 pb-4 pt-12 shadow-sm">
        <Text className="mb-1 block text-2xl font-extrabold text-slate-900">开设方向</Text>
        <Text className="mb-3 block text-xs text-slate-500">精细化教研，按专业方向提供针对性辅导</Text>
        <ScrollView scrollX className="whitespace-nowrap">
          {categories.map((cat, index) => (
            <View
              key={cat}
              className={`mr-2 inline-flex rounded-xl px-4 py-2 text-sm font-bold ${
                index === 0 ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {cat}
            </View>
          ))}
        </ScrollView>
      </View>

      <View className="p-4">
        <View className="mb-6 rounded-3xl border border-indigo-100 bg-indigo-50 p-5">
          <View className="mb-3 flex items-center">
            <View className="mr-2 h-2 w-2 rounded-full bg-indigo-500" />
            <Text className="text-sm font-bold text-indigo-900">方向选择建议</Text>
          </View>
          <Text className="mb-2 block text-xs text-indigo-800">护理、助产、临床背景建议优先选择医护方向。</Text>
          <Text className="mb-2 block text-xs text-indigo-800">高数基础薄弱建议优先选择高数专项。</Text>
          <Text className="mb-4 block text-xs text-indigo-800">如果还不确定方向，建议先做学情评估。</Text>
          <View className="rounded-xl bg-white py-3">
            <Text className="block text-center text-xs font-bold text-indigo-600">免费获取 1 对 1 规划</Text>
          </View>
        </View>

        <View className="mb-6 overflow-hidden rounded-3xl bg-slate-900 p-5 text-white">
          <View className="mb-4 flex items-start justify-between">
            <View>
              <View className="mb-2 inline-flex rounded-md bg-indigo-900 px-2 py-1">
                <Text className="text-xs font-bold text-indigo-200">优势王牌方向</Text>
              </View>
              <Text className="block text-2xl font-black text-white">医护大类方向</Text>
            </View>
            <View className="h-10 w-10 rounded-full bg-indigo-800" />
          </View>

          <View className="mb-4 rounded-2xl bg-slate-800 p-4">
            <Text className="mb-2 block text-xs text-slate-300">适合人群</Text>
            <Text className="block text-sm font-medium text-white">
              适合护理、助产、临床等专业，目标为公办或优质民办本科的学员。
            </Text>
          </View>

          {medicalItems.map((item) => (
            <View key={item} className="mb-2 flex items-start">
              <View className="mr-2 mt-1 h-2 w-2 rounded-full bg-indigo-300" />
              <Text className="flex-1 text-xs text-slate-200">{item}</Text>
            </View>
          ))}

          <View className="mb-5 mt-5 flex">
            <View className="mr-2 rounded-lg bg-slate-800 px-2 py-1">
              <Text className="text-xs text-slate-200">资深医护教研</Text>
            </View>
            <View className="rounded-lg bg-slate-800 px-2 py-1">
              <Text className="text-xs text-slate-200">历年高上岸率</Text>
            </View>
          </View>

          <View className="rounded-xl bg-indigo-600 py-3">
            <Text className="text-center text-sm font-bold text-white">查看医护方向详情</Text>
          </View>
        </View>

        <View className="rounded-3xl border border-slate-200 bg-white p-5">
          <View className="mb-4 flex items-start justify-between">
            <View>
              <View className="mb-2 inline-flex rounded-md bg-slate-100 px-2 py-1">
                <Text className="text-xs font-bold text-slate-500">重点建设方向</Text>
              </View>
              <Text className="block text-xl font-black text-slate-900">高数专项突破</Text>
            </View>
            <View className="h-10 w-10 rounded-full bg-slate-100" />
          </View>

          <View className="mb-4 rounded-2xl bg-slate-50 p-4">
            <Text className="mb-1 block text-xs text-slate-500">适合人群</Text>
            <Text className="block text-sm font-medium text-slate-800">
              适合理工、经管类考生，以及高数基础薄弱需要系统提分的学员。
            </Text>
          </View>

          {mathItems.map((item) => (
            <View key={item} className="mb-2 flex items-start">
              <View className="mr-2 mt-1 h-2 w-2 rounded-full bg-indigo-500" />
              <Text className="flex-1 text-xs text-slate-600">{item}</Text>
            </View>
          ))}

          <View className="mb-5 mt-5 flex">
            <View className="mr-2 rounded-lg bg-slate-100 px-2 py-1">
              <Text className="text-xs text-slate-500">专职高数教研</Text>
            </View>
            <View className="rounded-lg bg-slate-100 px-2 py-1">
              <Text className="text-xs text-slate-500">稳扎稳打策略</Text>
            </View>
          </View>

          <View className="rounded-xl bg-slate-900 py-3">
            <Text className="text-center text-sm font-bold text-white">查看高数方向详情</Text>
          </View>
        </View>
      </View>

      <BottomNav />
    </View>
  );
}
