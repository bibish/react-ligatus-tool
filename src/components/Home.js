import React, { Component } from 'react';
import Header from './header'


class Home extends Component {
  goToTag(e){
    this.props.history.push('/TagList');
    //console.log(this.props.history)
  }
  goToAddTag(e){
    this.props.history.push('/Add');


  }

  render() {
    return (
      <div>
      <Header title="Something like showcase"/>
      <div className="homeContainer">
      <input type="button" value="Showcase" onClick={this.goToTag.bind(this)}/>
      <input type="button" value="Add tag" onClick={this.goToAddTag.bind(this)}/>
      </div>

      </div>
      );
  }
}

export default Home;
