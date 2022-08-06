import React  from 'react'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'

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
            <h2>
                <i className={icon} /> {title}
            </h2>

            <ul>
                <li><Link to="/" >Home</Link> </li>
                <li><Link to="/about" >About</Link> </li> 
            </ul>
        </nav>
    )
    
}
export default Navbar;