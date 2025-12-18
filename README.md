# Escena 3D Interactiva con Three.js

Este proyecto es una implementación de una escena 3D renderizada en el navegador utilizando la librería **Three.js**. El objetivo es demostrar competencias en el manejo de cámaras, geometrías compuestas, materiales reactivos a la luz y ciclos de animación.

## Descripción de la Escena

He construido una estructura compuesta denominada **"Satélite Orbital Abstracto"**. La composición consta de tres figuras geométricas organizadas jerárquicamente:

1.  **Esfera Central:** Actúa como el núcleo de la estructura.
2.  **Toroide (Anillo):** Rodea al núcleo simulando una órbita.
3.  **Icosaedro:** Una figura geométrica que orbita en el exterior.

## Tecnologías y Decisiones Técnicas

- **Librería:** Three.js (Módulos ES6).
- **Materiales:**
  - `MeshStandardMaterial`: Utilizado en el núcleo y el satélite para obtener una reacción física a la luz con propiedades de rugosidad (roughness) y metalicidad (metalness).
  - `MeshPhongMaterial`: Utilizado en el anillo para lograr un acabado brillante y especular (shininess).
  - _Nota:_ Se evitó deliberadamente el uso de `MeshBasicMaterial` para garantizar la percepción de volumen 3D.
- **Iluminación:** Esquema mixto compuesto por una `AmbientLight` (luz de relleno suave) y una `DirectionalLight` (luz principal) para generar sombras y brillos definidos.
- **Animación:** Se utiliza `requestAnimationFrame` para crear un bucle de renderizado donde el grupo completo rota en los ejes X e Y, mientras que el satélite posee su propia rotación local independiente.

## Cómo visualizar

1.  Clonar este repositorio.
2.  Abrir el archivo `index.html` en un navegador moderno.
