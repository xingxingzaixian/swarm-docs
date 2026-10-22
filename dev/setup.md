---
title: 环境准备
description: Go、Node、wails3 CLI、NSIS 的版本要求与一行校验命令。
---

# 环境准备

| 依赖 | 版本要求 | 用途 |
|---|---|---|
| Go | **≥ 1.26**（以 `go.mod` 为准） | 后端构建与测试 |
| Node | **≥ 24**（见 `frontend/.nvmrc`） | 前端构建；测试直接用 Node 跑 `.ts`，依赖类型擦除 |
| `wails3` CLI | **v3.0.0-beta.29**，且**必须用与本机相同的 Go 版本编译** | 桌面端构建 |
| NSIS（`makensis`） | 任意较新版本 | 仅打 Windows 安装包时需要 |

## 一行校验

```powershell
go version
node -v
go version (Get-Command wails3).Source    # 两行输出必须一致，不一致见「故障排查」
```

`wails3 doctor` 里报的 `Go Version` 是 **CLI 自己的构建版本**，不是 PATH 里的 Go —— 以它为准来判断是否一致。

## Windows 上通常没有 make

本指南里出现的 `make` 命令都同时给了等价的原生命令，没有 `make` 时直接照后者执行。

包括架构红线检查：它就在 `go test` 里（`internal/archtest`），所以任何能跑 `go test` 的环境都能跑红线。

::: tip 为什么红线不放 Makefile
Windows 开发机通常没有 `make`，而「CI 强制」在本地根本无从执行。搬进 `go test` 之后，红线随 `go test ./...` 自动执行，不依赖工具链是否齐全。
:::

## 下一步

[本地开发与构建](./develop.md)
