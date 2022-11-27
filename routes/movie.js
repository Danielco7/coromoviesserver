const express = require("express");
const movieBLL = require("../BLL/movieBLL");
const router = express.Router();
const { authtoken } = require("../auth/authToken");

router.get("/", async (req, res) => {
  try {
    const movies = await movieBLL.getAllMovies();
    res.send(movies);
  } catch (error) {
    res.send(error);
  }
});

// Get By Id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const movie = await movieBLL.getMovieById(id);
    res.send(movie);
  } catch (error) {
    res.send(error);
  }
});

router.post("/", authtoken, async (req, res) => {
  try {
    const movie = req.body;
    const result = await movieBLL.addMovie(movie);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

router.put("/:id", authtoken, async (req, res) => {
  try {
    const id = req.params.id;
    const movie = req.body;
    const result = await movieBLL.updateMovie(id, movie);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

router.delete("/:id", authtoken, async (req, res) => {
  try {
    const id = req.params.id;
    const result = await movieBLL.deleteMovie(id);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
