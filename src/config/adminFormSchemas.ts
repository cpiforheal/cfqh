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
      { key: 'contactQrcodeUrl', label: '咨询二维码图片 URL', type: 'text', validate: 'media-url' },
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
        { key: 'backgroundImageUrl', label: '首页大屏背景图 URL', type: 'text', validate: 'media-url' },
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
      { key: 'featuredDirectionIds', label: '热门方向展示 ID', type: 'stringArray', defaultItem: '' },
      objectField('environmentSection', '校区环境（咨询区上方）', [
        objectArrayField(
          'cards',
          '环境图片',
          [
            { key: 'label', label: '名称', type: 'text', required: true },
            { key: 'imageUrl', label: '图片 URL', type: 'text', validate: 'media-url' }
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
      { key: 'featuredDirectionIds', label: '两张重点方向卡片 ID', type: 'stringArray', defaultItem: '' },
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
      objectField('hero', '师资页首屏', [
        ...pageHeroBasicFields,
        { key: 'imageUrl', label: '首屏背景图 URL', type: 'text', validate: 'media-url' },
        { key: 'imageSeed', label: '首屏背景图 Seed', type: 'text' }
      ]),
      objectField('introCard', '页首介绍卡', [
        { key: 'title', label: '卡片标题', type: 'text' },
        { key: 'desc', label: '卡片说明', type: 'textarea' }
      ]),
      objectArrayField('features', '师资页优势卡', pageValueFields, { title: '', desc: '' }),
      objectField('cta', '底部咨询区', ctaFields)
    ];
  }

  if (pageKey === 'success') {
    return [
      objectField('hero', '成绩页首屏', pageHeroBasicFields),
      objectArrayField('stats', '成绩页数据卡', statFields, { value: '', label: '', note: '' }),
      objectField('cta', '底部咨询区', ctaFields)
    ];
  }

  if (pageKey === 'about') {
    return [
      objectField('hero', '关于页首屏', [
        ...pageHeroBasicFields,
        { key: 'imageUrl', label: '首屏背景图 URL', type: 'text', validate: 'media-url' },
        { key: 'imageSeed', label: '首屏背景图 Seed', type: 'text' }
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
          { key: 'imageUrl', label: '图片 URL', type: 'text', validate: 'media-url' },
          { key: 'imageSeed', label: '图片 Seed', type: 'text' }
        ],
        { label: '', imageUrl: '', imageSeed: '' }
      ),
      objectField('cta', '底部咨询区', ctaFields)
    ];
  }

  if (pageKey === 'materials') {
    return [
      objectField('hero', '资料页首屏', [
        ...pageHeroBasicFields,
        { key: 'imageUrl', label: '首屏背景图 URL', type: 'text', validate: 'media-url' },
        { key: 'imageSeed', label: '首屏背景图 Seed', type: 'text' }
      ]),
      { key: 'tabs', label: '资料页顶部标签', type: 'stringArray', defaultItem: '' },
      objectArrayField('overviewStats', '资料页数据卡', statFields, { value: '', label: '', note: '' }),
      { key: 'featuredSeriesIds', label: '精选资料展示 ID', type: 'stringArray', defaultItem: '' },
      objectField('cta', '底部咨询区', ctaFields)
    ];
  }

  return [];
}

export function getAdminCollectionFormSchema(collection) {
  if (collection === 'directions') {
    return [
      { key: '_id', label: 'ID', type: 'text' },
      { key: 'name', label: '方向卡标题', type: 'text', required: true },
      { key: 'slug', label: 'Slug', type: 'text', required: true },
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
      { key: '_id', label: 'ID', type: 'text' },
      { key: 'name', label: '姓名', type: 'text', required: true },
      { key: 'role', label: '角色', type: 'text', required: true },
      { key: 'tag', label: '标签', type: 'text' },
      { key: 'avatarUrl', label: '头像 URL', type: 'text', validate: 'media-url' },
      { key: 'avatarSeed', label: '头像 Seed', type: 'text' },
      { key: 'intro', label: '简介', type: 'textarea' },
      { key: 'specialties', label: '擅长标签', type: 'stringArray', defaultItem: '' },
      { key: 'sort', label: '排序', type: 'number' },
      { key: 'status', label: '状态', type: 'select', options: statusOptions }
    ];
  }

  if (collection === 'success_cases') {
    return [
      { key: '_id', label: 'ID', type: 'text' },
      { key: 'title', label: '标题', type: 'text', required: true },
      { key: 'subtitle', label: '副标题', type: 'textarea', required: true },
      { key: 'coverUrl', label: '封面 URL', type: 'text', validate: 'media-url' },
      { key: 'coverSeed', label: '封面 Seed', type: 'text' },
      { key: 'year', label: '年份', type: 'number' },
      { key: 'category', label: '分类', type: 'text', required: true },
      { key: 'sort', label: '排序', type: 'number' },
      { key: 'status', label: '状态', type: 'select', options: statusOptions }
    ];
  }

  if (collection === 'material_series') {
    return [
      { key: '_id', label: 'ID', type: 'text' },
      { key: 'name', label: '套系名称', type: 'text', required: true },
      { key: 'slug', label: 'Slug', type: 'text', required: true },
      { key: 'category', label: '分类', type: 'text', required: true },
      { key: 'tag', label: '标签', type: 'text' },
      { key: 'accent', label: '强调色', type: 'text' },
      { key: 'summary', label: '摘要', type: 'textarea', required: true },
      { key: 'shelfLabel', label: '书架标题', type: 'text' },
      { key: 'items', label: '套系标签', type: 'stringArray', defaultItem: '' },
      { key: 'sort', label: '排序', type: 'number' },
      { key: 'status', label: '状态', type: 'select', options: statusOptions }
    ];
  }

  if (collection === 'material_items') {
    return [
      { key: '_id', label: 'ID', type: 'text' },
      { key: 'seriesId', label: '所属套系 ID', type: 'text', required: true },
      { key: 'type', label: '资料类型', type: 'text', required: true },
      { key: 'title', label: '标题', type: 'text', required: true },
      { key: 'stage', label: '阶段', type: 'text', required: true },
      { key: 'subtitle', label: '副标题', type: 'text' },
      { key: 'desc', label: '描述', type: 'textarea', required: true },
      { key: 'contents', label: '目录标签', type: 'stringArray', defaultItem: '' },
      { key: 'sort', label: '排序', type: 'number' },
      { key: 'status', label: '状态', type: 'select', options: statusOptions }
    ];
  }

  if (collection === 'admin_users') {
    return [
      { key: '_id', label: 'OpenID', type: 'text' },
      { key: 'name', label: '名称', type: 'text' },
      { key: 'role', label: '角色', type: 'select', options: roleOptions },
      { key: 'status', label: '状态', type: 'select', options: [{ label: '启用', value: 'active' }, { label: '禁用', value: 'disabled' }] }
    ];
  }

  if (collection === 'media_assets') {
    return [
      { key: '_id', label: 'ID', type: 'text' },
      { key: 'title', label: '资源名称', type: 'text', required: true },
      { key: 'category', label: '资源分类', type: 'text', required: true },
      { key: 'url', label: '资源 URL', type: 'text', required: true, validate: 'media-url' },
      { key: 'thumbUrl', label: '缩略图 URL', type: 'text', validate: 'media-url' },
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
