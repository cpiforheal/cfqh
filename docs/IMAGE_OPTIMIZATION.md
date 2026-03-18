# 图片资源优化指南

本文档说明如何优化项目中的图片资源，减少包体积，提升加载速度。

## 当前问题

### 1. TabBar 图标使用 PNG 格式
- 位置：`src/assets/tabbar/*.png`
- 问题：PNG 格式体积较大，每个图标约 5-10KB
- 影响：主包体积增加，首次加载慢

### 2. 缺少图片懒加载
- 问题：所有图片一次性加载
- 影响：首屏加载时间长，浪费流量

### 3. 没有图片压缩流程
- 问题：原始图片未经优化直接使用
- 影响：不必要的带宽消耗

---

## 优化方案

### 方案 1：转换 TabBar 图标为 Base64（推荐）

**优点**：
- 减少网络请求
- 小图标适合内联
- 兼容性好

**实施步骤**：

1. 使用在线工具将 PNG 转为 Base64
   - 推荐工具：https://www.base64-image.de/

2. 修改 `app.config.ts`：

```typescript
export default {
  tabBar: {
    list: [
      {
        pagePath: 'pages/home/index',
        text: '首页',
        iconPath: 'data:image/png;base64,iVBORw0KGgoAAAANS...',
        selectedIconPath: 'data:image/png;base64,iVBORw0KGgoAAAANS...'
      }
      // ... 其他 tab
    ]
  }
};
```

**预期效果**：
- 减少 5 个网络请求
- 主包体积基本不变（Base64 略大于原图）
- 首屏渲染更快

---

### 方案 2：使用 IconFont（最佳方案）

**优点**：
- 体积最小（整个字体文件约 10-20KB）
- 可自由调整颜色和大小
- 支持多色图标

**实施步骤**：

