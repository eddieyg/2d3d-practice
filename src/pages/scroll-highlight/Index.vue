<template>
  <div class="scroll-highlight-page">
    <p class="scroll-texts">
      <span class="scroll-text">当代码行与创意相遇，魔法就会诞生，键盘的音符将引领着未来的旋律。 </span>
      <span class="scroll-text">编码的世界充满着无限的可能性； </span>
      <span class="scroll-text">代码的艺术在你的指尖绽放。 </span>
      <span class="scroll-text">让我们一起编织着逻辑的舞曲，用函数和变量谱写奇迹。</span>
      <span class="scroll-text">穿越循环的迷宫，挑战边界的禁锢； </span>
      <span class="scroll-text">代码的世界将为你开启神奇的大门。</span>
      <span class="scroll-text">快拿起你的键盘，让创意在屏幕上跳跃，让代码的魔力点亮整个宇宙！ </span>
    </p>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function setup() {
  const triggers = document.querySelectorAll('.scroll-text')
  const triggerH = 70
  triggers.forEach((trigger) => {
    gsap.timeline({
      scrollTrigger: {
        trigger,
        start: 'top center',
        end: `top+=${triggerH} center`,
        toggleActions: 'play reset play reset',
        // markers: true,
      },
    }).to(trigger, {
      opacity: 1,
      duration: 0.2,
      yoyoEase: true,
    })
  })
}
onMounted(setup)
</script>

<style lang="scss" scoped>
.scroll-highlight-page{
  padding: 52vh 0px;
  .scroll-texts{
    margin: 0 auto;
    width: 1040px;
    color: #000;
    font-size: 60px;
    font-weight: bold;
    >span{
      opacity: .4;
    }
  }
}
</style>
