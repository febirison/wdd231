import { fetchData } from "./utils.js"

// Populate skills
async function populateSkills() {
  try {
    const skills = await fetchData("data/skills.json")
    const skillsList = document.getElementById("skills-list")

    skills.forEach((skill) => {
      const li = document.createElement("li")
      li.textContent = skill
      skillsList.appendChild(li)
    })
  } catch (error) {
    console.error("Error fetching skills:", error)
  }
}

// Populate featured images
async function populateFeaturedImages() {
  try {
    const projects = await fetchData("data/projects.json")
    const imageGrid = document.querySelector("#featured-images .image-grid")

    projects.slice(0, 4).forEach((project) => {
      const imageLink = document.createElement("a")
      imageLink.href = `projects.html#${project.id}`
      imageLink.className = "image-item"

      const img = document.createElement("img")
      img.src = project.image
      img.alt = project.title
      img.loading = "lazy"

      imageLink.appendChild(img)
      imageGrid.appendChild(imageLink)
    })
  } catch (error) {
    console.error("Error fetching projects for images:", error)
  }
}

// Populate featured projects
async function populateFeaturedProjects() {
  try {
    const projects = await fetchData("data/projects.json")
    const projectsGrid = document.getElementById("projects-grid")

    projects.slice(0, 3).forEach((project) => {
      const projectCard = createProjectCard(project)
      projectsGrid.appendChild(projectCard)
    })
  } catch (error) {
    console.error("Error fetching projects:", error)
  }
}

function createProjectCard(project) {
  const card = document.createElement("div")
  card.className = "project-card"

  const title = document.createElement("h3")
  title.textContent = project.title

  const description = document.createElement("p")
  description.textContent = project.description

  const link = document.createElement("a")
  link.href = `projects.html#${project.id}`
  link.textContent = "View Project"
  link.className = "button"

  card.appendChild(title)
  card.appendChild(description)
  card.appendChild(link)

  return card
}

// Initialize home page
function initHomePage() {
  populateSkills()
  populateFeaturedImages()
  populateFeaturedProjects()
}

document.addEventListener("DOMContentLoaded", initHomePage)

