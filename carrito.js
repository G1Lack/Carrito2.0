class Producto {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
}

class Carrito {
    constructor() {
        this.productos = [];
    }

    añadirProducto(producto) {
        this.productos.push(producto);
        this.mostrarProductos();
    }

    eliminarProducto(nombre) {
        this.productos = this.productos.filter(producto => producto.nombre !== nombre);
        this.mostrarProductos();
    }

    mostrarProductos() {
        const tabla = document.getElementById('productos');
        tabla.innerHTML = '';
        this.productos.forEach(producto => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${producto.nombre}</td>
                <td>${producto.precio}</td>
                <td><button onclick="carrito.eliminarProducto('${producto.nombre}')">Eliminar</button></td>
            `;
            tabla.appendChild(fila);
        });
    }

    calcularSubtotal() {
        return this.productos.reduce((total, producto) => total + producto.precio, 0);
    }

    calcularDescuento(subtotal) {
        return subtotal > 3000 ? subtotal * 0.1 : 0;
    }

    calcularIGV(subtotal) {
        return subtotal * 0.18;
    }

    calcularTotal() {
        const subtotal1 = this.calcularSubtotal();
        const descuento = this.calcularDescuento(subtotal1);
        const subtotal2 = subtotal1 - descuento;
        const igv = this.calcularIGV(subtotal2);
        return {
            productos: this.productos,
            subtotal1: subtotal1,
            descuento: descuento,
            subtotal2: subtotal2,
            igv: igv,
            totalAPagar: subtotal2 + igv
        };
    }

    imprimir() {
        const total = this.calcularTotal();
        const totalesDiv = document.getElementById('totales');
        totalesDiv.innerHTML = `
            <p>Subtotal 1: ${total.subtotal1}</p>
            <p>Descuento: ${total.descuento}</p>
            <p>Subtotal 2: ${total.subtotal2}</p>
            <p>IGV: ${total.igv}</p>
            <p>Total a Pagar: ${total.totalAPagar}</p>
        `;
    }
}

const carrito = new Carrito();

function añadirProducto() {
    const nombre = document.getElementById('producto').value;
    const precio = parseFloat(document.getElementById('precio').value);
    carrito.añadirProducto(new Producto(nombre, precio));
}

function imprimirCarrito() {
    carrito.imprimir();
}
