import React, {Fragment, Component} from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/layouts/Navbar'
import Users from './components/users/Users'
import User from './components/users/User'
import Search from './components/users/Search'
import Alert from './components/layouts/Alert'
import About from './components/pages/About'
import './App.css';
import axios from 'axios'


class App extends Component {
  state = {
    users:[],
    user:{},
    repos:[],
    loading:false,
    alert:null
  }

  //fetch users from API
  async componentDidMount(){
    this.setState({laoding: true})
    const res = await axios.get(`http://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}andclient_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    this.setState({users: res.data, laoding:false})
  }

  //get users
  searchUsers= async (text) =>{
    this.setState({laoding: true})
    const res = await axios.get(`http://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    this.setState({users: res.data.items, laoding:false})

  }

  //get single user
  getUser= async (username) =>{
    this.setState({laoding: true})

    const res = await axios.get(`http://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

    this.setState({user: res.data, laoding:false})
  }

   //get user Repo
   getUserRepos= async (username) =>{
    this.setState({laoding: true})

    const res = await axios.get(`http://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

    this.setState({repos: res.data, laoding:false})

  }


  //clear users
  clearUsers = ()=>this.setState({users: [],laoding:false})

  //setAlert
  setAlert = (msg, type) =>{
    this.setState({ alert: {msg:msg, type:type} })
    
    setTimeout(() => {this.setState( {alert:null} )}, 5000);
  }


  render() {
    const {users, user, repos, loading} = this.state
    return(
      <Router>
        <div className="App">
          <Navbar title="github finder" icons="fab fa-github" />
          <div className="container">
            <Alert alert={this.state.alert} />
            <Switch>
              <Route exact path="/" 
                render={(props) => {
                  return(
                  <Fragment> 
                    <Search searchUsers={this.searchUsers} 
                      clearUsers={this.clearUsers} 
                      showClear={this.state.users.length>0?true:false} 
                      setAlert={this.setAlert}
                    />
                    <Users loading={loading} users={ users} />
                  </Fragment>
                )}} 
              />
              <Route exact path='/about' component={About} />
              <Route exact path='/user/:login' render={props=>(
                <User 
                  {...props} 
                  getUser={this.getUser} 
                  getUserRepos={this.getUserRepos} 
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
}

export default App;
