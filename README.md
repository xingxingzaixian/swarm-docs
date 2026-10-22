# 蜂群 · 文档站

`https://xingxingzaixian.github.io/swarm-docs/` 的源码。VitePress 1.6.4，中文单语。

## 本地跑

```bash
npm install
npm run dev       # http://localhost:5173/swarm-docs/
npm run build     # 输出到 .vitepress/dist
npm run preview
```

## 发版时要改哪儿

**只有一处**：`.vitepress/theme/data/downloads.ts` 里的 `TAG`。

- GitHub 侧的下载链接用的是 `releases/latest/download/<文件名>` 稳定重定向，发新版本**不需要动**；
- Gitee 镜像的 URL 必须带 tag（Gitee 没有 latest 重定向），所以手工发完 Gitee 发行版后，把 `TAG` 改成新版本号即可；
- 某个平台没传镜像，就把那一行的 `mirror` 删掉 —— 页面会自动隐藏「国内镜像」按钮，不会留死链。

如果新版本改了安装包文件名，同步改 `file` 字段，否则链接会 404。

## 内容从哪来

这个站是**面向用户文档的唯一真源**。`swarm-link` 仓库里的 `docs/用户使用手册.md` 与 `docs/开发指南.md` 已迁到这里，不要再往那边写用户文档。

`swarm-link` 仓库仍然保留：`docs/adr/`（架构决策记录）、`docs/plans/`（实现计划）—— 它们面向维护者，不上线。

## 目录

```
.vitepress/
  config.mts              导航、三套侧边栏、搜索、截图放大
  theme/custom.css        颜色与排版基线
  theme/components/       首页与下载列表组件
  theme/data/downloads.ts 下载信息（唯一配置点）
guide/   使用手册 13 页
deploy/  现场部署 3 页（给 IT 管理员看）
dev/     开发 7 页
screenshots/ 手册截图（迁移自 swarm-link）
```

## 构建报 `Cannot read properties of undefined (reading 'imports')`

先删 `.vitepress/.temp` 与 `.vitepress/cache` 再重试。这是 VitePress 的临时目录被中断的构建写坏之后的典型症状 —— 报错文本跟真实原因毫无关系，别去改配置。

## 部署

推 `main` 即触发 `.github/workflows/deploy.yml`：构建 → 上传 artifact → 发布 GitHub Pages。

`config.mts` 里 `base: '/swarm-docs/'` 与仓库名绑定。**改仓库名必须同时改它**，否则全站 CSS 与图片一起 404。
