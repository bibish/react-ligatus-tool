import React, { Component } from 'react';
import Header from './header';
import firestore from '../fire';



class Edit extends Component {


  constructor(props) {
     super(props);
     if(this.props.location.value != undefined ){
        
     let state= this.props.location.value;
     //console.log(state);
     state['baseName'] = state.name;
     this.state = state;


     this.handleInputChange = this.handleInputChange.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);

     this.HomePage = this.HomePage.bind(this)
     }else{
      let urlParam = '/';
          this.props.history.push({
            pathname:urlParam
          });
          this.state = {render:false}
     }
     


   }

   handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

   handleSubmit(event) {
     //console.log(event)
     event.preventDefault();
     //alert('A name was submitted: ' );
     let data = this.state;
     let _this = this;
     let docData = {
        Type: data.Type,
        div: data.div,
        script: data.script,
        name:data.name
      }
    console.log(docData)
      let empty = true;
      for (const k in docData){
        if(docData[k].length <= 0){
          empty = true;
        }else{
          empty= false;
        }
      }
      if(!empty){

        firestore.collection("Tags").where("name", "==", this.state.baseName)
        .get()
        .then(function(querySnapshot) {
            // Once we get the results, begin a batch
            var batch = firestore.batch();

            querySnapshot.forEach(function(doc) {
                // For each doc, add a delete operation to the batch
                batch.update(doc.ref,docData);
            });

            // Commit the batch
            return batch.commit();
        }).then(function() {
          let urlParam = '/Tag/' + docData.name;
          _this.props.history.push({
            pathname:urlParam,
            value:docData
          });
        }); 

      }else{
        alert('empty field');
      }



   }

   HomePage(){
    console.log('redirect');
  let urlParam = '/';
          this.props.history.push({
            pathname:urlParam
          });
}

  render() {
    if(this.state.render === undefined){
    return (
      <div className="AddTag">
        <Header title='Edit Tag' HomePage={this.HomePage}/>
        <div>
            <div className="container">
              <form className="form" onSubmit={this.handleSubmit}>
                <label className="form__label--hidden" >Name:</label>
                <input className="form__input" type="text" placeholder="Tag name ex : smartbox classique" value={this.state.name}
                onChange={this.handleInputChange}
                name ="name"
                />

                <label className="form__label--hidden" >tag type</label>
                <select className="select"
                value={this.state.Type}
                onChange={this.handleInputChange}
                name="Type"                
                >

                  <option value="smartbox">smartbox</option>
                  <option value="side">side</option>
                  <option  value="infeed">infeed</option>

                </select>





                <label className="form__label--hidden" >div id:</label>
                <input className="form__input" type="text"  placeholder="Div id ex : lig_smartbox_test"
                value={this.state.div}
                onChange={this.handleInputChange}
                name="div"
                  />

                <label className="form__label--hidden" >tag id</label>
                <input className="form__input" type="text" placeholder="tag id ex  : 98989 "
                value={this.state.script}
                onChange={this.handleInputChange}
                name="script"
                />

                <input className="btn--default" type="submit" value="Submit"/>
                <input className="btn--default" type="submit" value="Cancel"/>

              </form>
            </div>
        </div>
      </div>
    );
  }else{
    return null
  }
}
}

//<label className="form__label--hidden" >Type:</label>
//<Selects/>
//<label className="form__label--hidden" >or create new one:</label>
export default Edit;
