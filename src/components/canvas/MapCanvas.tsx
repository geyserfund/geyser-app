// import { OrbitControls as OC } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import ThreeGlobe from 'three-globe'

import countries from '../../../src/pages/map/custom.geo.json'

let renderer: any
let scene: {
  add: (arg0: ThreeGlobe) => void
  background: any
  fog: any
  position: { x: number; y: number; z: number }
}
let camera: any
let controls: any

let mouseX = 0
let mouseY = 0
let windowHalfX = window.innerWidth / 2
let windowHalfY = window.innerHeight / 2
let Globe

init()
initGlobe()
onWindowResize()
animate()

function init() {
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

  scene = new THREE.Scene()

  const ambientLight = new THREE.AmbientLight(0xbbbbbb, 0.3)
  scene.add(ambientLight)
  scene.background = new THREE.Color(0x040d21)

  camera = new THREE.PerspectiveCamera()
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
  directionalLight.position.set(-800, 2000, 400)
  camera.add(directionalLight)

  const dlight1 = new THREE.DirectionalLight(0x7982f6, 1)
  dlight1.position.set(-200, 500, 200)
  camera.add(dlight1)

  const dlight2 = new THREE.DirectionalLight(0x8566cc, 1)
  dlight2.position.set(200, 500, 200)
  camera.add(dlight2)

  camera.position.z = 400
  camera.position.x = 0
  camera.position.y = 0

  scene.add(camera)

  scene.fog = new THREE.Fog(0x535ef3, 400, 2000)

  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dynamicDampingFactor = 0.01
  controls.enablePan = false
  controls.minDistance = 400
  controls.maxDistance = 500
  controls.rotateSpeed = 0.8
  controls.zoomSpeed = 1
  controls.autoRotate = false

  controls.minPolarAngle = Math.PI / 3.5
  controls.maxPolarAngle = Math.PI - Math.PI / 3

  window.addEventListener('resize', onWindowResize, false)
  document.addEventListener('mousemove', onMouseMove)
}

function initGlobe() {
  Globe = new ThreeGlobe({
    waitForGlobeReady: true,
    animateIn: true,
  })

    .hexPolygonsData(countries.features)
    .hexPolygonResolution(3)
    .hexPolygonMargin(0.7)
  const globeMaterial = Globe.globeMaterial()
  globeMaterial.color = new THREE.Color(0x3a228a)
  globeMaterial.emissive = new THREE.Color(0x220038)
  globeMaterial.emissiveIntensity = 0.1
  globeMaterial.shininess = 0.7
  scene.add(Globe)
}

function onMouseMove(event: { clientX: number; clientY: number }) {
  mouseX = event.clientX - windowHalfX
  mouseY = event.clientY - windowHalfY
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  windowHalfX = window.innerWidth / 1.5
  windowHalfY = window.innerHeight / 1.5
  renderer.setSize(window.innerWidth, window.innerHeight)
}

function animate() {
  camera.position.x +=
    Math.abs(mouseX) <= windowHalfX / 2
      ? (mouseX / 2 - camera.position.x) * 0.005
      : 0
  camera.position.y += (-mouseY / 2 - camera.position.y) * 0.005
  camera.lookAt(scene.position)
  controls.update()
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}

function mapCanvas() {
  return (
    <Canvas>
      <OrbitControls />
    </Canvas>
  )
}

export default mapCanvas
