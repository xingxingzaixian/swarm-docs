---
title: 故障排查
description: 构建与开发环境的七个高频故障：Go 版本冲突、GOROOT 不一致、执行策略、2.4MB 占位程序、dev 窗口 502、端口占用、双击没反应。
---

# 故障排查

按报错原文查。

## `wails3 build` 报 Go 版本冲突

**现象**：一屏 `package requires newer Go version` /
`This application uses version goX of the source-processing packages but runs version goY`。

**原因**：`wails3` CLI 是用另一个 Go 版本编译的。

```powershell
go version                                 # 本机 Go
go version (Get-Command wails3).Source     # CLI 的构建版本，两者应一致
go install github.com/wailsapp/wails/v3/cmd/wails3@v3.0.0-beta.29
```

多版本 Go（vfox / asdf / scoop）下格外容易踩：`go install` 把 CLI 装进**当时激活的那个 Go 的 `GOPATH\bin`**，切换 Go 版本不会更新它，旧副本仍留在 PATH 上（`Get-Command wails3 -All` 可列出全部）。用 `pack.ps1` 构建可以绕开。

## 报 `GOROOT` 与实际使用的 go 不一致

**现象**：`compile: version "go1.25.5" does not match go tool version "go1.26.3"`。

**原因**：`go.mod` 要求 1.26，用 1.25 编译会触发 `GOTOOLCHAIN=auto` 下载第二份工具链。
**解决**：直接用 1.26 以上的 Go，或走 `pack.ps1`（已处理）。

## `pack.ps1` 被执行策略拦住

**现象**：`未对文件进行数字签名`。脚本没有「来自互联网」标记，`Unblock-File` 解决不了。

```powershell
# 只对这一次调用生效
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\pack.ps1 windows build

# 或当前 shell 临时放宽（关窗即失效，不写注册表）
Set-ExecutionPolicy -Scope Process Bypass
```

不要用 `-Scope CurrentUser Unrestricted`：它是持久的，且比 `RemoteSigned` 弱。若 `CurrentUser` 已是 `RemoteSigned` 却仍被拦，说明当前 shell 的有效策略更严，用 `Get-ExecutionPolicy -List` 看是哪个作用域收紧了。

## 构建「成功」但程序只有 2.4 MB

漏了 `-tags wails`，产物是占位程序。用 `pack.ps1`，或手工：

```powershell
wails3 generate bindings -f "-tags wails" -clean .
wails3 build -tags wails
```

这是本项目最隐蔽的失败模式：构建成功、安装包正常、装上去是空壳。

## dev 窗口显示「HTTP ERROR 502」

**现象**：`start_dev.bat` 起来后，窗口里是 Edge 的 502 错误页，但终端里 Vite 明明打印了 `ready in xxx ms`。

**原因**：Vite 的 `server.host` 默认是 `localhost`，Node 17+ 在 Windows 上会把它解析成 `::1`，于是 Vite 只监听 `[::1]`；而 Wails dev 的 asset server 连的是 `127.0.0.1`，请求被拒后转成 502。

一条命令确认：

```powershell
curl.exe -s -o NUL -w "IPv4=%{http_code}`n" --max-time 3 http://127.0.0.1:9245/
curl.exe -s -o NUL -w "IPv6=%{http_code}`n" --max-time 3 "http://[::1]:9245/"
# IPv4=000 而 IPv6=200 → 就是这个症
```

**解决**：`frontend/vite.config.ts` 里已显式 `host: '127.0.0.1'`，不要删。改完 Vite 会自动重启，窗口点「刷新」即可。

另一类无害的 502：**Vite 比窗口启动慢**。刚打开的一两秒内点刷新就好，不是缺陷。

## 重跑 dev 时报 `Port 9245 is already in use`

上一次的 dev 没退干净（`wails3 dev` 的后台任务可能留下 Vite 孤儿进程）。`frontend/vite.config.ts` 与 Taskfile 都用了 `strictPort`，端口被占时 Vite **直接退出**，不会自动换端口 —— 表现同样是 502。

```powershell
Get-NetTCPConnection -LocalPort 9245 -State Listen | Select-Object OwningProcess
Stop-Process -Id <上面的 PID>
```

## 双击没反应

多半是数据目录不可写导致 WebView2 起不来。看启动失败对话框与日志兜底位置，见[配置与数据目录](./config.md)的第 2、4 条。
