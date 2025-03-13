document.addEventListener("DOMContentLoaded", () => {
    const productosContainer = document.getElementById("productos-container");
    const carritoList = document.getElementById("carrito-list");
    const totalElement = document.getElementById("total");
    const vaciarCarritoBtn = document.getElementById("vaciar-carrito");
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

     // Fetch de productos simulados
     fetch("https://fakestoreapi.com/products")
     .then(response => response.json())
     .then(data => mostrarProductos(data));

     function mostrarProductos(productos) {
        productos.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("col-md-4", "mb-4");
    
            const card = document.createElement("div");
            card.classList.add("card", "h-100");
    
            const img = document.createElement("img");
            img.src = producto.image;
            img.classList.add("card-img-top");
            img.alt = producto.title;
            img.height = 200;
    
            const cardBody = document.createElement("div");
            cardBody.classList.add("card-body");
    
            const title = document.createElement("h5");
            title.classList.add("card-title");
            title.textContent = producto.title;
    
            const price = document.createElement("p");
            price.classList.add("card-text");
            price.textContent = `$${producto.price}`;
    
            const btn = document.createElement("button");
            btn.classList.add("btn", "btn-primary");
            btn.textContent = "Agregar al Carrito";
            btn.addEventListener("click", () => agregarAlCarrito(producto));
    
            cardBody.append(title, price, btn);
            card.append(img, cardBody);
            div.appendChild(card);
            productosContainer.appendChild(div);
        });
    }
    

 function agregarAlCarrito(producto) {
     carrito.push(producto);
     localStorage.setItem("carrito", JSON.stringify(carrito));
     actualizarCarrito();
 }

 function actualizarCarrito() {
    carritoList.innerHTML = ""; // Limpiar la lista antes de actualizar
    let total = 0;

    carrito.forEach((producto, index) => {
        total += producto.price;

        const li = document.createElement("li");
        li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");

        const texto = document.createElement("span");
        texto.textContent = `${producto.title} - $${producto.price}`;

        const btnEliminar = document.createElement("button");
        btnEliminar.classList.add("btn", "btn-danger", "btn-sm");
        btnEliminar.textContent = "X";
        btnEliminar.addEventListener("click", () => eliminarDelCarrito(index));

        // Ensamblar elementos
        li.append(texto, btnEliminar);
        carritoList.appendChild(li);
    });

    totalElement.textContent = total.toFixed(2);
}


 function eliminarDelCarrito(index) {
     carrito.splice(index, 1);
     localStorage.setItem("carrito", JSON.stringify(carrito));
     actualizarCarrito();
 }

 vaciarCarritoBtn.addEventListener("click", () => {
     carrito = [];
     localStorage.setItem("carrito", JSON.stringify(carrito));
     actualizarCarrito();
 });

 actualizarCarrito();
});   




 

