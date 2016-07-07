# Multiple Pages

**文档概述**
    - 基本开发环境: node
    - 开发准备: npm install 
    - 实时编译命令:  npm start
启用服务器: 
         ```
         $ supervisor server.js
         //浏览器打开 localhost:4000
         ```
#### 关键技术
- [ES6](http://es6.ruanyifeng.com/)
- [gulp](http://www.gulpjs.com.cn/docs/api/)
- [jade](http://jade-lang.com/reference/includes/)
- [webpack](https://fakefish.github.io/react-webpack-cookbook/index.html)
- [handlebars](http://handlebarsjs.com/)

####目录结构：
```
..
├── app                     # 应用目录
│   ├── lib                 # 公共API目录
│   ├── components          # jade 组件视图目录(不会被直接编译,只会被引用)
│   ├── containers          # 容器视图目录(编译成html文件) 
│   ├── handlebars          # handlebars 数据模型目录
│   ├── static              # 静态资源目录
│       ├── less            # less 文件目录
│       ├── less            # css 文件目录
│       ├── img             # 图片文件 文件目录
│   ├── js                  # js模块目录
│       ├── entrance        # 入口js文件目录(会直接被编译)
│       ├── common          # 通用js模块目录(不会直接编译)
├── build                   # webpack 输出目录
├── server.js               # 前端开发服务器启动文件
├── gulpfile.js             # gulp 配置文件
```
