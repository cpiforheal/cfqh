const statusOptions = [
  { label: '已发布', value: 'published' },
  { label: '草稿', value: 'draft' },
  { label: '归档', value: 'archived' },
  { label: '已删除', value: 'deleted' }
];

const roleOptions = [
  { label: 'Owner', value: 'owner' },
  { label: 'Editor', value: 'editor' }
];

const openTypeOptions = [
  { label: '页面跳转', value: 'navigate' },
  { label: 'Tab 切换', value: 'switchTab' },
  { label: '重新进入', value: 'reLaunch' }
];

const directionIconOptions = [
  { label: '网格', value: 'grid' },
  { label: '医护', value: 'medical' },
  { label: '脉冲', value: 'pulse' }
];

const materialDirectionOptions = [
  { label: '高等数学', value: 'math' },
  { label: '医护综合', value: 'medical' }
];

const materialStageOptions = [
  { label: '基础阶段', value: 'foundation' },
  { label: '强化阶段', value: 'reinforcement' },
  { label: '冲刺阶段', value: 'sprint' }
];

const successDirectionOptions = [
  { label: '高等数学', value: 'math' },
  { label: '医护综合', value: 'medical' }
];

const pageHeroBasicFields = [
  { key: 'chip', label: '区块角标', type: 'text', required: true },
  { key: 'title', label: '区块主标题', type: 'text', required: true },
  { key: 'desc', label: '区块说明', type: 'textarea', required: true }
];

const ctaFields = [
  { key: 'title', label: '区块标题', type: 'text', required: true },
  { key: 'desc', label: '区块说明', type: 'textarea', required: true },
  { key: 'buttonText', label: '按钮文案', type: 'text', required: true },
  { key: 'footnote', label: '补充提示', type: 'text' }
];

const statFields = [
  { key: 'value', label: '数据数值', type: 'text', required: true },
  { key: 'label', label: '数据标签', type: 'text', required: true },
  { key: 'note', label: '补充提示', type: 'text' }
];

const pageValueFields = [
  { key: 'title', label: '卡片标题', type: 'text', required: true },
  { key: 'desc', label: '卡片说明', type: 'textarea', required: true }
];

function objectField(key, label, fields, extra = {}) {
  return {
    key,
    label,
    type: 'object',
    fields,
    ...extra
  };
}

function objectArrayField(key, label, fields, defaultItem, extra = {}) {
  return {
    key,
    label,
    type: 'objectArray',
    fields,
    defaultItem,
    ...extra
  };
}

