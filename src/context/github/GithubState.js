import React, { useReducer } from 'react'
import axios from 'axios'
import GithubContext from './githubContext'
import GithubReducer from './githubReducer'

import {
    SEARCH_USERS,
    GET_USER,
    SET_LOADING,
    GET_REPOS,
    CLEAR_USERS
} from '../types'

let githubClinetId;
let githubClinetSecret;

if(process.env.NODE_ENV !== 'production'){
    githubClinetId = process.env.REACT_APP_GITHUB_CLIST_ID;
    githubClinetSecret = process.env.REACT_APP_GITHUB_CLIST_SECRET;

}else {
    githubClinetId = process.env.GITHUB_CLIST_ID;
    githubClinetSecret = process.env.REACT_APP_GITHUB_CLIST_SECRET;

}
const GithubState = props => {
    const initialState = {
        users:[],
        user:{},
        repos:[],
        loading:false,
    }
    const [state, dispatch] = useReducer(GithubReducer, initialState)

    //search users
    const searchUsers= async (text) => {
        setLoading();
    
        const res = await axios.get(`http://api.github.com/search/users?q=${text}&client_id=${githubClinetId}&client_secret=${githubClinetSecret}`);
    
       dispatch({
        type:SEARCH_USERS,
        payload:res.data.items
       });
    
      };

    
    //get single user
    const getUser= async (username) =>{
        setLoading()

        const res = await axios.get(`http://api.github.com/users/${username}?client_id=${githubClinetId}&client_secret=${githubClinetSecret}`)

        dispatch({
            type:GET_USER, 
            payload:res.data
        })

    }


    //Clear Users
    const clearUsers = ()=>dispatch({type:CLEAR_USERS});

    // Set Loading

    const setLoading = () => dispatch({type:SET_LOADING})

    //get user Repo
   const getUserRepos= async (username) =>{
    setLoading()

    const res = await axios.get(`http://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubClinetId}&client_secret=${githubClinetSecret}`)

    
    dispatch({
        type:GET_REPOS, 
        payload:res.data
    })

  }

    return <GithubContext.Provider
        value={{
            users:state.users,
            user:state.user,
            repos:state.repos,
            loading:state.loading,
            searchUsers,
            clearUsers,
            getUser,
            getUserRepos,
        }}
    >

    { props.children }
    </GithubContext.Provider>
}

export default GithubState;