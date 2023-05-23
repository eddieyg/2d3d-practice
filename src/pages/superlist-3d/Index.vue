<template>
  <div class="superlist-3d-page">
    <canvas id="backdrop" class="backdrop" />
    <div class="content">
      <div id="section1" class="section section1">
        <p id="first-section-text">
          Supercharged <br>productivity
        </p>
      </div>

      <div id="section2" class="section">
        <div id="book-action" />
        <div id="section2-content">
          <h2 id="two-section-title">
            Super list product
          </h2>
          <div id="two-section-text">
            <p id="two-section-text1">
              {{ 'Super charged productivity'.repeat(20) }}
            </p>
            <p id="two-section-text2">
              {{ 'Super charged productivity'.repeat(20) }}
            </p>
            <p id="two-section-text3">
              {{ 'Super charged productivity'.repeat(20) }}
            </p>
          </div>
        </div>
      </div>

      <div id="section3" class="section">
        <div id="rectangle" class="rectangle" />
        <div class="section3-content" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import {
  ArcRotateCamera,
  Color3,
  Color4,
  Engine,
  HemisphericLight,
  Scene,
  StandardMaterial,
  Vector3,
} from 'babylonjs'
import 'babylonjs-loaders'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'
import boltUrl from '@assets/mesh/superlist/bolt.glb?url'
import bookUrl from '@assets/mesh/superlist/book.glb?url'
import phoneUrl from '@assets/mesh/superlist/phone.glb?url'
import keyboardUrl from '@assets/mesh/superlist/keyboard.glb?url'
import manifesto1Url from '@assets/mesh/superlist/manifesto-1.glb?url'
import manifesto2Url from '@assets/mesh/superlist/manifesto-2.glb?url'
import manifesto3Url from '@assets/mesh/superlist/manifesto-3.glb?url'
import { importMeshes } from '@/composables/3d'

gsap.registerPlugin(ScrollTrigger, TextPlugin)

type GLProps = Awaited<ReturnType<typeof createProps>>
type Meshes = Awaited<ReturnType<typeof addMeshes>>

const vars = {
  themeColor: Color4.FromInts(255, 80, 67, 255),
  markers: true,
}
let followMouseTarget: ReturnType<typeof followMouse> = null

async function createProps() {
  const canvas = document.getElementById('backdrop') as HTMLCanvasElement
  const engine = new Engine(canvas, true)
  const renderWidth = engine.getRenderWidth()
  const renderHeight = engine.getRenderHeight()
  const scene = new Scene(engine)
  scene.clearColor = vars.themeColor
  const camera = new ArcRotateCamera(
    'Camera',
    1.6,
    1.5,
    80,
    new Vector3(0, 0, 0),
    scene,
  )
  camera.attachControl(canvas, true)

  const lights = {
    left: new HemisphericLight('left', new Vector3(30, 30, 0), scene),
    right: new HemisphericLight('right', new Vector3(0, 0, 8), scene),
  }
  lights.left.intensity = 0.5
  lights.left.range = 100
  lights.right.intensity = 0.3
  lights.right.range = 100

  const materials = {
    default: new StandardMaterial('default', scene),
    black: new StandardMaterial('black', scene),
    red: new StandardMaterial('red', scene),
  }
  materials.default.diffuseColor = Color3.FromInts(48, 48, 48)
  materials.black.diffuseColor = Color3.FromInts(22, 22, 22)
  materials.red.diffuseColor = Color3.FromInts(255, 80, 67)

  return {
    renderWidth,
    renderHeight,
    canvas,
    engine,
    scene,
    camera,
    lights,
    materials,
  }
}

