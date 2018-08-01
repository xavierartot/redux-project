import React from 'react'
import { NavLink } from 'react-router-dom'

const Nav = () => (
  <nav className="nav">
    <ul>
      <li>
        <NavLink activeClassName="active" exact to="/">Home</NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/new">New Tweet</NavLink>
      </li>
    </ul>
  </nav>
)
export default Nav
