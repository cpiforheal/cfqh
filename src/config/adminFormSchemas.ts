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
  { key: 'chip', label: '角标', type: 'text', required: true },
  { key: 'title', label: '主标题', type: 'text', required: true },
  { key: 'desc', label: '描述', type: 'textarea', required: true }
];

const ctaFields = [
  { key: 'title', label: '标题', type: 'text', required: true },
  { key: 'desc', label: '描述', type: 'textarea', required: true },
  { key: 'buttonText', label: '按钮文案', type: 'text', required: true },
  { key: 'footnote', label: '底部说明', type: 'text' }
];

const statFields = [
  { key: 'value', label: '数值', type: 'text', required: true },
  { key: 'label', label: '标签', type: 'text', required: true },
  { key: 'note', label: '备注', type: 'text' }
];

const pageValueFields = [
  { key: 'title', label: '标题', type: 'text', required: true },
  { key: 'desc', label: '描述', type: 'textarea', required: true }
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
      { key: 'siteName', label: '站点名称', type: 'text', required: true },
      { key: 'brandName', label: '品牌名称', type: 'text', required: true },
      { key: 'contactPhone', label: '联系电话', type: 'text' },
      { key: 'contactWechat', label: '微信号', type: 'text' },
      { key: 'contactQrcode', label: '二维码链接', type: 'text' },
      { key: 'contactQrcodeUrl', label: '二维码图片 URL', type: 'text', validate: 'media-url' },
      { key: 'address', label: '地址', type: 'text' },
      { key: 'serviceHours', label: '服务时间', type: 'text' },
      { key: 'intro', label: '机构简介', type: 'textarea' }
    ];
  }

  if (pageKey === 'home') {
    return [
      objectField('hero', '首屏', [
        ...pageHeroBasicFields,
        { key: 'highlightTitle', label: '高亮标题', type: 'text', required: true },
        { key: 'secondaryNote', label: '补充说明', type: 'text' },
        { key: 'backgroundImageUrl', label: '背景图 URL', type: 'text', validate: 'media-url' },
        { key: 'backgroundImageSeed', label: '背景图 Seed', type: 'text' },
        { key: 'tags', label: '标签组', type: 'stringArray', defaultItem: '' },
        objectField('primaryButton', '主按钮', [
          { key: 'text', label: '按钮文案', type: 'text', required: true },
          { key: 'url', label: '跳转地址', type: 'text', required: true },
          { key: 'openType', label: '跳转方式', type: 'select', options: openTypeOptions }
        ])
      ]),
      objectArrayField('overviewStats', '总览统计', statFields, { value: '', label: '', note: '' }),
      objectArrayField(
        'quickLinks',
        '快捷入口',
        [
          { key: 'label', label: '标题', type: 'text' },
          { key: 'desc', label: '描述', type: 'text' },
          { key: 'url', label: '跳转地址', type: 'text' },
          { key: 'openType', label: '跳转方式', type: 'select', options: openTypeOptions },
          { key: 'icon', label: '图标标识', type: 'text' }
        ],
        { label: '', desc: '', url: '', openType: 'navigate', icon: '' }
      ),
      objectArrayField(
        'advantages',
        '核心优势',
        [
          { key: 'icon', label: '图标标识', type: 'text' },
          { key: 'title', label: '标题', type: 'text' },
          { key: 'desc', label: '描述', type: 'textarea' }
        ],
        { icon: '', title: '', desc: '' }
      ),
      { key: 'directionsIntro', label: '方向介绍', type: 'textarea' },
      { key: 'featuredDirectionIds', label: '首页精选方向 ID', type: 'stringArray', defaultItem: '' },
      objectField('moreDirectionCard', '更多方向卡片', [
        { key: 'title', label: '标题', type: 'text' },
        { key: 'tag', label: '标签', type: 'text' },
        { key: 'desc', label: '描述', type: 'textarea' }
      ]),
      objectField('environmentSection', '环境区块', [
        { key: 'title', label: '标题', type: 'text' },
        { key: 'subtitle', label: '副标题', type: 'text' },
        objectArrayField(
          'cards',
          '环境卡片',
          [
            { key: 'label', label: '名称', type: 'text', required: true },
            { key: 'imageUrl', label: '图片 URL', type: 'text', validate: 'media-url' },
            { key: 'imageSeed', label: '图片 Seed', type: 'text' }
          ],
          { label: '', imageUrl: '', imageSeed: '' }
        )
      ]),
      objectField('cta', '底部 CTA', ctaFields)
    ];
  }

  if (pageKey === 'courses') {
    return [
      { key: 'title', label: '页面标题', type: 'text', required: true },
      { key: 'subtitle', label: '页面描述', type: 'textarea', required: true },
      { key: 'categories', label: '分类标签', type: 'stringArray', defaultItem: '' },
      { key: 'suggestions', label: '规划建议', type: 'stringArray', defaultItem: '' },
      { key: 'featuredDirectionIds', label: '展示方向 ID', type: 'stringArray', defaultItem: '' },
      objectField('moreSection', '更多方向区块', [
        { key: 'title', label: '标题', type: 'text', required: true },
        { key: 'tag', label: '标签', type: 'text' },
        { key: 'desc', label: '描述', type: 'textarea', required: true }
      ])
    ];
  }

  if (pageKey === 'teachers') {
    return [
      objectField('hero', '首屏', [
        ...pageHeroBasicFields,
        { key: 'imageUrl', label: '背景图 URL', type: 'text', validate: 'media-url' },
        { key: 'imageSeed', label: '背景图 Seed', type: 'text' }
      ]),
      objectField('introCard', '介绍卡片', [
        { key: 'title', label: '标题', type: 'text' },
        { key: 'desc', label: '描述', type: 'textarea' }
      ]),
      objectArrayField('features', '核心优势', pageValueFields, { title: '', desc: '' }),
      objectField('cta', '底部 CTA', ctaFields)
    ];
  }

  if (pageKey === 'success') {
    return [
      objectField('hero', '首屏', pageHeroBasicFields),
      objectArrayField('stats', '统计数据', statFields, { value: '', label: '', note: '' }),
      objectField('cta', '底部 CTA', ctaFields)
    ];
  }

  if (pageKey === 'about') {
    return [
      objectField('hero', '首屏', [
        ...pageHeroBasicFields,
        { key: 'imageUrl', label: '背景图 URL', type: 'text', validate: 'media-url' },
        { key: 'imageSeed', label: '背景图 Seed', type: 'text' }
      ]),
      objectField('introCard', '介绍卡片', [
        { key: 'title', label: '标题', type: 'text' },
        { key: 'desc', label: '描述', type: 'textarea' }
      ]),
      objectArrayField('values', '理念内容', pageValueFields, { title: '', desc: '' }),
      objectArrayField(
        'environmentImages',
        '环境图片',
        [
          { key: 'label', label: '名称', type: 'text', required: true },
          { key: 'imageUrl', label: '图片 URL', type: 'text', validate: 'media-url' },
          { key: 'imageSeed', label: '图片 Seed', type: 'text' }
        ],
        { label: '', imageUrl: '', imageSeed: '' }
      ),
      objectField('cta', '底部 CTA', ctaFields)
    ];
  }

  if (pageKey === 'materials') {
    return [
      objectField('hero', '首屏', [
        ...pageHeroBasicFields,
        { key: 'imageUrl', label: '背景图 URL', type: 'text', validate: 'media-url' },
        { key: 'imageSeed', label: '背景图 Seed', type: 'text' }
      ]),
      { key: 'tabs', label: '分类标签', type: 'stringArray', defaultItem: '' },
      objectArrayField('overviewStats', '总览统计', statFields, { value: '', label: '', note: '' }),
      { key: 'featuredSeriesIds', label: '精选套系 ID', type: 'stringArray', defaultItem: '' },
      objectField('cta', '底部 CTA', ctaFields)
    ];
  }

  return [];
}

