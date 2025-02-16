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

  const img = document.createElement("img")
  img.dataset.src = project.image
  img.alt = project.title
  img.loading = "lazy"

  const title = document.createElement("h3")
  title.textContent = project.title

  const description = document.createElement("p")
  description.textContent = project.description

  card.appendChild(img)
  card.appendChild(title)
  card.appendChild(description)

  return card
}

// Initialize home page
function initHomePage() {
  populateSkills()
  populateFeaturedProjects()
}

document.addEventListener("DOMContentLoaded", initHomePage)


