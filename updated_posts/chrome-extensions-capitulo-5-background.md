---
title: "Service Workers en Chrome Extensions: Guía Definitiva (Manifest V3) 🧩"
excerpt: "🚀 ¡Domina los Service Workers en Chrome! Aprende a manejar eventos en segundo plano 🕵️‍♂️, la persistencia de estado con chrome.storage 💾 y la comunicación bidireccional ↔️. Evita los errores comunes de Manifest V3. ¡No te lo pierdas! 🌟"
---

# 🧩 Service Workers en Chrome Extensions (Manifest V3)

En este post, exploraremos el corazón de las extensiones modernas: los **Service Workers**. Si vienes de Manifest V2, esto reemplaza a las antiguas "Background Pages". Pero cuidado, **no funcionan igual**.

## ¿Qué son los Service Workers? 🤔

Los service workers son scripts que se ejecutan en segundo plano, independientemente de cualquier página web. 

⚠️ **Diferencia Crítica:** A diferencia de las antiguas Background Pages, los Service Workers son **efímeros**. 
Esto significa que **se apagan (terminan)** cuando no están en uso y **se reinician** cuando ocurre un evento.

🚫 **Error Común:** Si declaras una variable global (`let contador = 0`), ¡perderás su valor cuando el Service Worker se duerma!

## Configuración del Service Worker ⚙️

Primero, registramos el worker en `manifest.json`:

```json
{
  "manifest_version": 3,
  "name": "Mi Extensión Pro",
  "version": "1.0.0",
  "background": {
    "service_worker": "background.js"
  },
  "permissions": ["storage"] 
}
```

## Persistencia de Estado (¡Vital!) 💾

Como el Service Worker muere, **debes** guardar el estado en `chrome.storage`.

### ❌ Forma Incorrecta (Variables Globales)

```javascript
// background.js
let contador = 0; // 😱 Esto se reseteará a 0 aleatoriamente

chrome.action.onClicked.addListener(() => {
  contador++;
  console.log(contador);
});
```

### ✅ Forma Correcta (Chrome Storage)

```javascript
// background.js

// 1. Inicializar al instalar
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ contador: 0 });
});

// 2. Leer y Actualizar
chrome.action.onClicked.addListener(async () => {
  // Usamos await (Moderno y limpio)
  const data = await chrome.storage.local.get("contador");
  let nuevoValor = (data.contador || 0) + 1;
  
  await chrome.storage.local.set({ contador: nuevoValor });
  console.log("Contador persistente:", nuevoValor);
});
```

## Comunicación con Popups y Content Scripts 📡

La comunicación sigue siendo clave. Usamos `chrome.runtime.sendMessage`.

### Desde el Popup al Background

```javascript
// popup.js
const btn = document.getElementById("miBoton");

btn.addEventListener("click", async () => {
  const response = await chrome.runtime.sendMessage({ accion: "SALUDAR" });
  console.log("Respuesta del background:", response);
});
```

### Recibiendo en el Background

```javascript
// background.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.accion === "SALUDAR") {
    console.log("Mensaje recibido de:", sender.tab ? "Content Script" : "Popup");
    
    // ⚠️ Importante: Para responder asíncronamente, retorna true
    sendResponse({ despedida: "¡Hola desde el SW!" });
  }
});
```

## Depuración (Debugging) 🐞

Recuerda: El Service Worker **NO** tiene acceso al DOM (`window`, `document` no existen).

Para ver los `console.log` del background:
1. Ve a `chrome://extensions`.
2. Busca tu extensión.
3. Haz clic en el enlace azul que dice **"Inspect views: service worker"**.
4. Se abrirá una ventana de DevTools separada.

## 📝 Resumen

1.  **Son Efímeros:** No confíes en variables globales.
2.  **Usa Storage:** `chrome.storage.local` es tu mejor amigo para guardar datos.
3.  **Sin DOM:** Toda la lógica visual debe ir en Popups o Content Scripts.

¡Ahora estás listo para construir extensiones robustas que no pierden datos! 🚀

¿Tienes problemas con tus workers que se duermen? ¡Déjame un comentario! 👇
