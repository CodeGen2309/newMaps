import paper from "paper"

export default class {
  constructor ({
    id = false,
    radius = 200, 
    position = [0, 0],
    mapGroupPosition = [0, 0],
    angle = 30,
    cameraAngle = 40,
    cameraIP = '127.0.0.1', 
    hostIP = '127.0.0.1', 
    status = 'offline',
    mapID = '1',
    groups = [],
  }) {

    this.id = id
    this.position = position
    this.mapGroupPosition = mapGroupPosition
    this.radius = radius
    this.viewAngle = angle
    this.cameraAngle = cameraAngle
    this.areaOpacity = 0.2
    this.cameraIP = cameraIP
    this.hostIP = hostIP
    this.status = status
    this.groups = groups
    this.mapID  = mapID

    this.group = new paper.Group()
  }

  
  createEye () {
    let eye = new paper.Raster({
      source: '/icons/eosMin.png',
      position: this.position,
    })

    this.group.addChild(eye)
    return eye
  }


  createZone () {
    if (this.viewZone != undefined) {
      this.viewZone.remove()
    }

    let lBorder, rBorder, curve,
    througtPoint, view, psn, rds

    psn = this.position
    rds = this.radius

    lBorder = new paper.Path()
    lBorder.add(psn)
    lBorder.add(psn.x, psn.y - rds)

    rBorder = lBorder.clone()
    lBorder.rotate(-this.viewAngle, psn)
    rBorder.rotate(this.viewAngle, psn)

    througtPoint = rBorder['segments']['1']['point'].subtract(this.viewAngle)

    curve = new paper.Path.Arc(
      lBorder['segments']['1']['point'],
      througtPoint,
      rBorder['segments']['1']['point']
    )

    view = lBorder.join(rBorder)
    view.join(curve)

    view.closed = true
    view.fillColor = 'green'
    view.opacity = this.areaOpacity

    view.rotate(this.cameraAngle, psn)

    this.group.addChild(view)
    return view
  }


  setViewOpacity (opacity) {
    this.areaOpacity = opacity
    this.viewZone.opacity = opacity
  }


  setViewAngle (angle) {
    this.viewAngle = angle
    this.position = this.eye.position
    this.viewZone = this.createZone()
  }


  rotateCamera (angle) {
    this.cameraAngle = angle
    this.position = this.eye.position
    this.viewZone = this.createZone()
  }


  changeRadius (radius) {
    this.position = this.eye.position
    this.radius = radius
    this.viewZone = this.createZone()
  }

  
  createHolder () {
    this.eye = this.createEye()
    this.eye.opacity = 0.3
  }


  createCamera () {
    if (this.eye) { this.eye.remove() }
    this.eye = this.createEye()
    this.viewZone = this.createZone()
  }
}