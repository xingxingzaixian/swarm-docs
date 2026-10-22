---
title: 开发概览
description: 技术栈、仓库入口、文档地图，以及贡献代码前该先读哪一页。
---

# 开发概览

技术栈：**Go + Wails v3 + Vue 3 + SQLite**（桌面端）。前端可以脱离 Go 工具链单独开发。

## 文档地图

| 你想做的事 | 看这一页 |
|---|---|
| 把项目跑起来 | [环境准备](./setup.md) |
| 改代码、构建、打包 | [本地开发与构建](./develop.md) |
| 跑测试、看覆盖率红线 | [测试](./test.md) |
| 新增模块前搞清楚依赖方向 | [代码结构](./structure.md) |
| 改端口、换数据目录、动配置项 | [配置与数据目录](./config.md) |
| 构建报错、dev 窗口 502 | [故障排查](./troubleshooting.md) |

## 仓库里的其他文档

- **[ADR 索引](https://github.com/xingxingzaixian/SwarmLink/tree/main/docs/adr)**：每条架构决策的背景与取舍，含实现偏差汇总。改架构之前先在这里查有没有前车之鉴。
- **架构设计书**：内部文档，不随仓库发布。协议、数据模型、领域建模的权威版本在那里 —— 需要时向维护者索取。
- **实现规格与计划**：`docs/superpowers/`。

## 三条最容易踩的坑

1. **漏 `EXTRA_TAGS=wails`** → 产物是 2.4MB 的占位程序，但安装包照常生成、装上去打不开。用 `pack.ps1` 或 `make` 绕开。
2. **`wails3` CLI 与本机 Go 版本不一致** → 报一堆 `package requires newer Go version`。CLI 必须用同一个 Go 版本编译。
3. **前端绑定是入库的** → `frontend/bindings/` 由工具生成、可以提交，不要手改；改了服务导出方法要重新生成。

## 快速命令

```bash
go test ./...                        # 全部测试，含架构红线与 gofmt 闸门
./scripts/pack.ps1 windows build     # Windows 构建（无需 make）
make gui                             # 有 make 时等价
make package                         # 出安装包
```
