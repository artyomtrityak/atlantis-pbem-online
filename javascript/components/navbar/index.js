import React from 'react';


const NavbarComponent = (props) => {
  return (
    <nav className="navbar navbar-light bg-faded">
      <a className="navbar-brand" href="#">Atlantis Online</a>
      <ul className="nav navbar-nav">
        <li className="nav-item active">
          <a className="nav-link" href="#">Map</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Newsletter</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">About</a>
        </li>

        <li className="nav-item pull-md-right">
          <a className="nav-link" href="#">Sign in</a>
        </li>
      </ul>
    </nav>
  );
};

export default NavbarComponent;
