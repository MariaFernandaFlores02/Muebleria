// Base de datos oficial de productos Muebles Kolosos
const productosIniciales = [
    { id: "sofa-odesa", nombre: "Sofá Comfort Odesa", categoria: "sofas", precio: "$450.000", precioNum: 450000, imagen: "imagenes/sofa.png", stock: 8 },
    { id: "sofa-lshape", nombre: "Sofá Seccional L-Shape", categoria: "sofas", precio: "$680.000", precioNum: 680000, imagen: "imagenes/sofa2.jpg", stock: 1 },
    { id: "sillon-leather", nombre: "Sillón Reclinable Leather", categoria: "sofas", precio: "$310.000", precioNum: 310000, imagen: "imagenes/sofa3.jpeg", stock: 5 },
    { id: "sofa-cama", nombre: "Sofá Cama Minimalista", categoria: "sofas", precio: "$390.000", precioNum: 390000, imagen: "imagenes/sofa-cama.jpeg", stock: 0 },
    { id: "loveseat-vintage", nombre: "Loveseat Vintage", categoria: "sofas", precio: "$280.000", precioNum: 280000, imagen: "imagenes/loveseat.jpeg", stock: 4 },
    { id: "mesa-nordik", nombre: "Mesa Comedor Nordik", categoria: "mesas", precio: "$320.000", precioNum: 320000, imagen: "imagenes/mesa-nordik.webp", stock: 6 },
    { id: "mesa-centro-cristal", nombre: "Mesa de Centro Cristal", categoria: "mesas", precio: "$180.000", precioNum: 180000, imagen: "imagenes/mesa-cristal.webp", stock: 1 },
    { id: "comedor-6-puestos", nombre: "Juego Comedor 6 Puestos", categoria: "mesas", precio: "$750.000", precioNum: 750000, imagen: "imagenes/comedor-6.jpg", stock: 3 },
    { id: "mesa-lateral-madera", nombre: "Mesa Lateral Rustik", categoria: "mesas", precio: "$120.000", precioNum: 120000, imagen: "imagenes/mesa-lateral.jpeg", stock: 10 },
    { id: "escritorio-ejecutivo", nombre: "Escritorio Ejecutivo Moderno", categoria: "mesas", precio: "$290.000", precioNum: 290000, imagen: "imagenes/escritorio.jpeg", stock: 0 },
    { id: "cama-king-turin", nombre: "Cama King Size Turín", categoria: "camas", precio: "$620.000", precioNum: 620000, imagen: "imagenes/cama-king.webp", stock: 2 },
    { id: "cama-queen-venecia", nombre: "Cama Queen Size Venecia", categoria: "camas", precio: "$510.000", precioNum: 510000, imagen: "imagenes/cama-queen.webp", stock: 1 },
    { id: "velador-minimalista", nombre: "Mesa de Noche Minimalista", categoria: "camas", precio: "$95.000", precioNum: 95000, imagen: "imagenes/velador.jpeg", stock: 15 },
    { id: "ropero-3-puertas", nombre: "Clóset Ropero 3 Puertas", categoria: "camas", precio: "$480.000", precioNum: 480000, imagen: "imagenes/ropero.jpeg", stock: 4 },
    { id: "poltrona-dormitorio", nombre: "Poltrona de Lectura Accent", categoria: "camas", precio: "$240.000", precioNum: 240000, imagen: "imagenes/poltrona.jpeg", stock: 0 }
];

// Obtener lista completa de productos
function obtenerProductos() {
    const guardados = localStorage.getItem("productos_kolosos");
    if (!guardados) {
        localStorage.setItem("productos_kolosos", JSON.stringify(productosIniciales));
        return productosIniciales;
    }
    return JSON.parse(guardados);
}

// Guardar lista actualizada en el navegador
function guardarProductos(productos) {
    localStorage.setItem("productos_kolosos", JSON.stringify(productos));
}

// Agregar producto nuevo
function agregarProductoNuevo(nuevoProducto) {
    const productos = obtenerProductos();
    productos.push(nuevoProducto);
    guardarProductos(productos);
}

// Eliminar producto por ID
function EliminarProducto(idProducto) {
    let productos = obtenerProductos();
    productos = productos.filter(prod => prod.id !== idProducto);
    guardarProductos(productos);
}