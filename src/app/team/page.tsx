import type { Metadata } from 'next'
import { FiGithub, FiMail } from 'react-icons/fi'

export const metadata: Metadata = {
  title: '团队成员 - C315实验室',
  description: '认识C315实验室优秀的团队成员',
}

const mentors = [
  {
    id: 1,
    name: '雷万忠',
    role: '副教授 / 指导教师',
    title: '河南工程学院电气信息工程学院',
    description: '副教授，硕士，主要从事电力电子与电力传动、新能源发电技术等方面的教学与科研工作。主持和参与多项省部级科研项目，在电力电子技术、新能源并网控制等领域具有丰富的研究经验。',
    email: 'leiwanzhong@haue.edu.cn',
    profile: 'http://dxgc.haue.edu.cn/info/1008/2857.htm',
  },
]

const students = [
  {
    id: 1,
    name: '唐晨翔',
    role: '学生负责人',
    major: '23级软件工程（智能物联）',
    description: '专注于嵌入式软件开发与边缘AI技术，负责实验室技术方向规划与项目管理',
    skills: ['嵌入式开发', '边缘AI', 'FreeRTOS', 'STM32'],
    github: 'https://github.com/tcx101',
  },
  {
    id: 2,
    name: '郭响雨',
    role: '学生负责人',
    major: '23级软件工程（智能物联）',
    description: '专注于嵌入式软件与智能控制领域，负责硬件设计与控制算法开发',
    skills: ['嵌入式软件', '智能控制', '电机控制', 'PID算法'],
    github: 'https://github.com',
  },
]

export default function TeamPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="container-custom">
        <h1 className="text-5xl font-bold text-center mb-8 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
          团队成员
        </h1>

        {/* 导师团队 */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
            指导教师
          </h2>
          <div className="max-w-3xl mx-auto">
            {mentors.map((mentor) => (
              <div key={mentor.id} className="card">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 bg-gradient-to-br from-primary-600 to-accent-600 rounded-full flex items-center justify-center text-white text-4xl font-bold mx-auto md:mx-0">
                      {mentor.name[0]}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                      {mentor.name}
                    </h3>
                    <p className="text-primary-600 dark:text-primary-400 mb-1 font-medium">
                      {mentor.role}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">
                      {mentor.title}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                      {mentor.description}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <a
                        href={`mailto:${mentor.email}`}
                        className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 text-sm"
                      >
                        <FiMail />
                        <span>{mentor.email}</span>
                      </a>
                      {mentor.profile && (
                        <a
                          href={mentor.profile}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 text-sm"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                          </svg>
                          <span>个人主页</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 学生团队 */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
            学生负责人
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {students.map((student) => (
              <div key={student.id} className="card">
                <div className="flex flex-col items-center text-center mb-4">
                  <div className="w-28 h-28 bg-gradient-to-br from-primary-600 to-accent-600 rounded-full mb-4 flex items-center justify-center text-white text-3xl font-bold">
                    {student.name[0]}
                  </div>
                  <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">
                    {student.name}
                  </h3>
                  <p className="text-primary-600 dark:text-primary-400 mb-1 font-medium">
                    {student.role}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">
                    {student.major}
                  </p>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-center">
                  {student.description}
                </p>
                
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 text-center">
                    技术方向
                  </h4>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {student.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300 rounded-full text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <a
                    href={student.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    <FiGithub size={18} />
                    <span className="text-sm">GitHub</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