async function addMeshes(glProps: GLProps) {
  const { scene, materials } = glProps
  const urls = [
    boltUrl,
    bookUrl,
    phoneUrl,
    keyboardUrl,
    manifesto1Url,
    manifesto2Url,
    manifesto3Url,
  ]
  const meshes = await importMeshes(urls, scene)
  const [bolt, book, phone, keyboard, manifesto1, manifesto2, manifesto3] = meshes

  // bolt
  bolt.meshes[1].material = materials.default
  bolt.meshes[1].scaling.x = 0.8
  bolt.meshes[1].scaling.y = 0.8
  bolt.meshes[1].position.z = -30
  // book
  book.meshes[1].material = materials.default
  book.meshes[1].position = new Vector3(0, 0, 0)
  book.animationGroups[0].loopAnimation = false
  // phone
  phone.meshes[0].material = materials.default
  phone.meshes[1].material = materials.default
  phone.meshes[0].position.x = 20
  phone.meshes[0].position.y = -10
  phone.meshes[0].position.z = -10
  phone.meshes[0].rotate(new Vector3(3, 7, 3), 2)
  // keyboard
  keyboard.meshes[1].material = materials.default
  keyboard.meshes[0].position.x = -4
  keyboard.meshes[0].position.y = 10
  keyboard.meshes[0].position.z = -18
  // manifesto1
  manifesto1.meshes[0].setEnabled(false)
  manifesto1.meshes.forEach(m => m.material = materials.default)
  manifesto1.meshes[0].position.x = 12
  manifesto1.meshes[0].position.y = 0
  manifesto1.meshes[0].position.z = 28
  manifesto1.meshes[0].scaling.x = 2.5
  manifesto1.meshes[0].scaling.y = 2.5
  manifesto1.meshes[0].scaling.z = 2.5
  manifesto1.meshes.forEach((m) => {
    m.rotation.x = -60
  })
  manifesto1.meshes[0].rotation.y = 225
  manifesto1.meshes[0].rotation.z = -30
  // manifesto2
  manifesto2.meshes[0].setEnabled(false)
  manifesto2.meshes[0].material = materials.default
  manifesto2.meshes[1].material = materials.default
  manifesto2.meshes[2].material = materials.red
  manifesto2.meshes[0].scaling.x = 2.5
  manifesto2.meshes[0].scaling.y = 2.5
  manifesto2.meshes[0].scaling.z = 2.5
  manifesto2.meshes[0].rotation.x -= 22
  manifesto2.meshes[0].position.x = 12
  manifesto2.meshes[0].position.y = 0
  manifesto2.meshes[0].position.z = 28
  // manifesto3
  manifesto3.meshes[0].setEnabled(false)
  manifesto3.meshes[1].material = materials.default
  manifesto3.meshes[2].material = materials.red
  manifesto3.meshes[3].material = materials.default
  manifesto3.meshes[4].material = materials.red
  manifesto3.meshes[5].material = materials.default
  manifesto3.meshes[6].material = materials.red
  manifesto3.meshes[7].material = materials.default
  manifesto3.meshes[8].material = materials.red
  manifesto3.meshes[0].scaling.x = 2.5
  manifesto3.meshes[0].scaling.y = 2.5
  manifesto3.meshes[0].scaling.z = 2.5
  manifesto3.meshes[0].position.x = 12
  manifesto3.meshes[0].position.y = 0
  manifesto3.meshes[0].position.z = 28

  return { bolt, book, phone, keyboard, manifesto1, manifesto2, manifesto3 }
}

function followMouse(glProps: GLProps) {
  const { camera, renderWidth, renderHeight } = glProps
  let isPause = false
  const xCenter = renderWidth / 2
  const yCenter = renderHeight / 2
  let startX = xCenter
  let startY = yCenter
  let currentX = 0
  let currentY = 0
  const rate = 30

  const onMouseMove = (event: MouseEvent) => {
    if (isPause)
      return true
    currentX = event.clientX
    currentY = event.clientY
    const deltaX = (currentX - startX) / rate
    const deltaY = (currentY - startY) / rate
    camera.setPosition(new Vector3(
      camera.position.x + deltaX,
      camera.position.y + deltaY,
      camera.position.z,
    ))
    startX = currentX
    startY = currentY
  }

  const reset = () => {
    camera.setPosition(new Vector3(
      0,
      0,
      camera.position.z,
    ))
    startX = xCenter
    startY = yCenter
  }

  window.addEventListener('mousemove', onMouseMove)

  return {
    play: () => {
      reset()
      isPause = false
    },
    pause: () => {
      isPause = true
      reset()
    },
    cancel: () => {
      window.removeEventListener('mousemove', onMouseMove)
    },
  }
}

