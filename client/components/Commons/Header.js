/**
 * Created by root on 25/9/16.
 */

import React, {PropTypes}  from 'react';
//import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import 'grommet/scss/vanilla/index';
import {Header, Title, Menu, Anchor, Navbar} from 'grommet';



const TopHeader = (props) => {
  return(
    <Menu inline={true} direction="row" size="large">
      <Anchor href="#" className="active">
        First action
      </Anchor>
      <Anchor href="#">
       Second action
     </Anchor>
      <Anchor href="#">
        Third action
     </Anchor>
    </Menu>
  );
}
//
// <div>
//   <Navbar color="faded" light>
//     <NavbarBrand href="/">reactstrap</NavbarBrand>
//     <Nav className="pull-xs-right" navbar>
//       <NavItem>
//         <NavLink href="/components/">Components</NavLink>
//       </NavItem>
//       <NavItem>
//         <NavLink href="https://github.com/reactstrap/reactstrap">Github</NavLink>
//       </NavItem>
//     </Nav>
//   </Navbar>
// </div>

export default TopHeader;


