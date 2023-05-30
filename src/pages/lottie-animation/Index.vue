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
  ScrollTrigger.create({
    trigger: container,
    start: 'top 25%',
    end: '+=80%',
    pin: true,
    // markers: true,
  })
  gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top 25%',
      end: '+=80%',
      toggleActions: 'play reset play reset',
      // markers: true,
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
  padding: 50vh 0px;
  .lottie-container{
    margin: 0 auto;
    width: 50vw;
    height: 50vw;
  }

}
</style>
