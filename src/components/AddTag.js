import React, { Component } from 'react';
import Header from './header';
import firestore from '../fire';



class AddTag extends Component {


  constructor(props) {
     super(props);
     this.state = {
       name:'',
       type:'smartbox',
       div:'',
       id:''
   };


     this.HomePage = this.HomePage.bind(this)
     this.handleInputChange = this.handleInputChange.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);


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
        Type: data.type,
        name: data.name.replace(/ /g,"_"),
        div: data.div,
        script: data.id
      }
    //  console.log(docData)
      let empty = true;
      for (const k in docData){
        if(docData[k].length <= 0){
          empty = true;
        }else{
          empty= false;
        }
      }
      if(!empty){
        firestore.collection("Tags").doc().set(docData).then(function() {
           
          _this.props.history.push({
             pathname:'/Tag/'+docData.name});
             
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
    return (
      <div className="AddTag">
        <Header title='Add a tag' HomePage={this.HomePage}/>
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
                value={this.state.type}
                onChange={this.handleInputChange}
                name="type"
                >

                  <option defaultValue value="smartbox">smartbox</option>
                  <option value="side">side</option>
                  <option value="infeed">infeed</option>

                </select>





                <label className="form__label--hidden" >div id:</label>
                <input className="form__input" type="text"  placeholder="Div id ex : lig_smartbox_test"
                value={this.state.div}
                onChange={this.handleInputChange}
                name="div"
                  />

                <label className="form__label--hidden" >tag id</label>
                <input className="form__input" type="text" placeholder="tag id ex  : 98989 "
                value={this.state.id}
                onChange={this.handleInputChange}
                name="id"
                />

                <input className="btn--default" type="submit" value="Submit"/>

              </form>
            </div>
        </div>
      </div>
    );
  }
}

//<label className="form__label--hidden" >Type:</label>
//<Selects/>
//<label className="form__label--hidden" >or create new one:</label>
export default AddTag;
