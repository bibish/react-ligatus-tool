import React, { Component } from 'react';

class Header extends Component {

constructor(props){
	super(props);
	let _this = this;
	let urlPath = window.location.pathname;
    let thisPath = urlPath.match(/([^\/]*)\/*$/)[1];
	switch(thisPath){
        case "smartbox":
          _this.state={godmod:true};
          break;
        case "":
          _this.state={HomePage:true};
          break;  
        case "side":
          _this.state={godmod:true};
          break;
        case "infeed":
          _this.state={godmod:true};
          break;
        default:
        _this.state={godmod:false}  
      }
}

// godmod(){

// 	if (typeof this.props.onChange === 'function') {
// 			this.setState({godmod:!this.state.godmod})
//             this.props.onChange(this.state.godmod);
//         }
	
// }

  render() {
    return(
    	<div className="cntr">
      {this.state.HomePage === undefined && 

        <input
        type="button"
        value="HomePage"
        onClick={this.props.HomePage}
        />
      }
      
    	{this.state.godmod === true && 

<div className="ig-control">
    <input 
    type="checkbox" 
    id="unchecked" 
    className="ig-control__switch"
    onChange={this.props.godmod}
    />
    <label htmlFor="unchecked" className="ig-control__lbl"></label>
  </div>

    	}
    	
    	
      <h1>{this.props.title}</h1>
    </div> 
    );


  }
}

export default Header;
