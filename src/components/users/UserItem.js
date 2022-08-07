import React from 'react'
import { Link } from 'react-router-dom'
import propTypes from 'prop-types'
const UserItem =(props) =>{
   const { login,avatar_url } =props.user
    UserItem.propTypes = {
        user:propTypes.object.isRequired,

    }
    return(
            <div className='card text-center'>
                <img src={avatar_url} alt={login} className='round-img' style={{width:'60px'}} />
                <h3>{login}</h3>
                <Link to={`user/${login}`} className="btn btn-dark btn-sm my-1"> 
                    more
                </Link>
            </div>
        )
    
}
export default UserItem; 