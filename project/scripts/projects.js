import { fetchData } from "./utils.js"

let allProjects = []

// Populate projects
async function populateProjects() {
  try {
    allProjects = await fetchData("data/projects.json")
    displayProjects(allProjects)
  } catch (error) {
    console.error("Error fetching projects:", error)
  }
}

function displayProjects(projects) {
  const projectsGrid = document.getElementById("projects-grid")
  projectsGrid.innerHTML = ""

  projects.forEach((project) => {
    const projectCard = createProjectCard(project)
    projectsGrid.appendChild(projectCard)
  })
}

function createProjectCard(project) {
  const card = document.createElement("div")
  card.className = "project-card"
  card.dataset.category = project.category

  const img = document.createElement("img")
  img.src = project.image
  img.alt = project.title
  img.loading = "lazy"

  const title = document.createElement("h3")
  title.textContent = project.title

  const description = document.createElement("p")
  description.textContent = project.description

  const link = document.createElement("a")
  link.href = project.link
  link.textContent = "View Project"
  link.className = "button"
  link.target = "_blank"
  link.rel = "noopener noreferrer"

  card.appendChild(img)
  card.appendChild(title)
  card.appendChild(description)
  card.appendChild(link)

  return card
}

// Filter projects
function setupProjectFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn")
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter
      filterProjects(filter)
      updateActiveFilter(button)
    })
  })
}

function filterProjects(filter) {
  const filteredProjects = filter === "all" ? allProjects : allProjects.filter((project) => project.category === filter)
  displayProjects(filteredProjects)
}

function updateActiveFilter(activeButton) {
  document.querySelectorAll(".filter-btn").forEach((button) => {
    button.classList.remove("active")
  })
  activeButton.classList.add("active")
}

// Initialize projects page
function initProjectsPage() {
  populateProjects()
  setupProjectFilters()
}

document.addEventListener("DOMContentLoaded", initProjectsPage)


