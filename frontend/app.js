// =========================================================================
// Oricci Atelier Dulce y Salado - Lógica Frontend (app.js)
// Responsable: Gustavo Nahum Márquez Cruz (#6)
// =========================================================================
document.addEventListener('DOMContentLoaded', () => {
  const contenedorProductos = document.getElementById('grid-productos');
  const botonesFiltro = document.querySelectorAll('[data-categoria]');
  const formularioPedido = document.getElementById('form-pedido');
  const mensajeRespuesta = document.getElementById('respuesta-pedido');

  // 1. CARGAR CATÁLOGO DE PRODUCTOS (GET /api/productos)
  async function cargarProductos(categoria = '') {
    if (!contenedorProductos) return;

    contenedorProductos.innerHTML =
      '<p class="cargando">Cargando delicias artesanales...</p>';

    try {
      const url = categoria && categoria !== 'todos'
        ? `/api/productos/${encodeURIComponent(categoria)}`
        : '/api/productos';

      const respuesta = await fetch(url);

      if (!respuesta.ok) {
        throw new Error(`Error HTTP: ${respuesta.status}`);
      }

      const datos = await respuesta.json();
      const listaProductos = Array.isArray(datos)
        ? datos
        : (datos.productos || []);

      renderizarProductos(listaProductos);
    } catch (error) {
      console.error('Error al cargar productos:', error);
      contenedorProductos.innerHTML =
        '<p class="error-catalogo">No se pudo conectar con el catálogo en este momento.</p>';
    }
  }

  // 2. MOSTRAR LOS PRODUCTOS EN PANTALLA
  function renderizarProductos(productos) {
    if (productos.length === 0) {
      contenedorProductos.innerHTML =
        '<p>No hay postres disponibles en esta categoría por ahora.</p>';
      return;
    }

    contenedorProductos.innerHTML = productos.map(prod => `
      <article class="producto-card">
        ${prod.imagen ? `<img src="${prod.imagen}" alt="${prod.nombre}" loading="lazy">` : ''}
        <div class="producto-info">
          <span class="categoria-badge">${prod.categoria || 'Artesanal'}</span>
          <h3>${prod.nombre}</h3>
          <p>${prod.descripcion || ''}</p>
          <p class="precio"><strong>$${Number(prod.precio || 0).toFixed(2)}</strong></p>
        </div>
      </article>
    `).join('');
  }

  // 3. BOTONES DE FILTRO POR CATEGORÍA
  botonesFiltro.forEach(boton => {
    boton.addEventListener('click', () => {
      botonesFiltro.forEach(b => b.classList.remove('activo'));
      boton.classList.add('activo');
      cargarProductos(boton.dataset.categoria);
    });
  });

  // 4. ENVIAR PEDIDO (POST /api/pedidos)
  if (formularioPedido) {
    formularioPedido.addEventListener('submit', async (evento) => {
      evento.preventDefault();

      // FormData toma todos los campos que tengan atributo "name"
      const datosFormulario = new FormData(formularioPedido);
      const pedido = Object.fromEntries(datosFormulario.entries());
      pedido.cantidad = Number(pedido.cantidad);

      try {
        const respuesta = await fetch('/api/pedidos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(pedido)
        });

        if (!respuesta.ok) {
          throw new Error(`Error HTTP: ${respuesta.status}`);
        }

        mostrarMensaje('¡Pedido enviado con éxito! Pronto te contactaremos.', true);
        formularioPedido.reset();
      } catch (error) {
        console.error('Error al enviar pedido:', error);
        mostrarMensaje('No se pudo enviar el pedido. Intenta de nuevo.', false);
      }
    });
  }

  // 5. MOSTRAR MENSAJE AL USUARIO
  function mostrarMensaje(texto, exito) {
    if (mensajeRespuesta) {
      mensajeRespuesta.textContent = texto;
      mensajeRespuesta.style.color = exito ? 'green' : 'red';
    } else {
      alert(texto);
    }
  }

  // Al abrir la página, cargar todos los productos
  cargarProductos();
});