//E-COMMERCE "COMPRA YA!"

const container = document.querySelector("#container")
const contenedorGeneral = document.querySelector("#contenedorProductos")



let carrito = []
let precioTotal = 0

// GUARDAR CARRITO (localStorage)
const guardarCarritoEnLocalStorage = () => {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

// CARGAR CARRITO (localStorage)
const cargarCarritoDesdeLocalStorage = () => {
  const carritoGuardado = localStorage.getItem('carrito');
  if (carritoGuardado) {
    try {
      const carritoParseado = JSON.parse(carritoGuardado);
      
      if (Array.isArray(carritoParseado)) {
        carrito = carritoParseado;
        actualizarCarrito();
      } else {
        
        localStorage.removeItem('carrito');
      }
    } catch (error) {
      
      localStorage.removeItem('carrito');
    }
  }
}

cargarCarritoDesdeLocalStorage();

// AGREGAR AL CARRITO
const agregarCarrito = (producto) => {
  carrito.push(producto)
  actualizarCarrito()
  guardarCarritoEnLocalStorage();
  Toastify({
    text: "Producto agregado al carrito correctamente",
    duration: 3000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
      background: "linear-gradient(to right, #0aaffe, #2155fa)",
    },
    onClick: function(){}
  }).showToast();
}
//ELIMINAR PRODUCTO
const eliminarProducto = (index) => {
  carrito.splice(index, 1)
  actualizarCarrito()
  guardarCarritoEnLocalStorage();
}

//VACIAR CARRITO
const vaciarCarrito = () => {
    carrito = [];
    actualizarCarrito()
}

//FINALIZAR COMPRA
const finalizarCompra = () => {
  if (carrito.length == 0) {
  Swal.fire({
    title: "Carrito vacío",
    text: "Agrega productos al carrito!",
    icon: "warning"
  });
  } else {
    Swal.fire({
      title: "Genial!",
      text: "Compra finalizada con exito",
      icon: "success"
    });
  vaciarCarrito();}}



const actualizarCarrito = () => {
  carritoOffcanvas.innerHTML = ""

  carrito.forEach((elemento, index) => {
    let listaCarrito = document.createElement("div")
    listaCarrito.innerHTML = `<div class="card" style="width: 18rem;">
      
      <div class="card-body">
        <h5 class="card-title">${elemento.nombre}</h5>
        <p class="card-text">$${elemento.precio}</p>
        <button class="btn-delete" id="delete${index}">Eliminar</button>
      </div>
    </div>`

    carritoOffcanvas.appendChild(listaCarrito)
    //ELIMINAR
    const btnEliminar = document.querySelector(`#delete${index}`)
    btnEliminar.addEventListener("click", () => {
      eliminarProducto(index)})
    })
  

    //SUMA PRECIO
    if (carrito.length > 0){
      precioTotal = carrito.reduce((acc, producto) => acc + producto.precio, 0)
      total.textContent = `Total: $${precioTotal}`
    }else{
      total.textContent = `Total: 0`
    }
}
const total = document.querySelector("#total")


//COMPRAR
const btnFinalizarCompra = document.querySelector("#comprar")
btnFinalizarCompra.addEventListener("click", () => {
   finalizarCompra()})

//VACIAR
const btnVaciarCarrito = document.querySelector("#vaciar")
btnVaciarCarrito.addEventListener("click", () =>{
    vaciarCarrito();})



//FUNCION QUE AGREGA PRODUCTOS A LA LISTA DE LOS MISMOS
const agregarProductosALista = async() => {
  const resp = await fetch('./productos.json')
  const listaProductos = await resp.json()

  listaProductos.forEach((producto, i) => {
        let contenedorProductos = document.createElement("div")
        contenedorProductos.innerHTML = `<div class="card" style="width: 18rem;">
        <img src="${producto.imagen}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-text">$${producto.precio}</p>
          <button class="btn" id="agregar${i}">Agregar al carrito</button>
        </div>
      </div>`

      contenedorGeneral.appendChild(contenedorProductos)

      const botonAgregar = document.querySelector(`#agregar${i}`);
        botonAgregar.addEventListener("click", () => {
            agregarCarrito(producto)})

    })
  
}

agregarProductosALista();

const carritoOffcanvas = document.querySelector("#offcanvas-body");

