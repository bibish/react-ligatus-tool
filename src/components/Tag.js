import React, { Component } from 'react';
import Header from './header'
import firestore from '../fire';



class Tag extends Component {


  componentWillMount(){

    this.HomePage = this.HomePage.bind(this)
    console.log('willmountedt')
    let urlPath = window.location.pathname;
    let thisPath = urlPath.match(/([^\/]*)*$/)[1];
    this.setState({title:thisPath,loading:true,smartbox:false,side:false,infeed:false,data:''});

    let _this = this;
    if(this.props.location.data){
      console.log('starting fetch props');
      let data = this.props.location.data;
      let srcUrl = "https://a-ssl.ligatus.com/?ids="  + data.script + "&t=js&s=1";
      
      switch(data.Type){
        case "smartbox":
          _this.setState({smartbox:true});
          break;
        case "side":
          _this.setState({side:true});
          break;
        case "infeed":
          _this.setState({infeed:true});
          break;
      }
      console.log('data from props')
      this.setState({data,srcUrl,title:thisPath,loading:false});
      

    }else{
      console.log('starting fetch');
      let data = [];
       let urlPath = window.location.pathname;
       let thisPath = urlPath.match(/([^\/]*)*$/)[1];
      //console.log(thisPath)
      firestore.collection("Tags").where("name", "==", thisPath)
        .get()
        .then(function(querySnapshot) {
            if (querySnapshot.size <= 0){
              //console.log('pas data');
              _this.props.history.push('/404');

            }else{
              querySnapshot.forEach(function(doc) {
                  //console.log(doc.data());
                  data.push(doc.data());
                  switch(data[0].Type){
                    case "smartbox":
                      _this.setState({smartbox:true});
                      break;
                    case "side":
                      _this.setState({side:true});
                      break;
                    case "infeed":
                      _this.setState({infeed:true});
                      break;
                  }
                  let srcUrl = "https://a-ssl.ligatus.com/?ids="  + data[0].script + "&t=js&s=1";
                  console.log('data from fb')
                  data = data[0];
                  console.log(data);
                  _this.setState({data,srcUrl,title:thisPath,loading:false});
                  
                  //_this.addScript(_this.state.srcUrl);

              });
              //console.log('coucou',data)



            }

        })

    }
    console.log('endMounted')

  }
  componentDidMount(){
    
    if(!this.state.loading){
      this.addScript();
    }
  }
  componentDidUpdate(){
    
    if(!this.state.loading){
      this.addScript();
    }
  }
  addScript(){
      const s = document.createElement('script');
      s.type = 'text/javascript';
      s.async = true;
      s.src = this.state.srcUrl;
      this.instance.appendChild(s);
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
      console.log('rendering loader');
      return(
        <div>
        <Header title={this.state.title} HomePage={this.HomePage} />
        <div className="spinner"></div>
        </div>
      );
    }else

      console.log('rendering content',this.state);
        return (
          <div className="Tag" ref={el => (this.instance = el)} >

        <Header title={this.state.title} HomePage={this.HomePage}  />
          <div id="section">
        <div id="article1" className="article_desktop">
            <h2>Article Headline</h2>
            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
                et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
                et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</p>

                {this.state.infeed === true &&
                    <div>
                    <div id={this.state.data.div}></div>
                    <script type="text/javascript" src={this.state.srcUrl}></script>
                    </div>

                  }
            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr,ed diam nonumy eirmod tempor invidunt ut labore
                et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Lit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</p>

            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
                et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</p>
                {this.state.smartbox === true &&
                    <div>
                      <div id={this.state.data.div}></div>
                      <script type="text/javascript" src={this.state.srcUrl}></script>
                    </div>


                  }





        </div>
        <div id="side" className="sidebar">
        {this.state.side ? (

          <div>
          <div id={this.state.data.div}></div>
          <script type="text/javascript" src={this.state.srcUrl}></script>
          </div>


        ) : (
          <div>
          <div id="imagedummy"></div>
          <div>Lorem ipsum dolor sit amet, consetetur sadipscing elitr,ed diam nonumy eirmod tempor invidunt ut labore.</div>


          <div id="imagedummy"></div>
          <div>Lorem ipsum dolor sit amet, consetetur sadipscing elitr,ed diam nonumy eirmod tempor invidunt ut labore.</div>
          </div>
        )}

        </div>

    </div>



          </div>
        )



  //}
}
}

export default Tag;
