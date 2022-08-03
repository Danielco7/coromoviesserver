import React, { useEffect, useState } from 'react';
import Subs from './subs';
import Logo from '../../imgs/display_movie.svg'
const urlsubs = "https://coromovies.herokuapp.com/api/Subs"
const urlmembers = "https://coromovies.herokuapp.com/api/Members"
const urlimgs = "https://image.tmdb.org/t/p/w500"


function ShowMovie(props) {
    const [Checksubs, setChecksubs] = useState(false)

    useEffect(() => {
        setChecksubs(false)
        return function cleanUp(){
        }
    }, [])


 const showsubs= () =>{setChecksubs(!Checksubs)}

 const ShowMember=async(e)=>  props.displaymember(e)

 const Cancel=async(e)=>  props.cancel(e)


    return <div className='EditMovie' id='movieshowercont' >
        <div className='undo' onClick={Cancel}><svg width="40" height="40" viewBox="0 0 67 67" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M58.625 30.7083H17.9057L32.682 15.932L28.7346 11.9846L7.21924 33.5L28.7346 55.0154L32.682 51.068L17.9057 36.2917H58.625V30.7083Z" fill="white"/>
</svg></div>
     <img id='display_svg' className='svg_add_movie' src={Logo}/>

    <div className='edit_img_cont' id='movieshowercont_img'><img  className='edit_img' src={urlimgs+props.movie.image}/></div>
    <div className='movie_edit_info'>
    <h3>{props.movie.name}</h3>{props.movie.premired.split('T')[0]}<br></br>
    <h3>{props.movie.genres}</h3>
   <h3 onClick={showsubs} className='subbutgtton'>Subscriptions:</h3> 
    {props.user.admin?<div className='subslist'><Subs user={props.user} movie={props.movie} membertoshow={ShowMember}/></div>:props.subs==="View Subscriptions"?<div className='subslist'><Subs user={props.user} movie={props.movie}/></div>:null}
    </div>
    </div>
}
export default ShowMovie
