---
title: 配置与数据目录
description: 数据目录的结构、两种改位置的方式、四个必知的副作用，以及常用配置段。
---

# 配置与数据目录

配置文件与数据库默认在系统用户配置目录（Windows 为 `%APPDATA%\SwarmLink`）：

```
%APPDATA%\SwarmLink\
  config.toml        配置（首次启动生成）
  data\app.db        聊天记录等
  identity\          节点身份
  logs\              日志
  webview\           WebView2 缓存
```

## 改位置

```powershell
# ① 环境变量
$env:SWARMLINK_DATA_DIR = 'D:\swarmlink-data'
.\bin\SwarmLink.exe

# ② 便携模式：exe 同级放一个空的 portable.mode
New-Item -ItemType File .\bin\portable.mode
```

## 四个必须知道的副作用

**1. 换数据目录 = 换节点身份。** `identity/node.key` 跟着数据目录走，换一处就会生成新的 `node_id`，对端看到的是一个新节点，历史记录也留在旧目录。

**2. WebView2 缓存也跟随数据目录。** 它默认在 `%APPDATA%\<exe 名>`，那里不可写时 WebView2 会以 `ERROR_BUSY` 失败，且错误被框架内部收尾 —— 现象就是「双击没反应」。

**3. 日志有兜底位置。** `<数据目录>/logs/swarmlink.log` 写不了时退到 `%TEMP%\SwarmLink\swarmlink.log`；启动失败对话框会写明实际位置。

**4. 启动失败不再静默。** 产物没有控制台（`-H windowsgui`），后端起不来时会弹原生对话框，内容可用 `Ctrl+C` 复制；自动化场景用 `SWARMLINK_NO_STARTUP_DIALOG=1` 关掉。

## 常用配置段

| 段 | 关键项 |
|---|---|
| `[general]` | `display_name` |
| `[download]` | `default_dir`、`auto_open` |
| `[network]` | `tcp_port` / `udp_port`（0 = 自动）、`port_fallback_range`、`interface_mode`、`allow/deny_interfaces` |
| `[discovery]` | `announce_interval`、`peer_ttl`、`max_peers`、`max_peer_list_size` |
| `[discovery.seeds]` | `refresh_interval`、`seeds_per_refresh`、`list`（`IP:UDP_PORT`） |
| `[connection]` | `idle_conn_timeout`、`max_dial_concurrency`、`max_active_conns` |
| `[transfer]` | `max_concurrent`、`chunk_size`、`window_size`、`bitmap_flush_interval` |
| `[security]` | `require_auth=true`（**保持开启**）、`encryption`（后续版本启用，当前 `off`） |

::: danger 不要把 `require_auth` 关掉
它关掉之后，任何知道端口的人都能冒充成对端。局域网里「不需要认证」听起来方便，实际是把自己变成一台谁都能连的机器。
:::

## 现场部署相关的两项

`udp_port` 在种子机器上**必须固定**，关闭自动回退 —— 否则跨网段节点拿着配置里的端口发第一个报文就石沉大海。`tcp_port` 仍可回退，对端会从种子回传的通告里学到实际端口。

VPN 场景把虚拟网卡加入 `deny_interfaces`。默认已含常见项，网卡名字特殊时需要自己加。

更完整的现场条件见[部署前必读](../deploy/index.md)。
