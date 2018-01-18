import React, { Component } from 'react';
import Header from './header';
import Popup from './Popup';
import firestore from '../fire'

class TagListe extends Component {


  constructor(props){
    super(props);
    this.godmod = this.godmod.bind(this)
    this.HomePage = this.HomePage.bind(this)
    this.fetchdata();
    
  }

  componentWillMount(){
    let urlPath = window.location.pathname;
    let thisPath = urlPath.match(/([^\/]*)\/*$/)[1];
    //this.setState({title:thisPath + ' liste'});
    this.setState( {
      loading:true,
      godmod:false,
      popup:false,
      popupText:{
        title :'Are u sure Delete ?',
        name :''
      },
      title:thisPath + ' liste'
    });

  }


  fetchdata(){
    let _this = this;
    let categoryAvtive = this.props.location.cat;
    let data = [];
    if(categoryAvtive){
        firestore.collection("Tags").where("Type", "==", categoryAvtive)
      .get()
      .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
              //console.log(doc.data());
              data.push(doc.data());

          });
        _this.setState({data,loading:false});
      })
    }
    else{
      let urlPath = window.location.pathname;
      let thisPath = urlPath.match(/([^\/]*)\/*$/)[1];
      //console.log(thisPath)
      firestore.collection("Tags").where("Type", "==", thisPath)
        .get()
      .then(function(querySnapshot) {
       

            if (querySnapshot.size <= 0){
              //console.log('pas data');
              _this.props.history.push('/404');

            }else{
              querySnapshot.forEach(function(doc) {
                  //console.log(doc.data());
                  data.push(doc.data());

              });
            _this.setState({data,loading:false});
            }
        })
    }
  }
  handleClick(value){
      // url parameter
      let urlParam = '/Tag/' + value.name;
      urlParam = urlParam.replace(/ /g,"_");
      
      this.props.history.push({
        pathname:urlParam,
        data:value});
       }

   godmod(){
    this.setState({godmod:!this.state.godmod})
   }
   deteleTag(e){
    e.preventDefault();
    //console.log(e.target.parentNode.parentNode.textContent);
    let name = e.target.parentNode.parentNode.textContent;
    this.setState({popup:true,popupText:{
      title :'Are u sure Delete ?',
      name :name
      } 

    });

   }
   editTag(e){
      let name = e.target.parentNode.parentNode.textContent;
      let urlParam = '/edit/' + name;
      urlParam = urlParam.replace(/ /g,"_");
      let key = e.target.parentNode.parentNode.parentNode.id;
      let data = this.state.data[key];

      //console.log(data);
      
       this.props.history.push({
         pathname:urlParam,
           value:data
    });
       
   }
   removePopup(){
    this.setState({popup:false})
   }
   removeFromFire(){
    let name = this.state.popupText.name;
    let _this = this;
    this.setState({popup:false});
    firestore.collection("Tags").where("name", "==", name)
    .get()
    .then(function(querySnapshot) {
        // Once we get the results, begin a batch
        var batch = firestore.batch();

        querySnapshot.forEach(function(doc) {
            // For each doc, add a delete operation to the batch
            batch.delete(doc.ref);
        });

        // Commit the batch
        return batch.commit();
    }).then(function() {
          _this.fetchdata();
    }); 
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
            <Header title={this.state.title} godmod={this.godmod} HomePage={this.HomePage}/>
            <div className="spinner"></div>
          </div>
        );
      }else{
        let array = Object.keys(this.state.data);
        //onClick={this.handleClick.bind(this, item)
        const listItems = array.map((item, i) =>
          <div className='card card1' key={i} id={i}  >
            <div className='image'onClick={this.handleClick.bind(this, this.state.data[item] )}></div>
              <div className='details'>
              {this.state.data[item].name}
              <br/>
              {this.state.godmod === true &&

                <div>
                <input type='button' value="delete" onClick={this.deteleTag.bind(this)} />
                <input type='button' value="edit" onClick={this.editTag.bind(this)}/>
                </div>
              }
               {this.state.popup === true &&

                <Popup popupText={this.state.popupText} removePopup={this.removePopup.bind(this)} removeFromFire={this.removeFromFire.bind(this)}/>
               }
              </div>

          </div>
          );
        return (
          <div >
            <Header title={this.state.title} godmod={this.godmod} HomePage={this.HomePage}  />
          <br/>
          
          <div className='card-container'>
          {listItems}
          </div>

          </div>

          );

      }
  }
}

export default TagListe;
