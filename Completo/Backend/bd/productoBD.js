const productosBD = require("./conexion").productos;
const Producto = require("../modelos/ProductoModelo");

function validarDatos(producto) {
    return producto.nombre !== undefined && producto.precio !== undefined && producto.cantidad !== undefined;
}

async function mostrarProductos() {
    const productos = await productosBD.get();
    const productosValidos = [];
    productos.forEach(producto => {
        const producto1 = new Producto({ id: producto.id, ...producto.data() });
        if (validarDatos(producto1.getProducto)) {
            productosValidos.push(producto1.getProducto);
        }
    });
    return productosValidos;
}

async function busXId(id) {
    const producto = await productosBD.doc(id).get();
    const producto1 = new Producto({ id: producto.id, ...producto.data() });
    return validarDatos(producto1.getProducto) ? producto1.getProducto : undefined;
}

async function newProd(data) {
    const producto1 = new Producto(data);
    if (validarDatos(producto1.getProducto)) {
        await productosBD.doc().set(producto1.getProducto);
        return true;
    }
    return false;
}

async function deleteProd(id) {
    const productoValido = await busXId(id);
    if (productoValido) {
        await productosBD.doc(id).delete();
        return true;
    }
    return false;
}

async function editarProd(id, data) {
    const productoExistente = await busXId(id);
    if (productoExistente) {
        const productoNuevo = new Producto(data);
        if (validarDatos(productoNuevo.getProducto)) {
            await productosBD.doc(id).update(productoNuevo.getProducto);
            return true;
        }
    }
    return false;
}

module.exports = {
    mostrarProductos,
    busXId,
    deleteProd,
    newProd,
    editarProd
};
