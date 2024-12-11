// Load environment variables from the .env file
require("dotenv").config(); 


const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  ssl: { rejectUnauthorized: false }, // Required for Neon.tech
});

function getCategoryNameById(categoryId) {
  return pool
    .query("SELECT name FROM categories WHERE id = $1", [categoryId])
    .then((res) => res.rows[0]?.name || "Unknown")
    .catch(() => "Unknown");
}

module.exports = {
  // Initialize function (no longer necessary, as we are directly querying the database)
  initialize: function () {
    return Promise.resolve(); // Initialization is no longer needed for a database connection
  },

  // Fetch all published articles
  getPublishedArticles: function () {
    return pool
      .query("SELECT * FROM articles WHERE published = TRUE")
      .then(async (res) => {
        const articles = res.rows;
        for (let article of articles) {
          article.categoryName = await getCategoryNameById(article.category);
          article.postDate = new Date(article.postDate).toLocaleDateString(); // Format postDate
        }
        return articles.length > 0
          ? articles
          : Promise.reject("No published articles found.");
      })
      .catch((err) => Promise.reject(err));
  },

  // Get all categories
  getCategories: function () {
    return pool
      .query("SELECT * FROM categories")
      .then((res) =>
        res.rows.length > 0 ? res.rows : Promise.reject("No categories found.")
      )
      .catch((err) => Promise.reject(err));
  },

  // Add a new article
  addArticle: function (articleData) {
    return new Promise((resolve, reject) => {
      articleData.published = articleData.published ? true : false;
      articleData.postDate = articleData.postDate || new Date().toISOString(); // Use current date if not provided

      // Remove the 'id' field if present, since it will be handled by the database
      delete articleData.id;

      const query = `
        INSERT INTO articles (title, content, category, featureImage, published, postDate)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
        `;

      const values = [
        articleData.title,
        articleData.content,
        articleData.category,
        articleData.featureImage,
        articleData.published,
        articleData.postDate,
      ];

      pool
        .query(query, values)
        .then((result) => {
          const newArticle = result.rows[0]; // The newly inserted article
          resolve(newArticle);
        })
        .catch((err) => {
          console.error("Error adding article:", err);
          reject(err);
        });
    });
  },

  // Get posts by category
  getPostsByCategory: function (category) {
    return pool
      .query("SELECT * FROM articles WHERE category = $1", [category])
      .then(async (res) => {
        const posts = res.rows;
        for (let post of posts) {
          post.categoryName = await getCategoryNameById(post.category);
        }
        return posts.length > 0 ? posts : Promise.reject("No results returned");
      })
      .catch((err) => Promise.reject(err));
  },

  // Get a post by its ID
  getPostById: function (id) {
    return pool
      .query("SELECT * FROM articles WHERE id = $1", [id])
      .then(async (res) => {
        const post = res.rows[0];
        if (post) {
          post.categoryName = await getCategoryNameById(post.category);
          return post;
        } else {
          return Promise.reject("No result returned");
        }
      })
      .catch((err) => Promise.reject(err));
  },

  // Additional methods for updating and deleting articles

  // Update an article by ID
  updateArticle: function (id, articleData) {
    const { title, content, category, featureImage, published } = articleData;
    const query = `
    UPDATE articles
    SET title = $1, content = $2, category = $3, featureImage = $4, published = $5
    WHERE id = $6
    RETURNING id, title, content, category, featureImage, published
  `;
    return pool
      .query(query, [title, content, category, featureImage, published, id])
      .then((res) => res.rows[0])
      .catch((err) => Promise.reject(err));
  },

  // Delete an article by ID
  deleteArticle: function (id) {
    const query = "DELETE FROM articles WHERE id = $1 RETURNING id";
    return pool
      .query(query, [id])
      .then((res) =>
        res.rows.length > 0 ? res.rows[0] : Promise.reject("Article not found")
      )
      .catch((err) => Promise.reject(err));
  },
};
