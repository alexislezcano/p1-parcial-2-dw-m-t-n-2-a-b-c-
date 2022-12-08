'use strict';
/*
 *  APELLIDOS
 */


let listaProductos = [{
        id: 1,
        nombre: 'Teclado',
        descripcion: '5 fotos Teclado Redragon K509 Dyaus Español Retroiluminado 7 Colores',
        precio: 5000,
        imagen: 'productos/perifericos/teclado.png',
        categoria: 'Perifericos',
    },
    {
        id: 2,
        nombre: 'Mause',
        descripcion: 'Mouse Glorious Model D Minus - Matte Black',
        precio: 8960,
        imagen: 'productos/perifericos/muse.png',
        categoria: 'Perifericos',
    },
    {
        id: 3,
        nombre: 'Fuente',
        descripcion: 'Fuente ASUS TUF 550W 80 Plus Bronze 550B',
        precio: 19710,
        imagen: 'productos/perifericos/fuente.png',
        categoria: 'Componentes',
    },
    {
        id: 4,
        nombre: 'Mother',
        descripcion: 'Mother ASUS PRIME A520M-K AM4',
        precio: 19100,
        imagen: 'productos/perifericos/mother.png',
        categoria: 'Componentes',
    },
    {
        id: 5,
        nombre: 'XBOX',
        descripcion: 'Consola Microsoft XBOX Series S 512GB Digital',
        precio: 128900,
        imagen: 'productos/perifericos/xbox.png',
        categoria: 'Consolas',
    },
    {
        id: 6,
        nombre: 'PlayStation',
        descripcion: 'Sony PlayStation 5 825GB Digital Edition color blanco y negro',
        precio: 2810,
        imagen: 'productos/perifericos/parlante.png',
        categoria: 'Consolas',
    },
];

class CarritoCliente {
    constructor() {
        this.contenidoDeCarrito = []
    }
    productoNuevoAgregar(producto) {
        this.contenidoDeCarrito.push(producto)
    }

    productoEliminar(id) {
        for (let clave in this.contenidoDeCarrito) {
            if (this.contenidoDeCarrito[clave].id == id) {
                this.contenidoDeCarrito.splice(clave, 1)
                break
            }
        }
    }
    cantProductos() {
        return this.contenidoDeCarrito.length
    }
    cantUnProducto(idProducto) {
        let contador = 0
        this.contenidoDeCarrito.forEach((p) => {
            if (p.id == idProducto) {
                contador++
            }
        })
        return contador
    }
    sumaTotalUnProducto(idProducto) {
        let precioTotalDelProducto = 0
        for (let clave in this.contenidoDeCarrito) {
            if (this.contenidoDeCarrito[clave].id == idProducto) {
                precioTotalDelProducto += this.contenidoDeCarrito[clave].precio
            }
        }
        return precioTotalDelProducto
    }
    sumaTotal() {
        let total = 0
        this.contenidoDeCarrito.forEach((p) => {
            total += p.precio
        })
        return total
    }
}


// SE INSTANCIA UN CARRITO PARA UN NUEVO CLIENTE//
const cliente = new CarritoCliente()

// PANTALA PRINCIPAL DE PRODUCTOS//

listaProductos.forEach((producto) => {
    let divCards = document.getElementById('cards-template')

    let card = document.createElement('div')
    card.setAttribute("class", "card")

    let divImgCard = document.createElement('img')
    divImgCard.src = producto.imagen

    let divBodyCard = document.createElement('div')
    divBodyCard.setAttribute("class", "card-body")

    let hTituloCard = document.createElement('h5')
    hTituloCard.setAttribute("class", "card-title")
    hTituloCard.textContent = producto.nombre

    let pDescCard = document.createElement('p')
    pDescCard.setAttribute("class", "card-text")
    pDescCard.textContent = producto.descripcion

    let sPrecioCard = document.createElement('span')
    sPrecioCard.innerHTML = producto.precio

    let botonCard = document.createElement('button')
    botonCard.setAttribute("id", "agregar" + producto.id)
    botonCard.textContent = 'Agregar a carrito.'

    let sCategoriaCard = document.createElement('span')
    sCategoriaCard.setAttribute("class", "categoria")
    sCategoriaCard.innerHTML = producto.categoria

    divCards.append(card)
    card.append(divBodyCard)
    divBodyCard.appendChild(hTituloCard)
    divBodyCard.appendChild(divImgCard)
    divBodyCard.appendChild(pDescCard)
    divBodyCard.appendChild(sPrecioCard)
    divBodyCard.appendChild(botonCard)
    divBodyCard.appendChild(sCategoriaCard)


    let botonAgregar = document.getElementById("agregar" + producto.id)
    botonAgregar.addEventListener('click', () => {
        cliente.productoNuevoAgregar(producto)


        let datosCarrito = document.getElementById("minicarrito")
        let parrafos = datosCarrito.getElementsByTagName('span')
        parrafos[0].textContent = cliente.cantProductos()
        parrafos[1].innerHTML = cliente.sumaTotal()
    })
})

