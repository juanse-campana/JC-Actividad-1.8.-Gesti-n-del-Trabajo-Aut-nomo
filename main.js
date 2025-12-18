import * as THREE from 'three';

// --- 1. CONFIGURACIÓN DEL "ESTUDIO DE GRABACIÓN" ---

// La Escena (El universo)
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1a1a1a); // Fondo gris oscuro para resaltar luces

// La Cámara (El ojo del espectador)
// PerspectiveCamera: (FOV, Aspect Ratio, Near, Far)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5; // Movemos la cámara hacia atrás para ver los objetos

// El Renderizador (El motor)
const renderer = new THREE.WebGLRenderer({ antialias: true }); // Antialias para bordes suaves
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// --- 2. ILUMINACIÓN (Esquema Mixto) ---

// Luz Ambiental: Iluminación base suave para que nada sea negro absoluto
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); 
scene.add(ambientLight);

// Luz Direccional: Simula el sol o un foco fuerte para crear sombras y volumen
const directionalLight = new THREE.DirectionalLight(0xffd700, 2); // Color dorado, intensidad 2
directionalLight.position.set(5, 5, 5); // Posicionada en diagonal
scene.add(directionalLight);

// --- 3. CREACIÓN DE OBJETOS (Estructura Compuesta) ---

// Grupo principal para manejar la rotación de toda la escultura
const group = new THREE.Group();

// Materiales: Usamos MeshStandardMaterial y MeshPhongMaterial para reaccionar a la luz (NO Basic)
const materialCore = new THREE.MeshStandardMaterial({ color: 0xff6347, roughness: 0.4 }); // Rojo tomate
const materialRing = new THREE.MeshPhongMaterial({ color: 0x40e0d0, shininess: 100 });   // Turquesa brillante
const materialSatellite = new THREE.MeshStandardMaterial({ color: 0xffff00, metalness: 0.6 }); // Amarillo metálico

// Figura 1: Esfera Central
const geometrySphere = new THREE.SphereGeometry(1, 32, 32);
const core = new THREE.Mesh(geometrySphere, materialCore);

// Figura 2: Toroide (Anillo alrededor)
const geometryTorus = new THREE.TorusGeometry(1.8, 0.15, 16, 100);
const ring = new THREE.Mesh(geometryTorus, materialRing);
ring.rotation.x = Math.PI / 2; // Acostamos el anillo

// Figura 3: Icosaedro (Satélite orbitando)
const geometryIco = new THREE.IcosahedronGeometry(0.5, 0);
const satellite = new THREE.Mesh(geometryIco, materialSatellite);
satellite.position.set(2.5, 0, 0); // Lo alejamos del centro

// Añadimos las partes al grupo
group.add(core);
group.add(ring);
group.add(satellite);

// Añadimos el grupo a la escena
scene.add(group);

// --- 4. ANIMACIÓN (Loop Infinito) ---

function animate() {
    requestAnimationFrame(animate);

    // Rotación de la estructura completa (El grupo)
    group.rotation.x += 0.005;
    group.rotation.y += 0.01;

    // Rotación individual para dar más dinamismo (El satélite gira sobre sí mismo)
    satellite.rotation.x += 0.05;
    satellite.rotation.y += 0.05;
    
    // Renderizar la escena
    renderer.render(scene, camera);
}

// Iniciar animación
animate();

// --- EXTRA: Responsividad ---
// Ajustar si el usuario cambia el tamaño de la ventana
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});