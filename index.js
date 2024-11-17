const express = require("express");
const path = require("path");
const app = express();
const port = 4000;
const contentService = require("./content-service");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

// app.use((req, res, next) => {
//   res.setHeader(
//     "Content-Security-Policy",
//     "script-src 'self' https://code.jquery.com 'unsafe-inline'"
//   );
//   next();
// });

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Initialize content service
contentService
  .initialize()
  .then(() => {
    console.log("Content service initialized");

    // Serve 'about.html' from the root and '/about' routes
    app.get(["/", "/about"], (req, res) => {
      res.sendFile(path.join(__dirname, "views", "about.html"));
    });

    // Serve 'home.html' from the '/home' route
    app.get("/home", (req, res) => {
      res.sendFile(path.join(__dirname, "views", "home.html"));
    });

    // Route for fetching published articles
    app.get("/articles", (req, res) => {
      contentService
        .getPublishedArticles()
        .then((articles) => {
          res.json(articles);
        })
        .catch((err) => {
          console.error("Error fetching published articles:", err);
          res
            .status(500)
            .json({ message: "Internal Server Error", error: err.message });
        });
    });

    // Route for fetching categories
    app.get("/categories", (req, res) => {
      contentService
        .getCategories()
        .then((categories) => {
          res.json(categories);
        })
        .catch((err) => {
          console.error("Error fetching categories:", err);
          res
            .status(500)
            .json({ message: "Internal Server Error", error: err.message });
        });
    });

    // Route to display the add post page
    app.get("/articles/add", (req, res) => {
      res.sendFile(path.join(__dirname, "views", "addArticle.html"));
    });

    // Cloudinary configuration (replace with your credentials)
    cloudinary.config({
      cloud_name: "dny2cdn7q",
      api_key: "311323868169261",
      api_secret: "BuxD9Som5NIgPYJwBsrk1AHPyZ8",
      secure: true,
    });

    const upload = multer(); // No disk storage, image data will be uploaded directly to Cloudinary

    // Route to handle adding new post
    app.post("/posts/add", upload.single("featureImage"), (req, res) => {
      let processPost = (imageUrl) => {
        req.body.featureImage = imageUrl;

        contentService
          .addPost(req.body) // Add post using contentService
          .then((newPost) => {
            console.log("New post added:", newPost);
            res.redirect("/posts"); // Redirect after adding post
          })
          .catch((err) => {
            console.error("Error adding post:", err);
            res
              .status(500)
              .json({ message: "Failed to add post", error: err.message });
          });
      };

      if (req.file) {
        let streamUpload = (req) => {
          return new Promise((resolve, reject) => {
            let stream = cloudinary.uploader.upload_stream((error, result) => {
              if (result) {
                resolve(result);
              } else {
                reject(error);
              }
            });
            streamifier.createReadStream(req.file.buffer).pipe(stream);
          });
        };

        streamUpload(req)
          .then((uploaded) => {
            processPost(uploaded.url);
          })
          .catch((error) => {
            console.error("Image upload error:", error);
            processPost(""); // Process post without image if upload fails
          });
      } else {
        processPost(""); // No image provided
      }
    });

    // Route to get all posts or filter by category or minDate
    app.get("/posts", (req, res) => {
      let { category, minDate } = req.query;

      if (category) {
        contentService
          .getPostsByCategory(category)
          .then((posts) => res.json(posts))
          .catch((err) => res.status(400).json({ message: err.message }));
      } else if (minDate) {
        contentService
          .getPostsByMinDate(minDate)
          .then((posts) => res.json(posts))
          .catch((err) => res.status(400).json({ message: err.message }));
      } else {
        contentService
          .getPosts()
          .then((posts) => res.json(posts))
          .catch((err) => res.status(400).json({ message: err.message }));
      }
    });

    // Route to get a post by ID
    app.get("/post/:id", (req, res) => {
      contentService
        .getPostById(req.params.id)
        .then((post) => res.json(post))
        .catch((err) => res.status(404).json({ message: err.message }));
    });

    // Handler for favicon requests
    app.get("/favicon.ico", (req, res) => {
      res.status(204).end();
    });

    // Start the server
    app.listen(port, () => {
      console.log(`Express http server listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to initialize content service:", err.message);
  });

// Export the app for Vercel to handle as a serverless function if needed
module.exports = app;
