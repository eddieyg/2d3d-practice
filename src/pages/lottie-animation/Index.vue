<template>
  <div class="lottie-animation-page">
    <div class="lottie-container" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import lottie from 'lottie-web'
import bloomUrl from '@assets/lottie/bloom.json?url'

gsap.registerPlugin(ScrollTrigger)

function setup() {
  const container = document.querySelector('.lottie-container')
  const bloom = lottie.loadAnimation({
    container,
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: bloomUrl,
  })
  gsap.to(container, {
    scrollTrigger: {
      trigger: container,
      start: 'top 25%',
      toggleClass: 'lottie-pin',
      // markers: true,
    },
  })
  gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top 25%',
      toggleActions: 'play reset play reset',
      scrub: true,
      onUpdate: (scrollTrigger) => {
        const frame = ~~(bloom.totalFrames * scrollTrigger.progress.valueOf())
        bloom.goToAndStop(frame, true)
      },
    },
  })
}
onMounted(() => {
  setup()
})
</script>

<style lang="scss" scoped>
.lottie-animation-page{
  padding: 50vh 0px 100vh;
  .lottie-container{
    margin: 0 auto;
    width: 50vh;
    &.lottie-pin{
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }

}
</style>
