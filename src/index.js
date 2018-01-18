import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import TagTypes from './components/TagTypes';
import TagListe from './components/TagListe';
import Tag from './components/Tag';
import NoPage from './components/404';
import Header from './components/header'
import Edit from './components/Edit'
import './App.css';
import Home from './components/Home';
import AddTag from './components/AddTag';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';


const Root = ()=>{
  return(
    <Router>
    <div>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/TagList" exact component={TagTypes}/>
        <Route path="/TagList/:type" exact component={TagListe}/>
        <Route path="/Add" exact component={AddTag}/>
        <Route path="/tag/:tag" exact component={Tag}/>
        <Route path="/404" exact component={NoPage}/>
        <Route path="/test" exact component={Header}/>
        <Route path="/edit/:tag" exact component={Edit}/>
        <Route component={NoPage}/>
      </Switch>
    </div>
  </Router>
  )
}

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();


// <Match exactly pattern='/TagTypes' component={TagTypes} />
// <Match exactly pattern='/LisTag/:TagTypes' component={ListTags} />
// <Match exactly pattern='/:Tag' component={Tag} />
