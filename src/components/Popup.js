import React, { Component } from 'react';

class Popup extends Component {

constructor(props){
	super(props);
	
}


  render() {
    return(

    	<div id="popup1" className="overlay">
        <div className="popup">
          <h2>{this.props.popupText.title} {this.props.popupText.name}</h2>
          <a className="close"  onClick={this.props.removePopup}>&times;</a>
          <input type="submit" className="btn--default" value="yes" onClick={this.props.removeFromFire} />
          <input type="submit" className="btn--default"  value="nop" onClick={this.props.removePopup}/>
        </div>
    </div>
    );


  }
}

export default Popup;
