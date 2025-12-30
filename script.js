const artGrid = document.getElementById("art-grid")
const lightbox = document.getElementById("lightbox")
const lightboxImage = document.getElementById("lightboxImage")
const prev = document.getElementById("prev")
const next = document.getElementById("next")
const closeBtn = document.getElementById("close")
const toggle = document.getElementById("themeToggle")
const body = document.body

let images = []
let currentIndex = 0
let index = 1

function loadImage() {
  const src = `art/drawing_${index}.png`
  const img = new Image()
  img.src = src

  img.onload = () => {
    const thisIndex = images.length
    images.push(src)

    const container = document.createElement("div")
    container.className = "art-item"

    const displayImg = document.createElement("img")
    displayImg.src = src

    container.appendChild(displayImg)
    container.onclick = () => openLightbox(thisIndex)

    artGrid.appendChild(container)
    index++
    loadImage()
  }
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

loadImage()
