<script setup>
import { onMounted, ref, Transition, useTemplateRef } from "vue";
import { useRoute } from "vue-router";

import apirator  from "@/lib/apirator";
import toolPanel from "@/components/toolPanel.vue";
import sideInfo  from "@/components/sideInfo.vue";

import paper  from "paper"
import camera from '@/lib/camera.js'
import utils  from '@/lib/multiTool.js'


let params = useRoute().params
let mapID  = params.id

let map = {
  id: 1, groups: [], name: 'Mock map',
  imgPath: ''
}


// Init reactives
let cameraList = null

let mapGroup
let activeCamera = ref()

let canvasCursorPoint = {x: 0, y: 0}
let canvasItem = useTemplateRef('canvasItem')


function eventLogger (ent) {
  console.log('EVENT!');
  console.log(ent);
}


async function loadMap () {
  console.log('MAP RELOADED');
  console.log(mapID);
  

  let res = await apirator.get('maps', { id: mapID })
  map = res[0]

  setupMap()
  await loadCameraList()
}




function setupMap (mapID) {
  paper.setup(canvasItem.value)
  mapGroup = new paper.Group()

  let imgPath = `${apirator.apiUrl}/${map.imgPath}`
  console.log({ imgPath });
  
  
  let image = new paper.Raster(imgPath)

  image.onLoad = function () {
    image.position = { 
      x: 0 + image.bounds.width / 2, 
      y: 0 + image.bounds.height / 2
    }
  }

  mapGroup.addChild(image)

  mapGroup.onMouseDrag = function (event) {
    mapGroup.position.x += event.delta.x
    mapGroup.position.y += event.delta.y
  }

  paper.view.onMouseMove = function (ent) {
    canvasCursorPoint = ent.point
  }
}



async function loadCameraList () {
  cameraList = await apirator.get('cameras', { mapID })
  
  for (let item of cameraList) {
    loadCamera(item)
  }
}


function loadCamera (cameraData) {
  cameraData.paper = paper
  cameraData.position = JSON.parse(cameraData.mapGroupPosition)
  cameraData.mapGroupPosition = JSON.parse(cameraData.mapGroupPosition)
  cameraData.groups = JSON.parse(cameraData.groups)

  let item = new camera(cameraData)

  mapGroup.addChild(item.group)
  item.createCamera()

  item.group.onClick = ent => changeActiveCamera(item)
}


function mouseWheelHandler (ent) {
  let delta = ent.wheelDeltaY

  if (delta > 0 ) {
    paper.view.scale(1.2, canvasCursorPoint)
  }

  if (delta < 0 ) { 
    paper.view.scale(0.8, canvasCursorPoint)
  }
}


function setCamera (ent) {
  let item = new camera({
    paper: paper,
    position: ent.point,
    cameraAngle: utils.getRandomNumber(0, 360),
    mapID: mapID
  })

  mapGroup.addChild(item.group)
  item.createHolder()
  
  mapGroup.onMouseMove = tst => {
    item.group.setPosition(tst.point)
  }

  item.group.onClick = ent => {
    item.position = ent.point
    item.createCamera()
    mapGroup.onMouseMove = null    

    item.mapGroupPosition = {
      x: item.position.x - mapGroup.bounds.left,
      y: item.position.y - mapGroup.bounds.top
    }

    item.group.onClick = ent => {
      changeActiveCamera(item)
    }

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

  apirator.delete('cameras', { id: camera.id })
  camera.group.remove()
  activeCamera.value = false
}


function rotateCamera (angle) {
  if (!angle) { return false }
  if (!activeCamera.value) { return false }
  activeCamera.value.rotateCamera(angle)
}


function changeRadius (rds) {
  if (!rds) { return false }
  if (!activeCamera.value) { return false }
  activeCamera.value.changeRadius(rds)
}


function changeAngle (viewAngle) {
  if (!viewAngle) { return false }
  if (!activeCamera.value) { return false }
  activeCamera.value.setViewAngle(viewAngle)
}


onMounted(loadMap)
</script>




<template>
  <div class="map--holder">
    <canvas class="map" ref="canvasItem" 
      @wheel="mouseWheelHandler"
    />
    
    <div class="map--tools">      
      <Transition name="fadeUpAnim">
        <toolPanel class="map--toolPanel"
          v-if="activeCamera" :camera="activeCamera"
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
      <sideInfo v-if="activeCamera" class="map--sideInfo" :camera="activeCamera"
        :key="activeCamera.position"
        saveCamera="saveCamera("
      />
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
  /* background: rgba(255, 255, 255, .6); */
  background: var(--grey-lighter);
  border: 3px solid var(--grey);
  /* border: 2px solid white; */
  padding: 20px;
  backdrop-filter: blur(10px);
  overflow: hidden;

  border-radius: 10px;
  box-sizing: border-box;
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