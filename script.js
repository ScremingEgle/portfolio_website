const artGrid = document.getElementById("art-grid")
const lightbox = document.getElementById("lightbox")
const lightboxImage = document.getElementById("lightboxImage")
const prev = document.getElementById("prev")
const next = document.getElementById("next")
const closeBtn = document.getElementById("close")
const toggle = document.getElementById("themeToggle")
const body = document.body
const tabs = document.querySelectorAll(".tab")

let images = []
let currentIndex = 0
let currentFolder = "art"

function clearGrid() {
  artGrid.innerHTML = ""
  images = []
}

function loadPortfolio(folder) {
  clearGrid()
  currentFolder = folder
  let index = 1

  function loadImage() {
    const probe = new Image()
    const name = folder === "art" ? "drawing" : "design"
    const src = `${folder}/${name}_${index}.png`

    probe.onload = () => {
      const realSrc = `${src}?v=${index}`
      const thisIndex = images.length
      images.push(realSrc)

      const container = document.createElement("div")
      container.className = "art-item"

      const img = document.createElement("img")
      img.src = realSrc

      container.appendChild(img)
      container.onclick = () => openLightbox(thisIndex)

      artGrid.appendChild(container)
      index++
      loadImage()
    }

    probe.onerror = () => {}
    probe.src = src
  }

  loadImage()
}

function openLightbox(i) {
  currentIndex = i
  lightboxImage.src = images[currentIndex]
  lightbox.style.display = "flex"
}

prev.onclick = () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length
  lightboxImage.src = images[currentIndex]
}

next.onclick = () => {
  currentIndex = (currentIndex + 1) % images.length
  lightboxImage.src = images[currentIndex]
}

closeBtn.onclick = () => {
  lightbox.style.display = "none"
}

toggle.onclick = () => {
  body.dataset.theme = body.dataset.theme === "light" ? "dark" : "light"
}

tabs.forEach(tab => {
  tab.onclick = () => {
    tabs.forEach(t => t.classList.remove("active"))
    tab.classList.add("active")
    loadPortfolio(tab.dataset.type)
  }
})

loadPortfolio("art")
