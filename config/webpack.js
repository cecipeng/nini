const path = require('path')

// 生成页面的 title
exports.title = `sapphire's world`

// 别名配置
exports.resolve = {
  alias: {}
}

// 编译目录配置
exports.buildPath = path.resolve(__dirname, '../build')

// 静态资源路径配置
// 如果配置了 cdn 并且生效，则此路径无效，会使用 cdn 的路径（cd.host + '/' + cdn.params.path）作为 publicPath
exports.publicPath = '/'

// 加入 vendor 公共包的库
exports.vendor = []

// webpack dev server 默认端口，也可以通过命令行来指定 --port=9000，默认9000（通常不用设置，冲突时会自动使用可用端口）
// exports.port = 9000

// 自定义的 loaders
exports.loaders = []

// 自定义的 plugins
exports.plugins = []

// 额外需要从 public 目录拷贝到编译后目录的资源（例如一些第三方的lib）
// 只需要写文件文件名即可，会在 vendor 构造时进行拷贝
// 引用请自行修改 public/index.html 进行处理
exports.additional = []

// 不需要进行样式模块化的文件或目录（node_modules、styles 目录不会进行样式模块化）
exports.excludeStyleModule = []

// 额外的监听目录，这样不在 webpack 已有监听范围内的目录或文件也会被监听触发重新构建
// 配置可以参见 https://github.com/pigcan/extra-watch-webpack-plugin
exports.extraWatch = {
  dirs: [],
  files: []
}

// 是否需要将资源文件名进行 hash 处理（用来解决缓存问题）
// 某些项目需要固定静态资源文件名（缓存方案自行处理）, 可以将其设置为 false
// 注意：仅对 npm run build 生效
exports.staticHash = true

// webpack 处理完毕后的回调处理
exports.done = function () {}

// postcss-pxtorem 参数(https://github.com/cuth/postcss-pxtorem#options)
exports.postcssPxtoremOptions = {
  rootValue: 50,
  propWhiteList: []
}