export function getAdminPageFormSchema(pageKey) {
  if (pageKey === 'site') {
    return [
      { key: 'siteName', label: '小程序名称', type: 'text', required: true },
      { key: 'brandName', label: '品牌名称', type: 'text', required: true },
      { key: 'contactPhone', label: '底部联系电话', type: 'text' },
      { key: 'contactWechat', label: '咨询微信号', type: 'text' },
      { key: 'contactQrcode', label: '咨询二维码链接', type: 'text' },
      { key: 'contactQrcodeUrl', label: '咨询二维码图片地址', type: 'text', validate: 'media-url' },
      { key: 'address', label: '校区地址', type: 'text' },
      { key: 'serviceHours', label: '咨询服务时间', type: 'text' },
      { key: 'intro', label: '机构简介（关于我们页）', type: 'textarea' }
    ];
  }

  if (pageKey === 'home') {
    return [
      objectField('hero', '首页大屏主视觉', [
        { key: 'chip', label: '首页大屏小角标', type: 'text', required: true },
        { key: 'title', label: '首页大屏第一行标题', type: 'text', required: true },
        { key: 'desc', label: '首页大屏说明', type: 'textarea', required: true },
        { key: 'highlightTitle', label: '首页大屏第二行标题', type: 'text', required: true },
        { key: 'backgroundImageUrl', label: '首页大屏背景图地址', type: 'text', validate: 'media-url' },
        { key: 'tags', label: '首页大屏标签', type: 'stringArray', defaultItem: '' },
        objectField('primaryButton', '首页大屏按钮', [
          { key: 'text', label: '按钮文案', type: 'text', required: true },
          { key: 'url', label: '跳转地址', type: 'text', required: true },
          { key: 'openType', label: '跳转方式', type: 'select', options: openTypeOptions }
        ])
      ]),
      objectArrayField(
        'overviewStats',
        '首屏数据卡（3项）',
        [
          { key: 'value', label: '数值', type: 'text', required: true },
          { key: 'label', label: '标签', type: 'text', required: true }
        ],
        { value: '', label: '' },
        { maxItems: 3, visibleItems: 3 }
      ),
      objectArrayField(
        'quickLinks',
        '首页四个功能入口',
        [
          { key: 'label', label: '标题', type: 'text' },
          { key: 'url', label: '跳转地址', type: 'text' },
          { key: 'openType', label: '跳转方式', type: 'select', options: openTypeOptions },
          { key: 'icon', label: '图标标识', type: 'text' }
        ],
        { label: '', url: '', openType: 'navigate', icon: '' },
        { maxItems: 4, visibleItems: 4 }
      ),
      objectArrayField(
        'advantages',
        '学习支持（热门方向下方）',
        [
          { key: 'icon', label: '图标标识', type: 'text' },
          { key: 'title', label: '标题', type: 'text' },
          { key: 'desc', label: '说明', type: 'textarea' }
        ],
        { icon: '', title: '', desc: '' },
        { maxItems: 4, visibleItems: 4 }
      ),
      { key: 'featuredDirectionIds', label: '热门方向卡片', type: 'stringArray', defaultItem: '' },
      objectField('environmentSection', '校区环境（咨询区上方）', [
        objectArrayField(
          'cards',
          '环境图片',
          [
            { key: 'label', label: '名称', type: 'text', required: true },
            { key: 'imageUrl', label: '图片地址', type: 'text', validate: 'media-url' }
          ],
          { label: '', imageUrl: '' },
          { maxItems: 2, visibleItems: 2 }
        )
      ]),
      objectField('cta', '底部咨询区（环境下方）', [
        { key: 'title', label: '标题', type: 'text', required: true },
        { key: 'desc', label: '说明', type: 'textarea', required: true },
        { key: 'buttonText', label: '按钮文案', type: 'text', required: true }
      ])
    ];
  }

  if (pageKey === 'questionBank') {
    return [
      objectField('dailyQuestionCard', '每日一题页', [
        { key: 'title', label: '页面标题', type: 'text', required: true },
        { key: 'desc', label: '页面说明', type: 'textarea', required: true },
        { key: 'note', label: '补充提示', type: 'text' }
      ]),
      objectField('pastPapersCard', '模拟题页', [
        { key: 'title', label: '页面标题', type: 'text', required: true },
        { key: 'desc', label: '页面说明', type: 'textarea', required: true },
        { key: 'note', label: '补充提示', type: 'text' }
      ]),
      objectField('wrongBookCard', '错题本页', [
        { key: 'title', label: '页面标题', type: 'text', required: true },
        { key: 'desc', label: '页面说明', type: 'textarea', required: true },
        { key: 'note', label: '补充提示', type: 'text' }
      ])
    ];
  }

  if (pageKey === 'courses') {
    return [
      { key: 'title', label: '判断首屏主标题', type: 'text', required: true },
      { key: 'subtitle', label: '判断首屏说明', type: 'textarea', required: true },
      { key: 'categories', label: '判断标签（3项）', type: 'stringArray', defaultItem: '' },
      { key: 'suggestions', label: '判断提示（3条）', type: 'stringArray', defaultItem: '' },
      { key: 'featuredDirectionIds', label: '两张重点方向卡片', type: 'stringArray', defaultItem: '' },
      objectField('moreSection', '底部补充说明', [
        { key: 'title', label: '区块标题', type: 'text', required: true },
        { key: 'tag', label: '区块标签', type: 'text' },
        { key: 'desc', label: '区块说明', type: 'textarea', required: true }
      ]),
      objectField('cta', '底部咨询承接区', ctaFields)
    ];
  }

  if (pageKey === 'teachers') {
    return [
      objectField('hero', '代表老师首屏', [
        ...pageHeroBasicFields
      ]),
      objectField('introCard', '带学方式说明', [
        { key: 'title', label: '卡片标题', type: 'text' },
        { key: 'desc', label: '卡片说明', type: 'textarea' }
      ]),
      objectArrayField('features', '老师协作亮点', pageValueFields, { title: '', desc: '' }),
      objectField('cta', '底部咨询承接区', ctaFields)
    ];
  }

  if (pageKey === 'success') {
    return [
      objectField('header', '首屏标题区', [
        { key: 'title', label: '页面标题', type: 'text', required: true },
        { key: 'subtitle', label: '页面副标题', type: 'textarea', required: true }
      ]),
      objectArrayField(
        'directionTabs',
        '方向切换',
        [
          { key: 'key', label: '切换标识', type: 'select', options: successDirectionOptions },
          { key: 'label', label: '切换名称', type: 'text', required: true }
        ],
        { key: 'math', label: '' },
        { maxItems: 2, visibleItems: 2 }
      ),
      objectArrayField(
        'pathTabs',
        '路径筛选标签',
        [
          { key: 'key', label: '标签标识', type: 'text', required: true },
          { key: 'label', label: '标签名称', type: 'text', required: true }
        ],
        { key: '', label: '' },
        { maxItems: 4, visibleItems: 4 }
      ),
      objectField('featuredSection', '首推案例区', [
        { key: 'title', label: '区块标题', type: 'text', required: true }
      ]),
      objectField('listSection', '案例列表区', [
        { key: 'title', label: '列表标题', type: 'text', required: true },
        { key: 'loadMoreText', label: '加载更多文案', type: 'text', required: true }
      ]),
      objectField('supportSection', '深色支持区', [
        { key: 'title', label: '区块标题', type: 'text', required: true },
        { key: 'subtitle', label: '区块说明', type: 'textarea', required: true },
        objectArrayField(
          'items',
          '支持项',
          [
            { key: 'icon', label: '图标标识', type: 'text', required: true },
            { key: 'title', label: '标题', type: 'text', required: true },
            { key: 'desc', label: '说明', type: 'textarea', required: true }
          ],
          { icon: '', title: '', desc: '' },
          { maxItems: 4, visibleItems: 4 }
        )
      ]),
      objectField('ctaByDirection', '分方向 CTA', [
        objectField('math', '高数 CTA', ctaFields),
        objectField('medical', '医护 CTA', ctaFields)
      ])
    ];
  }

  if (pageKey === 'about') {
    return [
      objectField('hero', '关于页首屏', [
        ...pageHeroBasicFields,
        { key: 'imageUrl', label: '首屏背景图地址', type: 'text', validate: 'media-url' },
        { key: 'imageSeed', label: '首屏背景图备用标识', type: 'text' }
      ]),
      objectField('introCard', '机构介绍卡', [
        { key: 'title', label: '卡片标题', type: 'text' },
        { key: 'desc', label: '卡片说明', type: 'textarea' }
      ]),
      objectArrayField('values', '办学理念卡片', pageValueFields, { title: '', desc: '' }),
      objectArrayField(
        'environmentImages',
        '校区环境图片',
        [
          { key: 'label', label: '图片名称', type: 'text', required: true },
          { key: 'imageUrl', label: '图片地址', type: 'text', validate: 'media-url' },
          { key: 'imageSeed', label: '图片备用标识', type: 'text' }
        ],
        { label: '', imageUrl: '', imageSeed: '' }
      ),
      objectField('cta', '底部咨询区', ctaFields)
    ];
  }

  if (pageKey === 'materials') {
    return [
      objectField('header', '顶部标题区', [
        { key: 'title', label: '页面标题', type: 'text', required: true },
        { key: 'searchLabel', label: '搜索按钮提示', type: 'text', required: true }
      ]),
      objectArrayField(
        'directionTabs',
        '顶部方向切换',
        [
          { key: 'key', label: '切换标识', type: 'select', options: materialDirectionOptions },
          { key: 'label', label: '切换名称', type: 'text', required: true },
          { key: 'icon', label: '切换图标', type: 'select', options: directionIconOptions }
        ],
        { key: 'math', label: '', icon: 'grid' },
        { maxItems: 2, visibleItems: 2 }
      ),
      objectArrayField(
        'stageTabs',
        '阶段切换按钮',
        [
          { key: 'key', label: '阶段标识', type: 'select', options: materialStageOptions },
          { key: 'label', label: '阶段名称', type: 'text', required: true }
        ],
        { key: 'foundation', label: '' },
        { maxItems: 3, visibleItems: 3 }
      ),
      objectField('mainSection', '主推套系区', [
        { key: 'title', label: '区块标题', type: 'text', required: true },
        { key: 'sideNote', label: '右侧提示', type: 'text', required: true }
      ]),
      objectField('shelfSection', '资料货架区', [
        { key: 'title', label: '货架标题', type: 'text', required: true },
        { key: 'hint', label: '滑动提示', type: 'text', required: true }
      ]),
      objectField('consultBar', '底部咨询条', [
        { key: 'title', label: '咨询标题', type: 'text', required: true },
        { key: 'desc', label: '咨询说明', type: 'textarea', required: true },
        { key: 'buttonText', label: '咨询按钮文案', type: 'text', required: true }
      ])
    ];
  }

  return [];
}

