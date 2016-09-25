/**
 * Created by root on 25/9/16.
 */

//This is the app template that is used on every page

import {React, PropTypes} from 'react';

class App extends React.Component{
  render(){
    return(
      <div className="container-fluid">
        Header here
        {this.props.children}   /*These children are based on the routing*/
      </div>

    );
  }
}

App.PropTypes={
  children: PropTypes.object.isRequired
}

export default App;
