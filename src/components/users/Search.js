import React, { Component } from 'react';
import propTypes from 'prop-types'

class Search extends Component{
    state = {
        text:''
    };
    static propTypes = {
        searchUsers:propTypes.func.isRequired,
        clearUSers:propTypes.func.isRequired,
        showCLear:propTypes.bool.isRequired,
        setAlert:propTypes.func.isRequired,

    }

     onChangeHandler = (e) => this.setState ({ [e.target.name]:e.target.value })
     
     onSubmitHadler = (e) => {
        e.preventDefault()
        if (this.state.text==='') {
            this.props.setAlert(' please enter something','light')
        } else {
            this.props.searchUsers(this.state.text)
            this.setState({text:''})
        }
     }
    
   render() {
        return (
            <div>
                <form onSubmit={this.onSubmitHadler}>
                    <input type="text" name='text' placeholder='Search for user...' onChange={this.onChangeHandler} value={this.state.text} />
                    <input type="submit" value='Search'  className='btn btn-dark btn-block' />

                </form>
                {this.props.showClear&&(
                    <button 
                    className='btn btn-light btn-block' 
                    onClick={this.props.clearUsers}
                    >
                    Clear
                    </button>
                )}
            </div>
        )
    }
}

export default Search;