# 快速开始指南

本指南将帮助你快速部署年级自动升级和负责人管理功能。

## 🚀 5分钟快速部署

### 第1步：启用 pg_cron 扩展（1分钟）

1. 登录 [Supabase Dashboard](https://app.supabase.com/)
2. 选择你的项目
3. 点击左侧菜单 **Database** → **Extensions**
4. 搜索 "pg_cron"
5. 点击右侧的开关启用

### 第2步：执行数据库迁移（2分钟）

1. 在 Supabase Dashboard 中，点击左侧菜单 **SQL Editor**
2. 点击 "New query"
3. 按顺序复制并执行以下文件的内容：

```bash
# 执行顺序：
1. supabase/migrations/001_add_grade_and_leader_fields.sql
2. supabase/migrations/002_create_grade_calculation_function.sql
3. supabase/migrations/003_setup_auto_grade_upgrade.sql
4. supabase/migrations/004_insert_current_leaders.sql  # 执行前先修改入学年份
```

**重要**：在执行第4个脚本前，请修改其中的入学年份：
```sql
-- 找到这两行并修改为实际入学年份
enrollment_year = 2023,  -- 改为唐晨翔的实际入学年份
enrollment_year = 2023,  -- 改为郭响雨的实际入学年份
```

### 第3步：验证迁移结果（1分钟）

在 SQL Editor 中执行以下验证SQL：

```sql
-- 1. 检查新字段
SELECT column_name FROM information_schema.columns
WHERE table_name = 'members'
AND column_name IN ('enrollment_year', 'is_current_leader', 'leader_term');

-- 2. 检查函数
SELECT routine_name FROM information_schema.routines
WHERE routine_name IN ('calculate_grade', 'auto_upgrade_grades');

-- 3. 检查定时任务
SELECT * FROM cron.job WHERE jobname = 'auto-upgrade-grades';

-- 4. 检查负责人数据
SELECT name, email, is_current_leader, leader_term
FROM members WHERE role = 'leader';
```

如果以上查询都返回了结果，说明迁移成功！

### 第4步：迁移现有成员数据（1分钟）

**选项A：自动推算（快速但可能不准确）**

在浏览器控制台执行：
```javascript
// 打开你的网站，按 F12 打开控制台，执行：
const { memberApi } = await import('/src/lib/memberApi')
await memberApi.migrateExistingData()
await memberApi.batchUpdateGrades()
console.log('迁移完成！')
```

**选项B：手动设置（准确但耗时）**

等待管理页面开发完成后，在管理界面中逐个设置成员的入学年份。

### 第5步：查看效果

访问你的网站 `/team` 页面，你应该能看到：
- ✅ 学生负责人从数据库加载
- ✅ 成员按年级分组显示
- ✅ 年级自动计算

## 🎯 完成！

恭喜！你已经成功部署了年级自动升级功能。系统将在每年9月1日凌晨2点自动升级所有成员的年级。

## 📝 后续步骤（可选）

### 1. 手动测试年级升级

```sql
-- 在 SQL Editor 中执行
SELECT auto_upgrade_grades();

-- 查看更新结果
SELECT name, grade, enrollment_year FROM members;
```

### 2. 调整定时任务时间

如果需要修改自动升级的时间：

```sql
-- 删除现有任务
SELECT cron.unschedule('auto-upgrade-grades');

-- 重新设置（例如改为每年8月1日执行）
SELECT cron.schedule(
  'auto-upgrade-grades',
  '0 18 31 7 *',  -- 8月1日凌晨2点（北京时间）
  'SELECT auto_upgrade_grades();'
);
```

### 3. 开发管理页面

如果需要图形化管理界面，可以继续开发：
- 成员管理页面（编辑、删除、搜索）
- 负责人管理功能（设置、卸任）
- 批量操作功能

## ❓ 常见问题

### Q1: 定时任务没有执行怎么办？

**A**: 检查以下几点：
1. pg_cron 扩展是否已启用
2. 定时任务是否正确设置：`SELECT * FROM cron.job;`
3. 手动测试执行：`SELECT auto_upgrade_grades();`

### Q2: 年级计算不正确怎么办？

**A**: 检查入学年份是否正确：
```sql
SELECT name, enrollment_year, grade FROM members;
```
如果入学年份不对，需要手动修正。

### Q3: 如何回滚迁移？

**A**: 参考 `supabase/migrations/README.md` 中的"回滚迁移"章节。

### Q4: 如何修改负责人信息？

**A**: 目前可以通过 SQL 直接修改：
```sql
-- 设置新负责人
UPDATE members
SET role = 'leader',
    is_current_leader = TRUE,
    leader_start_date = NOW(),
    leader_term = '2025-2026'
WHERE id = 'member_id';

-- 卸任旧负责人
UPDATE members
SET role = 'member',
    is_current_leader = FALSE,
    leader_end_date = NOW()
WHERE id = 'old_leader_id';
```

## 📚 更多文档

- 详细实施总结：`IMPLEMENTATION_SUMMARY.md`
- 数据库迁移指南：`supabase/migrations/README.md`
- 完整实施计划：`C:\Users\lenovo\.claude\plans\snuggly-hopping-lark.md`

## 🎉 享受自动化管理！

现在你的实验室成员管理系统已经实现了自动化，无需每年手动更新年级，也可以方便地管理负责人换届。祝使用愉快！
