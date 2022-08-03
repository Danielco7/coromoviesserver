import React, { useEffect, useState,useRef } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect,Link,} from "react-router-dom";
import { getAll,updateObj,addObj,deleteObj} from '../utils';
import '../css/loginpage.css';
import MovieJson from '../api/movies';
import MemberJson from '../api/members';
import WorkersJson from '../api/workers';
import Logo from '../imgs/love_info.svg'

const urlmovie = "https://coromovies.herokuapp.com/api/Movies"
const urlmembers = "https://coromovies.herokuapp.com/api/Members"
const url = "https://coromovies.herokuapp.com/api/Users"

function Logging({ history}) {
    const [User, setUser] = useState({ Username: "", Password: "" })
    const [user, setsignupUser] = useState({ username: "", password: "" })
    const [Username, setUsername] = useState('')
    const [Username2, setUsername2] = useState('')
    const [UsernameErr, setUsernameErr] = useState('')
    const [Password, setPassword] = useState('')
    const [Password2, setPassword2] = useState('')
    const [PasswordErr, setPasswordErr] = useState('')
    const [value, setvalue] = useState('')
    const [formContainer , setformContainer] = useState('0%')
    const [loginForm , setloginForm] = useState('0%')
    const [registerFrom , setregisterFrom] = useState('50%')

    const Login =async(form)=>{
        let UsernameError = "";
        let PasswordError = "";
        if (form == 'register') {
            
            if (!Username) {
                UsernameError = "Username field is required";
            }
            if (!Password ) {
                PasswordError = "Password field is required ";
            }
        }else{
            if (!Username2) {
                UsernameError = "Username field is required";
            }
            if (!Password2) {
                PasswordError = "Password field is required ";
            }
            
        }
        if ( PasswordError || UsernameError) {
            setUsernameErr(UsernameError)
            setPasswordErr(PasswordError)
         return false
        }if (form == 'register') {

        const { data } = await getAll(url)
        const found = data.find(function (element) {
            return element.username === User.Username&&element.password===User.Password;
        });

        if (found==undefined) alert("the Username you try to reach doesnot exists in our system please try another")
        else Signin()
    }else{
        Changepassword()
    }

    }
    const Signin= async()=> {
        const loader=document.getElementById('loadingscreen')
        loader.style.opacity='1'
        loader.style.zIndex='2'
        
        const remove=async()=> {
        const { data:data1 } = await getAll(urlmovie)
        if (data1.length>0) {
        for (let i = 0; i < data1.length; i++) {
            const element = data1[i];
            const { data:data11 } = await deleteObj(urlmovie,element._id)
        }
       }
    
       const { data:data2 } = await getAll(urlmembers)
        if (data2.length>0) {
            for (let i = 0; i < data2.length; i++) {
                const element = data2[i];
                const { data:data22 } = await deleteObj(urlmembers,element._id)
            }
        }
        
        const { data:data3 } = await getAll(url)
         if (data3.length>0) {
             for (let i = 0; i < data3.length; i++) {
                 const element = data3[i];
                 const { data:data33 } = await deleteObj(url,element._id)
             }
         }
         }
        const add=async()=>{
        for (let i = 0; i < MovieJson.length; i++) {
            const element = MovieJson[i];
             const { data:data11 } = await addObj(urlmovie,element)
        }
            for (let i = 0; i < MemberJson.length; i++) {
                const element = MemberJson[i];
                 const { data:data22 } = await addObj(urlmembers,element)
            }
            for (let i = 0; i < WorkersJson.length; i++) {
                const element = WorkersJson[i];
                 const { data:data33 } = await addObj(url,element)
            }
    }

        // await remove()
        // await add()
        history.push(`/main/${User.Username}`)
    };
    
    const Changepassword =async()=>{
        
        const { data } = await getAll(url)
        const usertobefound = data.find(function (eachuser) {
            return eachuser.username === user.username;
        });
        if (usertobefound==undefined) {
            alert("the username you try to reach doesnot exists in our system please try another")
        }else{
            if(usertobefound.password==''){
                
                if (user.password.length<6) alert("your password is too short please make sure its over 6 letters");
                else{
                    let NewUser=usertobefound;
                    NewUser.password = user.password;
                    const id=NewUser._id

                    const { data:data2 } = await updateObj(url,id,NewUser)
                        alert('your update has been saved!');
                        if(window.innerWidth > 800){
                            setformContainer(`0%`)
                        }
                        setloginForm(`0%`)
                        setregisterFrom(`50%`)
                        setUsernameErr('')
                        setPasswordErr('')
                        setUser({ Username: "", Password: "" })
                        setsignupUser({ username: "", password: "" })
                        
                }
            }else alert("it seems that the username you try to reach is allready taken by somone else and its not a new user anymore")
        }
    }
    const switchForm = (form) => {
        if(form == 'register'){
            if(window.innerWidth > 800){
                setformContainer(`50%`)
            }
            setloginForm(`-150%`)
            setregisterFrom(`-100%`)
        
        } else{
            if(window.innerWidth > 800){
                setformContainer(`0%`)
            }
            setloginForm(`0%`)
            setregisterFrom(`50%`)
        }
        setUsernameErr('')
        setPasswordErr('')
        setUser({ Username: "", Password: "" })
        setsignupUser({ username: "", password: "" })
    }
    
    const login_guest =async(form)=>{
        history.push(`/main/${'onlineguest'}`)
    }
    
    return <div id='logginbody' className='logginbody'>
        
        <div id='add_movie_continer'></div>
        <div id='parent' className='parent'>
        <sup className='info'>&#9432; </sup> 
        <span className="tooltipcont"><div className="tooltiptext"><img id='info_svg' className='svg_add_movie' src={Logo}/><h1>Hello and wellcome </h1> <h5>This site is a multi function workers inviorment that orgnize movies, members and employes in one place i will be your guid at any time you can simply hover at the info icon as shown.<sup >&#9432;</sup><br></br>
        Here employes can log in to there account if you dont have one you need to ask for a manger of simply log in as a guest.</h5></div></span>
        <div className='sign-in-img'>
        </div>
        <div className='sign-up-img'>
        </div>
        <div className='form-container' style={{left:formContainer}}>
        <div className='form' id='sign-in-form' style={{marginLeft:loginForm}}>
        <h1 className='title'>Sign In</h1>
        <div className='fields'>
        <input placeholder='Username' value={User.Username} onChange={e => {setUser({ ...User, Username: e.target.value })
        setUsername(e.target.value)}} /><br />
        <span className="text-danger">{UsernameErr}</span> <br />

        <input placeholder='Password' type="password" value={User.Password} onChange={e => {setUser({ ...User, Password: e.target.value })
        setPassword(e.target.value)}} /><br />
        <span className="text-danger">{PasswordErr}</span> <br />
        </div>
        <div className='sumbit-container'>
        <button onClick={()=>Login('register')}>Sign in</button><br />
        <p className='link' onClick={()=>switchForm('register')}> new employee? sign up here</p><br />
        <p className="link" onClick={()=>login_guest('login_guest')}>Sign in as a guest</p>
        </div>
        </div>

        <div className='form' id='sign-up-form' style={{marginLeft:registerFrom}}>
        <h1 className='title'>Sign Up</h1>
        <div className='fields'>
        <input placeholder='Username' value={user.username} onChange={e => {setsignupUser({ ...user, username: e.target.value })
        setUsername2(e.target.value)}} /><br />
        <span className="text-danger">{UsernameErr}</span> <br />

        <input placeholder='Password' type="password" value={user.password} onChange={e => {setsignupUser({ ...user, password: e.target.value })
        setPassword2(e.target.value)}} /><br />
        <span className="text-danger">{PasswordErr}</span> <br />
        </div>
        <div className='sumbit-container'>
        <button onClick={()=>Login('login')}>sign up</button><br />
        <p className="link" onClick={()=>switchForm('login')}>already have an account? sign in here</p>
        </div>
        </div>
        </div>
        </div>
        <div className='loadingscreen' id='loadingscreen'>
            <div className='loadingtext'>
                loading...
            </div>
        <div className="loader">
  <span></span>
  <span></span>
  <span></span>
</div>
</div>
    </div>
    ;
}
export default Logging;