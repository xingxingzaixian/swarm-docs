<script setup lang="ts">
import mainShot from '../../../screenshots/01-main.png'
import { featured, githubUrl, TAG, githubReleasesPage } from '../data/downloads'
</script>

<template>
  <div class="home">
    <!-- 首屏：左侧说清楚是什么，右侧直接给真实界面 -->
    <section class="hero">
      <div class="hero__copy">
        <p class="kicker">内网 · 点对点 · 无服务器</p>
        <h1>把文件递给隔壁那台电脑，<br /><span class="mark">不经过任何服务器</span></h1>
        <p class="lede">
          蜂群让同一张内网里的电脑彼此可见：聊天、传文件、把整个目录挂出来让大家自己取。
          装上就能用 —— 不用注册，不用连外网。
        </p>

        <div class="cta">
          <a class="btn btn--primary" :href="githubUrl(featured[0])">下载 Windows 版</a>
          <a class="btn btn--ghost" href="./download.html">全部平台与校验值</a>
        </div>

        <dl class="specs">
          <div>
            <dt>服务器</dt>
            <dd>不需要</dd>
          </div>
          <div>
            <dt>注册</dt>
            <dd>不需要</dd>
          </div>
          <div>
            <dt>外网</dt>
            <dd>不需要</dd>
          </div>
        </dl>
      </div>

      <figure class="hero__shot">
        <img :src="mainShot" alt="蜂群主界面：左侧是联系人与群组，中间是聊天区，右侧是对方资料" />
        <figcaption>真实界面，未做美化 · 当前版本 {{ TAG }}</figcaption>
      </figure>
    </section>

    <!-- 边界：这一节比「功能列表」更能说明这是个什么产品 -->
    <section class="boundaries">
      <h2>它刻意不做的事</h2>
      <p class="section-lede">
        这三条不是「还没做」，是设计取舍。写在这里，免得你在现场踩到之后以为是 bug。
      </p>

      <ol class="rules">
        <li>
          <span class="num">01</span>
          <h3>不做中继</h3>
          <p>
            两个网段之间如果被防火墙或 NAT 隔开又不放行，软件帮不上忙。加一台中继服务器当然能让它「看起来能用」，
            但那样数据就真的经过了中间机器，「不出内网」也就成了一句口号。
          </p>
        </li>
        <li>
          <span class="num">02</span>
          <h3>不存文件</h3>
          <p>
            共享中心和群里的文件是从发布者那台电脑上取的，所以<strong>发布者必须在线</strong>。
            没有云端替你保管，也没有「七天过期」这类规则。
          </p>
        </li>
        <li>
          <span class="num">03</span>
          <h3>不做账号</h3>
          <p>
            身份跟着数据目录走。换数据目录或重装系统，等于换了一台新设备；旧聊天记录仍在原来的目录里，
            不会跟着你跑。
          </p>
        </li>
      </ol>
    </section>

    <!-- 能力清单：用分隔线成组，不做卡片墙 -->
    <section class="abilities">
      <h2>能做什么</h2>
      <ul>
        <li><strong>单聊与群聊</strong><span>文字、表情、图片；一个群最多 20 人</span></li>
        <li><strong>发文件与文件夹</strong><span>拖拽即可，断点续传，对方离线时自动排队</span></li>
        <li><strong>截图标注</strong><span>框选、箭头、马赛克、序号，截完直接进聊天框</span></li>
        <li><strong>共享中心</strong><span>挂出自己的目录，别人按需自取，只能读不能改</span></li>
        <li><strong>局域网内更新</strong><span>从版本更高的那台电脑取新版，全程不连外网</span></li>
        <li><strong>全局快捷键</strong><span>应用收在托盘里也能一键截图、一键唤出</span></li>
      </ul>
    </section>

    <section class="endcap">
      <p>
        Windows · macOS · Linux 三平台安装包，由 CI 在各自的原生机器上构建，不跨平台糊出来。
      </p>
      <div class="cta">
        <a class="btn btn--primary" href="./download.html">下载蜂群</a>
        <a class="btn btn--ghost" :href="githubReleasesPage" target="_blank" rel="noopener">
          全部历史版本
        </a>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home {
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 24px 96px;
}

/* ------------------------------------------------------------------ 首屏 */

.hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 40px;
  padding: 56px 0 0;
}

@media (min-width: 900px) {
  .hero {
    grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
    gap: 56px;
    align-items: start;
    padding-top: 72px;
  }
}

.kicker {
  margin: 0 0 18px;
  font-size: 0.8125rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--sw-text-2);
}

.hero h1 {
  margin: 0;
  font-size: clamp(2rem, 1.4rem + 2.4vw, 3.05rem);
  line-height: 1.18;
  letter-spacing: -0.02em;
  font-weight: 700;
  color: var(--sw-text);
  text-wrap: balance;
}

/* 强调用一条下划线，不用彩色文字：字号已经很大，再加颜色会吵 */
.mark {
  background: linear-gradient(transparent 68%, var(--vp-c-brand-soft) 68%);
  box-shadow: inset 0 -0.1em 0 var(--sw-blue);
}

