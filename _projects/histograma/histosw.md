---
layout: post
title:  "Histograma y segmentacion"
date:   2020-09-22
thumbnail: histo.png

---

## Histograma

Se utilizan varios canvas, y se almacenan las frecuencias de los diferentes valores de brillo de la imagen en escala de grises, tomando en cuenta que cada canal de color tiene 256 niveles de intensidad posibles, cad apunto representado por un valor de brillo en un rango desde 0(negros) hasta 255(blancos) y valores intermedios los diferentes valores de gris y luego se gráfica estas frecuencias mostrando información sobre el brillo y contraste de la imagen.

### Segmentación

Para la segmentacion con ayuda de la funcion map(), mapeamos la posición del puntero del mause en el eje x, entre el rango ocupado por la imagen del histograma, se mapea a un rango de 0 a 256, que es el tamaño del arreglo del histograma donde tenemos almacenados las frecuencias de los diferentres valores de brillo de la imagen, asi mismo definimos un intervalo para recorrer la foto y el histograma a medida que nos desplazamos con el puntero a través del histograma, el valor inicial es el valor retornado por la funcion map(), y el valor final sera esa misma cantidad mas un determinada valor, dependiendo del tamaño del segmento que se desee.



acciones:
- Click en el canvas y con las teclas de dirección para cambiar entre imagenes


- Para la segmentacion Click en el segundo canvas y con el puntero del mouse sobre el histograma observar la segmentacion

<a href="https://github.com/visualcomputingcoders/visualcomputingcoders/blob/master/_projects/histograma/histosw.pde"> código histograma</a>

<a href="https://github.com/visualcomputingcoders/visualcomputingcoders/blob/master/_projects/histograma/histosw2.pde"> código segmentación </a>


<script src="https://cdnjs.cloudflare.com/ajax/libs/processing.js/1.4.8/processing.min.js"></script>
<body>
    <h1>Processing histograma Y Segmentación</h1>
 
    <canvas data-processing-sources="histosw.pde"></canvas>
     <canvas data-processing-sources="histosw2.pde"></canvas>
</body>




