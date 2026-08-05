document.addEventListener('DOMContentLoaded', () => {
  function obtenerFavoritos() {
    const guardado = localStorage.getItem('zenspace-favoritos');
    return guardado ? JSON.parse(guardado) : [];
  }
  function guardarFavoritos(favoritos) {
    localStorage.setItem('zenspace-favoritos', JSON.stringify(favoritos));
  }
  function normalizarNombre(texto) {
    return texto.trim().toLowerCase();
  }
  function aplicarEstadoIcono(btn, activo) {
    const icono = btn.querySelector('i');
    if (activo) {
      btn.classList.add('activo');
      icono.classList.remove('bi-heart');
      icono.classList.add('bi-heart-fill');
    } else {
      btn.classList.remove('activo');
      icono.classList.remove('bi-heart-fill');
      icono.classList.add('bi-heart');
    }
  }
  document.querySelectorAll('.favorito').forEach(btn => {
    const card = btn.closest('.card-producto');
    if (!card) return;
    const nombreProducto = normalizarNombre(card.querySelector('h3').textContent);
    const favoritos = obtenerFavoritos();
    aplicarEstadoIcono(btn, favoritos.includes(nombreProducto));
    btn.addEventListener('click', () => {
      let favoritosActuales = obtenerFavoritos();
      const yaEsFavorito = favoritosActuales.includes(nombreProducto);
      if (yaEsFavorito) {
        favoritosActuales = favoritosActuales.filter(nombre => nombre !== nombreProducto);
      } else {
        favoritosActuales.push(nombreProducto);
      }
      guardarFavoritos(favoritosActuales);
      aplicarEstadoIcono(btn, !yaEsFavorito);
    });
  });
 
  function obtenerCarrito() {
    const guardado = localStorage.getItem('zenspace-carrito');
    return guardado ? JSON.parse(guardado) : [];
  }
 
  function guardarCarrito(carrito) {
    localStorage.setItem('zenspace-carrito', JSON.stringify(carrito));
  }
 
  function agregarAlCarrito(producto) {
    const carrito = obtenerCarrito();
    const existente = carrito.find(p => p.nombre === producto.nombre);
 
    if (existente) {
      existente.cantidad += 1;
    } else {
      carrito.push({ ...producto, cantidad: 1 });
    }
 
    guardarCarrito(carrito);
  }

  document.querySelectorAll('.btn-agregar-carrito, .btn-aggcarrito').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.card-producto');
 
      if (card) {
        const nombre = card.querySelector('h3').textContent.trim();
        const categoria = card.querySelector('.marcar-categoria').textContent.trim();
        const precioTexto = card.querySelector('.precio-catalogo').textContent;
        const precio = parseFloat(precioTexto.replace(/[^0-9.]+/g, '')) || 0;
        const imagen = card.querySelector('img').getAttribute('src');
 
        agregarAlCarrito({ nombre, categoria, precio, imagen });
      }
 
      if (btn.classList.contains('agregado')) return;
 
      const iconoOriginal = btn.innerHTML;
      btn.innerHTML = '<i class="bi bi-check2"></i>';
      btn.classList.add('agregado');
 
      setTimeout(() => {
        btn.innerHTML = iconoOriginal;
        btn.classList.remove('agregado');
      }, 1200);
    });
  });
 
  const chips = document.querySelectorAll('.chip');
  const productosCatalogo = document.querySelectorAll('.card-producto');
  const buscador = document.querySelector('.busqueda input');
 
  if (chips.length > 0 && productosCatalogo.length > 0) {
    const normalizar = (texto) =>
      texto.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
 
    const filtrarCatalogo = () => {
      const chipActivo = document.querySelector('.chip.activo');
      if (!chipActivo) return;
 
      const categoria = normalizar(chipActivo.textContent);
      const busqueda = buscador ? normalizar(buscador.value) : '';
 
      productosCatalogo.forEach(card => {
        const categoriaProducto = normalizar(card.querySelector('.marcar-categoria').textContent);
        const nombreProducto = normalizar(card.querySelector('h3').textContent);
 
        const coincideCategoria = categoria === 'todos' || categoriaProducto === categoria;
        const coincideBusqueda = nombreProducto.includes(busqueda);
 
        card.style.display = (coincideCategoria && coincideBusqueda) ? '' : 'none';
      });
    };
 
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => c.classList.remove('activo'));
        chip.classList.add('activo');
        filtrarCatalogo();
      });
    });
 
    if (buscador) {
      buscador.addEventListener('input', filtrarCatalogo);
    }
  }
 
  const contenedorProductosCarrito = document.querySelector('.productos-carrito');
 
  if (contenedorProductosCarrito) {
 
    function crearFilaProducto(producto) {
      const totalLinea = producto.precio * producto.cantidad;
      return `
        <div class="lista-prodcutos">
          <div class="producto-agregado" data-nombre="${producto.nombre}">
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <div class="descripcion-producto">
              <h3>${producto.nombre}</h3>
              <span class="marcar-categoria">${producto.categoria}</span>
              <h4>$${producto.precio.toFixed(2)}</h4>
            </div>
            <div class="cantidad-productos">
              <h4>Cantidad</h4>
              <div class="suma-resta-producto">
                <button class="restar-producto">-</button>
                <input type="text" class="numero-productos" value="${producto.cantidad}">
                <button class="sumar-producto">+</button>
              </div>
            </div>
            <div class="total-productosumado">
              <div class="total-precio">
                <span>$${totalLinea.toFixed(2)}</span>
                <button class="eliminar-producto"><i class="bi bi-trash"></i></button>
              </div>
            </div>
          </div>
        </div>
      `;
    }
 
    function mostrarEstadoVacio(vacio) {
      let mensaje = document.querySelector('.carrito-vacio');
 
      if (vacio) {
        if (!mensaje) {
          mensaje = document.createElement('div');
          mensaje.className = 'carrito-vacio';
          mensaje.innerHTML = `
            <i class="bi bi-cart-x"></i>
            <h3>Tu carrito está vacío</h3>
            <p>Agrega productos desde el catálogo para verlos aquí</p>
            <a href="catalogo.html" class="btn-volver-catalogo">Ir al catálogo</a>
          `;
          contenedorProductosCarrito.appendChild(mensaje);
        }
      } else if (mensaje) {
        mensaje.remove();
      }
    }
 
    function actualizarTotales() {
      const carrito = obtenerCarrito();
      const subtotal = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
      const envio = subtotal > 0 ? 19.99 : 0;
      const descuento = subtotal > 0 ? 15.00 : 0;
      const total = subtotal + envio - descuento;
 
      const filas = document.querySelectorAll('.fila-resumen');
      if (filas[0]) filas[0].querySelector('span:last-child').textContent = '$' + subtotal.toFixed(2);
      if (filas[1]) filas[1].querySelector('span:last-child').textContent = '$' + envio.toFixed(2);
      if (filas[2]) filas[2].querySelector('span:last-child').textContent = '-$' + descuento.toFixed(2);
 
      const totalSpan = document.querySelector('.fila-total span');
      if (totalSpan) totalSpan.textContent = '$' + total.toFixed(2);
    }
 
    function renderizarCarrito() {
      const carrito = obtenerCarrito();
      contenedorProductosCarrito.innerHTML = '';
 
      carrito.forEach(producto => {
        contenedorProductosCarrito.insertAdjacentHTML('beforeend', crearFilaProducto(producto));
      });
 
      mostrarEstadoVacio(carrito.length === 0);
      actualizarTotales();
    }
 
    contenedorProductosCarrito.addEventListener('click', (e) => {
      const item = e.target.closest('.producto-agregado');
      if (!item) return;
 
      const nombre = item.dataset.nombre;
      const carrito = obtenerCarrito();
      const producto = carrito.find(p => p.nombre === nombre);
      if (!producto) return;
 
      if (e.target.closest('.sumar-producto')) {
        producto.cantidad += 1;
        guardarCarrito(carrito);
        renderizarCarrito();
        return;
      }
 
      if (e.target.closest('.restar-producto')) {
        if (producto.cantidad <= 1) return;
        producto.cantidad -= 1;
        guardarCarrito(carrito);
        renderizarCarrito();
        return;
      }
 
      if (e.target.closest('.eliminar-producto')) {
        const nuevoCarrito = carrito.filter(p => p.nombre !== nombre);
        guardarCarrito(nuevoCarrito);
        renderizarCarrito();
      }
    });
 
    contenedorProductosCarrito.addEventListener('change', (e) => {
      if (!e.target.classList.contains('numero-productos')) return;
 
      const item = e.target.closest('.producto-agregado');
      const nombre = item.dataset.nombre;
      let cantidad = parseInt(e.target.value) || 1;
      if (cantidad < 1) cantidad = 1;
 
      const carrito = obtenerCarrito();
      const producto = carrito.find(p => p.nombre === nombre);
      if (producto) {
        producto.cantidad = cantidad;
        guardarCarrito(carrito);
        renderizarCarrito();
      }
    });
 
    renderizarCarrito();
  }
 
  const itemsVisualizador = document.querySelectorAll('.item-3d');
  const lienzo = document.querySelector('.lienzo-3d');
 
  if (itemsVisualizador.length > 0 && lienzo) {
    itemsVisualizador.forEach(item => {
      item.addEventListener('click', () => {
        itemsVisualizador.forEach(i => i.classList.remove('activo'));
        item.classList.add('activo');
 
        const nombre = item.querySelector('h3').textContent;
        const precio = item.querySelector('.item-info span').textContent;
        const imgSrc = item.querySelector('img').getAttribute('src');
 
        lienzo.innerHTML = `
          <div class="datos-visualizacion">
            <img src="${imgSrc}" alt="${nombre}" class="preview-3d">
            <h3>${nombre}</h3>
            <p>${precio}</p>
          </div>
        `;
      });
    });
  }

});