module.exports = {
    title: '十月个人技术博客',
    base: '/docs/',
    head: [
        ['link', {rel: 'icon', href: '/images/7.png'}],
        ['meta',{name:'viewport',content:'width=device-width,initial-scale=1,user-scalable=no'}],
        ['meta',{name:'apple-mobile-web-app-capable',content:'yes'}],
        ['meta',{name:'full-screen',content:'true'}],
        ['meta',{name:'x5-fullscreen',content:'true'}],
        ['meta',{name:'360-fullscreen',content:'true'}]
    ],
    description: 'Just playing around',
    displayAllHeaders: false,//显示所有页面的标题链接
    themeConfig: {
        logo: '/images/7.png',
        lastUpdated: 'Last Updated',//最后更新时间
        nav: [  //头部导航
            {text: '技术博客', link: '/blog/'},
            {text:'Js',link:'/JavaScript/'},
            {text: 'html+css', link: '/css/'},
            {text: 'Vue', link: '/Vue/'},
            {text: 'React', link: '/React/'},
            {text: 'node', link: '/node/'},
            {text: 'wx', link: '/wx/'},
            {text: '网络', link: '/http/'},
            {text: '封装组件', link: '/myComponents/'},
            {text: '工具', link: '/utils/'},
            {text: 'github', link: 'https://github.com/lovebabyqi/Components', target: '_blank'},
        ],
        sidebar: {
            '/blog/': [
                '',
                'git',
                'webpack'
            ],
            '/JavaScript/': [
                '',
                'js数据',
                'js多种变量声明方式',
                'js控制流',
                'js函数',
                'js面向对象',
                'ES6',
                'js内置对象MathDate',
                'js正则表达式',
                'js综合',

            ],
            '/css/': [
                'html',
                'H5',
                '',
                'css收集',

            ],
            '/Vue/': [
                '',
            ],
            '/React/': [
                '',
            ],
            '/node/': [
                '',
            ],
            '/wx/': [
                '',
            ],
            '/http/': [
                '',
                // 'axios二次封装'
                // 'ajax'
            ],
            '/myComponents/': [
                '',
            ],
            '/webpack/': [
                '',
            ],
            '/utils/': [
                '',
            ],

        },
        sidebarDepth: 5,
        smoothScroll: false,//页面滚动,滚动很烦，长滚动

    },
    locales: {
        // 键名是该语言所属的子路径
        // 作为特例，默认语言可以使用 '/' 作为其路径。
        '/': {
            lang: 'zh', // 将会被设置为 <html> 的 lang 属性
            title: '十月',
            description: 'vuepress博客'
        },
    }
}