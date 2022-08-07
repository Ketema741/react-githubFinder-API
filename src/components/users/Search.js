import React, { useState, useContext } from 'react';
import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext';

const Search = ()=>{
    const githubContext = useContext(GithubContext)
    const alertContext = useContext(AlertContext)
    const [text, setText] = useState('')

    
    const onSubmitHadler = (e) => {
        e.preventDefault()
        if (text==='') {
            alertContext.setAlert(' please enter something','light')
        } else {
            githubContext.searchUsers(text)
            setText('')
        }
    }
    
    const onChangeHandler = (e) =>setText( e.target.value )
    
        return (
            <div>
                <form onSubmit={onSubmitHadler}>
                    <input type="text" name='text' placeholder='Search for user...' onChange={onChangeHandler} value={text} />
                    <input type="submit" value='Search'  className='btn btn-dark btn-block' />

                </form>
                {githubContext.users.length>0 &&(
                    <button 
                    className='btn btn-light btn-block' 
                    onClick={githubContext.clearUsers}
                    >
                    Clear
                    </button>
                )}
            </div>
        )
}

export default Search;