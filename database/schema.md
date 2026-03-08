# 云数据库集合设计

## 单例集合
- `site_settings/default`
- `page_home/singleton`
- `page_courses/singleton`
- `page_teachers/singleton`
- `page_success/singleton`
- `page_about/singleton`
- `page_materials/singleton`

## 列表集合
- `directions`
- `teachers`
- `success_cases`
- `material_series`
- `material_items`
- `admin_users`

## 通用字段
- `_id`: 主键
- `status`: `published | draft | archived | deleted`
- `sort`: 排序数字，越小越靠前
- `createdAt`: 创建时间
- `updatedAt`: 更新时间

## 页面集合建议字段
### `page_home`
- `hero`
- `overviewStats[]`
- `quickLinks[]`
- `advantages[]`
- `directionsIntro`
- `featuredDirectionIds[]`
- `moreDirectionCard`
- `environmentSection`
- `cta`

### `page_courses`
- `title`
- `subtitle`
- `categories[]`
- `suggestions[]`
- `featuredDirectionIds[]`
- `moreSection`

### `page_teachers`
- `hero`
- `introCard`
- `features[]`
- `cta`

### `page_success`
- `hero`
- `stats[]`
- `cta`

### `page_about`
- `hero`
- `introCard`
- `values[]`
- `environmentImages[]`
- `cta`

### `page_materials`
- `hero`
- `tabs[]`
- `overviewStats[]`
- `featuredSeriesIds[]`
- `cta`

## 业务集合建议字段
### `directions`
- `name`
- `slug`
- `category`
- `isFeatured`
- `featuredTag`
- `homeTag`
- `summary`
- `audience`
- `features[]`
- `chips[]`
- `iconType`
- `homeCard`
- `coursesCard`

### `teachers`
- `name`
- `role`
- `tag`
- `avatarSeed`
- `intro`
- `specialties[]`

### `success_cases`
- `title`
- `subtitle`
- `coverSeed`
- `year`
- `category`

### `material_series`
- `name`
- `slug`
- `category`
- `tag`
- `accent`
- `summary`
- `shelfLabel`
- `items[]`

### `material_items`
- `seriesId`
- `type`
- `title`
- `stage`
- `subtitle`
- `desc`
- `contents[]`

### `admin_users`
- `_id`: 建议直接使用管理员 openid
- `name`
- `role`
- `status`
