import React from 'react'
import { NavLink } from 'react-router-dom';
import classes from './navbar.module.css'
const NavBar = () => {
  return (
    <div className="container-fluid ">
      <nav className="navbar navbar-expand-lg  bg-light">
        <NavLink  to='/' className={`${classes.title} navbar-brand `}>
          Draw && Guess Game
        </NavLink>
      </nav>
    </div>
  );
}

export default NavBar