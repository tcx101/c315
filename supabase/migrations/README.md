# 数据库迁移指南

本目录包含数据库迁移脚本，用于实现年级自动升级和负责人管理功能。

## 📋 迁移脚本列表

1. **001_add_grade_and_leader_fields.sql** - 添加新字段到 members 表
2. **002_create_grade_calculation_function.sql** - 创建年级计算函数
3. **003_setup_auto_grade_upgrade.sql** - 配置自动年级升级定时任务
4. **004_insert_current_leaders.sql** - 插入现有学生负责人数据

## 🚀 执行步骤

### 方法一：使用 Supabase Dashboard（推荐）

1. 登录 [Supabase Dashboard](https://app.supabase.com/)
2. 选择你的项目
3. 进入 **SQL Editor**
4. 按顺序执行每个迁移脚本：
   - 复制脚本内容
   - 粘贴到 SQL Editor
   - 点击 "Run" 执行

### 方法二：使用 Supabase CLI

```bash
# 安装 Supabase CLI（如果尚未安装）
npm install -g supabase

# 登录
supabase login

# 链接到你的项目
supabase link --project-ref your-project-ref

# 执行迁移
supabase db push
```

## ⚠️ 重要注意事项

### 1. 数据备份
在执行迁移前，**务必备份现有数据**：

```sql
-- 备份 members 表
CREATE TABLE members_backup AS SELECT * FROM members;

-- 验证备份
SELECT COUNT(*) FROM members_backup;
```

### 2. 启用 pg_cron 扩展
执行 `003_setup_auto_grade_upgrade.sql` 前，需要先启用 pg_cron 扩展：

1. 进入 Supabase Dashboard
2. 导航到 **Database** → **Extensions**
3. 搜索 "pg_cron"
4. 点击启用

### 3. 调整入学年份
在执行 `004_insert_current_leaders.sql` 前，请根据实际情况修改脚本中的入学年份：

```sql
enrollment_year = 2023,  -- 修改为实际入学年份
```

### 4. 时区设置
定时任务使用 UTC 时区，已自动转换为北京时间：
- 北京时间：9月1日凌晨2点
- UTC时间：8月31日18:00

## ✅ 验证迁移

执行完所有迁移后，运行以下 SQL 验证：

```sql
-- 1. 检查新字段是否添加成功
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'members'
AND column_name IN (
  'enrollment_year', 'enrollment_month', 'is_graduated',
  'is_current_leader', 'leader_term'
);

-- 2. 检查函数是否创建成功
SELECT routine_name, routine_type
FROM information_schema.routines
WHERE routine_name IN (
  'calculate_grade',
  'auto_update_graduation_status',
  'auto_upgrade_grades'
);

-- 3. 检查定时任务是否设置成功
SELECT * FROM cron.job WHERE jobname = 'auto-upgrade-grades';

-- 4. 检查负责人数据是否插入成功
SELECT name, email, role, is_current_leader, leader_term
FROM members
WHERE role = 'leader' AND is_current_leader = TRUE;

-- 5. 测试年级计算函数
SELECT calculate_grade(2023, 9) AS grade_2023;
SELECT calculate_grade(2022, 9) AS grade_2022;
SELECT calculate_grade(2021, 9) AS grade_2021;
```

## 🔄 回滚迁移

如果需要回滚迁移：

```sql
-- 删除定时任务
SELECT cron.unschedule('auto-upgrade-grades');

-- 删除函数
DROP FUNCTION IF EXISTS auto_upgrade_grades();
DROP FUNCTION IF EXISTS auto_update_graduation_status();
DROP FUNCTION IF EXISTS calculate_grade(INTEGER, INTEGER);

-- 删除新增字段
ALTER TABLE members
DROP COLUMN IF EXISTS enrollment_year,
DROP COLUMN IF EXISTS enrollment_month,
DROP COLUMN IF EXISTS is_graduated,
DROP COLUMN IF EXISTS graduation_year,
DROP COLUMN IF EXISTS is_current_leader,
DROP COLUMN IF EXISTS leader_start_date,
DROP COLUMN IF EXISTS leader_end_date,
DROP COLUMN IF EXISTS leader_term,
DROP COLUMN IF EXISTS display_order;

-- 恢复备份数据（如果需要）
-- 注意：这会覆盖所有数据，请谨慎操作
-- DROP TABLE members;
-- ALTER TABLE members_backup RENAME TO members;
```

## 📞 问题排查

### 问题1：pg_cron 扩展无法启用
**解决方案**：确保你的 Supabase 项目计划支持 pg_cron。免费计划可能有限制。

### 问题2：定时任务未执行
**解决方案**：
1. 检查定时任务是否正确设置：`SELECT * FROM cron.job;`
2. 手动测试执行：`SELECT auto_upgrade_grades();`
3. 检查 Supabase 日志

### 问题3：函数执行报错
**解决方案**：
1. 检查函数是否正确创建
2. 确保 members 表存在且结构正确
3. 查看错误日志获取详细信息

## 📚 相关文档

- [Supabase SQL Editor](https://supabase.com/docs/guides/database/overview)
- [pg_cron 文档](https://github.com/citusdata/pg_cron)
- [PostgreSQL 函数文档](https://www.postgresql.org/docs/current/sql-createfunction.html)
