const express = require("express");
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");
const router = express.Router();

router.get("/movies", async (req, res, next) => {
  try {
    const allMovies = await Movie.find();
    res.render("movies/movies", { Movies: allMovies });
  } catch (error) {
    next(error);
  }
});

router.get("/movies/create", async (req, res, next) => {
  const allCelebrities = await Celebrity.find();
  res.render("movies/new-movie", { allCelebrities });
});

router.post("/movies/create", async (req, res, next) => {
  try {
    const { title, genre, plot, cast } = req.body;
    const createdMovie = await Movie.create({
      title,
      genre,
      plot,
      cast,
    });
    console.log("A new Movie was created: ", createdMovie.title);
    console.log(req.body);
    res.redirect("/movies");
  } catch (error) {
    next(error);
  }
});

router.get("/movies/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id).populate("cast");

    console.log(movie);

    res.render("movies/movie-details", movie);
  } catch (error) {
    next(error);
  }
});

router.get("/movies/:id/edit", async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id);
    //     const allCelebs = movie.cast.map(cast => {
    //         return Celebrity.findById(cast._id);
    //     })
    //   const allCelebrities =  await Promise.all(allCelebs)
    const allCelebrities = await Celebrity.find({ _id: movie.cast });
    console.log("aqui", allCelebrities);

    res.render("movies/edit-movie", { movie, allCelebrities });
  } catch (error) {
    next(error);
  }
});

router.post("/movies/:movieId", async (req, res, next) => {
  try {
      const { movieId } = req.params;
      const { title, genre, plot, cast } = req.body;
      console.log('here',req.body)
      const updatedMovie = await Movie.findByIdAndUpdate(movieId, {
          title,
          genre,
          plot,
          cast,
        });
    console.log(updatedMovie)
    res.redirect(`/movies/${updatedMovie._id}`);
} catch (error) {
    next(error);
  }
});

router.post("/movies/:id/delete", async (req, res, next) => {
  try {
    const { id } = req.params;

    await Movie.findByIdAndDelete(id);

    res.redirect("/movies");
  } catch (error) {
    next(error);
  }
});

module.exports = router;