export function getAdminCollectionFormSchema(collection) {
  if (collection === 'directions') {
    return [
      { key: '_id', label: 'ID', type: 'text' },
      { key: 'name', label: '方向名称', type: 'text', required: true },
      { key: 'slug', label: 'Slug', type: 'text', required: true },
      { key: 'category', label: '分类', type: 'text', required: true },
      { key: 'isFeatured', label: '首页精选', type: 'boolean' },
      { key: 'featuredTag', label: '精选标签', type: 'text' },
      { key: 'homeTag', label: '首页标签', type: 'text' },
      { key: 'summary', label: '摘要', type: 'textarea', required: true },
      { key: 'audience', label: '适合人群', type: 'textarea' },
      { key: 'features', label: '核心卖点', type: 'stringArray', defaultItem: '' },
      { key: 'chips', label: '标签组', type: 'stringArray', defaultItem: '' },
      { key: 'iconType', label: '图标类型', type: 'select', options: directionIconOptions },
      objectField('homeCard', '首页卡片样式', [
        { key: 'tag', label: '标签文案', type: 'text' },
        { key: 'tagColor', label: '标签颜色', type: 'text' },
        { key: 'tagBackground', label: '标签背景', type: 'text' },
        { key: 'headerBackground', label: '头部背景', type: 'text' },
        { key: 'iconColor', label: '图标颜色', type: 'text' }
      ]),
      objectField('coursesCard', '方向页卡片样式', [
        { key: 'style', label: '明暗样式', type: 'select', options: [{ label: '浅色', value: 'light' }, { label: '深色', value: 'dark' }] },
        { key: 'tag', label: '标签文案', type: 'text' },
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
