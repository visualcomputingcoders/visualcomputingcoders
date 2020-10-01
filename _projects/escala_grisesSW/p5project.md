---
layout: post
title:  "Conversion escala de grises software"
date:   2020-09-16
thumbnail: conversion.jpg
dependencies:
    - p5
---

## Promedio RGB  y LUMA

### Conversión a escala de grises (Promedio RGB) 
Se recorre la imagen pixel a pixel tomando el promedio de los 3 colores RGB del pixel y se reemplaza el valor por el promedio obtenido obteniendo el resultado final una vez promediados todos los pixeles, en un determinado valor de gris. 

### Conversión a escala de grises (Fórmula LUMA) 
Se realiza exactamente el mismo procedimiento anterior, pero en vez de sacar un promedio del RGB usamos la siguiente fórmula que toma cada componente del RGB y lo multiplica por un factor: 

GRAY =  0.2989R + 0.5870G + 0.1140B

acciones:
- Tecla 1: RGB
- Tecla 2: LUMA
- Tecla 0: Original

<a href="https://github.com/visualcomputingcoders/visualcomputingcoders/blob/master/_projects/escala_grises/escala_grises.js"> codigo </a>

<div id="simple-sketch-holder">
    <script type="text/javascript" src="escala_grises.js"></script>
</div>



