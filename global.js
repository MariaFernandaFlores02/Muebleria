// Función para calcular y actualizar el contador del carrito
function actualizarContadorCarrito() {
    const contadorBadge = document.getElementById("contador-carrito");
    if (!contadorBadge) return;

    // Obtiene los datos del carrito almacenados en el navegador
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    
    // Suma la cantidad total de productos
    const totalItems = carrito.reduce((total, producto) => total + Number(producto.cantidad || 1), 0);

    // Actualiza el texto del badge
    contadorBadge.textContent = totalItems;
}

// Ejecuta la actualización al cargar la página
document.addEventListener("DOMContentLoaded", actualizarContadorCarrito);

// Escucha cambios en el almacenamiento local desde otras pestañas
window.addEventListener("storage", actualizarContadorCarrito);