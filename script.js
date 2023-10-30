//LISTA DE PRODUCTOS
const listaProductos = [
    {
        id: 1,
        nombre: "Ryzen 5 5600G",
        precio: 150000,
        imagen: "media/ryzen5.jpeg"
    },
    {
        id: 2,
        nombre: "Mother MSI A520M",
        precio: 85000,
        imagen: "media/motherMsi.png"
    },
    {
        id: 3,
        nombre: "Memoria RAM 8gb",
        precio: 22000,
        imagen: "media/ram8gb.jpg"
    },
    {
        id: 4,
        nombre: "RTX 2060 6gb",
        precio: 250000,
        imagen: "media/2060.jpg"
    },
    {
        id: 5,
        nombre: "Intel Core I5-13400F",
        precio: 162000,
        imagen: "media/intelCore.jpg"
    },
    {
        id: 6,
        nombre: "RTX 4090",
        precio: 790000,
        imagen: "media/4090.png"
    },
    {
        id: 7,
        nombre: "Mother ASUS Z790-E",
        precio: 100000,
        imagen: "media/motherAsus.png"
    },


]
const container = document.querySelector("#container")
const contenedorGeneral = document.querySelector("#contenedorProductos")
const contenedorCarrito = document.querySelector("#contenedorCarrito")


// FUNCION PARA AGREGAR UN PRODUCTO AL CARRITO
let carrito = []
let precioTotal = 0

const agregarCarrito = (producto) => {
  carrito.push(producto)
  actualizarCarrito()
}
//ELIMINAR PRODUCTO
const eliminarProducto = (index) => {
  carrito.splice(index, 1)
  actualizarCarrito()
}

//VACIAR CARRITO
const vaciarCarrito = () => {
    carrito = [];
    actualizarCarrito()
}





const actualizarCarrito = () => {
  contenedorCarrito.innerHTML = ""

  carrito.forEach((elemento, index) => {
    let listaCarrito = document.createElement("div")
    listaCarrito.innerHTML = `<div class="card" style="width: 18rem;">
      <img src="${elemento.imagen}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${elemento.nombre}</h5>
        <p class="card-text">$${elemento.precio}</p>
        <a href="#" class="btn-delete" id="delete${index}">Eliminar</a>
      </div>
    </div>`

    contenedorCarrito.appendChild(listaCarrito)
    //ELIMINAR
    const btnEliminar = document.querySelector(`#delete${index}`)
    btnEliminar.addEventListener("click", () => {
      eliminarProducto(index)})
  })
    //VACIAR
    const btnVaciarCarrito = document.querySelector("#vaciar")
    btnVaciarCarrito.addEventListener("click", () =>{
        vaciarCarrito();})

    //COMPRAR
    // const btnFinalizarCompra = document.querySelector("#comprar")
    // btnFinalizarCompra.addEventListener("click", () =>{
    //     console.log("Botón de finalizar compra clickeado.");
    //     if(carrito.length === 0){
    //         alert("El carrito está vacio")
    //     } else if(carrito.lenght > 0){
    //         alert("Su compra ha reslutado exitosa")
    //         vaciarCarrito()
    //     }
    // })


    //SUMA PRECIO
  precioTotal = carrito.reduce((total, producto) => total + producto.precio, 0)
  let total = document.createElement("div");
  total.innerHTML = `<p id="p-total">El precio total es de $${precioTotal} pesos</p>`
  contenedorCarrito.appendChild(total)
}




//FUNCION QUE AGREGA PRODUCTOS A LA LISTA DE LOS MISMOS
const agregarProductosALista = () => {
    listaProductos.forEach((producto, i) => {
        let contenedorProductos = document.createElement("div")
        contenedorProductos.innerHTML = `<div class="card" style="width: 18rem;">
        <img src="${producto.imagen}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-text">$${producto.precio}</p>
          <a href="#" class="btn" id="agregar${i}">Agregar al carrito</a>
        </div>
      </div>`

      contenedorGeneral.appendChild(contenedorProductos)

      const botonAgregar = document.querySelector(`#agregar${i}`);
        botonAgregar.addEventListener("click", () => {
            agregarCarrito(producto)})

    })
}

agregarProductosALista();

