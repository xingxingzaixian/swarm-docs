---
title: 代码结构
description: 目录布局与三条由测试强制的架构红线 —— 新增依赖方向之前先读这一页。
---

# 代码结构

```
main_wails.go    桌面外壳组合根（build tag: wails），唯一接触 Wails API 的文件
Taskfile.yml     wails3 构建任务
build/           平台构建配置与图标资源
internal/
  domain/        纯领域（零 I/O）: identity peer message group transfer protocol ports
  app/           用例编排: peer/chat/group/transfer/discovery App + Router
  adapters/      net/{tcp,udp} store/{sqlite,mem} config filesink keystore wails
  infra/         eventbus clock log fsutil
  bootstrap/     唯一组合根（GUI 装配路径）
test/
  harness/       单进程多节点装配器
  e2e/           发现/握手/单聊/幂等/传输/续传/跨网段收敛
  scale/         20 节点目录同步
frontend/
  src/           Vue3 + Pinia + TS
  bindings/      生成的绑定（已入库，勿手改）
```

## 三条红线

由 `internal/archtest` 强制，随 `go test ./...` 执行，CI 在 Windows 与 Linux 各跑一遍。

| 红线 | 内容 |
|---|---|
| **R1** | `domain/**` 禁止 import `net` / `database/sql` / `os` / Wails |
| **R2** | 适配器之间禁止互引；跨模块只走 `ports` 接口或事件总线 |
| **R3** | 业务代码（`app` / `domain`）禁止 `new` 具体适配器 |

新增依赖方向之前先把这三条想清楚。红线测试会拦住不合规的写法，而不是靠自觉。

::: tip 为什么红线不用 grep 实现
grep 分不清「注释里的 net」与「真的 import net」，原规则为此写了一串行首行尾锚定正则，只能靠注释反复警告后人别改坏。搬进 `go test` 之后，规则就是代码，改坏了当场红。
:::

## 为什么 `domain` 必须是纯的

它没有任何 I/O 依赖，意味着**全部业务规则都能用微秒级测试覆盖**，也意味着换掉 SQLite、换掉网络栈不需要碰领域代码。这条约束不是为了好看，是为了让协议与状态机的测试跑得足够快、足够多。

## 相关文档

架构决策记录（ADR）在仓库的 [`docs/adr/`](https://github.com/xingxingzaixian/SwarmLink/tree/main/docs/adr)，含实现偏差汇总。改动架构之前先去那里查有没有前车之鉴。
