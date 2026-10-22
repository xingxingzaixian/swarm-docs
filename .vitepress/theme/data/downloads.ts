/**
 * 下载信息 —— 全站唯一配置点。
 *
 * 发版时只需要改 TAG 一行；GitHub 侧永远不用改，因为它用的是
 * `releases/latest/download/<文件名>` 这个稳定重定向。
 *
 * Gitee 镜像要手动维护：Gitee 没有 latest 重定向，URL 里必须带 tag，
 * 所以每次手动发完 Gitee 版本后，把 TAG 改成新版本号即可。
 * 没有填 mirror 的条目，页面不会显示「国内下载」按钮（不会出现死链）。
 */

export const TAG = 'v0.1.5'

export const REPO = {
  github: 'xingxingzaixian/SwarmLink',
  gitee: 'small_bud_star/swarm-link',
}

const GH = `https://github.com/${REPO.github}/releases/latest/download/`

/**
 * Gitee 附件直链。留空字符串表示「镜像还没传」，页面自动隐藏。
 * 填的时候形如：gitee('SwarmLink-amd64-installer.exe')
 */
const gitee = (file: string): string =>
  `https://gitee.com/${REPO.gitee}/releases/download/${TAG}/${file}`

export interface DownloadItem {
  /** 操作系统名，如 Windows */
  os: string
  /** 这个包是什么，如「安装版」 */
  label: string
  /** Release 里的文件名，必须与产物完全一致 */
  file: string
  /** 一句话说明，可省略 */
  note?: string
  /** 国内镜像地址；留空表示只有 GitHub */
  mirror?: string
}

export const downloads: DownloadItem[] = [
  {
    os: 'Windows',
    label: '安装版',
    file: 'SwarmLink-amd64-installer.exe',
    note: '推荐。首次运行会弹出防火墙提示，请选择「允许访问」',
    mirror: gitee('SwarmLink-amd64-installer.exe'),
  },
  {
    os: 'Windows',
    label: '免安装版',
    file: 'SwarmLink.exe',
    note: '单个 exe，不写注册表，适合放 U 盘里带走',
    mirror: gitee('SwarmLink.exe'),
  },
  {
    os: 'macOS',
    label: '磁盘映像',
    file: 'SwarmLink.dmg',
    note: '通用二进制，Intel 与 Apple Silicon 通用',
    mirror: gitee('SwarmLink.dmg'),
  },
  {
    os: 'Linux',
    label: 'AppImage',
    file: 'swarmlink-x86_64.AppImage',
    note: '下载后 chmod +x 直接运行',
    mirror: gitee('swarmlink-x86_64.AppImage'),
  },
  {
    os: 'Linux',
    label: 'deb',
    file: 'SwarmLink.deb',
    note: 'Debian / Ubuntu',
    mirror: gitee('SwarmLink.deb'),
  },
  {
    os: 'Linux',
    label: 'rpm',
    file: 'SwarmLink.rpm',
    note: 'Fedora / RHEL 系',
    mirror: gitee('SwarmLink.rpm'),
  },
]

/** 主推平台 —— 首页只展示这三个 */
export const featured: DownloadItem[] = [
  downloads.find((d) => d.file.endsWith('installer.exe'))!,
  downloads.find((d) => d.file.endsWith('.dmg'))!,
  downloads.find((d) => d.file.endsWith('.AppImage'))!,
]

export const githubUrl = (item: DownloadItem): string => GH + item.file
export const githubReleasesPage = `https://github.com/${REPO.github}/releases`
export const giteeReleasesPage = `https://gitee.com/${REPO.gitee}/releases`
