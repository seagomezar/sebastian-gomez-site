---
title: "Estructuras en Go: Dominando Structs y Generics 🏗️"
excerpt: "😍 Aprenderemos cómo definir, instanciar y utilizar estructuras, así como la implementación de métodos asociados. 🚀 Descubriremos el poder de la COMPOSICIÓN frente a la herencia y cómo usar GO GENERICS (1.18+) para crear estructuras reutilizables. 🎯 ¡Lleva tu código Go al siguiente nivel! 🧩"
---

# 🏗️ Estructuras en Go: Dominando Structs y Generics

En Go, una estructura (o **struct**) es una colección de variables (campos) agrupadas bajo un nombre. Las estructuras son fundamentales para organizar y manejar datos relacionados de forma eficiente. A diferencia de otros lenguajes que utilizan clases, Go se basa en estructuras para modelar datos y comportamientos 💡.

## Definición Básica

Un ejemplo de una estructura en Go es la siguiente:

```go
// Define un nuevo tipo llamado 'Persona'.
type Persona struct {
    // 🏷️ Etiquetas JSON (Struct Tags) son cruciales para APIs
    Nombre string `json:"nombre"` 
    Edad   int    `json:"edad"`
}
```

En el ejemplo anterior, tenemos una estructura llamada `Persona` 😊. Hemos añadido **Struct Tags** (`json:"..."`), que son metadatos que usan librerías como `encoding/json` para saber cómo serializar tus datos. ¡Es una buena práctica añadirlas desde el principio!

## Instanciación

Ahora, para usar esta estructura en nuestro código, necesitamos crear una instancia de la misma.

```go
func main() {
    // Forma explícita (Recomendada) 👍
    miPersona := Persona{
        Nombre: "Juan",
        Edad:   25,
    }

    // Acceso con el operador punto (.) 🔎
    fmt.Println("Nombre:", miPersona.Nombre)
}
```

## Métodos (Comportamiento) 🚦

Además de los campos, las estructuras también pueden tener métodos asociados. Esto es lo que le da "vida" a tus datos.

```go
// (p Persona) es el "Receptor" del método. 
// Indica que 'Saludar' pertenece a 'Persona'.
func (p Persona) Saludar() string {
    return "Hola, mi nombre es " + p.Nombre
}
```

### Punteros en Métodos (¡Importante! ⚠️)

Si quieres que un método **modifique** la estructura original, debes usar un **Puntero** (`*Persona`) como receptor. Si no, Go trabajará con una copia.

```go
// Usamos *Persona para poder modificar la edad real
func (p *Persona) CumplirAnios() {
    p.Edad = p.Edad + 1
}
```

## Composición vs Herencia 🧬

Go **NO** tiene herencia de clases (extends). En su lugar, usa **Composición**. Puedes "incrustar" una estructura dentro de otra.

```go
type Motor struct {
    CaballosDeFuerza int
}

type Coche struct {
    Motor      // 👈 Composición: Coche "tiene un" Motor
    Marca string
}

func main() {
    miCoche := Coche{
        Marca: "Tesla",
        Motor: Motor{CaballosDeFuerza: 500},
    }
    
    // Acceso directo a los campos del struct embbedido
    fmt.Println(miCoche.CaballosDeFuerza) // 500
}
```

## Go Generics (Go 1.18+) 🚀

Esta es la característica moderna más potente. Imagina que quieres una estructura que pueda contener *cualquier* tipo de dato, no solo enteros o strings. Antes usábamos `interface{}`, lo cual era inseguro. ¡Ahora usamos Genéricos!

```go
// Definimos una 'Caja' que puede guardar un contenido de tipo T.
// [T any] significa que T puede ser cualquier tipo.
type Caja[T any] struct {
    Contenido T
}

func main() {
    // Caja de enteros
    cajaInt := Caja[int]{Contenido: 123}

    // Caja de strings
    cajaString := Caja[string]{Contenido: "Sorpresa"}

    fmt.Printf("Int: %v, String: %v\n", cajaInt.Contenido, cajaString.Contenido)
}
```

Esto es fundamental para crear estructuras de datos reutilizables como Pilas, Colas o Listas Enlazadas de manera segura y eficiente.

## 📝 Conclusiones

1.  **Structs** son la base de los datos en Go. Úsalos con **Tags** para JSON.
2.  Usa **Punteros** (`*T`) en métodos si necesitas mutar el estado.
3.  Prefiere la **Composición** sobre la herencia clásica.
4.  Adopta **Generics** (`[T any]`) para escribir código reutilizable y moderno.

## 🏋️ Ejercicios para practicar

1.  Crea una estructura `Usuario` con campos privados y métodos públicos (Getter/Setter) para practicar la encapsulación.
2.  Implementa una estructura `Pila[T any]` usando Generics que tenga métodos `Push(val T)` y `Pop() T`.
3.  Crea un sistema de `Vehiculo` y `Avion` usando composición, donde `Avion` tenga un `Vehiculo` dentro pero agregue campos de `Vuelo`.

¡A darle duro al código Go! 🐹💻