export function getAdminCollectionFormSchema(collection) {
  if (collection === 'directions') {
    return [
      { key: '_id', label: '内容编号', type: 'text' },
      { key: 'name', label: '方向卡标题', type: 'text', required: true },
      { key: 'slug', label: '方向标识', type: 'text', required: true },
      { key: 'category', label: '分类', type: 'text', required: true },
      { key: 'isFeatured', label: '首页精选', type: 'boolean' },
      { key: 'featuredTag', label: '首页热门方向标签', type: 'text' },
      { key: 'homeTag', label: '首页角标', type: 'text' },
      { key: 'summary', label: '方向简介', type: 'textarea', required: true },
      { key: 'audience', label: '适合哪些同学', type: 'textarea' },
      { key: 'features', label: '方向重点标签', type: 'stringArray', defaultItem: '' },
      { key: 'chips', label: '方向补充标签', type: 'stringArray', defaultItem: '' },
      { key: 'iconType', label: '方向图标', type: 'select', options: directionIconOptions },
      objectField('homeCard', '首页热门方向卡样式', [
        { key: 'tag', label: '卡片标签文案', type: 'text' },
        { key: 'tagColor', label: '标签颜色', type: 'text' },
        { key: 'tagBackground', label: '标签背景', type: 'text' },
        { key: 'headerBackground', label: '卡片头部背景', type: 'text' },
        { key: 'iconColor', label: '图标颜色', type: 'text' }
      ]),
      objectField('coursesCard', '方向页列表卡样式', [
        { key: 'style', label: '卡片明暗样式', type: 'select', options: [{ label: '浅色', value: 'light' }, { label: '深色', value: 'dark' }] },
        { key: 'tag', label: '卡片标签文案', type: 'text' },
        { key: 'accent', label: '强调色', type: 'text' },
        { key: 'background', label: '背景值', type: 'text' },
        { key: 'iconBg', label: '图标背景', type: 'text' },
        { key: 'iconType', label: '图标类型', type: 'select', options: directionIconOptions }
      ]),
      { key: 'sort', label: '排序', type: 'number' },
      { key: 'status', label: '状态', type: 'select', options: statusOptions }
    ];
  }

  if (collection === 'teachers') {
    return [
      { key: '_id', label: '内容编号', type: 'text' },
      { key: 'name', label: '姓名', type: 'text', required: true },
      { key: 'role', label: '角色', type: 'text', required: true },
      { key: 'tag', label: '标签', type: 'text' },
      { key: 'avatarUrl', label: '头像图片地址', type: 'text', validate: 'media-url' },
      { key: 'avatarSeed', label: '头像备用图标识', type: 'text' },
      { key: 'intro', label: '简介', type: 'textarea' },
      { key: 'specialties', label: '擅长标签', type: 'stringArray', defaultItem: '' },
      { key: 'sort', label: '排序', type: 'number' },
      { key: 'status', label: '状态', type: 'select', options: statusOptions }
    ];
  }

  if (collection === 'success_cases') {
    return [
      { key: '_id', label: '内容编号', type: 'text' },
      { key: 'direction', label: '所属方向', type: 'select', options: successDirectionOptions, required: true },
      { key: 'pathTags', label: '路径标签', type: 'stringArray', defaultItem: '' },
      { key: 'studentName', label: '学生姓名', type: 'text', required: true },
      { key: 'studentAvatarText', label: '头像文字', type: 'text', required: true },
      { key: 'scoreGain', label: '提分标签', type: 'text', required: true },
      { key: 'scoreLabel', label: '成绩标签', type: 'text', required: true },
      { key: 'chips', label: '案例标签', type: 'stringArray', defaultItem: '' },
      { key: 'startingLabel', label: '起点说明', type: 'text', required: true },
      { key: 'startingScore', label: '起点成绩', type: 'text', required: true },
      { key: 'finalLabel', label: '结果说明', type: 'text', required: true },
      { key: 'finalScore', label: '最终成绩', type: 'text', required: true },
      { key: 'quote', label: '案例原话', type: 'textarea', required: true },
      { key: 'fitAudience', label: '适合参考人群', type: 'textarea', required: true },
      { key: 'listTitle', label: '列表标题', type: 'text', required: true },
      { key: 'listDesc', label: '列表说明', type: 'textarea', required: true },
      { key: 'detailButtonText', label: '详情按钮文案', type: 'text', required: true },
      { key: 'title', label: '兼容标题', type: 'text' },
      { key: 'subtitle', label: '兼容副标题', type: 'textarea' },
      { key: 'coverUrl', label: '封面图片地址', type: 'text', validate: 'media-url' },
      { key: 'coverSeed', label: '封面备用图标识', type: 'text' },
      { key: 'year', label: '年份', type: 'number' },
      { key: 'category', label: '分类', type: 'text', required: true },
      { key: 'sort', label: '排序', type: 'number' },
      { key: 'status', label: '状态', type: 'select', options: statusOptions }
    ];
  }

  if (collection === 'material_packages') {
    return [
      { key: '_id', label: '内容编号', type: 'text' },
      { key: 'direction', label: '所属方向', type: 'select', options: materialDirectionOptions, required: true },
      { key: 'stage', label: '所属阶段', type: 'select', options: materialStageOptions, required: true },
      { key: 'badge', label: '角标文案', type: 'text', required: true },
      { key: 'title', label: '套系标题', type: 'text', required: true },
      { key: 'target', label: '适合人群', type: 'textarea', required: true },
      { key: 'solves', label: '解决问题', type: 'textarea', required: true },
      { key: 'features', label: '套系卖点', type: 'stringArray', defaultItem: '' },
      { key: 'contentItemIds', label: '套系包含资料', type: 'stringArray', defaultItem: '' },
      { key: 'sort', label: '排序', type: 'number' },
      { key: 'status', label: '状态', type: 'select', options: statusOptions }
    ];
  }

  if (collection === 'material_items') {
    return [
      { key: '_id', label: '内容编号', type: 'text' },
      { key: 'direction', label: '所属方向', type: 'select', options: materialDirectionOptions, required: true },
      { key: 'stage', label: '所属阶段', type: 'select', options: materialStageOptions, required: true },
      { key: 'type', label: '资料类型', type: 'text', required: true },
      { key: 'title', label: '标题', type: 'text', required: true },
      { key: 'subtitle', label: '副标题', type: 'text' },
      { key: 'desc', label: '描述', type: 'textarea', required: true },
      { key: 'details', label: '详细介绍', type: 'text' },
      { key: 'accentStart', label: '封面渐变起始色', type: 'text', required: true },
      { key: 'accentEnd', label: '封面渐变结束色', type: 'text', required: true },
      { key: 'sort', label: '排序', type: 'number' },
      { key: 'status', label: '状态', type: 'select', options: statusOptions }
    ];
  }

  if (collection === 'admin_users') {
    return [
      { key: '_id', label: 'OpenID', type: 'text' },
      { key: 'name', label: '老师姓名', type: 'text', required: true },
      { key: 'loginAccount', label: '后台登录账号', type: 'text', required: true },
      { key: 'password', label: '登录密码（留空表示不修改）', type: 'text' },
      { key: 'authChannels', label: '登录方式', type: 'stringArray', defaultItem: '' },
      { key: 'role', label: '角色权限', type: 'select', options: roleOptions },
      { key: 'status', label: '账号状态', type: 'select', options: [{ label: '启用', value: 'active' }, { label: '禁用', value: 'disabled' }] }
    ];
  }

  if (collection === 'media_assets') {
    return [
      { key: '_id', label: '内容编号', type: 'text' },
      { key: 'name', label: '资源名称', type: 'text', required: true },
      { key: 'module', label: '使用模块', type: 'text', required: true },
      { key: 'type', label: '资源类型', type: 'text', required: true },
      { key: 'url', label: '资源地址', type: 'text', required: true, validate: 'media-url' },
      { key: 'thumbUrl', label: '缩略图地址', type: 'text', validate: 'media-url' },
      { key: 'alt', label: '替代文本', type: 'text' },
      { key: 'tags', label: '标签', type: 'stringArray', defaultItem: '' },
      { key: 'sort', label: '排序', type: 'number' },
      { key: 'status', label: '状态', type: 'select', options: statusOptions }
    ];
  }

  return [];
}

