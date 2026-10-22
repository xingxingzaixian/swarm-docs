---
title: 本地开发与构建
description: 热重载开发、只调前端、重新生成绑定、构建与打包，以及那个 2.4MB 占位程序的坑。
---

# 本地开发与构建

## 开发模式

```powershell
.\start_dev.bat                 # Windows，默认端口 9245，参数透传给 wails3 dev
.\start_dev.bat -port 9250      # 换端口
```

改 Go 和前端都会热重载。

## 只调前端

不必起 Go 后端：

```powershell
cd frontend
npm install
npm run dev          # 无后端时自动进入 mock 模式，界面照常可点
npm run typecheck
npm run build
```

mock 模式下没有真实的节点与传输，但界面、路由、状态都能点。

## 改了服务导出方法之后

改了 `internal/adapters/wails/services.go`，需要重新生成前端绑定：

```powershell
wails3 generate bindings -f "-tags wails" -clean .    # 或 make bindings
```

`frontend/bindings/` 是**入库**的，前端因此可以脱离 Go 工具链构建（CI 的前端任务依赖这一点）。它由工具生成，不要手改。

::: tip `-ts` 与 `-i` 不能省
省略时生成器输出 `.js`，而入库的是 `.ts`。两者混在一起后，`import ... from './models.js'` 会解析到 JS 文件，类型全部退化成 `any` —— 类型检查形同虚设。
:::

## 构建与打包

```powershell
.\scripts\pack.ps1 windows build      # 出 bin\SwarmLink.exe
.\scripts\pack.ps1 windows package    # 出 NSIS 安装包（需要 makensis）
```

有 `make` 的环境等价于：

```bash
make gui          # 生成绑定 + 构建 → bin/SwarmLink
make package      # 出安装包
```

### 为什么不要绕过 `pack.ps1`

它做三件容易被漏掉的事：

1. **强制导出 `EXTRA_TAGS=wails`**。漏了这个 tag，产物是一个 **2.4 MB 的占位程序**，但它照样能打包成安装包、照样显示「构建成功」。脚本末尾会按产物体积再挡一次。
2. **把当前 Go 的 `GOPATH\bin` 提到 PATH 最前**，避免用到旧版本 Go 装的 `wails3`。
3. **处理 `GOTOOLCHAIN` 与多版本 Go 下 `GOROOT` 不一致**的问题。

::: warning 这个 tag 必须用环境变量传
`wails3 package` 的参数里根本没有 `tags` 这一项，只有环境变量能穿透
`package → create:nsis:installer → deps: build` 这条嵌套调用链里的每一层。
写成 `wails3 build -tags wails` 在打包路径上是不生效的。
:::

## 入口与分层

`main_wails.go`（build tag `wails`）是**唯一接触 Wails API 的文件**。服务层与事件桥是零 Wails 依赖的纯 Go，因此 `go build ./...` 与 `go test ./...` **不需要 Wails 工具链**。

未启用 tag 时根目录无文件可编译，构建会直接失败 —— 这是刻意的：以前它会悄悄产出一个占位程序，那是最难发现的一类错误。

## 换图标

替换 `build/appicon.png` 后重新构建。DMG 相关资源目前仍是 Wails 模板默认值。

## 发版

1. 改 `internal/version/version.go` 里的 `Version`；
2. 在 `CHANGELOG.md` 里补一节 `## [x.y.z] - YYYY-MM-DD`（**缺这一节，发布流水线直接失败**，它不会用提交列表凑一份看着像说明的东西）；
3. 打 tag 推送。三平台产物由 `.github/workflows/release.yml` 在各自的原生 runner 上构建，Release 正文取自 CHANGELOG 的同名小节。

tag（`v0.1.5`）与 `Version`（`0.1.5`）不一致时，流水线同样会失败。
