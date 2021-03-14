<p align='left'>
    <img src='https://static.wixstatic.com/media/85087f_0d84cbeaeb824fca8f7ff18d7c9eaafd~mv2.png/v1/fill/w_160,h_30,al_c,q_85,usm_0.66_1.00_0.01/Logo_completo_Color_1PNG.webp' </img>
</p>

# Henry

## Objetivos del Proyecto

- Construir una App JavaScript desde cero.
- Afirmar y conectar los conceptos aprendidos en la carrera.
- Aprender mejores prácticas.
- Aprender y practicar el workflow de GIT.
- Utilizar Metodologías Ágiles.
- Trabajar en equipo.

## BoilerPlate

El boilerplate cuenta con dos carpetas: `api` y `client`. En estas carpetas estará el código del back-end y el front-end respectivamente.

En `api` vas a tener que crear un archivo llamado: `.env` que tenga la siguiente forma:

```
DB_USER=usuariodepostgres
DB_PASSWORD=passwordDePostgres
DB_HOST=localhost
```

Tenés que reemplazar `usuariodepostgres` y `passwordDePostgres` con tus propias credenciales para conectarte a postgres. Este archivo va ser ignorado por github, ya que contiene información sensible (las credenciales).

El contenido de `client` fue creado usando: Create React App.

## FEATURES

### Usuarios no Autenticados

Un Visitante anónimo debería poder navegar tu e-commerce, ver y buscar productos.

Como un Guest podrás acceder a...

- PRODUCTOS:

![productos](./img/catalogo.jpg)
![productos](./img/destacados.jpg)

- CARRITO:

![carrito](./img/carrito.jpg)

- GESTION DE CUENTA:

![registro](./img/registro.jpg)

### Usuarios Autenticados

###### Como un Usuario Autenticado podrás acceder a...

- GESTION DE CUENTA:
- REVIEWS:

### Admin

Los usuarios administradores pueden manejar el sitio, los productos que se listan y los items que están disponibles.

###### Como un administrador yo quiero...

- GESTION DE PRODUCTOS:


- GESTION DE ORDENES:

![ordenes](./img/adminorders.jpg)

- GESTION DE USUARIOS:

### Validación de Datos

Cuando crees los modelos, debes considerar los tipos de datos que vas a recibir, qué cosas van a ser requeridas y cómo vas a devolver los errores a los usuarios.
Algunas constrains qué deberás implementar:

- Productos:
- Usuarios:
- Ordenes:
- Reviews:

## CONTRIBUTORS

- [Alan Casella](https://github.com/AlanCasella)
- [Marcelo Spagnuolo](https://github.com/MarceloSpagnuolo)
- [Daniel Ignacio Nieto](https://github.com/Daniel-Ignacio-Nieto)
- [Eliezer Salazar](https://github.com/babinobass)
- [David Alvarez](https://github.com/aalvag)