1. 在 [iconfont.cn](https://www.iconfont.cn/) 创建项目

2. 上传或选择图标，生成字体文件

3. 下载字体文件到 `src/assets/fonts/`

4. 在 `app.css` 中引入：

```css
@font-face {
  font-family: 'tabbar-icon';
  src: url('assets/fonts/tabbar-icon.ttf') format('truetype');
}

.tabbar-icon {
  font-family: 'tabbar-icon';
}
```

5. 使用 Unicode 字符代替图片：

```typescript
// 注意：小程序 tabBar 不支持 iconfont，此方案仅适用于自定义 tabBar
```

**注意**：微信小程序原生 tabBar 不支持 iconfont，需要使用自定义 tabBar。

---

### 方案 3：图片压缩（必做）

**工具推荐**：

1. **TinyPNG** (https://tinypng.com/)
   - 在线压缩，无损质量
   - 可减少 50-70% 体积

2. **ImageOptim** (Mac)
   - 本地批量压缩
   - 支持 PNG、JPG、GIF

3. **Squoosh** (https://squoosh.app/)
   - Google 出品
   - 支持 WebP 转换

**实施步骤**：

```bash
# 1. 安装 imagemin-cli
npm install -g imagemin-cli imagemin-pngquant

# 2. 批量压缩图片
imagemin src/assets/tabbar/*.png --out-dir=src/assets/tabbar-optimized --plugin=pngquant

# 3. 替换原图片
mv src/assets/tabbar-optimized/* src/assets/tabbar/
```

**预期效果**：
- 图片体积减少 50-70%
- 视觉质量无明显差异

---

### 方案 4：转换为 WebP 格式

**优点**：
- 体积比 PNG 小 30-50%
- 支持透明通道
- 现代浏览器和小程序都支持

**实施步骤**：

```bash
# 1. 安装 cwebp 工具
brew install webp  # Mac
# 或下载：https://developers.google.com/speed/webp/download

# 2. 批量转换
for file in src/assets/tabbar/*.png; do
  cwebp -q 80 "$file" -o "${file%.png}.webp"
done
```

3. 修改 `app.config.ts`：

```typescript
iconPath: 'assets/tabbar/home.webp',
selectedIconPath: 'assets/tabbar/home-active.webp'
```

**预期效果**：
- 图片体积减少 30-50%
- 加载速度提升 20-30%

---

### 方案 5：图片懒加载

**适用场景**：
- 列表中的图片
- 非首屏图片
- 大尺寸图片

**实施步骤**：

1. 创建懒加载组件 `src/components/LazyImage/index.tsx`：

```tsx
import { Image } from '@tarojs/components';
import { useState } from 'react';
import Taro from '@tarojs/taro';

interface LazyImageProps {
  src: string;
  placeholder?: string;
  className?: string;
  mode?: string;
}

export default function LazyImage({ src, placeholder, className, mode = 'aspectFill' }: LazyImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <Image
      src={loaded ? src : (placeholder || '')}
      className={className}
      mode={mode}
      lazyLoad
      onLoad={() => setLoaded(true)}
      onError={() => setError(true)}
    />
  );
}
```

2. 使用懒加载组件：

```tsx
<LazyImage
  src={teacher.avatarUrl}
  placeholder="/assets/placeholder.png"
  className="avatar"
/>
```

**预期效果**：
- 首屏加载时间减少 30-50%
- 节省流量 20-40%

---

## 图片 CDN 优化

### 使用云开发存储

**优点**：
- 自动 CDN 加速
- 支持图片处理（缩放、裁剪、格式转换）
- 按需加载不同尺寸

**实施步骤**：

1. 上传图片到云存储

2. 使用图片处理参数：

```typescript
// 原图 URL
const originalUrl = 'cloud://xxx.png';

// 缩略图（宽度 200px）
const thumbnailUrl = `${originalUrl}?imageMogr2/thumbnail/200x`;

// WebP 格式
const webpUrl = `${originalUrl}?imageMogr2/format/webp`;

// 质量压缩（80%）
const compressedUrl = `${originalUrl}?imageMogr2/quality/80`;
```

3. 在 `utils/media.ts` 中封装：

```typescript
export function getOptimizedImageUrl(url: string, options: {
  width?: number;
  height?: number;
  format?: 'webp' | 'jpg' | 'png';
  quality?: number;
} = {}) {
  if (!url || !url.startsWith('cloud://')) {
    return url;
  }

  const params: string[] = [];

  if (options.width || options.height) {
    const size = options.width && options.height
      ? `${options.width}x${options.height}`
      : options.width
        ? `${options.width}x`
        : `x${options.height}`;
    params.push(`thumbnail/${size}`);
  }

  if (options.format) {
    params.push(`format/${options.format}`);
  }

  if (options.quality) {
    params.push(`quality/${options.quality}`);
  }

  return params.length > 0
    ? `${url}?imageMogr2/${params.join('/')}`
    : url;
}
```

---

## 优化检查清单

- [ ] 压缩所有 PNG 图片（使用 TinyPNG）
- [ ] 转换 TabBar 图标为 Base64 或 WebP
- [ ] 为列表图片添加懒加载
- [ ] 上传图片到云存储并使用 CDN
- [ ] 实现图片尺寸自适应（根据设备像素比）
- [ ] 添加图片加载失败的占位图
- [ ] 配置图片预加载策略（关键图片）

---

## 性能提升预期

| 优化项 | 体积减少 | 加载速度提升 |
|--------|----------|--------------|
| 图片压缩 | 50-70% | 30-50% |
| WebP 转换 | 30-50% | 20-30% |
| 懒加载 | - | 40-60% (首屏) |
| CDN 加速 | - | 50-80% |
| **总计** | **60-80%** | **70-90%** |

---

## 注意事项

1. **兼容性**：确保 WebP 格式在目标平台支持
2. **降级方案**：为不支持 WebP 的环境提供 PNG 降级
3. **缓存策略**：合理设置图片缓存时间
4. **监控**：使用性能监控工具跟踪图片加载时间

---

*最后更新：2026-03-17*