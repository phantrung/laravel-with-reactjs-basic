import React,{useState,useEffect} from 'react';
import Http from '../Http'
import {Link} from "react-router-dom";
import Posts from "../Page/Posts";
const Page = (props) => {
    const [userName,setUserName] = useState('')
    const [isLoggedIn,setIsLoggedIn] = useState(false)

    useEffect(() => {
        console.log(`===========> localStorage`,localStorage)
        if(localStorage['access_token']){
            // getProfile()
            setIsLoggedIn(true)
        }
    },[])

    const getProfile = () => {
        Http.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage['access_token'];
        Http.get('api/user').then((response) => {
            if (response.data.name) {
                setUserName(response.data.name)
                setIsLoggedIn(true)
            }
        }).catch((error) => {
            console.log(error.response.status)
        })
    }

    const user = () => {
        return (
            <>
                <Posts/>
            </>
        )
    }

    const guest = () => {
        return (
            <h2>Please <span><Link to='/login'>Login</Link></span></h2>
        )
    }

    return (
        isLoggedIn ? user() : guest()
    )
}

export default Page;
