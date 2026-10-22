const BASE = '/swarm-docs/'

export default {
  base: BASE,
  lang: 'zh-CN',
  title: '蜂群',
  titleTemplate: ':title · 蜂群 SwarmLink',
  description:
    '蜂群 SwarmLink：同一张内网里直接聊天、传文件、共享目录。没有服务器，不用注册，断网也能用。',
  // 仓库首页的 README 是给 GitHub 看的，不该变成一个 /README.html 页面
  srcExclude: ['README.md'],
  head: [
    ['link', { rel: 'icon', href: `${BASE}logo.png` }],
    ['link', { rel: 'apple-touch-icon', href: `${BASE}logo.png` }],
    ['meta', { name: 'theme-color', content: '#2b7cf6' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: '蜂群 SwarmLink —— 内网点对点聊天与文件传输' }],
    ['meta', { property: 'og:description', content: '没有服务器，不用注册，断网也能用。文件在两台电脑之间直连。' }],
  ],
  markdown: {
    image: { lazyLoading: true },
    config(md) {
      const renderImage = md.renderer.rules.image!
      md.renderer.rules.image = (tokens, idx, options, env, self) => {
        const html = renderImage(tokens, idx, options, env, self)
        const src = tokens[idx].attrGet('src') ?? ''
        if (!src || /^https?:/.test(src)) return html
        return `<a class="shot" href="${src}" target="_blank" rel="noopener" title="点击查看原图">${html}</a>`
      }
    },
  },
  themeConfig: {
    logo: '/logo.png',
    siteTitle: '蜂群',
    nav: [
      { text: '使用手册', link: '/guide/what-is-it', activeMatch: '/guide/' },
      { text: '现场部署', link: '/deploy/', activeMatch: '/deploy/' },
      { text: '开发', link: '/dev/', activeMatch: '/dev/' },
      { text: '更新日志', link: '/changelog' },
      { text: '下载', link: '/download' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '开始使用',
          items: [
            { text: '这是什么', link: '/guide/what-is-it' },
            { text: '安装', link: '/guide/install' },
            { text: '第一次打开', link: '/guide/first-run' },
          ],
        },
        {
          text: '日常使用',
          items: [
            { text: '别人怎么出现在列表里', link: '/guide/peers' },
            { text: '聊天', link: '/guide/chat' },
            { text: '群聊', link: '/guide/group' },
            { text: '文件传到哪去了', link: '/guide/transfers' },
            { text: '共享中心', link: '/guide/share-center' },
          ],
        },
        {
          text: '调整与收尾',
          items: [
            { text: '个性化与快捷键', link: '/guide/personalize' },
            { text: '设置里都有什么', link: '/guide/settings' },
            { text: '清理失效的节点', link: '/guide/cleanup-peers' },
            { text: '常见问题', link: '/guide/faq' },
            { text: '隐私说明', link: '/guide/privacy' },
          ],
        },
      ],
      '/deploy/': [
        {
          text: '现场部署',
          items: [
            { text: '部署前必读', link: '/deploy/' },
            { text: '部署自检怎么用', link: '/deploy/selfcheck' },
            { text: '跨网段故障排查', link: '/deploy/network' },
          ],
        },
      ],
      '/dev/': [
        {
          text: '开发',
          items: [
            { text: '概览', link: '/dev/' },
            { text: '环境准备', link: '/dev/setup' },
            { text: '本地开发与构建', link: '/dev/develop' },
            { text: '测试', link: '/dev/test' },
            { text: '代码结构', link: '/dev/structure' },
            { text: '配置与数据目录', link: '/dev/config' },
            { text: '故障排查', link: '/dev/troubleshooting' },
          ],
        },
      ],
    },
    outline: { level: [2, 3], label: '本页目录' },
    docFooter: { prev: '上一篇', next: '下一篇' },
    returnToTopLabel: '回到顶部',
    darkModeSwitchLabel: '外观',
    sidebarMenuLabel: '目录',
    footer: {
      message: '无中继、无中心服务器 —— 这是刻意的设计取舍，不是还没做。',
      copyright: '蜂群 SwarmLink',
    },
    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
          modal: {
            noResultsText: '没有找到相关内容',
            resetButtonTitle: '清除关键词',
            footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' },
          },
        },
      },
    },
  },
}
