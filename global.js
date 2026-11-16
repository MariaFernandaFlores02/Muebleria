// ==========================================
// NOTIFICACIONES VISUALES GLOBALES (REEMPLAZO DE ALERT / CONSOLA)
// ==========================================
function mostrarMensajeVisual(mensaje, tipo = "exito") {
    let toast = document.getElementById("toast-notificacion-global");
    
    // Si no existe el contenedor toast en el HTML, se crea dinámicamente
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toast-notificacion-global";
        toast.className = "toast-notificacion";
        document.body.appendChild(toast);
    }

    toast.textContent = mensaje;
    
    // Asignación de estilos visuales según el tipo de mensaje
    if (tipo === "error") {
        toast.style.backgroundColor = "#dc2626"; // Rojo para errores / advertencias
    } else if (tipo === "info") {
        toast.style.backgroundColor = "#2563eb"; // Azul para información
    } else {
        toast.style.backgroundColor = "#064e3b"; // Verde oscuro para éxitos
    }

    toast.classList.add("activo");

    // Se oculta automáticamente después de 3.5 segundos
    setTimeout(() => {
        toast.classList.remove("activo");
    }, 3500);
}

// ==========================================
// CONTADOR DEL CARRITO GLOBAL
// ==========================================
function actualizarContadorCarrito() {
    const contadorBadge = document.getElementById("contador-carrito");
    if (!contadorBadge) return;
    
    const carrito = JSON.parse(localStorage.getItem("carrito_kolosos")) || [];
    const totalItems = carrito.reduce((total, producto) => total + Number(producto.cantidad || 1), 0);
    contadorBadge.textContent = totalItems;
}

document.addEventListener("DOMContentLoaded", actualizarContadorCarrito);
window.addEventListener("storage", actualizarContadorCarrito);