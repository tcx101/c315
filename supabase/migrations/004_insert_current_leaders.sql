-- 插入现有学生负责人数据到数据库
-- 将硬编码在前端的负责人数据迁移到数据库

-- 插入唐晨翔
INSERT INTO members (
  name, email, role, department, bio, avatar, github_url, skills,
  is_current_leader, leader_start_date, leader_term,
  enrollment_year, enrollment_month, display_order, join_date
) VALUES (
  '唐晨翔',
  '1902296058@qq.com',
  'leader',
  '软件工程（智能物联）',
  '学生负责人，专注于嵌入式开发与边缘ai',
  '/images/team/tangchenxiang.jpg',
  'https://github.com/tcx101',
  ARRAY['嵌入式开发', 'STM32', '物联网'],
  TRUE,
  '2025-01-01',
  '2025-2026',
  2023,  -- 请根据实际情况调整入学年份
  9,
  1,
  '2025-01-01'
) ON CONFLICT (email) DO UPDATE SET
  role = EXCLUDED.role,
  is_current_leader = EXCLUDED.is_current_leader,
  leader_start_date = EXCLUDED.leader_start_date,
  leader_term = EXCLUDED.leader_term,
  enrollment_year = EXCLUDED.enrollment_year,
  display_order = EXCLUDED.display_order;

-- 插入郭响雨
INSERT INTO members (
  name, email, role, department, bio, avatar, github_url, skills,
  is_current_leader, leader_start_date, leader_term,
  enrollment_year, enrollment_month, display_order, join_date
) VALUES (
  '郭响雨',
  'guoxiangyu@example.com',
  'leader',
  '软件工程（智能物联）',
  '学生负责人，专注于嵌入式开发与智能控制',
  '/images/team/guoxiangyu.jpg',
  '',
  ARRAY['pid算法', '嵌入式开发', 'STM32'],
  TRUE,
  '2025-01-01',
  '2025-2026',
  2023,  -- 请根据实际情况调整入学年份
  9,
  2,
  '2025-01-01'
) ON CONFLICT (email) DO UPDATE SET
  role = EXCLUDED.role,
  is_current_leader = EXCLUDED.is_current_leader,
  leader_start_date = EXCLUDED.leader_start_date,
  leader_term = EXCLUDED.leader_term,
  enrollment_year = EXCLUDED.enrollment_year,
  display_order = EXCLUDED.display_order;

-- 验证插入结果
SELECT name, email, role, is_current_leader, leader_term
FROM members
WHERE role = 'leader' AND is_current_leader = TRUE;
