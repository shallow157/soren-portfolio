export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">联系我</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            如果您对我的工作感兴趣，或者有任何合作机会，欢迎与我联系
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">联系信息</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white text-sm">@</span>
                </div>
                <span className="text-gray-700">shallowyang157@outlook.com</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white text-sm">📱</span>
                </div>
                <span className="text-gray-700">+86 181 9062 4259</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white text-sm">📍</span>
                </div>
                <span className="text-gray-700">中国，成都</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">发送消息</h3>
            <form className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="您的姓名"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="您的邮箱"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <textarea
                  rows={4}
                  placeholder="您的消息"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                发送消息
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}