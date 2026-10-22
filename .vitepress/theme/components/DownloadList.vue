<script setup lang="ts">
import { downloads as all, githubUrl, giteeReleasesPage } from '../data/downloads'

const props = defineProps<{
  /** 只显示这些文件名；不传则显示全部 */
  only?: string[]
  /** 操作系统筛选项，如 'Windows' */
  os?: string
}>()

const shown = all.filter((item) => {
  if (props.only && !props.only.includes(item.file)) return false
  if (props.os && item.os !== props.os) return false
  return true
})

/** 有镜像的条目数量，用于决定是否显示「国内下载」的说明 */
const hasMirror = shown.some((i) => Boolean(i.mirror))
</script>

<template>
  <div class="dl">
    <ul class="dl__list">
      <li v-for="item in shown" :key="item.file" class="dl__row">
        <div class="dl__id">
          <span class="dl__os">{{ item.os }}</span>
          <span class="dl__label">{{ item.label }}</span>
        </div>

        <p v-if="item.note" class="dl__note">{{ item.note }}</p>

        <div class="dl__actions">
          <a class="dl__main" :href="githubUrl(item)">
            从 GitHub 下载
            <span class="dl__size">{{ item.file }}</span>
          </a>
          <a
            v-if="item.mirror"
            class="dl__mirror"
            :href="item.mirror"
            target="_blank"
            rel="noopener"
          >
            国内镜像
          </a>
        </div>
      </li>
    </ul>

    <p v-if="!hasMirror" class="dl__hint">
      国内镜像尚未同步。若 GitHub 下载不畅，可在
      <a :href="giteeReleasesPage" target="_blank" rel="noopener">Gitee 发行版</a>
      页面查找同名安装包。
    </p>
  </div>
</template>

<style scoped>
.dl__list {
  margin: 1.6rem 0 0;
  padding: 0;
  list-style: none;
  border-top: 1px solid var(--sw-line);
}

.dl__row {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 10px 24px;
  padding: 20px 0;
  border-bottom: 1px solid var(--sw-line);
}

@media (min-width: 720px) {
  .dl__row {
    grid-template-columns: 200px minmax(0, 1fr) auto;
    align-items: center;
  }
}

.dl__id {
  display: flex;
  align-items: baseline;
  gap: 10px;
}

.dl__os {
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--sw-text-2);
}

.dl__label {
  font-size: 1rem;
  font-weight: 650;
  color: var(--sw-text);
}

.dl__note {
  margin: 0;
  font-size: 0.9375rem;
  line-height: 1.65;
  color: var(--sw-text-2);
}

.dl__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px 16px;
}

.dl__main {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-height: 40px;
  padding: 0 16px;
  border: 1px solid var(--sw-line);
  border-radius: 8px;
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--sw-text);
  text-decoration: none;
  transition:
    border-color 0.18s cubic-bezier(0.16, 1, 0.3, 1),
    color 0.18s cubic-bezier(0.16, 1, 0.3, 1);
}

.dl__main:hover {
  border-color: var(--sw-blue);
  color: var(--sw-blue-dark);
}

.dark .dl__main:hover {
  color: #9cc0ff;
}

.dl__size {
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
  font-weight: 400;
  color: var(--sw-text-2);
}

.dl__mirror {
  font-size: 0.875rem;
  color: var(--sw-text-2);
  text-decoration: underline;
  text-decoration-color: var(--sw-line);
  text-underline-offset: 3px;
}

.dl__mirror:hover {
  color: var(--sw-blue-dark);
  text-decoration-color: currentColor;
}

.dl__hint {
  margin: 18px 0 0;
  font-size: 0.875rem;
  color: var(--sw-text-2);
}
</style>
