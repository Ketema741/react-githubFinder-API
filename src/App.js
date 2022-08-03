import React, {Component} from 'react'
import Navbar from './components/layouts/Navbar'
import Users from './components/users/Users'
import Search from './components/users/Search'
import './App.css';
import axios from 'axios'
class App extends Component {
  state = {
    users:[],
    loading:false
  }
  async componentDidMount(){
    this.setState({laoding: true})

    const res = await axios.get(`http://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}andclient_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    
      this.setState({users: res.data, laoding:false})
  }
  searchUSer= (text) =>{
    console.log(text)

  }
  render() {
    return(
      <div className="App">
        <Navbar title="github finder" icons="fab fa-github" />
        <div className="container">
          <Search searchUSer={this.searchUSer} />
          <Users loading={this.state.loading} users={ this.state.users} />
        </div>
      </div>
  )
};
}

export default App;
