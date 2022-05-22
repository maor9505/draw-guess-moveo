import React from 'react'
import classes from './navbar.module.css'
const NavBar = () => {
  return (
    <div className="container-fluid ">
      <nav className="navbar navbar-expand-lg  bg-light">
        <span className={`${classes.title} navbar-brand `}>
          Draw && Guess Game
        </span>
       
      </nav>
    </div>
  );
}

export default NavBar