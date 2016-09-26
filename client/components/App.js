/**
 * Created by root on 25/9/16.
 */

//This is the app template that is used on every page

import React, { PropTypes} from 'react';
import Header from './Commons/Header'

class App extends React.Component{

  render(){
    return(
        <div>
          <Header/>
          {this.props.children}
          </div>

    );
  }
}

App.PropTypes={
  children: PropTypes.object.isRequired
}


export default App;
