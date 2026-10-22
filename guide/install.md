---
title: 安装
description: 三个平台的安装步骤、Windows 防火墙提示、数据目录在哪、重装前该备份什么。
---

# 安装

## 三个平台

| 平台 | 安装包 | 装法 |
|---|---|---|
| Windows | `.exe` 安装包（或免安装的单文件 exe） | 双击，像普通软件一样点「下一步」 |
| macOS | `.dmg` | 打开后把蜂群拖进「应用程序」 |
| Linux | `.AppImage` / `.deb` / `.rpm` | AppImage 加执行权限直接运行；其余用包管理器装 |

安装包在[下载页](../download.md)。

## Windows 的防火墙提示

如果看到防火墙提示，请选择**允许访问**。

这不是可选项：软件靠这个权限在同一张网里寻找其他电脑，拒绝之后你不会看到任何人，也不会收到任何提示 —— 表现就是「装好了，但列表是空的」。

## 数据放在哪

聊天记录、设置、收到的文件都在这个目录里：

- Windows：`C:\Users\你的用户名\AppData\Roaming\SwarmLink`
- macOS：`~/Library/Application Support/SwarmLink`
- Linux：`~/.config/SwarmLink`（或 `$XDG_CONFIG_HOME/SwarmLink`）

::: tip 重装系统前先备份它
聊天记录与共享设置都在这个目录里，没有云端副本。想留着，就把它拷走。
:::

## 想把数据放到别处

两种情况会用到：装在 U 盘里随身带，或者 C 盘空间紧张。

1. **便携模式**：在 exe 同级放一个空的 `portable.mode` 文件，数据就写到 exe 旁边的目录里。
2. **环境变量**：设置 `SWARMLINK_DATA_DIR` 指向任意目录。

::: warning 换目录 = 换了一台新设备
身份文件跟着数据目录走。换了目录，你对别人来说就是一台陌生设备，旧的聊天记录也留在旧目录里，不会跟着跑。
:::

细节与副作用见[配置与数据目录](../dev/config.md)。

## 下一步

打开软件，看[第一次打开](./first-run.md)。
