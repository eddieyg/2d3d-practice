<template>
  <main class="md-page-container home-page">
    <h1>2D3D Practice Case</h1>
    <ul class="case-list">
      <li v-for="li in caseList" :key="li.name">
        <RouterLink :to="{ name: li.name }">
          {{ li.meta.title }}
        </RouterLink>
      </li>
    </ul>
  </main>
</template>

<script setup lang="ts">
import routes from '@/router/routes'
const caseList = routes[0].children.filter(r => r.meta.showCase)
</script>

<style lang="scss" scoped>
.home-page{
  h1{
    text-align: center;
    margin-top: 60px;
    margin-bottom: 30px;
  }
  .case-list{
    width: 320px;
    margin: 0 auto;
    >li{
      font-size: 20px;
      margin: 20px 0px;
    }
  }
}
</style>
