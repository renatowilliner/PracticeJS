document.addEventListener("DOMContentLoaded", function () {
    
    const form = document.getElementById("form");
    const listaProductos = document.getElementById("taskList");
    const btnFiltrar = document.getElementById("filtroNoComprados");
    const btnFiltrarComprados = document.getElementById("filtroComprados");
    const btnFiltrarTodos = document.getElementById("filtroTodos"); 


    form.addEventListener("submit", function (e) {
        e.preventDefault();
        agregarProducto();
        form.reset();
    });

    btnFiltrar.addEventListener("click", function () {
        filtrarProductosNoComprados();
    });

    btnFiltrarComprados.addEventListener("click", function () {
        filtrarProductosComprados();
    }
    );

    btnFiltrarTodos.addEventListener("click", function () {
        const productos = listaProductos.querySelectorAll("tr");

        productos.forEach((producto) => {
            producto.style.display = "table-row"; // Mostrar todos
        });
    });

    function agregarProducto() {
        const nombre = document.getElementById("nombreProducto").value.trim();
        const cantidad = document.getElementById("cantidadProducto").value.trim();
        if (nombre === "" || cantidad === "") return;

        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${nombre}</td>
            <td>${cantidad}</td>
        `;

        const tdAcciones = document.createElement("td");
        const btnComprar = crearBoton("✅", () => marcarComoComprado(tr));
        const btnEditar = crearBoton("✏️", () => editarProducto(tr));
        const btnEliminar = crearBoton("❌", () => eliminarProducto(tr));

        tdAcciones.append(btnComprar, btnEditar, btnEliminar);
        tr.appendChild(tdAcciones);
        listaProductos.appendChild(tr);
    }

    function marcarComoComprado(item) {
        item.classList.toggle("comprado");
    }

    function editarProducto(item) {
        const nombre = item.cells[0].textContent;
        const cantidad = item.cells[1].textContent;

        const nuevoNombre = prompt("Nuevo nombre:", nombre);
        const nuevaCantidad = prompt("Nueva cantidad:", cantidad);

        if (nuevoNombre && nuevaCantidad) {
            item.cells[0].textContent = nuevoNombre;
            item.cells[1].textContent = nuevaCantidad;
        }
    }

    function eliminarProducto(item) {
        listaProductos.removeChild(item);
    }

    function filtrarProductosNoComprados() {
        const productos = listaProductos.querySelectorAll("tr");

        productos.forEach((producto) => {
            if (producto.classList.contains("comprado")) {
                producto.style.display = "none";  // Ocultar los comprados
            } else {
                producto.style.display = "table-row"; // Mostrar los no comprados
            }
        });
    }

    function filtrarProductosComprados()
    {
        const productos = listaProductos.querySelectorAll("tr");

        productos.forEach((producto) => {
            if (producto.classList.contains("comprado")) {
                producto.style.display = "table-row";  // Mostrar los comprados
            } else {
                producto.style.display = "none"; // Ocultar los no comprados
            }
        });
    }
});



function crearBoton(texto, callback) {
    const boton = document.createElement("button");
    boton.textContent = texto;
    boton.addEventListener("click", callback);
    return boton;
}





