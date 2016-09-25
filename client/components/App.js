/**
 * Created by root on 25/9/16.
 */

//This is the app template that is used on every page

import React, { PropTypes} from 'react';

class App extends React.Component{
  /*These children are based on the routing*/
  render(){
    return(
      <div className="container-fluid">
        Header here
        {this.props.children}
      </div>

    );
  }
}

App.PropTypes={
  children: PropTypes.object.isRequired
}

export default App;
