async function fetchBlogPosts() {
  try {
    const response = await fetch("data/blog-posts.json")
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error("Could not fetch blog posts:", error)
    return []
  }
}

async function populateBlogPosts() {
  const posts = await fetchBlogPosts()
  const blogPostsSection = document.getElementById("blog-posts")

  if (posts.length === 0) {
    blogPostsSection.innerHTML = "<p>Unable to load blog posts at this time. Please try again later.</p>"
    return
  }

  posts.forEach((post) => {
    const postElement = createBlogPostElement(post)
    blogPostsSection.appendChild(postElement)
  })
}

function createBlogPostElement(post) {
  const article = document.createElement("article")
  article.className = "blog-post"

  const title = document.createElement("h2")
  title.textContent = post.title

  const date = document.createElement("p")
  date.className = "post-date"
  date.textContent = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const excerpt = document.createElement("p")
  excerpt.className = "post-excerpt"
  excerpt.textContent = post.excerpt

  const readMore = document.createElement("button")
  readMore.textContent = "Read More"
  readMore.addEventListener("click", () => openBlogPost(post))

  article.appendChild(title)
  article.appendChild(date)
  article.appendChild(excerpt)
  article.appendChild(readMore)

  return article
}

function openBlogPost(post) {
  const modal = document.createElement("div")
  modal.className = "modal blog-post-modal"
  modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>${post.title}</h2>
            <p class="post-date">${new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}</p>
            <div class="post-content">
                ${post.content}
            </div>
        </div>
    `

  document.body.appendChild(modal)

  const closeButton = modal.querySelector(".close")
  closeButton.addEventListener("click", () => {
    document.body.removeChild(modal)
  })

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      document.body.removeChild(modal)
    }
  })
}

document.addEventListener("DOMContentLoaded", populateBlogPosts)