function sceneAnimation(glProps: GLProps, meshes: Meshes) {
  const { lights, materials } = glProps

  gsap.timeline({
    scrollTrigger: {
      trigger: '#book-action',
      start: 'top 80%',
      end: 'top center',
      markers: vars.markers,
      toggleActions: 'restart none none reverse',
      scrub: true,
      onUpdate: (scrollTrigger) => {
        const group = meshes.book.animationGroups[0]
        const animationTime = group.to - group.from
        let frame = ~~(animationTime * scrollTrigger.progress.valueOf())
        frame = Math.min(group.to, frame + 40)
        group.start(false, 1, frame, frame)
      },
      onLeave: () => {
        meshes.book.meshes[1].material = materials.black
        lights.right.intensity = 0.15
        followMouseTarget.pause()
      },
      onEnterBack: () => {
        lights.right.intensity = 0.3
        meshes.book.meshes[1].material = materials.default
        followMouseTarget.play()
      },
    },
  }).to(meshes.book.meshes[1].scaling, {
    x: 8,
    y: 8,
    duration: 2,
  })

  gsap.timeline({
    scrollTrigger: {
      trigger: '#two-section-text1',
      start: 'top center',
      end: 'top+=400 center',
      markers: vars.markers,
      toggleActions: 'restart none none reverse',
      scrub: true,
      onUpdate: (scrollTrigger) => {
        const group = meshes.manifesto1.animationGroups[0]
        const animationTime = group.to - group.from
        const frame = ~~(animationTime * scrollTrigger.progress.valueOf())
        group.start(false, 1, frame, frame)
      },
      onEnter: () => {
        meshes.manifesto1.meshes[0].setEnabled(true)
        console.log('onEnter')
      },
      onEnterBack: () => {
        meshes.manifesto1.meshes[0].setEnabled(true)
        meshes.manifesto2.meshes[0].setEnabled(false)
        console.log('onEnterBack')
      },
      onLeave: () => {
        meshes.manifesto1.meshes[0].setEnabled(false)
        meshes.manifesto2.meshes[0].setEnabled(true)
        console.log('onLeave')
      },
      onLeaveBack: () => {
        meshes.manifesto1.meshes[0].setEnabled(false)
        console.log('onLeaveBack')
      },
    },
  })

  gsap.timeline({
    scrollTrigger: {
      trigger: '#two-section-text2',
      start: 'top center',
      end: 'top+=500 center',
      markers: vars.markers,
      toggleActions: 'restart none none reverse',
      scrub: true,
      onUpdate: (scrollTrigger) => {
        const group = meshes.manifesto2.animationGroups[0]
        const animationTime = group.to - group.from
        const frame = ~~(animationTime * scrollTrigger.progress.valueOf())
        group.start(false, 1, frame, frame)
      },
      onEnter: () => {
        meshes.manifesto2.meshes[0].setEnabled(true)
        console.log('onEnter')
      },
      onEnterBack: () => {
        meshes.manifesto2.meshes[0].setEnabled(true)
        console.log('onEnterBack')
      },
      onLeave: () => {
        meshes.manifesto2.meshes[0].setEnabled(false)
        console.log('onLeave')
      },
      onLeaveBack: () => {
        meshes.manifesto2.meshes[0].setEnabled(true)
        console.log('onLeaveBack')
      },
    },
  })

  gsap.timeline({
    scrollTrigger: {
      trigger: '#two-section-text3',
      start: 'top center',
      end: 'top+=250 center',
      markers: vars.markers,
      toggleActions: 'restart none none reverse',
      scrub: true,
      onUpdate: (scrollTrigger) => {
        const group = meshes.manifesto3.animationGroups[0]
        const animationTime = group.to - group.from
        const frame = ~~(animationTime * scrollTrigger.progress.valueOf())
        group.start(false, 1, frame, frame)
      },
      onEnter: () => {
        meshes.manifesto3.meshes[0].setEnabled(true)
        console.log('onEnter')
      },
      onEnterBack: () => {
        meshes.manifesto3.meshes[0].setEnabled(true)
        console.log('onEnterBack')
      },
      onLeave: () => {
        // meshes.manifesto3.meshes[0].setEnabled(false)
        console.log('onLeave')
      },
      onLeaveBack: () => {
        meshes.manifesto3.meshes[0].setEnabled(false)
        console.log('onLeaveBack')
      },
    },
  })
}

