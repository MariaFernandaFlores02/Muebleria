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
// ==========================================
// RENDERIZADO DE TABLA DE MÉTRICAS (CON ACTUALIZACIÓN EN TIEMPO REAL)
// ==========================================
function cargarTablaMetricasConPromociones() {
    const tbodyMetricas = document.getElementById("tabla-inventario-admin");
    if (!tbodyMetricas) return;

    // 1. Obtener datos más recientes
    const productos = typeof obtenerProductos === "function" ? obtenerProductos() : [];

    let promociones = [];
    try {
        const promocionesGuardadas = localStorage.getItem("promociones_kolosos");
        promociones = promocionesGuardadas ? JSON.parse(promocionesGuardadas) : [];
    } catch (e) {
        promociones = [];
    }

    tbodyMetricas.innerHTML = "";

    if (!productos || productos.length === 0) {
        tbodyMetricas.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 20px; color: #666;">No hay productos registrados.</td></tr>`;
        return;
    }

    // 2. Renderizar cada fila
    productos.forEach(prod => {
        if (!prod) return;

        const categoriaProd = String(prod.categoria || "").toLowerCase().trim();

        // Buscar si existe oferta activa que aplique
        const promo = promociones.find(p => {
            if (!p || p.estado !== "Activo") return false;
            const aplicaA = String(p.aplica || "").toLowerCase().trim();
            return aplicaA.includes("todo") || aplicaA.includes(categoriaProd) || (categoriaProd && categoriaProd.includes(aplicaA));
        });

        const estadoPromoHTML = promo 
            ? `<span style="background-color: #10b981; color: white; padding: 4px 10px; border-radius: 4px; font-weight: bold; font-size: 0.85rem;">🔥 ${promo.descuento || 'Oferta'} (${promo.codigo || 'PROMO'})</span>`
            : `<span style="background-color: #9ca3af; color: white; padding: 4px 10px; border-radius: 4px; font-size: 0.85rem;">Sin Oferta</span>`;

        const tr = document.createElement("tr");
        tr.style.borderBottom = "1px solid #e5e7eb";
        tr.style.color = "#1f2937";

        tr.innerHTML = `
            <td style="padding: 12px; text-align: center;">
                <img src="${prod.imagen || 'https://via.placeholder.com/40'}" alt="${prod.nombre || ''}" style="width: 40px; height: 40px; object-fit: cover; border-radius: 6px;" onerror="this.src='https://via.placeholder.com/40'">
            </td>
            <td style="padding: 12px; font-weight: bold; color: #2563eb; text-align: center;">${prod.id || '-'}</td>
            <td style="padding: 12px; font-weight: 600;">${prod.nombre || 'Sin Nombre'}</td>
            <td style="padding: 12px;"><span style="text-transform: capitalize; background: #e0e7ff; color: #3730a3; padding: 2px 8px; border-radius: 4px; font-size: 0.85rem;">${prod.categoria || 'General'}</span></td>
            <td style="padding: 12px; font-weight: bold;">${prod.precio || '$0'}</td>
            <td style="padding: 12px; text-align: center;"><strong>${prod.stock ?? 0}</strong></td>
            <td style="padding: 12px; text-align: center;">${estadoPromoHTML}</td>
        `;
        tbodyMetricas.appendChild(tr);
    });
}

// Función auxiliar para forzar la actualización en cualquier momento
function notificarCambioEnDatos() {
    cargarTablaMetricasConPromociones();
    window.dispatchEvent(new Event("datosActualizados"));
}

// 1. Cargar al abrir el documento
document.addEventListener("DOMContentLoaded", cargarTablaMetricasConPromociones);

// 2. Escuchar cuando cambies de pestaña en el menú (Métricas, Productos, Promociones, Pedidos)
document.addEventListener("click", (e) => {
    if (e.target.closest(".sidebar a, .menu-item, [data-target], [data-seccion]")) {
        setTimeout(cargarTablaMetricasConPromociones, 50);
    }
});

// 3. Escuchar cambios de LocalStorage (por si editas desde otra pestaña o módulo)
window.addEventListener("storage", cargarTablaMetricasConPromociones);
window.addEventListener("datosActualizados", cargarTablaMetricasConPromociones);