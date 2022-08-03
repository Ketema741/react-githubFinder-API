import React from 'react'
import propTypes from 'prop-types'

const Navbar =({icon, title})=> {
    Navbar.defaultProps = {
        title:'githun finder',
        icon:'fab fa-github'
    }

    Navbar.propTypes = {
        title:propTypes.string.isRequired,
        icon:propTypes.string.isRequired

    }
        return (
            <nav className="navbar bg-primary">
                <h1>
               <i className={icon} /> {title}
                </h1>
            </nav>
        )
    
}
export default Navbar;