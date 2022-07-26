import React, { useEffect, useState } from 'react';

import Logo from '../../imgs/add_movie.svg';

function AddMovie(props) {
    const [Movie, setMovie] = useState({})
    const [name, setname] = useState('')
    const [nameErr, setnameErr] = useState('')
    const [genres, setgenres] = useState('')
    const [genresErr, setgenresErr] = useState('')
    const [image, setimage] = useState('')
    const [imageErr, setimageErr] = useState('')
    const [premired, setpremired] = useState('')
    const [premiredErr, setpremiredErr] = useState('')


const Check_And_Send =async()=> {
        let nameError = "";
        let genresError = "";
        let imageError = "";
        let premiredError = "";
        if (!name) {
            nameError = "Name field is required";
        }
        if (!genres ) {
            genresError = "Genres field is required ";
        }
        if (!image) {
            imageError = "Image field is required";
        }
        if (!premired) {
            premiredError = "Premired field is required";
        }
        if (nameError || genresError || imageError || premiredError) {
            setnameErr(nameError)
            setgenresErr(genresError)
            setimageErr(imageError)
            setpremiredErr(premiredError)
         return false
        } props.add(Movie)
      }

      const Cancel=async()=>  props.cancel()

    return <div className='AddMovie' >
       <img className='svg_add_movie' src={Logo}/>
      <h1> New Movie: </h1>
      <div className='AddMovieInput_cont'>
       <div className='add_info_headers'>Name: </div><input className='AddMovieInput'  onChange={e => {setMovie({ ...Movie, name: e.target.value })
        setname(e.target.value)}} /><br></br> </div>
        <span className="text-danger">{nameErr}</span> <br></br>

        <div className='AddMovieInput_cont'>       
        <div className='add_info_headers'>Genres: </div><input className='AddMovieInput'  onChange={e => {setMovie({ ...Movie, genres: e.target.value })
        setgenres(e.target.value)}}/><br></br></div>
        <span className="text-danger">{genresErr}</span><br></br>

        <div className='AddMovieInput_cont'>
        <div className='add_info_headers'>Image url: </div> <input className='AddMovieInput'  onChange={e => {setMovie({ ...Movie, image: e.target.value })
        setimage(e.target.value)}}/><br></br></div>
        <span className="text-danger">{imageErr}</span><br></br>

        <div className='AddMovieInput_cont'>
        <div className='add_info_headers'>Premired: </div><input className='AddMovieInput' type={"date"} onChange={e => {setMovie({ ...Movie, premired: e.target.value })
        setpremired(e.target.value)}}/><br></br></div>
        <span className="text-danger">{premiredErr}</span><br></br>
        <div className='AddMoviecontainer'>
        <button className='AddMovieButtons' onClick={Check_And_Send}>Add</button>
        <button className='AddMovieButtons' onClick={Cancel}>cancel</button>
        </div>

    </div>
}
export default AddMovie
