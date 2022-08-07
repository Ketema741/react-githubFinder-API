import React, {Fragment, useState,useEffect} from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/layouts/Navbar'
import Users from './components/users/Users'
import User from './components/users/User'
import Search from './components/users/Search'
import Alert from './components/layouts/Alert'
import About from './components/pages/About'
import './App.css';
import axios from 'axios'


const App =()=> {

  const [users, setUsers] = useState([])
  const [user, setUser] = useState({})
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(false)
  const [alert, setAlert]  = useState(null)
  
  //fetch users from API
  

   useEffect( ()=>{
      async function fetchData() {
      setLoading(true)
      const res = await axios.get(`http://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}andclient_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
      setUsers(res.data)
      setLoading(false)
    }
    fetchData();
   
  },[])

  
  //get users
  const searchUsers= async (text) => {

    setLoading(true)

    const res = await axios.get(`http://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

    setUsers(res.data.items)
    setLoading(false)

  }

  //get single user
  const getUser= async (username) =>{
    setLoading(true)

    const res = await axios.get(`http://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

    setUser(res.data)
    setLoading(false)

  }

   //get user Repo
   const getUserRepos= async (username) =>{
    setLoading(true)

    const res = await axios.get(`http://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

    setRepos(res.data)
    setLoading(false)


  }


  //clear users
  const clearUsers = ()=>{
    setUsers([])
    setLoading(false)

  }

  //setAlert
   const sowAlert = (msg, type) =>{
    setAlert({msg:msg, type:type})
    
    setTimeout(() => {setAlert( null )}, 5000);
  }


    return(
      <Router>
        <div className="App">
          <Navbar title="github finder" icons="fab fa-github" />
          <div className="container">
            <Alert alert={alert} />
            <Switch>
              <Route exact path="/" 
                render={(props) => {
                  return(
                  <Fragment> 
                    <Search searchUsers={searchUsers} 
                      clearUsers={clearUsers} 
                      showClear={users.length>0?true:false} 
                      setAlert={sowAlert}
                    />
                    <Users loading={loading} users={ users} />
                  </Fragment>
                )}} 
              />
              
              <Route exact path='/about' component={About} />
              
              <Route exact path='/user/:login' render={props=>(
                <User 
                  {...props} 
                  getUser={getUser} 
                  getUserRepos={getUserRepos} 
                  user={user} 
                  repos={repos} 
                  loading={loading} />
             
              )} />
            </Switch>
           
          </div>
        </div>
      </Router>
  )
};


export default App;
