# cvue

> vue2.x重构vue中文社区

## 运行方式

``` bash
# 通过npm安装本项目依赖文件
npm install

# 启动服务
npm run dev
```

## 目录结构
<pre>
.
├── README.md           
├── build              // 构建服务和webpack配置
├── config             // 项目不同环境的配置
├── index.html         // 项目入口文件 
├── package.json       // 项目配置文件
├── static             // 静态资源
├── test               // 环境配置
├── src                // 生产目录
│   ├── assets         // css js 和图片资源
│   ├── components     // 各种组件
        ├── common     // 公用组件
│   └── main.js        // Webpack 预编译入口
</pre>
