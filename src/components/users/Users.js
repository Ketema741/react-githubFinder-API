import React from 'react'
import UserItem from './UserItem'
import Spinner from '../layouts/Spinner'

const Users =({loading, users})=> {
    if (loading){
        return ( <Spinner />)
    }
     else {
        return(
          <div style={userStyle}>
                {users.map(user=>(
                    <UserItem key={user.id} user={user} />
                ))}
            </div>
        )
     }
}
const userStyle = {
    display:'grid',
    gridTemplateColumns:'repeat(3, 1fr)',
    gridGap:'10px'
}
export default Users;