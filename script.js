// Menú móvil
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle")
  const nav = document.querySelector("nav")

  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("active")
  })

  // Cerrar menú al hacer clic en un enlace
  const navLinks = document.querySelectorAll("nav ul li a")
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("active")
    })
  })

  // Cerrar menú al hacer clic fuera
  document.addEventListener("click", (event) => {
    const isClickInsideNav = nav.contains(event.target)
    const isClickOnMenuToggle = menuToggle.contains(event.target)

    if (!isClickInsideNav && !isClickOnMenuToggle && nav.classList.contains("active")) {
      nav.classList.remove("active")
    }
  })

  // Formulario de contacto
  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault()

      // Obtener valores del formulario
      const nombre = document.getElementById("nombre").value
      const email = document.getElementById("email").value
      const mensaje = document.getElementById("mensaje").value

      // Aquí normalmente enviarías los datos a un servidor
      // Como es un sitio estático, solo mostraremos un mensaje
      alert(`Gracias ${nombre} por tu mensaje. Te contactaremos pronto en ${email}.`)

      // Limpiar formulario
      contactForm.reset()
    })
  }

  // Animación de aparición al hacer scroll
  const observerOptions = {
    threshold: 0.1,
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
      }
    })
  }, observerOptions)

  const sections = document.querySelectorAll("section")
  sections.forEach((section) => {
    section.classList.add("fade-in")
    observer.observe(section)
  })

  // Añadir clase para animación
  const style = document.createElement("style")
  style.textContent = `
        .fade-in {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .fade-in.visible {
            opacity: 1;
            transform: translateY(0);
        }
    `
  document.head.appendChild(style)
})

// Inicializar el mapa de Google
let google
function initMap() {
  // Coordenadas de ejemplo (reemplazar con las coordenadas reales)
  const ubicacion = { lat: -34.603722, lng: -58.381592 }

  // Crear mapa
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: ubicacion,
    styles: [
      {
        featureType: "all",
        elementType: "geometry.fill",
        stylers: [
          {
            weight: "2.00",
          },
        ],
      },
      {
        featureType: "all",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#9c9c9c",
          },
        ],
      },
      {
        featureType: "all",
        elementType: "labels.text",
        stylers: [
          {
            visibility: "on",
          },
        ],
      },
      {
        featureType: "landscape",
        elementType: "all",
        stylers: [
          {
            color: "#f2f2f2",
          },
        ],
      },
      {
        featureType: "landscape",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#e6f3e6",
          },
        ],
      },
      {
        featureType: "poi",
        elementType: "all",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "road",
        elementType: "all",
        stylers: [
          {
            saturation: -100,
          },
          {
            lightness: 45,
          },
        ],
      },
      {
        featureType: "road",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#c8e6c8",
          },
        ],
      },
      {
        featureType: "road.highway",
        elementType: "all",
        stylers: [
          {
            visibility: "simplified",
          },
        ],
      },
      {
        featureType: "road.arterial",
        elementType: "labels.icon",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "transit",
        elementType: "all",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "water",
        elementType: "all",
        stylers: [
          {
            color: "#c8e6c8",
          },
          {
            visibility: "on",
          },
        ],
      },
    ],
  })

  // Añadir marcador
  const marker = new google.maps.Marker({
    position: ubicacion,
    map: map,
    title: "EcoLimpio",
    animation: google.maps.Animation.DROP,
  })

  // Añadir ventana de información
  const infoWindow = new google.maps.InfoWindow({
    content: `
            <div style="text-align: center; padding: 10px;">
                <h3 style="color: #4CAF50; margin-bottom: 5px;">EcoLimpio</h3>
                <p style="margin: 0;">Av. Principal 123, Ciudad</p>
            </div>
        `,
  })

  marker.addListener("click", () => {
    infoWindow.open(map, marker)
  })
}
