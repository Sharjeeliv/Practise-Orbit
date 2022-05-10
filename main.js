import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Global
const SCENE = new THREE.Scene();
const RATIO = window.innerWidth / window.innerHeight;
const CAMERA = new THREE.PerspectiveCamera(75, RATIO, 0.1, 1000);
const RENDERER = new THREE.WebGL1Renderer({ canvas: document.querySelector('#bg') });

RENDERER.setPixelRatio(window.devicePixelRatio);
RENDERER.setSize(window.innerWidth, window.innerHeight);
CAMERA.position.setZ(40);

const EARTH = createEarth();
const MOON = createMoon();
const MOON_DISTANCE = 30;

const CONTROLS = new OrbitControls(CAMERA, RENDERER.domElement);

init();

function createEarth() {
    const EARTH_GEOMETRY = new THREE.SphereGeometry(8, 32, 16);
    const EARTH_TEXTURE = new THREE.TextureLoader().load('/static/earth.jpg');
    const EARTH_MATERIAL = new THREE.MeshStandardMaterial({ map: EARTH_TEXTURE });
    return new THREE.Mesh(EARTH_GEOMETRY, EARTH_MATERIAL);
}

function createMoon() {
    const MOON_GEOMETRY = new THREE.SphereGeometry(2, 32, 16);
    const MOON_TEXTURE = new THREE.TextureLoader().load('/static/moon.jpg');
    const MOON_MATERIAL = new THREE.MeshStandardMaterial({ map: MOON_TEXTURE });
    return new THREE.Mesh(MOON_GEOMETRY, MOON_MATERIAL);
}

function init() {
    MOON.position.setX(MOON_DISTANCE);
    SCENE.add(EARTH, MOON);

    // Lighting
    const AMBIENT_LIGHT = new THREE.AmbientLight(0xffffff);
    const POINT_LIGHT = new THREE.PointLight(0xffffed, 4, 200, 2);
    POINT_LIGHT.position.set(80, 0, 15);
    SCENE.add(POINT_LIGHT);

    // Helpers
    //SCENE.add(new THREE.GridHelper(100, 100));
    SCENE.add(new THREE.PointLightHelper(POINT_LIGHT));
}

// The web browser will call this recursively
function animate() {
    requestAnimationFrame(animate);
    CONTROLS.update();
    planetaryPhysics();
    RENDERER.render(SCENE, CAMERA);
}

function planetaryPhysics() {
    let date = Date.now() * 0.001;
    //EARTH.rotation.setY()
    EARTH.rotation.y -= 0.015;
    MOON.position.set(Math.cos(date) * MOON_DISTANCE, 0, Math.sin(date) * MOON_DISTANCE);
    MOON.rotation.y -= 0.0033;
}

function moveMoon() {
    MOON.position.x -= 0.01;
    MOON.position.y -= 0.01;
}

animate();
