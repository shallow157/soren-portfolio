export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">关于我</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            我是一名充满热情的全栈开发者，专注于创建现代化的 Web 应用程序
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">技能专长</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">React / Next.js</span>
                  <span className="text-sm text-gray-500">90%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{width: '90%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">TypeScript</span>
                  <span className="text-sm text-gray-500">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{width: '85%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Node.js</span>
                  <span className="text-sm text-gray-500">80%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{width: '80%'}}></div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">个人简介</h3>
            <p className="text-gray-600 mb-4">
              我拥有多年的 Web 开发经验，专注于前端技术栈，包括 React、Vue.js、TypeScript 等现代技术。
            </p>
            <p className="text-gray-600 mb-4">
              我热衷于学习新技术，追求代码质量和用户体验的完美结合。在工作中，我注重团队协作，善于沟通，能够快速适应新的开发环境。
            </p>
            <p className="text-gray-600">
              除了编程，我还喜欢阅读技术博客，参与开源项目，不断提升自己的技术水平。
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}