import React, { Component } from 'react';

class Search extends Component{
    state = {
        text:''
    };

     onChangeHandler =(e) => this.setState ({ [e.target.name]:e.target.value })
     onSubmitHadler= (e)=>{
        e.preventDefault()
        this.props.searchUSer(this.state.text)
        this.setState({text:''})
     }
    
   render() {
        return (
            <div>
                <form onSubmit={this.onSubmitHadler}>
                    <input type="text" name='text' placeholder='Search for user...' onChange={this.onChangeHandler} value={this.state.text} />
                    <input type="submit" value='Search' className='btn btn-dark btn-block' />

                </form>
            </div>
        )
    }
}

export default Search;