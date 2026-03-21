export const fallbackContent = {
  site: {
    _id: 'default',
    siteName: '启航专转本',
    brandName: '淮安启航专转本',
    contactPhone: '400-000-0000',
    contactWechat: 'qihang-zhuanzhuanben',
    contactQrcode: '',
    contactQrcodeUrl: '',
    address: '江苏省淮安市',
    serviceHours: '09:00-21:00',
    intro: '专注江苏专转本备考服务。'
  },
  pages: {
    home: {
      hero: {
        chip: '护理 / 助产 / 医护背景同学',
        title: '想冲江苏专转本？',
        highlightTitle: '先判断方向，再安排课程',
        desc: '新同学先看适合方向和课程安排，在学同学再进入每日一题、模拟题和错题本。',
        tags: ['92.3% 上岸率', '1:8 小班跟进', '独立校区学习'],
        primaryButton: { text: '了解课程安排', url: '/pages/courses/index', openType: 'switchTab' },
        secondaryNote: '先选方向，再做训练',
        backgroundImageUrl: '',
        backgroundImageSeed: 'university'
      },
      overviewStats: [
        { value: '92.3%', label: '上岸率', note: '2025届实际数据' },
        { value: '1:8', label: '师生比', note: '小班精细化' },
        { value: '365天', label: '全年答疑', note: '全职坐班' }
      ],
      quickLinks: [
        { label: '机构介绍', desc: '看品牌介绍', url: '/pages/about/index', openType: 'navigate', icon: 'building' },
        { label: '每日一题', desc: '在学每日打卡', url: '/pages/question-bank/daily-question/index', openType: 'navigate', icon: 'daily' },
        { label: '模拟题', desc: '考前整卷冲刺', url: '/pages/question-bank/past-papers/index', openType: 'navigate', icon: 'paper' },
        { label: '错题本', desc: '回看薄弱题', url: '/pages/question-bank/wrong-book/index', openType: 'navigate', icon: 'wrongbook' }
      ],
      advantages: [
        { icon: 'team', title: '答疑有人盯', desc: '第一次来了解也能先把基础、目标院校和卡点问清楚，问题当天就有人跟进。' },
        { icon: 'building', title: '备考节奏更稳', desc: '课程、督学和住宿安排放在同一节奏里，适合想集中投入、少走弯路的同学。' },
        { icon: 'book', title: '阶段反馈更清楚', desc: '每一阶段先看哪里薄弱、哪里该补，再决定下一步怎么学，不会一直闷头硬扛。' },
        { icon: 'check', title: '学情评估先做', desc: '如果专业跨度大或还没想清方向，可以先做 1 对 1 学情评估，再安排更合适的备考线。' }
      ],
      directionsIntro: '',
      featuredDirectionIds: ['direction_medical', 'direction_math'],
      moreDirectionCard: {
        title: '',
        tag: '',
        desc: ''
      },
      environmentSection: {
        title: '',
        subtitle: '',
        cards: [
          { label: '多媒体教室', imageUrl: '', imageSeed: 'classroom1' },
          { label: '标准化宿舍', imageUrl: '', imageSeed: 'dorm1' }
        ]
      },
      cta: {
        title: '先聊清楚，再决定报哪条线',
        desc: '把当前专业、目标院校和备考时间说明白，我们会先帮你判断适合的方向，再给课程安排建议。',
        buttonText: '预约咨询',
        footnote: ''
      }
    },
    questionBank: {
      hero: {
        chip: '医护轻题库',
        title: '题库入口配置',
        desc: '这里集中维护每日一题、模拟题与错题本的页面文案，模拟题支持 CSV 热更新。'
      },
      dailyQuestionCard: {
        title: '每日一题',
        desc: '固定练习题组，适合每天保持手感与做题节奏。',
        buttonText: '进入每日一题',
        note: '固定题源'
      },
      pastPapersCard: {
        title: '模拟题',
        desc: '按套练模拟卷，支持通过 CSV 持续热更新题目内容。',
        buttonText: '进入模拟题',
        note: '支持 CSV 热更新'
      },
      wrongBookCard: {
        title: '错题本',
        desc: '沉淀做错题目和解析，方便回看与重复练习。',
        buttonText: '回看错题',
        note: '错题复盘与回看'
      },
      importGuide: {
        title: '纯文本导入',
        desc: '支持直接粘贴原始题文、整卷文本或错题整理，后续再做结构化处理。',
        templateText: '【题目来源】2025 医护真题\\n【题型】单选题\\n【题干】\\n【选项】A.\\nB.\\nC.\\nD.\\n【答案】\\n【解析】'
      }
    },
    courses: {
      title: '先判断适合哪条备考线',
      subtitle: '第一次了解专转本培训，先看自己更接近医护大类还是高数专项，再决定课程安排和备考节奏。',
      categories: ['我是医护背景', '我数学薄弱', '我想先做评估'],
      suggestions: [
        '护理、助产、临床等专业，优先看医护大类方向。',
        '理工、经管类且高数薄弱，优先看高数专项突破。',
        '如果暂时拿不准方向，先做 1 对 1 学情评估。'
      ],
      featuredDirectionIds: ['direction_medical', 'direction_math'],
      moreSection: {
        title: '更多方向补充',
        tag: '持续完善',
        desc: '经管、计算机等方向内容会逐步补充；如果你暂时不确定，也可以先做方向判断。'
      },
      cta: {
        title: '拿不准该选哪条线？',
        desc: '把当前专业、基础和目标院校告诉我们，我们会先帮你判断适合的方向，再给课程安排建议。',
        buttonText: '先做方向判断',
        footnote: '方向判断 · 课程安排 · 学情评估'
      }
    },
    teachers: {
      hero: {
        chip: '带学团队',
        title: '先看看谁在带你往前走',
        desc: '第一次了解课程时，先认识主讲、答疑和督学怎么配合，判断这套带学方式适不适合自己。',
        imageUrl: '',
        imageSeed: 'lecture'
      },
      introCard: {
        title: '不是单个老师单打独斗',
        desc: '主讲负责把内容讲透，答疑老师负责盯问题，班主任负责节奏推进，三条线一起把学习拉稳。'
      },
      features: [
        { title: '主讲、答疑、督学同频', desc: '不是只上完课就结束，遇到问题、掉队和卡点时，会有人及时把你拉回来。' },
        { title: '专业课与公共课一起规划', desc: '不同老师会按方向和基础一起排节奏，避免只顾一科、另一科又被落下。' },
        { title: '阶段反馈不断档', desc: '每个阶段都会先看哪里吸收住了、哪里还薄弱，再决定下一步怎么学更稳。' }
      ],
      cta: {
        title: '先聊清楚你适合哪种带学方式',
        desc: '把当前专业、基础和备考时间告诉我们，我们会先帮你判断更适合的老师配置和学习节奏。',
        buttonText: '了解老师安排',
        footnote: '老师配置 · 督学方式 · 课程节奏'
      }
    },
    success: {
      hero: {
        chip: '上岸结果',
        title: '先看结果，再判断要不要继续了解',
        desc: '第一次来了解，最想看到的是结果是不是扎实、路径是不是清楚，这里先把可感知的上岸证明放在前面。'
      },
      stats: [
        { value: '92.3%', label: '2025届上岸率', note: '真实复盘可查' },
        { value: '1:8', label: '小班跟进比', note: '主讲与督学同步' },
        { value: '3年', label: '持续上岸案例', note: '不同基础都有参考' }
      ],
      cta: {
        title: '想知道自己更接近哪种上岸路径？',
        desc: '把当前专业、基础和目标院校告诉我们，我们会结合已有案例，先帮你判断更接近哪条备考路径。',
        buttonText: '看看适合的上岸路径',
        footnote: '结果参考 · 路径判断 · 节奏建议'
      }
    },
    about: {
      hero: {
        chip: '机构概览',
        title: '关于我们',
        desc: '专注专转本备考服务，以高标准教研、精细化管理和沉浸式学习环境作为机构的长期基础。',
        imageUrl: '',
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
        { label: '多媒体教室', imageUrl: '', imageSeed: 'campus1' },
        { label: '标准化宿舍', imageUrl: '', imageSeed: 'campus2' }
      ],
      cta: {
        title: '先了解机构，再定备考路线',
        desc: '如果你想先确认环境、管理方式、课程节奏和方向匹配，可以先预约一次机构沟通。',
        buttonText: '预约机构咨询',
        footnote: '环境了解 · 课程说明 · 方向建议'
      }
    },
    materials: {
      header: {
        title: '教材资料库',
        searchLabel: '搜索资料'
      },
      directionTabs: [
        { key: 'math', label: '高等数学', icon: 'grid' },
        { key: 'medical', label: '医护综合', icon: 'medical' }
      ],
      stageTabs: [
        { key: 'foundation', label: '基础阶段' },
        { key: 'reinforcement', label: '强化阶段' },
        { key: 'sprint', label: '冲刺阶段' }
      ],
      mainSection: {
        title: '核心主推套系',
        sideNote: '最适合当前阶段'
      },
      shelfSection: {
        title: '套系包含以下资料：',
        hint: '左右滑动查看'
      },
      consultBar: {
        title: '不知道怎么选？',
        desc: '专业老师为您1对1定制资料方案',
        buttonText: '免费咨询'
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
    { _id: 'teacher_zhang', name: '张老师', role: '医护方向主讲', tag: '十年教研经验', avatarUrl: '', avatarSeed: 'teacher-zhang', intro: '主带医护方向专业课，把知识框架和高频考点讲得更清楚。', specialties: ['医护专业课', '考点串讲', '阶段复盘'], sort: 10, status: 'published' },
    { _id: 'teacher_li', name: '李老师', role: '高数专项讲师', tag: '体系化提分', avatarUrl: '', avatarSeed: 'teacher-li', intro: '主带高数提分，从基础梳理到整卷训练都会拆开讲明白。', specialties: ['高数梳理', '题型突破', '冲刺训练'], sort: 20, status: 'published' },
    { _id: 'teacher_wang', name: '王老师', role: '公共课讲师', tag: '真题讲解', avatarUrl: '', avatarSeed: 'teacher-wang', intro: '负责公共课讲解和真题方法归纳，适合用来补齐短板。', specialties: ['英语语法', '真题讲解', '方法归纳'], sort: 30, status: 'published' },
    { _id: 'teacher_zhao', name: '赵老师', role: '班主任督学', tag: '全程跟踪', avatarUrl: '', avatarSeed: 'teacher-zhao', intro: '负责班级节奏、答疑跟进和阶段提醒，帮你把执行落下去。', specialties: ['督学跟进', '打卡反馈', '节奏管理'], sort: 40, status: 'published' }
  ],
  successCases: [
    { _id: 'success_2025', title: '2025 护理方向上岸复盘', subtitle: '从基础薄弱到稳定提分，最后被目标本科录取。', coverUrl: '', coverSeed: 'success-2025', year: 2025, category: '医护方向', sort: 10, status: 'published' },
    { _id: 'success_2024', title: '2024 高数单科突破复盘', subtitle: '先补基础再做整卷训练，单科成绩明显提升。', coverUrl: '', coverSeed: 'success-2024', year: 2024, category: '高数专项', sort: 20, status: 'published' },
    { _id: 'success_2023', title: '2023 跨专业备考逆袭', subtitle: '时间紧也能按阶段推进，最终完成上岸目标。', coverUrl: '', coverSeed: 'success-2023', year: 2023, category: '跨考案例', sort: 30, status: 'published' }
  ],
  materialPackages: [
    { _id: 'package_math_foundation', direction: 'math', stage: 'foundation', badge: '零基础首选', title: '2027版 高数全程通关尊享包', target: '基础薄弱、跨考、需要从零系统构建知识体系的同学', solves: '知识点零散无从下手、缺乏系统训练、做题没思路', features: ['名师主编', '阶梯式训练', '全真模拟'], contentItemIds: ['item_math_foundation_textbook', 'item_math_foundation_workbook', 'item_math_foundation_exam'], sort: 10, status: 'published' },
    { _id: 'package_math_reinforcement', direction: 'math', stage: 'reinforcement', badge: '突破瓶颈', title: '高数强化提分突击包', target: '基础已过完，需要掌握解题技巧、提高做题速度的同学', solves: '做题慢、综合题没思路、容易掉入陷阱', features: ['题型归纳', '秒杀技巧', '重难点突破'], contentItemIds: ['item_math_reinforcement_skills', 'item_math_reinforcement_truepaper', 'item_math_reinforcement_errorbook'], sort: 20, status: 'published' },
    { _id: 'package_math_sprint', direction: 'math', stage: 'sprint', badge: '考前必刷', title: '高数考前冲刺押题包', target: '即将参加考试，需要全真模拟、调整应试状态的同学', solves: '时间分配不合理、缺乏临场经验、对最新考情不敏感', features: ['全真模拟', '名师押题', '考前点拨'], contentItemIds: ['item_math_sprint_mock', 'item_math_sprint_press', 'item_math_sprint_formula'], sort: 30, status: 'published' },
    { _id: 'package_medical_foundation', direction: 'medical', stage: 'foundation', badge: '跨考福音', title: '医护综合系统精讲包', target: '护理/医学类专业，需要系统掌握解剖、生理等基础知识的同学', solves: '医学名词难记、知识点繁杂、缺乏临床联系', features: ['图文并茂', '口诀记忆', '考纲全覆盖'], contentItemIds: ['item_medical_foundation_textbook', 'item_medical_foundation_workbook', 'item_medical_foundation_memory'], sort: 40, status: 'published' },
    { _id: 'package_medical_reinforcement', direction: 'medical', stage: 'reinforcement', badge: '提分关键', title: '医护综合强化刷题包', target: '一轮已过，需要串联知识点并提升做题速度的同学', solves: '章节会但综合题不会、易混淆考点多、题量练得不够', features: ['专题刷题', '易错归纳', '临床联系'], contentItemIds: ['item_medical_reinforcement_topic', 'item_medical_reinforcement_errorbook', 'item_medical_reinforcement_case'], sort: 50, status: 'published' },
    { _id: 'package_medical_sprint', direction: 'medical', stage: 'sprint', badge: '临考冲刺', title: '医护综合考前冲刺包', target: '考前查漏补缺，需要整卷模拟和重点再压缩的同学', solves: '临考节奏乱、主干考点抓不牢、模拟实战不够', features: ['考前速记', '整卷模考', '押题点拨'], contentItemIds: ['item_medical_sprint_mock', 'item_medical_sprint_memory', 'item_medical_sprint_press'], sort: 60, status: 'published' }
  ],
  materialItems: [
    { _id: 'item_math_foundation_textbook', direction: 'math', stage: 'foundation', type: '核心教材', title: '高数全程通关主教材', subtitle: '从零搭好知识框架', desc: '名师主编，概念讲透', details: '从极限、导数到积分逐章搭建知识主线，适合第一轮系统梳理。', accentStart: '#2f66ff', accentEnd: '#4f8dff', sort: 10, status: 'published' },
    { _id: 'item_math_foundation_workbook', direction: 'math', stage: 'foundation', type: '配套习题', title: '基础必刷同步训练', subtitle: '按章节递进训练', desc: '学练结合，加深记忆', details: '每章配套基础题和过关题，适合边学边练，尽快把思路练顺。', accentStart: '#4c60ff', accentEnd: '#746bff', sort: 20, status: 'published' },
    { _id: 'item_math_foundation_exam', direction: 'math', stage: 'foundation', type: '阶段测评', title: '模块通关测评卷', subtitle: '检验阶段学习成果', desc: '阶段检验，及时查漏', details: '按知识模块组织阶段测评，帮助你及时判断哪里已经稳、哪里还要补。', accentStart: '#0ea5a4', accentEnd: '#24c5a6', sort: 30, status: 'published' },
    { _id: 'item_math_reinforcement_skills', direction: 'math', stage: 'reinforcement', type: '题型突破', title: '高数题型拆解手册', subtitle: '高频题型逐类击破', desc: '方法归纳，提速提分', details: '把高频题型按解题步骤拆开讲明白，适合从“会做”走向“做快做稳”。', accentStart: '#2f66ff', accentEnd: '#4f8dff', sort: 40, status: 'published' },
    { _id: 'item_math_reinforcement_truepaper', direction: 'math', stage: 'reinforcement', type: '配套习题', title: '专题强化练习册', subtitle: '刷熟综合题路径', desc: '专题聚焦，强化训练', details: '围绕导数、积分、微分方程等专题做高密度训练，帮助建立综合题手感。', accentStart: '#4c60ff', accentEnd: '#746bff', sort: 50, status: 'published' },
    { _id: 'item_math_reinforcement_errorbook', direction: 'math', stage: 'reinforcement', type: '易错归纳', title: '高数易错点复盘册', subtitle: '难点陷阱集中回看', desc: '错因归纳，避免重复失分', details: '把常见失分点和典型陷阱集中整理，适合第二轮专项查漏。', accentStart: '#0ea5a4', accentEnd: '#24c5a6', sort: 60, status: 'published' },
    { _id: 'item_math_sprint_mock', direction: 'math', stage: 'sprint', type: '全真模考', title: '高数全真模拟卷', subtitle: '整卷训练与节奏校准', desc: '限时训练，找准节奏', details: '按真实考试结构组卷，帮助你在考前稳定答题时间和节奏。', accentStart: '#2f66ff', accentEnd: '#4f8dff', sort: 70, status: 'published' },
    { _id: 'item_math_sprint_press', direction: 'math', stage: 'sprint', type: '押题冲刺', title: '高数押题精练', subtitle: '考前重点题型再压缩', desc: '命题趋势，重点回看', details: '聚焦考前最值得反复看的重点题型和命题趋势，适合最后冲刺提神。', accentStart: '#4c60ff', accentEnd: '#746bff', sort: 80, status: 'published' },
    { _id: 'item_math_sprint_formula', direction: 'math', stage: 'sprint', type: '公式手册', title: '高数公式速查手册', subtitle: '考前高频公式浓缩', desc: '高频公式，临考速记', details: '将高频公式和常用结论压缩成考前速查卡，方便最后阶段反复回看。', accentStart: '#0ea5a4', accentEnd: '#24c5a6', sort: 90, status: 'published' },
    { _id: 'item_medical_foundation_textbook', direction: 'medical', stage: 'foundation', type: '核心教材', title: '医护综合核心考点（全彩版）', subtitle: '全彩图解，直观易懂', desc: '图文并茂，系统梳理', details: '围绕解剖、生理、护理等主干内容做全彩图解，更适合第一轮建立整体理解。', accentStart: '#14b8a6', accentEnd: '#0f9f8f', sort: 100, status: 'published' },
    { _id: 'item_medical_foundation_workbook', direction: 'medical', stage: 'foundation', type: '配套习题', title: '章节同步练习册', subtitle: '学练结合，加深记忆', desc: '章节配套，巩固基础', details: '每章配套基础题和巩固题，帮助把抽象概念尽快落到题感上。', accentStart: '#1aa0ff', accentEnd: '#1886ff', sort: 110, status: 'published' },
    { _id: 'item_medical_foundation_memory', direction: 'medical', stage: 'foundation', type: '记忆手册', title: '高频考点速记手册', subtitle: '独家记忆口诀', desc: '高频浓缩，反复回看', details: '把高频名词、常考口诀和主干考点压缩整理，方便日常记忆回看。', accentStart: '#6a7dff', accentEnd: '#5374ff', sort: 120, status: 'published' },
    { _id: 'item_medical_reinforcement_topic', direction: 'medical', stage: 'reinforcement', type: '专题刷题', title: '医护综合专题练习册', subtitle: '高频专题逐个突破', desc: '专题训练，强化提分', details: '以系统专题形式组织题目，帮助把零散知识点真正串成完整答题路径。', accentStart: '#14b8a6', accentEnd: '#0f9f8f', sort: 130, status: 'published' },
    { _id: 'item_medical_reinforcement_errorbook', direction: 'medical', stage: 'reinforcement', type: '易错归纳', title: '医护综合易错点复盘册', subtitle: '混淆考点重点回看', desc: '易错归纳，减少失分', details: '针对高频混淆概念、典型易错点和易漏主干内容做集中复盘。', accentStart: '#1aa0ff', accentEnd: '#1886ff', sort: 140, status: 'published' },
    { _id: 'item_medical_reinforcement_case', direction: 'medical', stage: 'reinforcement', type: '临床联系', title: '临床情境应用手册', subtitle: '把知识点连到场景里', desc: '临床联系，更好理解', details: '用临床情境帮助理解抽象知识点，适合第二轮加深理解和记忆。', accentStart: '#6a7dff', accentEnd: '#5374ff', sort: 150, status: 'published' },
    { _id: 'item_medical_sprint_mock', direction: 'medical', stage: 'sprint', type: '整卷模考', title: '医护综合全真模拟卷', subtitle: '按考试结构整卷训练', desc: '整卷模考，稳住节奏', details: '按真实考试结构组织整卷训练，帮助考前把答题节奏和分值感拉稳。', accentStart: '#14b8a6', accentEnd: '#0f9f8f', sort: 160, status: 'published' },
    { _id: 'item_medical_sprint_memory', direction: 'medical', stage: 'sprint', type: '考前速记', title: '医护综合冲刺速记册', subtitle: '主干考点最后压缩', desc: '速记浓缩，考前回看', details: '把最后阶段最值得反复看的主干内容浓缩成便携速记册，方便考前复盘。', accentStart: '#1aa0ff', accentEnd: '#1886ff', sort: 170, status: 'published' },
    { _id: 'item_medical_sprint_press', direction: 'medical', stage: 'sprint', type: '押题点拨', title: '考前押题点拨卷', subtitle: '冲刺阶段重点再压题', desc: '考前点拨，最后冲刺', details: '结合近年命题趋势做考前重点点拨，适合最后阶段把注意力收回主干考点。', accentStart: '#6a7dff', accentEnd: '#5374ff', sort: 180, status: 'published' }
  ],
  mediaAssets: []
};

export default fallbackContent;
