<script setup>
  import { onMounted, ref, Transition, useTemplateRef } from "vue";
  import toolPanel from "@/components/toolPanel.vue";
  import sideInfo from "@/components/sideInfo.vue";

  import paper from "paper"
  import camera from '@/lib/camera.js'
  import utils from '@/lib/multiTool.js'

  // Init reactives
  let mapGroup
  let activeCamera = ref()

  let scaleFactor = 1
  let canvasCursorPoint = {x: 0, y: 0}
  let canvasItem = useTemplateRef('canvasItem')

  onMounted(() => {
    paper.setup(canvasItem.value)
    mapGroup = new paper.Group()

    let image = new paper.Raster('/img/map.jpg')
    mapGroup.addChild(image)

    mapGroup.onMouseDrag = function (event) {
      mapGroup.position.x += event.delta.x
      mapGroup.position.y += event.delta.y
    }

    mapGroup.onMouseMove = cursorPointObserver
  })


  function eventLogger (ent) {
    console.log('EVENT!');
    console.log(ent);
  }


  function cursorPointObserver (ent) {
    canvasCursorPoint = ent.point
  }


  function mouseWheelHandler (ent) {
    let delta = ent.wheelDeltaY

    if (delta > 0 ) {
    // if (delta > 0 && scaleFactor < 2) {
      scaleFactor *= 1.2
      mapGroup.scale(1.2, canvasCursorPoint)
    }

    if (delta < 0 ) { 
    // if (delta < 0 && scaleFactor > 0.4) { 
      scaleFactor *= 0.8
      mapGroup.scale(0.8, canvasCursorPoint)
    }
  }


  function setCamera (ent) {
    let item = new camera({
      paper: paper,
      position: canvasCursorPoint,
      scale: scaleFactor,
      cameraAngle: utils.getRandomNumber(0, 360)
    })

    mapGroup.addChild(item.group)
    item.createHolder()
    
    mapGroup.onMouseMove = tst => {
      item.group.position = tst.point
    }

    item.group.onClick = tst => {
      item.position = tst.point
      item.createCamera()

      mapGroup.onMouseMove = cursorPointObserver
      item.group.onClick = ent => changeActiveCamera(item)
      changeActiveCamera(item)      
    }
  }


  function changeActiveCamera (item) {
    if (activeCamera.value) {
      activeCamera.value.setViewOpacity(0.2)
    }

    activeCamera.value = item
    activeCamera.value.setViewOpacity(0.6)
  }

  function removeActiveCamera () {
    let camera = activeCamera.value
    camera.group.remove()
    activeCamera.value = false
    console.log(activeCamera.value);
  }


  function rotateCamera (angle) {
    if (!angle) { return false }
    if (!activeCamera.value) { return false }
    activeCamera.value.rotateCamera(angle, scaleFactor)
  }


  function changeRadius (rds) {
    if (!rds) { return false }
    if (!activeCamera.value) { return false }
    activeCamera.value.changeRadius(rds, scaleFactor)
  }


  function changeAngle (viewAngle) {
    if (!viewAngle) { return false }
    if (!activeCamera.value) { return false }
    activeCamera.value.setViewAngle(viewAngle, scaleFactor)
  }
</script>




<template>
  <div class="map--holder">
    <canvas class="map" ref="canvasItem" 
      @wheel="mouseWheelHandler"
    />
    
    <div class="map--tools">      
      <Transition name="fadeUpAnim">
        <toolPanel class="map--toolPanel"
          v-if="activeCamera"
          @rotateEvent="rotateCamera"
          @viewAngle="changeAngle"
          @radiusEvent="changeRadius"
        />
      </Transition>

      <div class="map--toolButtons">
        <OButton class="map--addCamera" color="info" 
          prefix-icon="camera" @click="setCamera" block="true"
        >Добавить камеру</OButton>

        <OButton class="map--addCamera" color="danger" block="true"
          prefix-icon="camera" @click="removeActiveCamera"
        >Удалить</OButton>
      </div>

    </div>

    <Transition name="fadeRightAnim">
      <sideInfo v-if="activeCamera" class="map--sideInfo" />
    </Transition>
  </div>
</template>


<style>
.map--holder {
  position: relative;
  width: 100%; height: 100%;
}

.map--container {
}

.map {
  width: 100%; height: 100%;
}

.map--tools {
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: absolute;
  bottom: 0; left: 0;
  margin: 20px;
}

.map--toolPanel {
  background: rgba(255, 255, 255, .6);
  border: 2px solid white;
  padding: 20px;
  backdrop-filter: blur(10px);
  overflow: hidden;

  border-radius: 10px;
  transition: .3s;
}

.map--toolButtons {
  display: flex;
  gap: 10px;
  /* padding: 10px 0px; */
  width: 510px;
}


.map--addCamera {
  padding: 10px 20px;
  border-radius: 10px;
}

.map--sideInfo {
  position: absolute;
  top: 0; right: 0; bottom: 0;
  width: 350px;
  border-radius: 20px;
  margin: 10px;
  transition: .3s;
}

/* ANIMATIONS */
.fadeUpAnim-enter-active, 
.fadeUpAnim-leave-active {
  opacity: 0;
  transform: translateY(50px);
}

.fadeRightAnim-enter-active, 
.fadeRightAnim-leave-active {
  opacity: 0;
  transform: translateX(50px);
}

</style>