/**
 * 年级管理工具函数
 * 用于计算和管理学生年级
 */

/**
 * 根据入学年份计算当前年级
 * @param enrollmentYear 入学年份（如 2023）
 * @param enrollmentMonth 入学月份（默认9月）
 * @returns 年级字符串（"大一"、"大二"等）
 */
export function calculateGrade(
  enrollmentYear: number,
  enrollmentMonth: number = 9
): string {
  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth() + 1 // JavaScript月份从0开始

  // 如果还没到9月，按上一学年计算
  let yearsPassed: number
  if (currentMonth < 9) {
    yearsPassed = currentYear - enrollmentYear
  } else {
    yearsPassed = currentYear - enrollmentYear + 1
  }

  // 根据年数返回年级
  switch (yearsPassed) {
    case 1: return '大一'
    case 2: return '大二'
    case 3: return '大三'
    case 4: return '大四'
    default: return '已毕业'
  }
}

/**
 * 根据年级字符串推算入学年份（用于数据迁移）
 * @param grade 年级字符串（"大一"、"大二"等）
 * @returns 入学年份
 */
export function estimateEnrollmentYear(grade: string): number {
  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth() + 1

  // 当前学年的起始年份
  const academicYear = currentMonth >= 9 ? currentYear : currentYear - 1

  switch (grade) {
    case '大一': return academicYear
    case '大二': return academicYear - 1
    case '大三': return academicYear - 2
    case '大四': return academicYear - 3
    case '已毕业': return academicYear - 4
    default: return academicYear - 4 // 其他情况默认为已毕业
  }
}

/**
 * 检查是否应该显示为已毕业
 * @param enrollmentYear 入学年份
 * @param enrollmentMonth 入学月份
 * @returns 是否已毕业
 */
export function isGraduated(enrollmentYear: number, enrollmentMonth: number = 9): boolean {
  return calculateGrade(enrollmentYear, enrollmentMonth) === '已毕业'
}

/**
 * 获取学年描述（如"2023-2024学年"）
 * @returns 学年字符串
 */
export function getAcademicYear(): string {
  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth() + 1

  if (currentMonth >= 9) {
    return `${currentYear}-${currentYear + 1}`
  } else {
    return `${currentYear - 1}-${currentYear}`
  }
}

/**
 * 获取年级的排序权重（用于排序）
 * @param grade 年级字符串
 * @returns 排序权重（数字越小越靠前）
 */
export function getGradeWeight(grade: string): number {
  switch (grade) {
    case '大一': return 1
    case '大二': return 2
    case '大三': return 3
    case '大四': return 4
    case '已毕业': return 5
    default: return 6
  }
}

/**
 * 格式化任期显示
 * @param leaderTerm 任期字符串（如"2023-2024"）
 * @returns 格式化后的任期显示
 */
export function formatLeaderTerm(leaderTerm?: string): string {
  if (!leaderTerm) return ''
  return `${leaderTerm}年度负责人`
}
