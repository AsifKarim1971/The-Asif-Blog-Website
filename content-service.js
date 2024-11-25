const fs = require("fs");
const path = require("path");

let articles = [];
let categories = [];
let posts = []; // Add posts array

function addPost(postData) {
  const newPost = { id: posts.length + 1, ...postData }; // Assign a new ID
  posts.push(newPost);
  return Promise.resolve(newPost); // Return a promise for async handling
}

function getPosts() {
  return Promise.resolve(posts);
}

module.exports = { addPost, getPosts };

const articlesPath = path.resolve(__dirname, "./data/articles.json");
const categoriesPath = path.resolve(__dirname, "./data/categories.json");

module.exports = {
  initialize: function () {
    return new Promise((resolve, reject) => {
      fs.readFile(articlesPath, "utf8", (err, data) => {
        if (err) {
          console.error("Error reading articles file:", err);
          reject(err);
          return;
        }
        articles = JSON.parse(data);
        fs.readFile(categoriesPath, "utf8", (err, data) => {
          if (err) {
            console.error("Error reading categories file:", err);
            reject(err);
            return;
          }
          categories = JSON.parse(data);
          resolve();
        });
      });
    });
  },
  getPublishedArticles: function () {
    return new Promise((resolve, reject) => {
      const publishedArticles = articles.filter(
        (article) => article.published === true
      );
      publishedArticles.length > 0
        ? resolve(publishedArticles)
        : reject(new Error("No published articles found."));
    });
  },
  getCategories: function () {
    return new Promise((resolve, reject) => {
      categories.length > 0
        ? resolve(categories)
        : reject(new Error("No categories found."));
    });
  },
  addPost: function (postData) {
    return new Promise((resolve, reject) => {
      // Default the 'published' field to false if it’s undefined
      postData.published = postData.published ? true : false;

      // Assign a unique id to the post (increment based on length of posts)
      postData.id = articles.length + 1;

      // Add the new post to the `articles` array (assuming `articles` is your posts array)
      articles.push(postData);

      // Resolve with the newly added post
      resolve(postData);
    });
  },
  getPosts: function () {
    // Add a method to get all posts
    return new Promise((resolve) => {
      resolve(posts);
    });
  },
  getPostsByCategory: function (category) {
    return new Promise((resolve, reject) => {
      const filteredPosts = posts.filter((post) => post.category == category);
      filteredPosts.length > 0
        ? resolve(filteredPosts)
        : reject(new Error("No results returned"));
    });
  },
  getPostsByMinDate: function (minDateStr) {
    return new Promise((resolve, reject) => {
      const filteredPosts = posts.filter(
        (post) => new Date(post.postDate) >= new Date(minDateStr)
      );
      filteredPosts.length > 0
        ? resolve(filteredPosts)
        : reject(new Error("No results returned"));
    });
  },
  getPostById: function (id) {
    return new Promise((resolve, reject) => {
      const post = posts.find((post) => post.id == id);
      post ? resolve(post) : reject(new Error("No result returned"));
    });
  },
};