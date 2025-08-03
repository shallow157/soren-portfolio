export default function Projects() {
  const projects = [
    {
      title: "电商平台",
      description: "基于 Next.js 和 TypeScript 开发的现代化电商平台，具有完整的购物车、支付和用户管理功能。",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma"],
      image: "/api/placeholder/400/250",
      github: "#",
      demo: "#"
    },
    {
      title: "任务管理系统",
      description: "一个功能完整的项目管理工具，支持团队协作、任务分配和进度跟踪。",
      tech: ["React", "Node.js", "MongoDB", "Socket.io"],
      image: "/api/placeholder/400/250",
      github: "#",
      demo: "#"
    },
    {
      title: "个人博客",
      description: "使用 Next.js 构建的静态博客网站，支持 Markdown 文章和代码高亮。",
      tech: ["Next.js", "MDX", "Tailwind CSS"],
      image: "/api/placeholder/400/250",
      github: "#",
      demo: "#"
    }
  ]

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">我的项目</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            以下是我最近完成的一些项目，展示了我在不同技术栈上的实践经验
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">项目截图</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <span key={techIndex} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-4">
                  <a href={project.github} className="text-blue-600 hover:text-blue-800">
                    GitHub
                  </a>
                  <a href={project.demo} className="text-blue-600 hover:text-blue-800">
                    在线演示
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}