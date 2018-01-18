import React, { Component } from 'react';
import Header from './header';
import firestore from '../fire'



class TagTypes extends Component {


  constructor(){
    super();
    this.state = {loading:true};
    this.HomePage = this.HomePage.bind(this)
    this.fetchdata();

  }
    fetchdata(){

    let data = [];
    let liste = [];
    let _this = this;
    firestore.collection("Tags").get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        //console.log(doc.data());
        data.push(doc.data());
        liste.push(doc.data().Type)
      });
      liste = [ ...new Set(liste) ]
      _this.setState({liste,data,loading:false})


    });
    }

    handleClick(value){
      // url parameter
      let urlParam = '/TagList/' + value;
      //console.log(value);
      // send state to this.props.location.data
      this.props.history.push({
        pathname:urlParam,
        cat:value  });

    }


   HomePage(){
    console.log('redirect');
  let urlParam = '/';
          this.props.history.push({
            pathname:urlParam
          });
} 

    render() {
      if(this.state.loading){
        return(
          <div>
          <Header title="Category list" HomePage={this.HomePage}/>
          <div className="spinner"></div>
          </div>

        );
      }else{
        //let array = Object.keys(this.state.data);
        let array = this.state.liste;
        const listItems = array.map((item, i) =>
          <div className='card card1' key={i} onClick={this.handleClick.bind(this, item)}>
            <div className='image'></div>
              <div className='details'>
              {item}
              </div>
          </div>
          );
        return (
          <div>
          <Header title="Category list" HomePage={this.HomePage}/>
          <br/>
          <div className="card-container">


          {listItems}

          </div>
          </div>

          );

      }



    }
  }

  export default TagTypes;
