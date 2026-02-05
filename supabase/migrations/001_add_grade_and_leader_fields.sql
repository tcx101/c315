-- 添加年级管理和负责人管理相关字段到 members 表
-- 执行前请先备份数据：CREATE TABLE members_backup AS SELECT * FROM members;

-- 添加新字段
ALTER TABLE members
ADD COLUMN IF NOT EXISTS enrollment_year INTEGER,
ADD COLUMN IF NOT EXISTS enrollment_month INTEGER DEFAULT 9,
ADD COLUMN IF NOT EXISTS is_graduated BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS graduation_year INTEGER,
ADD COLUMN IF NOT EXISTS is_current_leader BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS leader_start_date TIMESTAMP,
ADD COLUMN IF NOT EXISTS leader_end_date TIMESTAMP,
ADD COLUMN IF NOT EXISTS leader_term TEXT,
ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;

-- 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_members_is_current_leader ON members(is_current_leader);
CREATE INDEX IF NOT EXISTS idx_members_is_graduated ON members(is_graduated);
CREATE INDEX IF NOT EXISTS idx_members_enrollment_year ON members(enrollment_year);
CREATE INDEX IF NOT EXISTS idx_members_role ON members(role);

-- 添加字段注释
COMMENT ON COLUMN members.enrollment_year IS '入学年份，如2023';
COMMENT ON COLUMN members.enrollment_month IS '入学月份，默认为9月';
COMMENT ON COLUMN members.is_graduated IS '是否已毕业';
COMMENT ON COLUMN members.graduation_year IS '毕业年份';
COMMENT ON COLUMN members.is_current_leader IS '是否现任学生负责人';
COMMENT ON COLUMN members.leader_start_date IS '担任负责人开始时间';
COMMENT ON COLUMN members.leader_end_date IS '担任负责人结束时间';
COMMENT ON COLUMN members.leader_term IS '担任负责人的任期，如"2023-2024"';
COMMENT ON COLUMN members.display_order IS '显示顺序，用于排序';
