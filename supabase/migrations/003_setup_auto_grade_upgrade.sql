-- 配置自动年级升级定时任务
-- 注意：需要先在 Supabase Dashboard 中启用 pg_cron 扩展
-- 路径：Database → Extensions → 搜索 "pg_cron" → 启用

-- 启用 pg_cron 扩展（如果尚未启用）
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- 创建自动升级函数
CREATE OR REPLACE FUNCTION auto_upgrade_grades()
RETURNS void AS $$
DECLARE
  updated_count INTEGER;
BEGIN
  -- 更新所有成员的年级
  WITH updated AS (
    UPDATE members
    SET grade = calculate_grade(enrollment_year, enrollment_month)
    WHERE enrollment_year IS NOT NULL
    RETURNING id
  )
  SELECT COUNT(*) INTO updated_count FROM updated;

  -- 更新毕业状态
  PERFORM auto_update_graduation_status();

  -- 记录日志
  RAISE NOTICE '自动年级升级完成，更新了 % 个成员', updated_count;
END;
$$ LANGUAGE plpgsql;

-- 添加函数注释
COMMENT ON FUNCTION auto_upgrade_grades IS '自动升级所有成员的年级，每年9月1日执行';

-- 设置定时任务：每年9月1日凌晨2点（北京时间）执行
-- 注意：Supabase 使用 UTC 时区，北京时间 = UTC + 8
-- 9月1日凌晨2点（北京时间）= 8月31日18:00（UTC）
SELECT cron.schedule(
  'auto-upgrade-grades',
  '0 18 31 8 *',  -- 分 时 日 月 周（每年8月31日18:00 UTC = 9月1日02:00 北京时间）
  'SELECT auto_upgrade_grades();'
);

-- 查看已设置的定时任务
-- SELECT * FROM cron.job;

-- 如果需要删除定时任务（调试用）
-- SELECT cron.unschedule('auto-upgrade-grades');

-- 手动测试执行（可选）
-- SELECT auto_upgrade_grades();
