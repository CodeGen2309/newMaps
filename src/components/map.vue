<script setup>
  import { onMounted, ref, useTemplateRef } from "vue";
  import toolPanel from "@/components/toolPanel.vue";

  import paper from "paper"
  import camera from '@/lib/camera.js'
  import utils from '@/lib/multiTool.js'

  // Init reactives
  let map = ref()
  let mapGroup
  let activeCamera



  let scaleFactor = 1
  let currRotate = 0
  let currScale = 1

  let canvasItem = useTemplateRef('canvasItem')

  onMounted(() => {
    paper.setup(canvasItem.value)
    mapGroup = new paper.Group()
    let image = new paper.Raster('/public/img/map.jpg')
    mapGroup.addChild(image)
    console.log(mapGroup.position);
    

    mapGroup.onMouseDrag = function (event) {
      mapGroup.position.x += event.delta.x
      mapGroup.position.y += event.delta.y
      console.log(mapGroup.position);
    }
    
    mapGroup.onDoubleClick = setCamera
  })

  function eventLogger (ent) {
    console.log('EVENT!');
    console.log(ent);
  }


  function mouseWheelHandler (ent) {
    let delta = ent.wheelDeltaY

    if (delta > 0 && scaleFactor < 2) {
    // if (delta > 0 ) {
      scaleFactor *= 1.1
      mapGroup.scale(1.1, [ent.screenX, ent.screenY])
    }

    if (delta < 0 && scaleFactor > 0.4) { 
    // if (delta < 0 ) { 
      scaleFactor *= 0.9
      mapGroup.scale(0.9, [ent.screenX, ent.screenY])
    }

  }

  function setCamera (ent) {
    let item = new camera({
      paper: paper,
      position: ent.point,
      scale: scaleFactor,
      cameraAngle: utils.getRandomNumber(0, 360)
    })

    mapGroup.addChild(item.group)
    item.group.onClick = ent => changeActiveCamera(item)
    changeActiveCamera(item)
  }


  function changeActiveCamera (item) {
    if (activeCamera) {
      activeCamera.setViewOpacity(0.2)
    }

    activeCamera = item
    activeCamera.setViewOpacity(0.6)
  }


  function rotateCamera (angle) {
    if (angle == undefined) { return true }
    if (activeCamera == undefined) { return true }
    activeCamera.rotateCamera(angle, scaleFactor)
  }


  function changeRadius (rds) {
    if (rds == undefined) { return true }
    if (activeCamera == undefined) { return true }

    activeCamera.changeRadius(rds, scaleFactor)
  }


  function changeAngle (viewAngle) {
    if (viewAngle == undefined) { return true }
    if (activeCamera == undefined) { return true }
    activeCamera.setViewAngle(viewAngle, scaleFactor)
  }
</script>




<template>
  <div class="map--holder">
    <canvas class="map" ref="canvasItem" 
      @wheel="mouseWheelHandler"
    />

    <toolPanel class="map--tools"
      @rotateEvent="rotateCamera"
      @viewAngle="changeAngle"
      @radiusEvent="changeRadius"
    />
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
  position: absolute;
  bottom: 0; left: 0;
  background: rgba(255, 255, 255, .8);
  padding: 20px; margin: 10px;

  border-radius: 20px;

}
</style>