.lede {
  margin: 22px 0 0;
  max-width: 46ch;
  font-size: 1.0625rem;
  line-height: 1.75;
  color: var(--sw-text-2);
}

.cta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 30px;
}

.btn {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: 0 22px;
  border-radius: 8px;
  font-size: 0.9375rem;
  font-weight: 600;
  text-decoration: none;
  transition:
    background-color 0.18s cubic-bezier(0.16, 1, 0.3, 1),
    border-color 0.18s cubic-bezier(0.16, 1, 0.3, 1),
    color 0.18s cubic-bezier(0.16, 1, 0.3, 1);
}

.btn--primary {
  background: var(--sw-blue);
  color: #fff;
  border: 1px solid var(--sw-blue);
}

.btn--primary:hover {
  background: var(--sw-blue-dark);
  border-color: var(--sw-blue-dark);
  color: #fff;
}

.btn--ghost {
  color: var(--sw-text);
  border: 1px solid var(--sw-line);
}

.btn--ghost:hover {
  border-color: var(--sw-blue);
  color: var(--sw-blue-dark);
}

.dark .btn--ghost:hover {
  color: #9cc0ff;
}

/* 规格表：把「不需要」这三件事做成一张像铭牌的东西 */
.specs {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0;
  margin: 40px 0 0;
  border-top: 1px solid var(--sw-line);
  border-bottom: 1px solid var(--sw-line);
}

.specs > div {
  padding: 16px 0 18px;
}

.specs > div + div {
  padding-left: 20px;
  border-left: 1px solid var(--sw-line);
}

.specs dt {
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  color: var(--sw-text-2);
}

.specs dd {
  margin: 6px 0 0;
  font-size: 1.125rem;
  font-weight: 650;
  color: var(--sw-text);
  font-variant-numeric: tabular-nums;
}

.hero__shot {
  margin: 0;
}

.hero__shot img {
  display: block;
  width: 100%;
  height: auto;
  border: 1px solid var(--sw-line);
  border-radius: 12px;
  background: var(--sw-surface);
}

.hero__shot figcaption {
  margin-top: 10px;
  font-size: 0.8125rem;
  color: var(--sw-text-2);
}

/* ---------------------------------------------------------------- 边界段 */

.boundaries {
  margin-top: 104px;
}

.boundaries h2,
.abilities h2 {
  margin: 0;
  font-size: clamp(1.35rem, 1.1rem + 0.8vw, 1.75rem);
  letter-spacing: -0.015em;
  color: var(--sw-text);
}

.section-lede {
  margin: 12px 0 0;
  max-width: 56ch;
  color: var(--sw-text-2);
}

.rules {
  display: grid;
  gap: 0;
  margin: 40px 0 0;
  padding: 0;
  list-style: none;
  border-top: 1px solid var(--sw-line);
}

.rules li {
  display: grid;
  grid-template-columns: 56px minmax(0, 1fr);
  gap: 8px 20px;
  padding: 26px 0;
  border-bottom: 1px solid var(--sw-line);
}

@media (min-width: 760px) {
  .rules li {
    grid-template-columns: 72px 200px minmax(0, 1fr);
    align-items: baseline;
  }
}

.num {
  font-size: 0.8125rem;
  color: var(--sw-text-2);
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.06em;
}

.rules h3 {
  margin: 0;
  font-size: 1.0625rem;
  font-weight: 650;
  color: var(--sw-text);
}

.rules p {
  margin: 0;
  grid-column: 1 / -1;
  color: var(--sw-text-2);
  line-height: 1.75;
}

@media (min-width: 760px) {
  .rules p {
    grid-column: 3;
  }
}

.rules strong {
  color: var(--sw-text);
  font-weight: 650;
}

/* ---------------------------------------------------------------- 能力段 */

.abilities {
  margin-top: 104px;
}

.abilities ul {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 0;
  margin: 40px 0 0;
  padding: 0;
  list-style: none;
  border-top: 1px solid var(--sw-line);
}

@media (min-width: 700px) {
  .abilities ul {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.abilities li {
  display: grid;
  gap: 4px;
  padding: 20px 0;
  border-bottom: 1px solid var(--sw-line);
}

@media (min-width: 700px) {
  .abilities li {
    padding-right: 32px;
  }

  .abilities li:nth-child(odd) {
    border-right: 1px solid var(--sw-line);
    padding-right: 32px;
  }

  .abilities li:nth-child(even) {
    padding-left: 32px;
  }
}

.abilities strong {
  font-size: 1rem;
  font-weight: 650;
  color: var(--sw-text);
}

.abilities span {
  font-size: 0.9375rem;
  color: var(--sw-text-2);
  line-height: 1.7;
}

/* ---------------------------------------------------------------- 结尾条 */

.endcap {
  margin-top: 88px;
  padding: 32px 0 0;
  border-top: 2px solid var(--sw-ink);
}

.dark .endcap {
  border-top-color: var(--sw-text);
}

.endcap p {
  margin: 0;
  max-width: 60ch;
  color: var(--sw-text-2);
}

.endcap .cta {
  margin-top: 22px;
}
</style>