function isBlank(value) {
  if (value == null) return true;
  if (typeof value === 'string') return value.trim() === '';
  if (Array.isArray(value)) return value.length === 0;
  return false;
}

function isValidMediaUrl(value) {
  if (!value) return true;
  return /^(https?:\/\/|cloud:\/\/)/.test(value);
}

function validateFields(schema, source, prefix = '') {
  for (const field of schema || []) {
    const value = source ? source[field.key] : undefined;
    const label = prefix ? `${prefix} / ${field.label}` : field.label;

    if (field.required && isBlank(value)) {
      return `${label}不能为空`;
    }

    if (field.validate === 'media-url' && value && !isValidMediaUrl(value)) {
      return `${label}必须是 http(s) 或 cloud:// 链接`;
    }

    if (field.type === 'object') {
      const nestedMessage = validateFields(field.fields || [], value || {}, label);
      if (nestedMessage) return nestedMessage;
    }

    if (field.type === 'objectArray') {
      const items = Array.isArray(value) ? value : [];
      for (let index = 0; index < items.length; index += 1) {
        const nestedMessage = validateFields(field.fields || [], items[index] || {}, `${label} ${index + 1}`);
        if (nestedMessage) return nestedMessage;
      }
    }

    if (field.type === 'stringArray') {
      const items = Array.isArray(value) ? value : [];
      const blankIndex = items.findIndex((item) => typeof item === 'string' && item.trim() === '');
      if (blankIndex >= 0) {
        return `${label} 第 ${blankIndex + 1} 项不能为空`;
      }
    }
  }

  return '';
}

export function validateAdminFormData(schema, source) {
  return validateFields(schema, source || {});
}
