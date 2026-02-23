-- 创建项目表
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  content TEXT, -- 项目详细内容（Markdown格式）
  image VARCHAR(500), -- 项目封面图
  tags TEXT[] DEFAULT '{}', -- 技术标签数组
  status VARCHAR(20) DEFAULT 'in-progress' CHECK (status IN ('completed', 'in-progress', 'planned')),
  year VARCHAR(10) NOT NULL, -- 项目年份
  members TEXT[] DEFAULT '{}', -- 参与成员名单
  github_url VARCHAR(500), -- GitHub链接
  demo_url VARCHAR(500), -- 演示链接
  
  -- 提交者信息
  submitted_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  submitter_name VARCHAR(100), -- 提交者姓名
  
  -- 审核相关
  review_status VARCHAR(20) DEFAULT 'pending' CHECK (review_status IN ('pending', 'approved', 'rejected')),
  reviewed_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reject_reason TEXT, -- 拒绝原因
  
  -- 时间戳
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_year ON projects(year);
CREATE INDEX idx_projects_review_status ON projects(review_status);
CREATE INDEX idx_projects_submitted_by ON projects(submitted_by);
CREATE INDEX idx_projects_created_at ON projects(created_at DESC);

-- 创建更新时间触发器
CREATE OR REPLACE FUNCTION update_projects_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_projects_updated_at();

-- 启用行级安全策略
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- 所有人可以查看已审核通过的项目
CREATE POLICY "Anyone can view approved projects"
  ON projects FOR SELECT
  USING (review_status = 'approved');

-- 登录用户可以查看自己提交的项目
CREATE POLICY "Users can view their own projects"
  ON projects FOR SELECT
  USING (auth.uid() = submitted_by);

-- 登录用户可以提交项目
CREATE POLICY "Authenticated users can insert projects"
  ON projects FOR INSERT
  WITH CHECK (auth.uid() = submitted_by);

-- 用户可以更新自己提交的待审核项目
CREATE POLICY "Users can update their own pending projects"
  ON projects FOR UPDATE
  USING (auth.uid() = submitted_by AND review_status = 'pending')
  WITH CHECK (auth.uid() = submitted_by AND review_status = 'pending');

-- 用户可以删除自己提交的待审核项目
CREATE POLICY "Users can delete their own pending projects"
  ON projects FOR DELETE
  USING (auth.uid() = submitted_by AND review_status = 'pending');

-- 管理员和负责人可以查看所有项目
CREATE POLICY "Admins and leaders can view all projects"
  ON projects FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role IN ('admin', 'leader')
    )
  );

-- 管理员和负责人可以更新项目（用于审核）
CREATE POLICY "Admins and leaders can update projects"
  ON projects FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role IN ('admin', 'leader')
    )
  );

-- 插入现有项目数据
INSERT INTO projects (
  title,
  description,
  content,
  tags,
  status,
  year,
  github_url,
  review_status,
  submitter_name
) VALUES (
  'FreeRTOS串口数据存储',
  '基于FreeRTOS和FAT文件系统的串口数据存储系统，实现数据的可靠接收和持久化存储',
  '# FreeRTOS串口数据存储

## 项目简介
本项目基于FreeRTOS实时操作系统，实现了一个可靠的串口数据接收和存储系统。通过FAT文件系统将接收到的数据持久化存储到SD卡中。

## 技术特点
- 使用FreeRTOS任务调度，实现多任务并发处理
- 集成FAT文件系统，支持标准文件操作
- 串口DMA接收，提高数据传输效率
- 数据缓冲机制，防止数据丢失

## 应用场景
- 数据采集系统
- 传感器数据记录
- 通信数据监控',
  ARRAY['FreeRTOS', 'FAT文件系统', '串口通信', '嵌入式'],
  'completed',
  '2024',
  NULL,
  'approved',
  'C315实验室'
);

COMMENT ON TABLE projects IS '项目展示表';
COMMENT ON COLUMN projects.review_status IS '审核状态: pending-待审核, approved-已通过, rejected-已拒绝';
COMMENT ON COLUMN projects.status IS '项目状态: completed-已完成, in-progress-进行中, planned-计划中';
