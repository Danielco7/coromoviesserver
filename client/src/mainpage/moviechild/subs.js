import React, { useEffect, useState } from 'react';
import { getAll,addObj,getById} from '../../utils';
const urlsubs = "https://coromovies.herokuapp.com/api/Subs"
const urlmembers = "https://coromovies.herokuapp.com/api/Members"

function Subs(props) {
    const [allsubs, setsubs] = useState([])

    useEffect(() => {
        const getsubs=async()=> {
            setsubs([])
            const { data } = await getAll(urlsubs)
            const filtered =data.filter(meb => meb.movies.some(elm => elm.movieId === props.movie._id))
            const allsubstomovie=[]
            for (let i = 0; i < filtered.length; i++) {
                const element = filtered[i];
                const array=element.movies.find(function (elem) {
                    return elem.movieId === props.movie._id;
                })
                const { data } = await getById(urlmembers,element.memberId)
                    const obj ={
                        date:array.date,
                        member:data.name             
                    }; 
                    allsubstomovie.push(obj)
                    console.log(allsubs);
            }; 
            setsubs(allsubstomovie)
        }
         getsubs()
     }, [])
     
     const showmovie=async(e)=> props.membertoshow(e.target.innerHTML);

    return <div >
        <ul>{allsubs.length>0?allsubs.map((user, index) => {
                return <li key={index}>
                    <span className={"spam"} onClick={showmovie}>{user.member}</span> - {user.date}
                </li>
            }):<div>no Subscriptions</div>}
        </ul>

</div>

}
export default Subs


