const header = document.getElementById("header");
const nav = document.getElementById("nav");
const navToggle = document.getElementById("nav-toggle");
const navLinks = nav.querySelectorAll("a");

// Menú móvil: abrir / cerrar
function cerrarMenu(){
    nav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Abrir menú");
    navToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
}

navToggle.addEventListener("click", function(){
    const abierto = nav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", abierto);
    navToggle.setAttribute("aria-label", abierto ? "Cerrar menú" : "Abrir menú");
    navToggle.innerHTML = abierto ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
});

// Cierro el menú al elegir una opción o pulsar Escape
navLinks.forEach(function(link){
    link.addEventListener("click", cerrarMenu);
});
document.addEventListener("keydown", function(e){
    if(e.key === "Escape") cerrarMenu();
});

// Fondo de la cabecera y enlace activo del menú según la sección visible
const secciones = document.querySelectorAll("main section[id]");
function actualizarScroll(){
    header.classList.toggle("scrolled", window.scrollY > 10);

    const referencia = window.innerHeight * 0.4;
    let actual = "";
    secciones.forEach(function(s){
        if(s.getBoundingClientRect().top <= referencia) actual = s.id;
    });
    navLinks.forEach(function(link){
        link.classList.toggle("active", link.getAttribute("href") === "#" + actual);
    });
}
window.addEventListener("scroll", actualizarScroll, { passive: true });
actualizarScroll();

// Animación de entrada de los bloques
const observadorReveal = new IntersectionObserver(function(entradas){
    entradas.forEach(function(entrada){
        if(entrada.isIntersecting){
            entrada.target.classList.add("visible");
            observadorReveal.unobserve(entrada.target);
        }
    });
}, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
document.querySelectorAll(".reveal").forEach(function(el){
    observadorReveal.observe(el);
});

// Filtro de proyectos
const filtros = document.querySelectorAll(".filter");
const proyectos = document.querySelectorAll(".project");
filtros.forEach(function(boton){
    boton.addEventListener("click", function(){
        const categoria = boton.dataset.filter;
        filtros.forEach(function(b){
            b.classList.toggle("is-active", b === boton);
            b.setAttribute("aria-pressed", b === boton);
        });
        proyectos.forEach(function(p){
            const mostrar = categoria === "todos" || p.dataset.cat === categoria;
            p.classList.toggle("is-hidden", !mostrar);
            if(mostrar) p.classList.add("visible");
        });
    });
});

// Año actual en el pie
document.getElementById("year").textContent = new Date().getFullYear();
