# 下载

当前版本 **v0.1.5**。三个平台的安装包都由 CI 在各自的原生机器上构建 —— macOS 的磁盘映像是在 macOS 上打的，不跨平台糊出来。

<DownloadList />

## 安装前要知道的两件事

**Windows 会弹防火墙提示。** 请选择「允许访问」。这个权限是软件用来寻找身边的电脑的，不给它，你就看不到任何人 —— 这是它最常见的一次「装好了但没用」。

**macOS 首次打开可能被拦。** 如果提示「无法验证开发者」，在「系统设置 → 隐私与安全性」里选择「仍要打开」。第一次截图还需要在「屏幕录制」里单独授权，否则可能只截到一张桌面壁纸。

## Linux 包的差别

| 包 | 适用 | 说明 |
|---|---|---|
| `swarmlink-x86_64.AppImage` | 任何发行版 | `chmod +x` 后直接运行，不装依赖 |
| `SwarmLink.deb` | Debian / Ubuntu | 走系统包管理，卸载干净 |
| `SwarmLink.rpm` | Fedora / RHEL 系 | 同上 |

Linux 端需要系统里有 GTK4 与 WebKitGTK 6.0 运行库（主流发行版的近两年版本都自带）。

## 历史版本

所有版本的安装包都在 [GitHub Releases](https://github.com/xingxingzaixian/SwarmLink/releases) 上，每个版本的改动见[更新日志](./changelog.md)。

没有校验值不等于不安全，但如果你要把它装进机房，可以对一下文件大小与发布页上的一致。后续版本会附 `sha256` 清单。
