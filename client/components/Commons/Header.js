/**
 * Created by root on 25/9/16.
 */

import React, {PropTypes}  from 'react';
import { Link, IndexLink} from 'react-router';


const Header = (props) => {
  return(
    <nav>
      <IndexLink to="/home" activeClassName="active">Home</IndexLink>
      { " | "}
      <Link to="/inventory" >Inventory </Link>
    </nav>
  );
}

export default Header;


