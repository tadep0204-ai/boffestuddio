/* =========================================================
   BOFFESTUDDIO · LÓGICA DE LA TIENDA
   (no hace falta tocar este archivo para cargar productos;
   eso se hace en productos.js)
   ========================================================= */

(function () {
  "use strict";

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  /* ---------------- Utilidades ---------------- */

  const formatoPrecio = (n) =>
    n == null ? "Consultar precio" : "$ " + Number(n).toLocaleString("es-AR");

  const nombreCompleto = (p) =>
    [p.marca !== CONFIG.nombre && p.marca !== "Accesorios" ? p.marca : "", p.nombre, p.categoria === "perfumes" ? p.contenido : ""]
      .filter(Boolean)
      .join(" ");

  const linkWhatsApp = (texto) =>
    `https://wa.me/${CONFIG.whatsapp}${texto ? "?text=" + encodeURIComponent(texto) : ""}`;

  const linkInstagram = () => `https://ig.me/m/${CONFIG.instagram}`;

  // Valores por defecto: así en productos.js alcanza con marca, nombre, género y foto
  PRODUCTOS.forEach((p) => {
    p.categoria = p.categoria || "perfumes";
    p.imagenes = p.imagenes || (p.foto ? [p.foto] : []);
    if (p.precio === undefined) p.precio = null;
    if (p.stock === undefined) p.stock = true;
  });

  const buscarProducto = (id) => PRODUCTOS.find((p) => p.id === id);

  // Un producto entra en un filtro por su género (perfumes) o por su categoría
  const cumpleFiltro = (p, filtro) =>
    filtro === "todos" || p.genero === filtro || p.categoria === filtro;

  const escapar = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------------- Dibujos de muestra (cuando no hay foto) ---------------- */

  const ICONOS = {
    hombre:
      '<svg viewBox="0 0 64 64"><rect x="24" y="8" width="16" height="8" rx="1"/><path d="M28 16v5M36 16v5"/><rect x="14" y="21" width="36" height="36" rx="3"/><path d="M20 28v22"/></svg>',
    mujer:
      '<svg viewBox="0 0 64 64"><circle cx="32" cy="11" r="5"/><path d="M29 16v5h6v-5"/><path d="M18 21h28c3 0 5 2 5 5v20c0 7-6 12-12 12H25c-6 0-12-5-12-12V26c0-3 2-5 5-5z"/><path d="M20 30v14"/></svg>',
    unisex:
      '<svg viewBox="0 0 64 64"><rect x="26" y="5" width="12" height="10" rx="1"/><path d="M30 15v4M34 15v4"/><path d="M20 19h24v36a3 3 0 0 1-3 3H23a3 3 0 0 1-3-3z"/><path d="M26 26v24"/><path d="M20 38h24"/></svg>',
    accesorios:
      '<svg viewBox="0 0 64 64"><path d="M18 18a6 6 0 0 1 6 6v20a3 3 0 0 1-6 0V30a6 6 0 0 1 0-12z"/><path d="M34 14a6 6 0 0 1 6 6v20a3 3 0 0 1-6 0V26a6 6 0 0 1 0-12z" transform="translate(4 -2)"/><path d="M44 36h8l2 18H44z"/></svg>',
    varios:
      '<svg viewBox="0 0 64 64"><rect x="12" y="8" width="22" height="44" rx="4"/><path d="M19 13h8"/><path d="M42 24a6 6 0 0 1 6 6v18a3 3 0 0 1-6 0V36a6 6 0 0 1 0-12z"/><path d="M50 50h4"/></svg>',
    celulares:
      '<svg viewBox="0 0 64 64"><rect x="20" y="6" width="24" height="52" rx="4"/><path d="M28 11h8"/></svg>',
  };

  const iconoDe = (p) => ICONOS[p.genero] || ICONOS[p.categoria] || ICONOS.unisex;
  const iconoFiltro = (id) => ICONOS[id] || ICONOS.unisex;

  const imagenHTML = (p, i = 0) =>
    p.imagenes && p.imagenes[i]
      ? `<img src="${escapar(p.imagenes[i])}" alt="${escapar(nombreCompleto(p))}" loading="lazy">`
      : `<div class="placeholder">${iconoDe(p)}</div>`;

  /* ---------------- Carrito (se guarda en el navegador) ---------------- */

  const CLAVE = "boffestuddio-carrito";
  let carrito = [];
  try {
    carrito = JSON.parse(localStorage.getItem(CLAVE)) || [];
  } catch (e) {
    carrito = [];
  }
  carrito = carrito.filter((it) => buscarProducto(it.id));

  const guardar = () => {
    try {
      localStorage.setItem(CLAVE, JSON.stringify(carrito));
    } catch (e) { /* modo privado: el carrito vive solo en esta pestaña */ }
    pintarCarrito();
  };

  const agregar = (id, cant = 1) => {
    const it = carrito.find((x) => x.id === id);
    if (it) it.cant += cant;
    else carrito.push({ id, cant });
    guardar();
    aviso("Agregado al carrito");
  };

  const cambiarCantidad = (id, delta) => {
    const it = carrito.find((x) => x.id === id);
    if (!it) return;
    it.cant += delta;
    if (it.cant <= 0) carrito = carrito.filter((x) => x.id !== id);
    guardar();
  };

  const total = () =>
    carrito.reduce((s, it) => s + (buscarProducto(it.id).precio || 0) * it.cant, 0);

  const hayPrecioAConsultar = () => carrito.some((it) => buscarProducto(it.id).precio == null);

  /* ---------------- Tarjeta de producto ---------------- */

  const tarjeta = (p) => `
    <article class="tarjeta">
      <a href="#p-${p.id}" class="tarjeta-img ${p.imagenes.length ? "con-foto" : ""}">
        ${imagenHTML(p)}
        ${!p.stock ? '<span class="etiqueta">Sin stock</span>' : ""}
      </a>
      <div class="tarjeta-cuerpo">
        <p class="tarjeta-marca">${escapar(p.marca)}</p>
        <h3 class="tarjeta-nombre"><a href="#p-${p.id}">${escapar(p.nombre)}</a></h3>
        <p class="tarjeta-detalle">${escapar(p.contenido || "")}</p>
        <p class="tarjeta-precio ${p.precio == null ? "a-consultar" : ""}">${formatoPrecio(p.precio)}</p>
        ${
          !p.stock
            ? `<a class="btn btn-secundario btn-chico" target="_blank" rel="noopener" href="${linkWhatsApp(`Hola! Quería saber cuándo vuelve a entrar ${nombreCompleto(p)}.`)}">Avisame</a>`
            : `<button class="btn btn-primario btn-chico" data-agregar="${escapar(p.id)}">Agregar al carrito</button>`
        }
      </div>
    </article>`;

  /* ---------------- Interfaz común (menú, carrito, links) ---------------- */

  function montarComun() {
    // Datos de contacto
    $$("[data-wa-link]").forEach((a) => {
      a.href = linkWhatsApp("Hola! Quería hacer una consulta.");
      a.target = "_blank";
      a.rel = "noopener";
    });
    $$("[data-ig-link]").forEach((a) => {
      a.href = `https://instagram.com/${CONFIG.instagram}`;
      a.target = "_blank";
      a.rel = "noopener";
    });
    $$("[data-telefono]").forEach((el) => (el.textContent = CONFIG.telefonoVisible));
    $$("[data-ig]").forEach((el) => (el.textContent = CONFIG.instagram));
    $$("[data-ciudad]").forEach((el) => (el.textContent = CONFIG.ciudad));
    $$("[data-anio]").forEach((el) => (el.textContent = new Date().getFullYear()));

    // Menú móvil
    const menu = $("[data-menu]");
    $("[data-menu-toggle]")?.addEventListener("click", () => menu.classList.toggle("abierto"));
    if (menu) $$("a", menu).forEach((a) => a.addEventListener("click", () => menu.classList.remove("abierto")));

    // Panel del carrito + botón flotante de WhatsApp + aviso
    document.body.insertAdjacentHTML(
      "beforeend",
      `
      <div class="velo" data-velo></div>
      <aside class="panel" data-panel aria-label="Carrito" aria-hidden="true">
        <div class="panel-cabecera">
          <h2>Tu pedido</h2>
          <button class="btn-icono" data-carrito-cerrar aria-label="Cerrar carrito">
            <svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg>
          </button>
        </div>
        <div class="panel-items" data-panel-items></div>
        <div class="panel-pie" data-panel-pie>
          <div class="panel-total"><span>Total</span><strong data-panel-total></strong></div>
          <p class="panel-nota" data-panel-nota hidden>Te confirmamos precios y disponibilidad por mensaje.</p>

          <label class="campo">
            <span>Nombre</span>
            <input type="text" data-cliente-nombre placeholder="Tu nombre">
          </label>
          <fieldset class="campo">
            <legend>Forma de pago</legend>
            <label class="opcion"><input type="radio" name="pago" value="Efectivo" checked> Efectivo</label>
            <label class="opcion"><input type="radio" name="pago" value="Transferencia"> Transferencia</label>
          </fieldset>
          <fieldset class="campo">
            <legend>Entrega</legend>
            <label class="opcion"><input type="radio" name="entrega" value="La Plata" checked> En ${escapar(CONFIG.ciudad)}</label>
            <label class="opcion"><input type="radio" name="entrega" value="Envío"> Envío al interior</label>
          </fieldset>
          <label class="campo" data-campo-localidad hidden>
            <span>Localidad / provincia</span>
            <input type="text" data-cliente-localidad placeholder="Ej: Rosario, Santa Fe">
          </label>

          <a class="btn btn-primario btn-ancho" data-enviar-wa href="#" target="_blank" rel="noopener">Enviar pedido por WhatsApp</a>
          <a class="btn btn-secundario btn-ancho" data-enviar-ig href="${linkInstagram()}" target="_blank" rel="noopener">Enviar por Instagram</a>
          <p class="panel-nota">El costo de envío se coordina por mensaje.</p>
        </div>
      </aside>
      <a class="wa-flotante" data-wa-link aria-label="WhatsApp" target="_blank" rel="noopener" href="${linkWhatsApp("Hola! Quería hacer una consulta.")}">
        <svg viewBox="0 0 32 32"><path d="M16 3a13 13 0 0 0-11.2 19.6L3 29l6.6-1.7A13 13 0 1 0 16 3zm0 23.7c-2 0-4-.6-5.7-1.6l-.4-.2-3.9 1 1-3.8-.3-.4A10.7 10.7 0 1 1 16 26.7zm5.9-8c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.4.2-.7.1a8.8 8.8 0 0 1-4.4-3.8c-.3-.6.3-.5 1-1.7.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.5c.2.2 2.4 3.6 5.7 5 2.1.9 2.9 1 4 .8.6-.1 1.9-.8 2.2-1.5.3-.8.3-1.4.2-1.5-.1-.2-.3-.2-.6-.4z"/></svg>
      </a>
      <div class="aviso" data-aviso></div>`
    );

    const panel = $("[data-panel]");
    const velo = $("[data-velo]");
    const abrir = () => { panel.classList.add("abierto"); velo.classList.add("visible"); panel.setAttribute("aria-hidden", "false"); };
    const cerrar = () => { panel.classList.remove("abierto"); velo.classList.remove("visible"); panel.setAttribute("aria-hidden", "true"); };
    $$("[data-carrito-abrir]").forEach((b) => b.addEventListener("click", abrir));
    $("[data-carrito-cerrar]").addEventListener("click", cerrar);
    velo.addEventListener("click", cerrar);
    document.addEventListener("keydown", (e) => e.key === "Escape" && cerrar());

    // Localidad solo si elige envío
    $$('input[name="entrega"]').forEach((r) =>
      r.addEventListener("change", () => {
        $("[data-campo-localidad]").hidden = $('input[name="entrega"]:checked').value !== "Envío";
      })
    );

    // Botones "Agregar al carrito" (delegado, sirve para todas las grillas)
    document.addEventListener("click", (e) => {
      const b = e.target.closest("[data-agregar]");
      if (b) agregar(b.dataset.agregar);
      const mas = e.target.closest("[data-mas]");
      if (mas) cambiarCantidad(mas.dataset.mas, 1);
      const menos = e.target.closest("[data-menos]");
      if (menos) cambiarCantidad(menos.dataset.menos, -1);
    });

    // El link de WhatsApp lleva el pedido armado; se actualiza con cada cambio
    const enviarWa = $("[data-enviar-wa]");
    const actualizarWa = () => (enviarWa.href = linkWhatsApp(mensajePedido()));
    $("[data-panel]").addEventListener("input", actualizarWa);
    $("[data-panel]").addEventListener("change", actualizarWa);
    enviarWa.addEventListener("pointerdown", actualizarWa);
    enviarWa.addEventListener("focus", actualizarWa);
    actualizarLinkPedido = actualizarWa;

    // Instagram no permite precargar el texto: lo copiamos para que lo peguen
    $("[data-enviar-ig]").addEventListener("click", () => {
      navigator.clipboard
        .writeText(mensajePedido())
        .then(() => aviso("Pedido copiado. Pegalo en el chat de Instagram"))
        .catch(() => aviso("Contanos tu pedido en el chat"));
    });

    pintarCarrito();
  }

  let actualizarLinkPedido = () => {};

  function mensajePedido() {
    const nombre = $("[data-cliente-nombre]").value.trim();
    const pago = $('input[name="pago"]:checked').value;
    const entrega = $('input[name="entrega"]:checked').value;
    const localidad = $("[data-cliente-localidad]").value.trim();

    const lineas = carrito.map((it) => {
      const p = buscarProducto(it.id);
      const sub = p.precio == null ? "a consultar" : formatoPrecio(p.precio * it.cant);
      return `• ${it.cant} x ${nombreCompleto(p)} — ${sub}`;
    });

    return [
      `¡Hola ${CONFIG.nombre}! Quiero hacer este pedido:`,
      "",
      ...lineas,
      "",
      total() > 0
        ? `Total: ${formatoPrecio(total())}${hayPrecioAConsultar() ? " (+ productos a consultar)" : ""}`
        : "¿Me pasás precio y disponibilidad?",
      `Pago: ${pago}`,
      `Entrega: ${entrega === "Envío" ? "Envío a " + (localidad || "(completar)") : "En " + CONFIG.ciudad}`,
      nombre ? `Nombre: ${nombre}` : "",
    ]
      .filter((l, i, arr) => l !== "" || arr[i - 1] !== "")
      .join("\n");
  }

  function pintarCarrito() {
    const cantidad = carrito.reduce((s, it) => s + it.cant, 0);
    $$("[data-carrito-contador]").forEach((el) => {
      el.textContent = cantidad;
      el.classList.toggle("visible", cantidad > 0);
    });

    const items = $("[data-panel-items]");
    if (!items) return;
    const pie = $("[data-panel-pie]");

    if (!carrito.length) {
      items.innerHTML = `
        <div class="panel-vacio">
          <div class="divisor"><span>✦</span></div>
          <p>Tu carrito está vacío</p>
          <a href="#inicio" class="btn btn-secundario btn-chico">Ver perfumes</a>
        </div>`;
      pie.hidden = true;
      return;
    }

    pie.hidden = false;
    actualizarLinkPedido();
    items.innerHTML = carrito
      .map((it) => {
        const p = buscarProducto(it.id);
        return `
        <div class="item">
          <a href="#p-${p.id}" class="item-img">${imagenHTML(p)}</a>
          <div class="item-info">
            <p class="tarjeta-marca">${escapar(p.marca)}</p>
            <p class="item-nombre">${escapar(p.nombre)}</p>
            <p class="item-precio">${formatoPrecio(p.precio)}</p>
            <div class="cantidad cantidad-chica">
              <button data-menos="${escapar(p.id)}" aria-label="Restar">−</button>
              <span>${it.cant}</span>
              <button data-mas="${escapar(p.id)}" aria-label="Sumar">+</button>
            </div>
          </div>
        </div>`;
      })
      .join("");
    $("[data-panel-total]").textContent = total() === 0 && hayPrecioAConsultar() ? "A consultar" : formatoPrecio(total());
    $("[data-panel-nota]").hidden = !hayPrecioAConsultar();
  }

  let avisoTimer;
  function aviso(texto) {
    const el = $("[data-aviso]");
    el.textContent = texto;
    el.classList.add("visible");
    clearTimeout(avisoTimer);
    avisoTimer = setTimeout(() => el.classList.remove("visible"), 2400);
  }

  /* ---------------- Portada: las 3 opciones ---------------- */

  function montarPortada() {
    const opciones = $("[data-opciones]");
    if (!opciones) return;
    opciones.innerHTML = FILTROS
      .map(
        (f) => `
        <a href="#${f.id}" class="portada-opcion">
          <span class="portada-icono">${iconoFiltro(f.id)}</span>
          <span class="portada-opcion-nombre">${escapar(f.nombre)}</span>
          <span class="portada-opcion-bajada">${escapar(f.bajada || "")}</span>
        </a>`
      )
      .join('<span class="portada-separador" aria-hidden="true"><span>✦</span></span>');
  }

  /* ---------------- Catálogo ---------------- */

  let mostrarCatalogo = () => {};

  function montarCatalogo() {
    const grilla = $("[data-grilla-catalogo]");
    if (!grilla) return;

    const POR_PAGINA = 24;
    const estado = { filtro: "todos", marca: "", busqueda: "", orden: "relevancia", limite: POR_PAGINA };

    // Las marcas del desplegable dependen de la opción elegida
    const selMarca = $("[data-marca]");
    const pintarMarcas = () => {
      const marcas = [...new Set(PRODUCTOS.filter((p) => cumpleFiltro(p, estado.filtro)).map((p) => p.marca))]
        .sort((a, b) => a.localeCompare(b, "es"));
      if (!marcas.includes(estado.marca)) estado.marca = "";
      selMarca.innerHTML =
        '<option value="">Todas las marcas</option>' +
        marcas.map((m) => `<option value="${escapar(m)}" ${m === estado.marca ? "selected" : ""}>${escapar(m)}</option>`).join("");
    };

    const chips = $("[data-chips]");
    const pintarChips = () => {
      chips.innerHTML = [{ id: "todos", nombre: "Todos" }, ...FILTROS]
        .map((f) => `<button class="chip ${estado.filtro === f.id ? "activo" : ""}" data-filtro="${f.id}">${escapar(f.nombre)}</button>`)
        .join("");
    };

    const pintarTitulo = () => {
      const f = FILTROS.find((x) => x.id === estado.filtro);
      $("[data-catalogo-titulo]").textContent = f ? f.nombre : "Catálogo";
      $("[data-catalogo-bajada]").textContent = f && f.bajada ? f.bajada : "Las mejores marcas al mejor precio";
      document.title = `${f ? f.nombre : "Catálogo"} · ${CONFIG.nombre}`;
    };

    const pintarGrilla = () => {
      const q = estado.busqueda.toLowerCase();
      let lista = PRODUCTOS.filter(
        (p) =>
          cumpleFiltro(p, estado.filtro) &&
          (!estado.marca || p.marca === estado.marca) &&
          (!q || `${p.marca} ${p.nombre} ${p.familia || ""}`.toLowerCase().includes(q))
      );
      const precio = (p) => (p.precio == null ? Infinity : p.precio);
      if (estado.orden === "precio-asc") lista.sort((a, b) => precio(a) - precio(b));
      if (estado.orden === "precio-desc") lista.sort((a, b) => (b.precio || 0) - (a.precio || 0));
      if (estado.orden === "nombre") lista.sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
      if (estado.orden === "relevancia") lista.sort((a, b) => (b.stock - a.stock) || (!!b.destacado - !!a.destacado));

      grilla.innerHTML = lista.slice(0, estado.limite).map(tarjeta).join("");
      $("[data-vacio]").hidden = lista.length > 0;
      const palabra = lista.some((p) => p.categoria !== "perfumes") ? ["producto", "productos"] : ["perfume", "perfumes"];
      $("[data-cantidad-resultados]").textContent =
        lista.length === 1 ? `1 ${palabra[0]}` : `${lista.length} ${palabra[1]}`;
      const faltan = lista.length - estado.limite;
      $("[data-ver-mas]").hidden = faltan <= 0;
      $("[data-ver-mas]").textContent = `Ver más (${Math.max(faltan, 0)})`;
    };

    const elegirFiltro = (id) => {
      estado.filtro = FILTROS.some((f) => f.id === id) ? id : "todos";
      estado.limite = POR_PAGINA;
      pintarMarcas();
      try { history.replaceState(null, "", "#" + estado.filtro); } catch (e) { /* sin cambio de dirección */ }
      pintarChips();
      pintarTitulo();
      pintarGrilla();
    };

    chips.addEventListener("click", (e) => {
      const b = e.target.closest("[data-filtro]");
      if (b) elegirFiltro(b.dataset.filtro);
    });
    $("[data-buscador]").addEventListener("input", (e) => {
      estado.busqueda = e.target.value;
      estado.limite = POR_PAGINA;
      pintarGrilla();
    });
    $("[data-orden]").addEventListener("change", (e) => {
      estado.orden = e.target.value;
      pintarGrilla();
    });
    selMarca.addEventListener("change", (e) => {
      estado.marca = e.target.value;
      estado.limite = POR_PAGINA;
      pintarGrilla();
    });
    $("[data-ver-mas]").addEventListener("click", () => {
      estado.limite += POR_PAGINA;
      pintarGrilla();
    });

    mostrarCatalogo = elegirFiltro;
  }

  /* ---------------- Página de producto ---------------- */

  function mostrarProducto(id) {
    const cont = $("[data-producto]");
    if (!cont) return;

    const p = buscarProducto(id);
    $("[data-relacionados-seccion]").hidden = !p;
    if (!p) {
      cont.innerHTML = `
        <div class="no-encontrado">
          <div class="divisor"><span>✦</span></div>
          <h1>Producto no encontrado</h1>
          <p>Puede que ya no esté disponible.</p>
          <a href="#todos" class="btn btn-primario">Volver al catálogo</a>
        </div>`;
      $("[data-relacionados-seccion]").hidden = true;
      return;
    }

    document.title = `${nombreCompleto(p)} · ${CONFIG.nombre}`;
    const filtro = FILTROS.find((f) => f.id === (p.genero || p.categoria));
    const imgs = p.imagenes && p.imagenes.length ? p.imagenes : [null];

    const detalles = [
      ["Marca", p.marca],
      ["Contenido", p.contenido],
      ["Concentración", p.concentracion],
      ["Género", filtro && p.genero ? filtro.nombre : ""],
      ["Familia olfativa", p.familia],
    ].filter(([, v]) => v);

    cont.innerHTML = `
      <nav class="migas">
        <a href="#inicio">Inicio</a><span>/</span>
        ${filtro ? `<a href="#${filtro.id}">${escapar(filtro.nombre)}</a><span>/</span>` : ""}
        <span>${escapar(p.nombre)}</span>
      </nav>

      <div class="producto-grid">
        <div class="galeria">
          <div class="galeria-principal marco" data-galeria-principal>${imagenHTML(p, 0)}</div>
          ${
            imgs.length > 1
              ? `<div class="galeria-miniaturas">${imgs
                  .map((_, i) => `<button class="miniatura ${i === 0 ? "activa" : ""}" data-mini="${i}">${imagenHTML(p, i)}</button>`)
                  .join("")}</div>`
              : ""
          }
        </div>

        <div class="ficha">
          <p class="eyebrow">${escapar(p.marca)}</p>
          <h1 class="ficha-titulo">${escapar(p.nombre)}${p.categoria === "perfumes" && p.contenido ? ` <span>${escapar(p.contenido)}</span>` : ""}</h1>
          <p class="ficha-precio">${formatoPrecio(p.precio)}</p>
          <p class="ficha-stock ${p.stock ? "" : "sin"}">${p.stock ? "✦ En stock" : "Sin stock por el momento"}</p>

          <div class="ficha-caja">
            <div class="ficha-caja-fila">
              <svg viewBox="0 0 48 48"><rect x="6" y="14" width="36" height="22" rx="2"/><circle cx="24" cy="25" r="5"/><path d="M10 10h28"/></svg>
              <div><strong>Efectivo</strong><span>Pagás al recibir o retirar</span></div>
            </div>
            <div class="ficha-caja-fila">
              <svg viewBox="0 0 48 48"><path d="M6 18 24 7l18 11z"/><path d="M8 18h32M10 40h28"/><path d="M13 22v14M20 22v14M28 22v14M35 22v14"/></svg>
              <div><strong>Transferencia</strong><span>Te pasamos los datos por mensaje</span></div>
            </div>
            <div class="ficha-caja-fila">
              <svg viewBox="0 0 48 48"><path d="M24 6 42 14v20L24 42 6 34V14z"/><path d="M6 14l18 8 18-8M24 22v20"/></svg>
              <div><strong>Envíos a todo el país</strong><span>Consultá disponibilidad y costo · Estamos en ${escapar(CONFIG.ciudad)}</span></div>
            </div>
          </div>

          ${
            p.stock
              ? `
          <div class="ficha-compra">
            <div class="cantidad">
              <button data-cant-menos aria-label="Restar">−</button>
              <span data-cant>1</span>
              <button data-cant-mas aria-label="Sumar">+</button>
            </div>
            <button class="btn btn-primario btn-ancho" data-agregar-ficha>Agregar al carrito</button>
          </div>`
              : ""
          }
          <a class="btn btn-secundario btn-ancho" target="_blank" rel="noopener"
             href="${linkWhatsApp(`Hola! Quería consultar por ${nombreCompleto(p)}.`)}">
            ${p.stock ? "Consultar por WhatsApp" : "Avisame cuando entre"}
          </a>

          <div class="ficha-descripcion">
            <div class="divisor"><span>✦</span></div>
            ${p.descripcion ? `<h2>Descripción</h2><p>${escapar(p.descripcion)}</p>` : ""}

            ${
              p.notas
                ? `
            <h2>Notas olfativas</h2>
            <ul class="notas">
              <li><span>Salida</span>${escapar(p.notas.salida)}</li>
              <li><span>Corazón</span>${escapar(p.notas.corazon)}</li>
              <li><span>Fondo</span>${escapar(p.notas.fondo)}</li>
            </ul>`
                : ""
            }

            <h2>Detalles</h2>
            <dl class="detalles">
              ${detalles.map(([k, v]) => `<div><dt>${k}</dt><dd>${escapar(v)}</dd></div>`).join("")}
            </dl>
          </div>
        </div>
      </div>`;

    // Galería
    cont.onclick = (e) => {
      const m = e.target.closest("[data-mini]");
      if (!m) return;
      $("[data-galeria-principal]").innerHTML = imagenHTML(p, Number(m.dataset.mini));
      $$(".miniatura", cont).forEach((b) => b.classList.toggle("activa", b === m));
    };

    // Cantidad + agregar
    let cant = 1;
    const pintarCant = () => ($("[data-cant]").textContent = cant);
    $("[data-cant-menos]")?.addEventListener("click", () => { cant = Math.max(1, cant - 1); pintarCant(); });
    $("[data-cant-mas]")?.addEventListener("click", () => { cant += 1; pintarCant(); });
    $("[data-agregar-ficha]")?.addEventListener("click", () => {
      agregar(p.id, cant);
      $("[data-carrito-abrir]").click();
    });

    // Relacionados: mismo género (o categoría), si no alcanza, otros destacados
    // Primero de la misma marca, y que tengan foto
    const rel = PRODUCTOS.filter((x) => x.id !== p.id && cumpleFiltro(x, p.genero || p.categoria)).sort(
      (a, b) => (b.marca === p.marca) - (a.marca === p.marca) || b.imagenes.length - a.imagenes.length
    );
    const extra = PRODUCTOS.filter((x) => x.id !== p.id && !rel.includes(x) && x.destacado);
    $("[data-grilla-relacionados]").innerHTML = [...rel, ...extra].slice(0, 4).map(tarjeta).join("");
  }

  /* ---------------- Arranque ---------------- */

  function enrutar() {
    let h = decodeURIComponent(location.hash.slice(1));
    // Links viejos: #catalogo?filtro=hombre y #producto?id=xxx
    const [ruta, consulta] = h.split("?");
    const params = new URLSearchParams(consulta || "");
    if (ruta === "catalogo") h = params.get("filtro") || "todos";
    if (ruta === "producto" && params.get("id")) h = "p-" + params.get("id");
    const esFiltro = h === "todos" || FILTROS.some((f) => f.id === h);
    const idProducto = h.startsWith("p-") ? h.slice(2) : null;
    // Anclas comunes (ej: #contacto) no cambian de vista, solo bajan
    if (h && h !== "inicio" && !esFiltro && !idProducto) return;

    const vista = esFiltro ? "catalogo" : idProducto ? "producto" : "inicio";
    const enPortada = vista === "inicio";

    $("#vista-portada").hidden = !enPortada;
    $("#vista-tienda").hidden = enPortada;
    document.body.classList.toggle("portada-body", enPortada);
    $("[data-vista-catalogo]").hidden = vista !== "catalogo";
    $("[data-vista-producto]").hidden = vista !== "producto";

    $("[data-panel]").classList.remove("abierto");
    $("[data-velo]").classList.remove("visible");
    $("[data-menu]")?.classList.remove("abierto");

    if (enPortada) document.title = `${CONFIG.nombre} · Perfumes`;
    if (vista === "catalogo") mostrarCatalogo(h);
    if (vista === "producto") mostrarProducto(idProducto);
    window.scrollTo(0, 0);
  }

  montarPortada();
  montarComun();
  montarCatalogo();
  window.addEventListener("hashchange", enrutar);
  enrutar();
})();
