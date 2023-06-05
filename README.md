<p align="center"><a href="http://pokedex.lekiam.net/"><img src="resources/logo.png"></a></p>

<p align="center">Pokedex es una pequeña web que muestra datos de Pokémon, movimientos y objetos</p>

<p align="center">
 <img src="https://img.shields.io/github/languages/top/idrgn/Pokedex" alt="Top Language Badge"/>
 <img src="https://img.shields.io/github/last-commit/idrgn/Pokedex" alt="Last Commit Badge"/>
 <img src="https://img.shields.io/github/issues-pr/idrgn/Pokedex" alt="Pull Requests Badge"/>
 <img src="https://img.shields.io/github/contributors/idrgn/Pokedex" alt="GitHub contributors" >
 <img src="https://img.shields.io/github/license/idrgn/Pokedex" alt="License Badge"/>
</p>

<p align="center">
 <a href="http://pokedex.lekiam.net/">Visitar Pokedex</a> •
 <a href="#descripción">Descripción</a> •
 <a href="#uso">Uso</a> •
 <a href="#créditos">Créditos</a> •
 <a href="#licencia">Licencia</a>
</p>

## Descripción

La Pokédex es una aplicación cuyo objetivo es brindar información detallada sobre los Pokémon, así como almacenar datos relevantes sobre movimientos y objetos presentes en el juego.

Proporciona los siguientes datos:

- Pokémon:
  - Nombre
  - Imagen
  - Tipo(s)
  - Descripción
  - Habilidades
  - Estadísticas
  - Tamaño
  - Peso
  - Movimientos
- Movimientos
  - Nombre
  - Descripción
  - Categoría de movimiento
  - Tipo de movimiento
  - Daño
  - Usos
  - Precisión
- Objetos:
  - Nombre
  - Imagen
  - Descripción
  - Precio

También permite utilizar distintos filtros de búsqueda (por nombre, por tipo...).

## Uso

Para ejecutar este proyecto localmente es necesario tener git y node instalados.

```bash
# Clonar el repositorio
$ git clone https://github.com/idrgn/Pokedex

# Entrar en el repositorio
$ cd pokedex/pokedex

# Instalar las dependencias
$ npm install

# Ejecutar la aplicación
$ npm run start
```

## Créditos

Este proyecto ha sido creado con las siguientes librerías:

- [React.js](https://es.react.dev/)
- [Material UI](https://mui.com/)
- [tinycolor2](https://www.npmjs.com/package/tinycolor2)

También utiliza [Pokeapi](https://pokeapi.co/), una API pública con infinidad de datos sobre el universo Pokémon.

## Licencia

Este proyecto utiliza la licencia [MIT](https://opensource.org/license/mit/).
