// Navigation menu toggle
const menuToggle = document.getElementById("menu-toggle")
const navLinks = document.getElementById("nav-links")

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show")
})

// Close menu when clicking outside
document.addEventListener("click", (event) => {
  if (!event.target.closest("#main-nav")) {
    navLinks.classList.remove("show")
  }
})

// Lazy loading images
function lazyLoad() {
  const lazyImages = document.querySelectorAll("img[data-src]")
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.removeAttribute("data-src")
        imageObserver.unobserve(img)
      }
    })
  })

  lazyImages.forEach((img) => imageObserver.observe(img))
}

document.addEventListener("DOMContentLoaded", lazyLoad)

