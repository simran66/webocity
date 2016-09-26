/**
 * Created by root on 25/9/16.
 */

import React, {PropTypes}  from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
//import {Header, Title, Menu, Anchor, Navbar} from 'grommet';



const TopHeader = (props) => {
  return(
    <div>
      <Navbar color="faded" light>
        <NavbarBrand href="/">reactstrap</NavbarBrand>
        <Nav className="pull-xs-right" navbar>
          <NavItem>
            <NavLink href="/components/">Components</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="https://github.com/reactstrap/reactstrap">Github</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </div>

  );
}

export default TopHeader;


