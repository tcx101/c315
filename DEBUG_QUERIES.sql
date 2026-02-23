-- 1. 检查你的用户角色
SELECT id, username, email, role FROM users WHERE email = '你的邮箱';

-- 2. 检查 projects 表的 RLS 策略
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE tablename = 'projects';

-- 3. 测试查询权限（以你当前登录的用户身份）
SELECT * FROM projects;

-- 4. 检查是否有项目数据
SELECT id, title, review_status, submitter_name FROM projects;

-- 5. 测试更新权限（替换 'project-id' 为实际的项目 ID）
UPDATE projects 
SET review_status = 'approved' 
WHERE id = 'project-id';
