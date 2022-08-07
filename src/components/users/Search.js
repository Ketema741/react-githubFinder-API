import React, { useState } from 'react';
import propTypes from 'prop-types'

const Search = ({showClear,searchUsers, clearUsers, setAlert})=>{
    const [text, setText] = useState('')

    
    const onSubmitHadler = (e) => {
        e.preventDefault()
        if (text==='') {
            setAlert(' please enter something','light')
        } else {
            searchUsers(text)
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
                {showClear&&(
                    <button 
                    className='btn btn-light btn-block' 
                    onClick={clearUsers}
                    >
                    Clear
                    </button>
                )}
            </div>
        )
}
Search.propTypes = {
    searchUsers:propTypes.func.isRequired,
    clearUSers:propTypes.func.isRequired,
    showCLear:propTypes.bool.isRequired,
    setAlert:propTypes.func.isRequired,
}
export default Search;