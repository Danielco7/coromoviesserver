const Movies = require('../models/moviemodel');

const getAllMovies = () => {
    return new Promise((resolve, reject) => {
        Movies.find({}, (err, movies) => {
            if (err) {
                reject(err)
            } else {
                resolve(movies)
            }
        })
    })
}

const getMovieById = (id) => {
    return new Promise((resolve, reject) => {
        Movies.findById(id, (err, movie) => {
            if (err) {
                reject(err)
            } else {
                resolve(movie)
            }
        })
    })
}

const addMovie = (newMovie) => {
    return new Promise((resolve, reject) => {
        const movie = new Movies(newMovie);

        movie.save((err) => {
            if (err) {
                reject(err)
            } else {
                Movies.find([],(err,movies)=>{
                    if(err){
                        reject(err)
                    }else{

                        resolve(movies);
                    }
                })
            }
        })
    })
}

const updateMovie = (id, MoviesToUpdate) => {
    return new Promise((resolve, reject) => {
        Movies.findByIdAndUpdate(id, MoviesToUpdate, (err) => {
            if (err) {
                reject(err)
            } else Movies.find([],(err,movies)=>{
                if(err){
                    reject(err)
                }else{
                    Movies.find([],(err,movies)=>{
                        if(err){
                            reject(err)
                        }else{
    
                            resolve(movies);
                        }
                    })
                }
            })
        })
    })
}

const deleteMovie = (id) => {
    return new Promise((resolve, reject) => {
        Movies.findByIdAndDelete(id, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve("Deleted successfully");
            }
        })
    })
}




module.exports = {
    getAllMovies,
    getMovieById,
    addMovie,
    updateMovie,
    deleteMovie
}