//PARTE DE LOS FILTROS//

const botonFiltro = document.querySelectorAll(".btn-categorias");
const divContenedorCard = document.querySelectorAll(".card")

botonFiltro.forEach(boton => {
    boton.addEventListener("click", () => {
        divContenedorCard.forEach((card) => {

            let categoria = card.querySelector(".categoria").textContent
            let categoriaAFiltrar = boton.textContent
            // cuando se activa algun boton de categoria oculta las etiquetas que no son de esa categoria 
            if (categoria != categoriaAFiltrar && "borrar" != categoriaAFiltrar) {
                card.style.display = "none"
            } else {
                card.style.display = "block"
            }
        })
    });
});


// CARRITO //
function crearTablaDeProductos(carrito, contenedorTablas) {
    while (contenedorTablas.firstChild) {
        contenedorTablas.removeChild(contenedorTablas.firstChild);
    }
    listaProductos.forEach((producto) => {
        if (carrito.contenidoDeCarrito.includes(producto)) {
            let filaProduct = document.createElement("tr")
            filaProduct.setAttribute("class", "contenido")

            let thprod = document.createElement("th")
            thprod.setAttribute("scope", "row")
            thprod.innerHTML = carrito.cantUnProducto(producto.id)

            let tduno = document.createElement("td")
            tduno.textContent = producto.nombre

            let tddos = document.createElement("td")
            tddos.textContent = producto.descripcion

            let tdtres = document.createElement("td")
            tdtres.innerHTML = carrito.sumaTotalUnProducto(producto.id)

            let botonQuitar = document.createElement("button")
            botonQuitar.setAttribute("onclick", `eliminarDelCarrito(${producto.id})`)
            botonQuitar.setAttribute("class", "boton-eliminar")
            botonQuitar.textContent = "Quitar"

            contenedorTablas.append(filaProduct)
            filaProduct.appendChild(thprod)
            filaProduct.appendChild(tduno)
            filaProduct.appendChild(tddos)
            filaProduct.appendChild(tdtres)
            filaProduct.appendChild(botonQuitar)
        }
    })

    let totalPrecios = document.createElement("div")
    totalPrecios.innerHTML = carrito.sumaTotal()
    contenedorTablas.appendChild(totalPrecios)
}

function eliminarDelCarrito(id) {
    const contenedorTablas = document.querySelector(".tabla-contenido")
    cliente.productoEliminar(id)
    crearTablaDeProductos(cliente, contenedorTablas)
}


const botonMostrarCarrito = document.querySelector(".ver-carrito")
const contenedorTablas = document.querySelector(".tabla-contenido")

const contenedorModal = document.querySelector(".modal")
const cerrarModal = document.querySelectorAll(".cerrar-modal")

// ESCUCHA EL BOTON ver-carrito PARA MOSTRAR
botonMostrarCarrito.addEventListener('click', () => {
    let divModal = document.querySelector(".modal")
    divModal.style.display = "block"
    crearTablaDeProductos(cliente, contenedorTablas)
})

// ESCUCHA EL BOTON cerrar-modal para CERRAR
cerrarModal.forEach((boton) => {
    boton.addEventListener('click', () => {

        // borra las etiquetas ya creadas para que no se acumulen
        while (contenedorTablas.firstChild) {
            contenedorTablas.removeChild(contenedorTablas.firstChild);
        }
        // oculta el carrito
        contenedorModal.style.display = "none"
    })
})