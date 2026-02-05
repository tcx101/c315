-- 清理历任负责人数据，确保只有正确的现任负责人
-- 这个脚本会删除所有旧的负责人数据，只保留唐晨翔和郭响雨作为现任负责人

-- 第一步：删除所有role='leader'的记录
DELETE FROM members WHERE role = 'leader';

-- 第二步：插入正确的现任负责人数据

-- 插入唐晨翔
INSERT INTO members (
  username, name, email, role, department, bio, avatar, github_url, skills,
  is_current_leader, leader_start_date, leader_term,
  enrollment_year, enrollment_month, display_order, join_date
) VALUES (
  'tangchenxiang',
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
  2023,
  9,
  1,
  '2025-01-01'
);

-- 插入郭响雨
INSERT INTO members (
  username, name, email, role, department, bio, avatar, github_url, skills,
  is_current_leader, leader_start_date, leader_term,
  enrollment_year, enrollment_month, display_order, join_date
) VALUES (
  'guoxiangyu',
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
  2023,
  9,
  2,
  '2025-01-01'
);

-- 验证结果
SELECT
  name,
  email,
  role,
  department,
  is_current_leader,
  leader_term,
  enrollment_year
FROM members
WHERE role = 'leader'
ORDER BY display_order;
