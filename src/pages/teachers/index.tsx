import { Image, Text, View } from '@tarojs/components';

const teachers = [
  { name: '张老师', title: '医护方向主讲', tag: '十年教研经验' },
  { name: '李老师', title: '高数专项讲师', tag: '体系化提分' },
  { name: '王老师', title: '公共课讲师', tag: '真题讲解' },
  { name: '赵老师', title: '班主任督学', tag: '全程跟踪' }
];

export default function TeachersPage() {
  return (
    <View className="page bg-slate-50">
      <View className="relative overflow-hidden bg-slate-900 px-4 pb-12 pt-14">
        <Image
          src="https://picsum.photos/seed/lecture/900/600"
          className="absolute left-0 top-0 h-full w-full"
          mode="aspectFill"
          style={{ opacity: 0.24 }}
        />
        <View
          className="absolute left-0 top-0 h-full w-full"
          style={{ background: 'linear-gradient(180deg, rgba(15,23,42,0.2), rgba(15,23,42,0.9))' }}
        />
        <View className="relative z-10">
          <Text className="mb-2 block text-2xl font-extrabold text-white">师资团队</Text>
          <Text className="block text-xs text-slate-300">核心教研与一线讲师阵容，覆盖专业课和公共课辅导。</Text>
        </View>
      </View>

      <View className="mx-4 -mt-6 bg-white p-4 shadow" style={{ borderRadius: '30rpx' }}>
        <View className="flex items-center justify-between">
          <View>
            <Text className="block text-sm font-bold text-slate-900">全职教研协同</Text>
            <Text className="block text-xs text-slate-500">教学、答疑与督学联动推进</Text>
          </View>
          <View className="rounded-full bg-indigo-600 px-3 py-2">
            <Text className="text-xs text-white">严格选拔</Text>
          </View>
        </View>
      </View>

      <View className="grid grid-cols-2 gap-3 p-4">
        {teachers.map((teacher) => (
          <View
            key={teacher.name}
            className="border border-slate-100 bg-white p-4 shadow-sm"
            style={{ borderRadius: '28rpx' }}
          >
            <Image
              src="https://picsum.photos/seed/teacher/240/240"
              className="mb-3 h-16 w-16 rounded-full"
              mode="aspectFill"
            />
            <Text className="block text-sm font-bold text-slate-900">{teacher.name}</Text>
            <Text className="mb-2 block text-xs text-slate-500">{teacher.title}</Text>
            <View className="inline-flex rounded-full bg-slate-100 px-2 py-1">
              <Text className="text-xs text-slate-600">{teacher.tag}</Text>
            </View>
          </View>
        ))}
      </View>

      <View className="mx-4 bg-slate-900 p-5" style={{ borderRadius: '30rpx' }}>
        <Text className="mb-2 block text-sm font-bold text-white">教学机制</Text>
        <Text className="block text-xs leading-5 text-slate-200">
          阶段测评、错题复盘、重点突破计划和班级督学同步推进，帮助学员持续积累。
        </Text>
      </View>
    </View>
  );
}
