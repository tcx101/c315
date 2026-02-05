-- 创建年级计算函数和自动更新函数

-- 创建年级计算函数
CREATE OR REPLACE FUNCTION calculate_grade(
  enrollment_year INTEGER,
  enrollment_month INTEGER DEFAULT 9
) RETURNS TEXT AS $$
DECLARE
  current_year INTEGER;
  current_month INTEGER;
  years_passed INTEGER;
  grade_text TEXT;
BEGIN
  -- 获取当前年月
  current_year := EXTRACT(YEAR FROM CURRENT_DATE);
  current_month := EXTRACT(MONTH FROM CURRENT_DATE);

  -- 如果还没到9月，按上一学年计算
  IF current_month < 9 THEN
    years_passed := current_year - enrollment_year;
  ELSE
    years_passed := current_year - enrollment_year + 1;
  END IF;

  -- 根据年数返回年级
  CASE years_passed
    WHEN 1 THEN grade_text := '大一';
    WHEN 2 THEN grade_text := '大二';
    WHEN 3 THEN grade_text := '大三';
    WHEN 4 THEN grade_text := '大四';
    ELSE grade_text := '已毕业';
  END CASE;

  RETURN grade_text;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- 添加函数注释
COMMENT ON FUNCTION calculate_grade IS '根据入学年份和月份计算当前年级';

-- 创建自动更新毕业状态的函数
CREATE OR REPLACE FUNCTION auto_update_graduation_status()
RETURNS void AS $$
BEGIN
  -- 更新毕业状态
  UPDATE members
  SET
    is_graduated = TRUE,
    graduation_year = EXTRACT(YEAR FROM CURRENT_DATE)
  WHERE
    enrollment_year IS NOT NULL
    AND is_graduated = FALSE
    AND calculate_grade(enrollment_year, enrollment_month) = '已毕业';
END;
$$ LANGUAGE plpgsql;

-- 添加函数注释
COMMENT ON FUNCTION auto_update_graduation_status IS '自动更新已达到毕业条件的成员状态';
