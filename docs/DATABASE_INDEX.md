# 数据库索引优化指南

本文档说明了云开发数据库需要创建的索引，以提升查询性能。

## 为什么需要索引？

当前云函数在查询时使用了 `orderBy` 和过滤操作，但没有配置索引，会导致：
- 查询速度慢（全表扫描）
- 消耗更多数据库资源
- 并发请求时性能下降

## 需要创建的索引

### 1. directions 集合

**索引 1：sort_status**
```json
{
  "sort": 1,
  "status": 1
}
```
- 用途：支持按排序字段查询已发布的方向
- 影响的查询：`listCollection('directions')`

**索引 2：updatedAt**
```json
{
  "updatedAt": -1
}
```
- 用途：支持按更新时间倒序查询
- 影响的查询：内容版本控制

---

### 2. teachers 集合

**索引 1：sort_status**
```json
{
  "sort": 1,
  "status": 1
}
```
- 用途：支持按排序字段查询已发布的教师
- 影响的查询：`listCollection('teachers')`

**索引 2：updatedAt**
```json
{
  "updatedAt": -1
}
```
- 用途：支持按更新时间倒序查询

---

### 3. success_cases 集合

**索引 1：sort_status**
```json
{
  "sort": 1,
  "status": 1
}
```
- 用途：支持按排序字段查询已发布的成功案例
- 影响的查询：`listCollection('success_cases')`

**索引 2：year_status**
```json
{
  "year": -1,
  "status": 1
}
```
- 用途：支持按年份倒序查询已发布案例

---

### 4. material_series 集合

**索引 1：sort_status**
```json
{
  "sort": 1,
  "status": 1
}
```
- 用途：支持按排序字段查询已发布的教材系列
- 影响的查询：`listCollection('material_series')`

**索引 2：category_status**
```json
{
  "category": 1,
  "status": 1
}
```
- 用途：支持按分类查询已发布教材

---

### 5. material_items 集合

**索引 1：seriesId_sort**
```json
{
  "seriesId": 1,
  "sort": 1
}
```
- 用途：支持按系列 ID 查询并排序
- 影响的查询：`listCollection('material_items')`

**索引 2：sort_status**
```json
{
  "sort": 1,
  "status": 1
}
```
- 用途：支持按排序字段查询已发布的教材项目

---

### 6. media_assets 集合

**索引 1：category_sort**
```json
{
  "category": 1,
  "sort": 1
}
```
- 用途：支持按分类查询并排序
- 影响的查询：媒体资源管理

**索引 2：tags**
```json
{
  "tags": 1
}
```
- 用途：支持按标签查询（数组字段）

---

### 7. admin_users 集合

**索引 1：status**
```json
{
  "status": 1
}
```
- 用途：支持按状态查询管理员
- 影响的查询：权限验证

---

## 如何创建索引？

### 方法 1：通过微信开发者工具

1. 打开微信开发者工具
2. 进入「云开发」控制台
3. 选择「数据库」
4. 选择对应的集合
5. 点击「索引管理」
6. 点击「添加索引」
7. 输入索引字段和排序方式（1 为升序，-1 为降序）

### 方法 2：通过云开发控制台

1. 登录 [微信云开发控制台](https://console.cloud.tencent.com/tcb)
2. 选择对应的环境
3. 进入「数据库」-> 「索引管理」
4. 按照上述索引配置创建

---

## 索引创建优先级

### 高优先级（立即创建）
- `directions.sort_status`
- `teachers.sort_status`
- `success_cases.sort_status`
- `material_series.sort_status`
- `material_items.seriesId_sort`

### 中优先级（近期创建）
- 各集合的 `updatedAt` 索引
- `admin_users.status`

### 低优先级（可选）
- `media_assets.category_sort`
- `media_assets.tags`

---

## 性能提升预期

创建索引后，预期性能提升：
- 查询速度：提升 **5-10 倍**
- 数据库读操作：减少 **50-80%**
- 并发能力：提升 **3-5 倍**

---

## 注意事项

1. **索引会占用存储空间**：每个索引约占集合大小的 10-20%
2. **写入性能影响**：索引越多，写入速度越慢（但对本项目影响不大）
3. **定期维护**：建议每季度检查索引使用情况，删除未使用的索引
4. **监控查询性能**：创建索引后，通过云开发控制台监控查询耗时

---

## 验证索引效果

创建索引后，可以通过以下方式验证：

```javascript
// 在云函数中添加性能日志
console.time('query-directions');
const result = await db.collection('directions')
  .where({ status: 'published' })
  .orderBy('sort', 'asc')
  .limit(100)
  .get();
console.timeEnd('query-directions');
```

预期结果：
- 无索引：200-500ms
- 有索引：20-50ms

---

*最后更新：2026-03-17*