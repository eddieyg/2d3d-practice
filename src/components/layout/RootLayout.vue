<template>
  <div class="root-layout">
    <header class="root-header">
      <h1>{{ packageInfo.name }}</h1>
      <nav>
        <ul>
          <li v-for="nav in navList" :key="nav.name">
            <router-link
              v-if="nav.type === 'route'"
              :to="{ name: nav.value }">
              {{ nav.name }}
            </router-link>
            <a
              v-else-if="nav.type === 'link'"
              :href="nav.value"
              target="_blank">
              {{ nav.name }}
            </a>
          </li>
        </ul>
      </nav>
    </header>

    <main class="root-content">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import gsap from 'gsap'
import packageInfo from '../../../package.json'

const navList = [
  {
    name: 'Home',
    value: 'main',
    type: 'route',
  },
  {
    name: 'Github',
    value: 'https://github.com/eddieyg/2d3d-practice',
    type: 'link',
  },
]

const isOpenBar = ref(false)
function openBar() {
  if (isOpenBar.value)
    return
  gsap.to('.root-header', {
    top: '32px',
    duration: 0.5,
    yoyo: true,
  })
  isOpenBar.value = true
}
function closeBar() {
  if (!isOpenBar.value)
    return
  gsap.to('.root-header', {
    top: '-70px',
    duration: 0.5,
    yoyo: true,
  })
  isOpenBar.value = false
}

const route = ref(useRoute())
onBeforeRouteUpdate((to) => {
  route.value = to
})
function checkBar() {
  if (route.value.name === 'main')
    openBar()
  else
    closeBar()
}
watch(() => route.value, checkBar)
onMounted(() => {
  checkBar()
})
</script>

<style lang="scss" scoped>
.root-layout {
  .root-header {
    width: 1200px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid $main-border-color;
    height: 60px;
    border-radius: $border-radius-m;
    background-color: #ffffff;
    position: fixed;
    top: -70px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 99;
    h1 {
      padding: 0px 30px;
    }
    nav {
      height: 100%;
      ul {
        display: flex;
        height: 100%;
        margin-block-start: 0;
        margin-block-end: 0;
        li {
          height: 100%;
          list-style: none;
          padding: 0px 20px;
          border-left: 1px solid $main-border-color;
          display: flex;
          align-items: center;
          a{
            font-weight: bold;
            font-size: 18px;
          }
        }
      }
    }
  }
}
</style>
