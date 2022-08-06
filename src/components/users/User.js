import React, { Component, Fragment } from 'react'
import Spinner from '../layouts/Spinner'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Repos from '../repos/Repos'

class User extends Component{

    componentDidMount(){
        this.props.getUser(this.props.match.params.login)
        this.props.getUserRepos(this.props.match.params.login)
    }

    static propTypes = {
        loading: PropTypes.bool.isRequired,
        user: PropTypes.object.isRequired,
        repos: PropTypes.array.isRequired,
        getUser: PropTypes.func.isRequired,
        getUserRepos: PropTypes.func.isRequired,
    }
    render() {

        const { 
            name,
            avatar_url,
            location,
            bio,
            blog,
            login,
            html_url,
            company,
            followers,
            following,
            public_repos,
            public_gists,
            hireable
        
        } = this.props.user
        const {loading, repos} = this.props
        
        if (loading)  return<Spinner />;
            
        return (
           
        <Fragment>
        <Link to='/' className='btn btn-light' >Back To Search</Link>
       hireable:{" "}
       {hireable? (<i className='fas fa-check text-success' />):(<i className='fas fa-times-circle text-danger' />)
       }

        <div className='card grid-2'>
            <div className='all-center'>
                <img 
                    src={avatar_url} 
                    alt={login} 
                    className='round-img'
                    style={{width:'150px'}}
                
                />
                <h1>{name}</h1>
                <p>Location:{location}</p>
                
            </div>
                
            <div>
                {bio && (
                    <Fragment>
                        <h3>Bio</h3>
                        <p>{bio}</p>
                    </Fragment>
                )}

                <a href={html_url} className="btn btn-dark my-1">Visit Github Profile</a>

                <ul>
            <li>
                {login &&
                    <Fragment>
                        <strong>Username: {login}</strong>
                    </Fragment>
                }
            </li>

            <li>
                {company &&
                    <Fragment>
                        <strong>Company: {company}</strong>
                    </Fragment>
                }
            </li>

            <li>
            {blog &&
                <Fragment>
                    <strong>Blog: {blog}</strong>
                </Fragment>
            }
        </li>
        </ul>
            </div>
        </div>
        <div className='card text-center'>
            <div className='badge badge-primary' >Followers: {followers}</div>
            <div className='badge badge-success' >Following: {following}</div>
            <div className='badge badge-danger' >Public Repos: {public_repos}</div>
            <div className='badge badge-dark' >Public Gists: {public_gists}</div>
        </div>
        <Repos repos={repos} />
    </Fragment>
    )}
}

export default User