function contentAnimation(glProps: GLProps) {
  const { renderHeight } = glProps

  gsap.from('#first-section-text', {
    duration: 2,
    text: {
      delimiter: '',
      value: '',
    },
  })

  gsap.timeline({
    scrollTrigger: {
      trigger: '#two-section-title',
      start: `top ${renderHeight / 2 + (renderHeight / 2 / 2)}px`,
      end: 'top center',
      markers: vars.markers,
      toggleActions: 'restart none none reverse',
      scrub: true,
    },
  }).from('#two-section-title', {
    duration: 2,
    text: {
      delimiter: '',
      value: '',
    },
  })

  gsap.to('#two-section-title', {
    scrollTrigger: {
      trigger: '#two-section-title',
      start: `top ${renderHeight / 2 / 2}px`,
      endTrigger: '#two-section-text',
      end: 'bottom center',
      pin: true,
    },
  })

  gsap.timeline({
    scrollTrigger: {
      trigger: '#rectangle',
      start: 'top center',
      end: 'top',
      markers: vars.markers,
      toggleActions: 'restart none none reverse',
      scrub: true,
    },
  }).to('#rectangle', {
    height: '10px',
  })
}

async function setup() {
  const glProps = await createProps()
  const meshes = await addMeshes(glProps)
  const { engine, scene } = glProps

  scene.stopAllAnimations()
  followMouseTarget = followMouse(glProps)
  sceneAnimation(glProps, meshes)
  contentAnimation(glProps)

  engine.runRenderLoop(() => {
    scene.render()
  })
}

onMounted(() => {
  setup()
})
onUnmounted(() => {
  followMouseTarget && followMouseTarget.cancel()
})
</script>

<style lang="scss" scoped>
.superlist-3d-page{
  .backdrop{
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
  }
  .content{
    position: relative;
    z-index: 1;
    min-height: 300vh;
    .section{
      box-sizing: border-box;
      min-height: 100vh;
    }

    .section1{
      padding-top: calc(50vh - 105px);
      min-height: 88vh;
      #first-section-text{
        margin: 0;
        text-align: center;
        font-size: 90px;
        font-weight: bold;
        color: #fff;
      }
    }

    #section2{
      margin: 0 auto;
      width: 1100px;
      #book-action{
        height: 30vh;
      }
      #section2-content{
        display: flex;
      }
      #two-section-title{
        width: 40%;
        color: #fff;
        font-size: 40px;
      }
      #two-section-text{
        padding: 400px 100px 0px 100px;
        text-align: left;
        flex: 1;
        color: #fff;
        font-size: 18px;
        p{
          word-break: break-all;
          padding-bottom: 200px;
          line-height: 30px;
          min-height: 1px;
          &:last-child{
            padding-bottom: 0px;
          }
        }
      }
    }

    #section3{
      position: relative;
      .rectangle{
        background-color: #f5f5f5;
        height: 200px;
        transform: translateY(1px);
        clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 100%);
      }
      .section3-content{
        background-color: #f5f5f5;
        min-height: 100vh;
      }
    }
  }
}
</style>
