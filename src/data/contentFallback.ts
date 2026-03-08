export const fallbackContent = {
  site: {
    _id: 'default',
    siteName: '启航专转本',
    brandName: '淮安启航专转本',
    contactPhone: '400-000-0000',
    contactWechat: 'qihang-zhuanzhuanben',
    contactQrcode: '',
    address: '江苏省淮安市',
    serviceHours: '09:00-21:00',
    intro: '专注江苏专转本备考服务。'
  },
  pages: {
    home: {
      hero: {
        chip: '江苏省专转本权威培训品牌',
        title: '专注江苏专转本',
        highlightTitle: '医护与高数精细化教研',
        desc: '以医护大类与高数专项为核心，提供更稳、更清晰的专转本备考支持。',
        tags: ['机构介绍', '开设方向', '师资团队'],
        primaryButton: { text: '了解机构实力', url: '/pages/about/index', openType: 'navigate' },
        secondaryNote: '集训管理 · 跟踪答疑',
        backgroundImageSeed: 'university'
      },
      overviewStats: [
        { value: '核心', label: '教研团队', note: '全职答疑' },
        { value: '精品', label: '小班督学', note: '全程跟进' },
        { value: '高', label: '上岸率', note: '双主线教研' }
      ],
      quickLinks: [
        { label: '机构介绍', desc: '看品牌介绍', url: '/pages/about/index', openType: 'navigate', icon: 'building' },
        { label: '开设方向', desc: '看方向配置', url: '/pages/courses/index', openType: 'switchTab', icon: 'compass' },
        { label: '师资团队', desc: '看老师阵容', url: '/pages/teachers/index', openType: 'switchTab', icon: 'team' },
        { label: '办学成果', desc: '看上岸案例', url: '/pages/success/index', openType: 'switchTab', icon: 'trophy' }
      ],
      advantages: [
        { icon: 'team', title: '全职教研团队', desc: '老师全职坐班，答疑更及时' },
        { icon: 'building', title: '独立封闭校区', desc: '吃住学一体化，节奏更稳定' },
        { icon: 'book', title: '自编内部教材', desc: '紧跟考纲更新，自编配套资料' },
        { icon: 'shield', title: '严格督学体系', desc: '日清周测月考，全程督学' }
      ],
      directionsIntro: '两条成熟教研主线，对应不同基础与目标。',
      featuredDirectionIds: ['direction_medical', 'direction_math'],
      moreDirectionCard: {
        title: '更多专业方向',
        tag: '筹备中',
        desc: '经管、计算机等更多方向教研团队正在组建中，敬请期待。'
      },
      environmentSection: {
        title: '沉浸式学习环境',
        subtitle: '学习与生活空间',
        cards: [
          { label: '多媒体教室', imageSeed: 'classroom1' },
          { label: '标准化宿舍', imageSeed: 'dorm1' },
          { label: '自习室与答疑区', imageSeed: 'library' }
        ]
      },
      cta: {
        title: '免费学情评估',
        desc: '不确定适合哪个方向时，可以先做一次简要评估。',
        buttonText: '预约咨询',
        footnote: '方向建议 · 学情诊断'
      }
    },
    courses: {
      title: '开设方向',
      subtitle: '精细化教研，按专业方向提供针对性辅导',
      categories: ['全部方向', '医护大类', '高数专项', '更多筹备'],
      suggestions: [
        '护理/助产/临床背景，建议选择 医护大类方向',
        '理工/经管类且数学薄弱，建议选择 高数专项突破',
        '跨考或暂未明确方向，建议先进行 1对1 学情评估'
      ],
      featuredDirectionIds: ['direction_medical', 'direction_math'],
      moreSection: {
        title: '更多专业方向',
        tag: '筹备中',
        desc: '经管、计算机等更多方向教研团队正在组建中，敬请期待。'
      }
    },
    teachers: {
      hero: {
        chip: '师资阵容',
        title: '师资团队',
        desc: '核心教研、一线主讲与班主任督学联动，覆盖专业课、公共课和备考管理的完整协作。',
        imageSeed: 'lecture'
      },
      introCard: {
        title: '全职教研协同',
        desc: '教学、答疑、督学与复盘协同推进，让课程与管理形成统一执行标准。'
      },
      features: [
        { title: '全职坐班答疑', desc: '课程推进、答疑复盘与阶段督学同步进行，不让学习管理与课程脱节。' },
        { title: '专业课与公共课协同', desc: '不同方向老师共同参与课程规划，重点内容和训练节奏能互相对齐。' },
        { title: '班主任全程跟踪', desc: '日常管理、测评反馈和节奏提醒并行，帮助学员保持持续执行。' }
      ],
      cta: {
        title: '先了解适合你的老师配置',
        desc: '不同方向、不同基础的学员，适合的主讲与督学组合并不相同，先沟通再安排更稳。',
        buttonText: '预约老师咨询',
        footnote: '方向匹配 · 课程说明 · 督学方式'
      }
    },
    success: {
      hero: {
        chip: '办学成果',
        title: '办学成果',
        desc: '历年上岸表现和学员反馈持续积累，逐步沉淀出更稳定的提分路径与复盘经验。'
      },
      stats: [
        { value: '高', label: '上岸率', note: '稳定表现' },
        { value: '精', label: '小班制', note: '节奏清晰' },
        { value: '强', label: '口碑力', note: '持续积累' }
      ],
      cta: {
        title: '成果来自体系化执行',
        desc: '方向选择、课程安排、阶段测评、督学反馈与复盘执行持续协同，结果才会更稳定。',
        buttonText: '了解上岸规划',
        footnote: '路径规划 · 节奏管理 · 结果复盘'
      }
    },
    about: {
      hero: {
        chip: '机构概览',
        title: '关于我们',
        desc: '专注专转本备考服务，以高标准教研、精细化管理和沉浸式学习环境作为机构的长期基础。',
        imageSeed: 'campus'
      },
      introCard: {
        title: '淮安启航专转本',
        desc: '围绕方向规划、课程辅导、班级管理和日常答疑，帮助学员建立更稳定的备考节奏与执行路径。'
      },
      values: [
        { title: '品牌理念', desc: '坚持“严管厚爱，教书育人”，把教研质量、学习管理和答疑服务作为同等重要的基础能力。' },
        { title: '服务体系', desc: '围绕方向规划、课程辅导、阶段测评、专项提升和全程督学，形成完整的备考支持链路。' }
      ],
      environmentImages: [
        { label: '多媒体教室', imageSeed: 'campus1' },
        { label: '标准化宿舍', imageSeed: 'campus2' }
      ],
      cta: {
        title: '先了解机构，再定备考路线',
        desc: '如果你想先确认环境、管理方式、课程节奏和方向匹配，可以先预约一次机构沟通。',
        buttonText: '预约机构咨询',
        footnote: '环境了解 · 课程说明 · 方向建议'
      }
    },
    materials: {
      hero: {
        chip: '教材资料',
        title: '自编资料体系',
        desc: '围绕高数与医护两大方向，整理教材、习题集、模拟卷和考前冲刺卷，便于分阶段使用。',
        imageSeed: 'materials'
      },
      tabs: ['全部资料', '高数系列', '医护系列', '考前冲刺'],
      overviewStats: [
        { value: '8+', label: '在售资料', note: '教材 / 习题 / 模拟 / 冲刺' },
        { value: '2', label: '核心方向', note: '高数 / 医护两大主线' },
        { value: '4', label: '资料类型', note: '按备考阶段拆分组合' }
      ],
      featuredSeriesIds: ['series_math', 'series_medical'],
      cta: {
        title: '先看资料目录，再选适合你的组合',
        desc: '如果你想知道每本教材适合哪个阶段、配套什么题目训练，先沟通后再安排会更清楚。',
        buttonText: '咨询资料详情',
        footnote: '资料目录 · 使用建议 · 阶段搭配'
      }
    }
  },
  directions: [
    {
      _id: 'direction_medical',
      name: '医护大类方向',
      slug: 'medical',
      category: '医护大类',
      isFeatured: true,
      featuredTag: '优势王牌方向',
      homeTag: '优势王牌',
      summary: '适合护理、助产、临床等方向，专业课与公共课同步推进。',
      audience: '专科为护理、助产、临床医学等专业，目标公办或优质民办本科的学员。',
      features: ['解剖学、生理学等核心专业课精讲', '历年医护类真题题库与考点串讲', '阶段测评与医护方向专项答疑', '小班化督学管理，兼顾进度与吸收率'],
      chips: ['适合医护类学员', '医护方向教研组', '历届高上岸表现'],
      iconType: 'medical',
      homeCard: {
        tag: '优势王牌',
        tagColor: '#4f46e5',
        tagBackground: '#eef2ff',
        headerBackground: '#f7f5ff',
        iconColor: '#5b4dff'
      },
      coursesCard: {
        style: 'dark',
        tag: '优势王牌方向',
        accent: '#5b4dff',
        background: 'linear-gradient(180deg, #101a38 0%, #0b1430 100%)',
        iconBg: 'rgba(91,77,255,0.24)',
        iconType: 'pulse'
      },
      sort: 10,
      status: 'published'
    },
    {
      _id: 'direction_math',
      name: '高数专项突破',
      slug: 'math',
      category: '高数专项',
      isFeatured: true,
      featuredTag: '重点建设方向',
      homeTag: '重点建设',
      summary: '适合理工、经管类考生，按基础梳理到冲刺训练推进。',
      audience: '理工、经管类考生，高数基础薄弱、恐惧数学，需要单科提分的学员。',
      features: ['从零基础概念扫盲到公式定理推导', '典型例题剖析与解题套路总结', '阶段性测试反馈，查漏补缺', '小班化精细教学，关注个体吸收率'],
      chips: ['专职高数教研组', '稳扎稳打策略'],
      iconType: 'grid',
      homeCard: {
        tag: '重点建设',
        tagColor: '#0f172a',
        tagBackground: '#e2e8f0',
        headerBackground: '#f8fafc',
        iconColor: '#334155'
      },
      coursesCard: {
        style: 'light',
        tag: '重点建设方向',
        accent: '#334155',
        background: '#ffffff',
        iconBg: '#eef2f7',
        iconType: 'grid'
      },
      sort: 20,
      status: 'published'
    }
  ],
  teachers: [
    { _id: 'teacher_zhang', name: '张老师', role: '医护方向主讲', tag: '十年教研经验', avatarSeed: 'teacher-zhang', intro: '', specialties: [], sort: 10, status: 'published' },
    { _id: 'teacher_li', name: '李老师', role: '高数专项讲师', tag: '体系化提分', avatarSeed: 'teacher-li', intro: '', specialties: [], sort: 20, status: 'published' },
    { _id: 'teacher_wang', name: '王老师', role: '公共课讲师', tag: '真题讲解', avatarSeed: 'teacher-wang', intro: '', specialties: [], sort: 30, status: 'published' },
    { _id: 'teacher_zhao', name: '赵老师', role: '班主任督学', tag: '全程跟踪', avatarSeed: 'teacher-zhao', intro: '', specialties: [], sort: 40, status: 'published' }
  ],
  successCases: [
    { _id: 'success_2025', title: '2025 上岸分享', subtitle: '医护方向高分录取案例与备考复盘。', coverSeed: 'success-2025', year: 2025, category: '医护方向', sort: 10, status: 'published' },
    { _id: 'success_2024', title: '2024 上岸分享', subtitle: '高数专项突破案例与单科提升路径。', coverSeed: 'success-2024', year: 2024, category: '高数专项', sort: 20, status: 'published' },
    { _id: 'success_2023', title: '2023 上岸分享', subtitle: '跨考逆袭经验与阶段执行心得。', coverSeed: 'success-2023', year: 2023, category: '跨考案例', sort: 30, status: 'published' }
  ],
  materialSeries: [
    { _id: 'series_math', name: '高数资料套系', slug: 'math', category: '高数系列', tag: '主推套装', accent: '#5b4dff', summary: '覆盖基础梳理、专项训练、整卷模拟和考前冲刺，适合完整备考周期使用。', shelfLabel: '高数资料书架', items: ['核心精讲', '题型训练', '全真模拟', '冲刺卷'], sort: 10, status: 'published' },
    { _id: 'series_medical', name: '医护资料套系', slug: 'medical', category: '医护系列', tag: '方向资料', accent: '#0f172a', summary: '围绕专业课与公共课协同整理，便于医护类学员按阶段推进复习节奏。', shelfLabel: '医护资料书架', items: ['核心讲义', '高频题型', '全真模拟', '冲刺卷'], sort: 20, status: 'published' }
  ],
  materialItems: [
    { _id: 'material_math_textbook', seriesId: 'series_math', type: '教材', title: '高数核心精讲', stage: '基础阶段', subtitle: '公式体系 / 概念重建', desc: '围绕公式体系、核心概念和高频考点搭建完整知识框架。', contents: ['知识框架', '例题精讲', '阶段小结'], sort: 10, status: 'published' },
    { _id: 'material_math_exercises', seriesId: 'series_math', type: '习题集', title: '高数题型训练', stage: '强化阶段', subtitle: '题型拆解 / 方法归纳', desc: '针对典型题型做拆解训练，适合日常刷题和阶段巩固。', contents: ['专项训练', '错题复盘', '解题方法'], sort: 20, status: 'published' },
    { _id: 'material_math_mock', seriesId: 'series_math', type: '模拟卷', title: '高数全真模拟卷', stage: '冲刺阶段', subtitle: '整卷训练 / 节奏校准', desc: '按照考试节奏设计整卷训练，帮助学员建立答题时间感。', contents: ['整卷练习', '答案解析', '时间分配'], sort: 30, status: 'published' },
    { _id: 'material_math_final', seriesId: 'series_math', type: '冲刺卷', title: '高数考前冲刺卷', stage: '考前阶段', subtitle: '高频压缩 / 易错回看', desc: '聚焦最后阶段的高频点、易错点和压轴题型回顾。', contents: ['高频考点', '压轴回顾', '考前提示'], sort: 40, status: 'published' },
    { _id: 'material_medical_textbook', seriesId: 'series_medical', type: '教材', title: '医护核心知识讲义', stage: '基础阶段', subtitle: '框架梳理 / 核心课协同', desc: '梳理解剖、生理、护理等核心课程框架，适合系统复习。', contents: ['知识梳理', '核心笔记', '重点归纳'], sort: 50, status: 'published' },
    { _id: 'material_medical_exercises', seriesId: 'series_medical', type: '习题集', title: '医护高频题型集', stage: '强化阶段', subtitle: '专项刷题 / 高频整理', desc: '把高频考点拆成专项训练，便于阶段刷题与错题复盘。', contents: ['专项习题', '高频考点', '错题复盘'], sort: 60, status: 'published' },
    { _id: 'material_medical_mock', seriesId: 'series_medical', type: '模拟卷', title: '医护全真模拟卷', stage: '冲刺阶段', subtitle: '整卷模考 / 结构训练', desc: '按真实考试结构组卷，适合整卷检测与答题节奏训练。', contents: ['整卷模考', '答案解析', '分值结构'], sort: 70, status: 'published' },
    { _id: 'material_medical_final', seriesId: 'series_medical', type: '冲刺卷', title: '医护考前冲刺卷', stage: '考前阶段', subtitle: '最后回看 / 高频压缩', desc: '聚焦考前高频考点压缩复习，方便最后阶段集中回看。', contents: ['考前压缩', '高频回顾', '冲刺提示'], sort: 80, status: 'published' }
  ]
};

export default fallbackContent;
