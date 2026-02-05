'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiGithub, FiMail } from 'react-icons/fi'
import { memberApi } from '@/lib/memberApi'
import type { Member } from '@/types/member'
import { calculateGrade, formatLeaderTerm, getGradeWeight } from '@/lib/gradeUtils'

// 静态数据：指导老师
const staticAdmins = [
  {
    id: 'admin-1',
    name: '雷万忠',
    role: 'admin' as const,
    email: 'leiwanzhong@haue.edu.cn',
    department: '电气信息工程学院',
    bio: '副教授，硕士。研究方向为电机控制与高电压绝缘技术。公开发表论文14篇，中文核心9篇，EI检索3篇。主持省级教科研项目共12项，其中省级质量工程项目1项。发明专利2项。出版独著1部，主编教材1部，参编教材1部、工具书1部。',
    avatar: '/images/team/leiwanzhong.jpg',
    github_url: '',
    skills: [],
    grade: '',
    phone: '',
    motivation: '',
    status: 'approved' as const,
    reviewed_by: '',
    reviewed_at: '',
    created_at: ''
  }
]

export default function TeamPage() {
  const [currentLeaders, setCurrentLeaders] = useState<Member[]>([])
  const [formerLeaders, setFormerLeaders] = useState<Member[]>([])
  const [members, setMembers] = useState<Member[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        // 获取现任负责人
        const leaders = await memberApi.getCurrentLeaders()
        setCurrentLeaders(leaders)

        // 获取历任负责人
        const former = await memberApi.getFormerLeaders()
        setFormerLeaders(former)

        // 获取所有成员
        const allMembers = await memberApi.getAll()

        // 只获取普通成员（排除admin和leader）
        const regularMembers = allMembers.filter(m => m.role === 'member')

        // 为每个成员计算当前年级（如果有入学年份）
        const membersWithGrade = regularMembers.map(member => {
          if (member.enrollment_year) {
            const currentGrade = calculateGrade(member.enrollment_year, member.enrollment_month || 9)
            return { ...member, grade: currentGrade }
          }
          return member
        })

        // 按年级排序
        membersWithGrade.sort((a, b) => {
          const gradeA = a.grade || '已毕业'
          const gradeB = b.grade || '已毕业'
          return getGradeWeight(gradeA) - getGradeWeight(gradeB)
        })

        setMembers(membersWithGrade)
      } catch (error) {
        console.error('Failed to fetch members:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMembers()
  }, [])

  // 按年级分组成员
  const membersByGrade = members.reduce((acc, member) => {
    const grade = member.grade || '未分配'
    if (!acc[grade]) {
      acc[grade] = []
    }
    acc[grade].push(member)
    return acc
  }, {} as Record<string, Member[]>)

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">加载中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-20">
      <div className="container-custom">
        <h1 className="text-5xl font-bold text-center mb-8 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
          团队成员
        </h1>

        {/* 指导教师 - 使用静态数据 */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
            指导教师
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {staticAdmins.map((admin, index) => (
                <motion.div
                  key={admin.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0">
                      {admin.avatar ? (
                        <img
                          src={admin.avatar}
                          alt={admin.name}
                          className="w-32 h-32 rounded-full object-cover mx-auto md:mx-0"
                        />
                      ) : (
                        <div className="w-32 h-32 bg-gradient-to-br from-primary-600 to-accent-600 rounded-full flex items-center justify-center text-white text-4xl font-bold mx-auto md:mx-0">
                          {admin.name[0]}
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                        {admin.name}
                      </h3>
                      <p className="text-primary-600 dark:text-primary-400 mb-1 font-medium">
                        指导教师
                      </p>
                      {admin.department && (
                        <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">
                          {admin.department}
                        </p>
                      )}
                      {admin.bio && (
                        <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                          {admin.bio}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-3">
                        <a
                          href={`mailto:${admin.email}`}
                          className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 text-sm"
                        >
                          <FiMail />
                          <span>{admin.email}</span>
                        </a>
                        {admin.github_url && (
                          <a
                            href={admin.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 text-sm"
                          >
                            <FiGithub />
                            <span>GitHub</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

        {/* 学生负责人（现任）- 从数据库动态加载 */}
        {currentLeaders.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
              学生负责人
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {currentLeaders.map((leader, index) => (
                  <motion.div
                    key={leader.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="card"
                  >
                    <div className="flex flex-col items-center text-center mb-4">
                      {leader.avatar ? (
                        <img
                          src={leader.avatar}
                          alt={leader.name}
                          className="w-28 h-28 rounded-full object-cover mb-4"
                        />
                      ) : (
                        <div className="w-28 h-28 bg-gradient-to-br from-primary-600 to-accent-600 rounded-full mb-4 flex items-center justify-center text-white text-3xl font-bold">
                          {leader.name[0]}
                        </div>
                      )}
                      <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">
                        {leader.name}
                      </h3>
                      <p className="text-primary-600 dark:text-primary-400 mb-1 font-medium">
                        学生负责人
                      </p>
                      {leader.department && (
                        <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">
                          {leader.department}
                        </p>
                      )}
                      {leader.enrollment_year && (
                        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-xs mb-3">
                          {calculateGrade(leader.enrollment_year, leader.enrollment_month || 9)}
                        </span>
                      )}
                    </div>

                    {leader.bio && (
                      <p className="text-gray-600 dark:text-gray-300 mb-4 text-center">
                        {leader.bio}
                      </p>
                    )}

                    {leader.skills && leader.skills.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 text-center">
                          技术方向
                        </h4>
                        <div className="flex flex-wrap gap-2 justify-center">
                          {leader.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300 rounded-full text-xs"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex justify-center gap-3">
                      {leader.github_url && (
                        <a
                          href={leader.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors"
                        >
                          <FiGithub size={18} />
                          <span className="text-sm">GitHub</span>
                        </a>
                      )}
                      <a
                        href={`mailto:${leader.email}`}
                        className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                      >
                        <FiMail size={18} />
                        <span className="text-sm">邮箱</span>
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
        )}

        {/* 历任负责人 */}
        {formerLeaders.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
              历任负责人
            </h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {formerLeaders.map((leader, index) => (
                <motion.div
                  key={leader.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="card text-center"
                >
                  {leader.avatar ? (
                    <img
                      src={leader.avatar}
                      alt={leader.name}
                      className="w-20 h-20 rounded-full object-cover mx-auto mb-3"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gradient-to-br from-primary-600 to-accent-600 rounded-full mx-auto mb-3 flex items-center justify-center text-white text-2xl font-bold">
                      {leader.name[0]}
                    </div>
                  )}
                  <h3 className="text-lg font-bold mb-1 text-gray-900 dark:text-white">
                    {leader.name}
                  </h3>
                  {leader.leader_term && (
                    <p className="text-xs text-primary-600 dark:text-primary-400 mb-2">
                      {formatLeaderTerm(leader.leader_term)}
                    </p>
                  )}
                  {leader.department && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                      {leader.department}
                    </p>
                  )}
                  <div className="flex justify-center gap-2">
                    {leader.github_url && (
                      <a
                        href={leader.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      >
                        <FiGithub size={16} />
                      </a>
                    )}
                    <a
                      href={`mailto:${leader.email}`}
                      className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      <FiMail size={16} />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* 实验室成员 - 按年级分组显示 */}
        {members.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
              实验室成员
            </h2>

            {/* 按年级分组显示 */}
            {['大一', '大二', '大三', '大四', '已毕业'].map(grade => {
              const gradeMembers = membersByGrade[grade]
              if (!gradeMembers || gradeMembers.length === 0) return null

              return (
                <div key={grade} className="mb-12">
                  <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200 flex items-center">
                    <span className="mr-3">{grade}</span>
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                      ({gradeMembers.length}人)
                    </span>
                    {grade === '已毕业' && (
                      <span className="ml-3 px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full text-xs">
                        校友
                      </span>
                    )}
                  </h3>
                  <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {gradeMembers.map((member, index) => (
                      <motion.div
                        key={member.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="card text-center"
                      >
                        {member.avatar ? (
                          <img
                            src={member.avatar}
                            alt={member.name}
                            className="w-20 h-20 rounded-full object-cover mx-auto mb-3"
                          />
                        ) : (
                          <div className="w-20 h-20 bg-gradient-to-br from-primary-600 to-accent-600 rounded-full mx-auto mb-3 flex items-center justify-center text-white text-2xl font-bold">
                            {member.name[0]}
                          </div>
                        )}
                        <h3 className="text-lg font-bold mb-1 text-gray-900 dark:text-white">
                          {member.name}
                        </h3>
                        {member.grade && (
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                            {member.grade}
                            {member.is_graduated && (
                              <span className="ml-2 text-xs text-gray-400">
                                ({member.graduation_year}届)
                              </span>
                            )}
                          </p>
                        )}
                        {member.department && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                            {member.department}
                          </p>
                        )}
                        {member.skills && member.skills.length > 0 && (
                          <div className="flex flex-wrap gap-1 justify-center mb-3">
                            {member.skills.slice(0, 2).map((skill) => (
                              <span
                                key={skill}
                                className="px-2 py-0.5 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded text-xs"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        )}
                        <div className="flex justify-center gap-2">
                          {member.github_url && (
                            <a
                              href={member.github_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                            >
                              <FiGithub size={16} />
                            </a>
                          )}
                          <a
                            href={`mailto:${member.email}`}
                            className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                          >
                            <FiMail size={16} />
                          </a>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )
            })}
          </section>
        )}

      </div>
    </div>
  )
}
