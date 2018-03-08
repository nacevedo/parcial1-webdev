import React, { Component } from 'react';
import './App.css';
import SearchBox from "./SearchBox"

class App extends Component {

  constructor(props) {
    super(props);

    this.state={
      followers:[],
      followers1:[]
    };
  }

  componentDidMount() {
    let me = this;
    fetch("api")
    .then((res) => {
      return res.json();
    })
    .then((followers) => {
      me.setState({followers:followers});
    })
    .catch((err) => console.log(err) );
    
  }

  onSearch(user){
    console.log(user); 
    fetch("https://www.instagram.com/"+user+"/?__a=1")
    .then((res)=>res.json())
    .then((data)=> {
      console.log(data.user.media.nodes);
      if(data.error){
        window.alert("No ha sido posible encontrar al usuario especificado");
      }

      //cuento cuantos likes tiene 
      var cuantos = 0; 
      var cuenta = 1; 
      var nodes = []; 
      

      for (let node in data.user.media.nodes) {
        cuantos += node[cuenta].likes.count;
        cuenta++; 
      }

      console.log(cuantos); 


      this.setState({followers:cuenta});
    } )
    .catch(error  => {
      console.log('There has been a problem with your fetch operation: '+ error.message);
    });
    
  }


  render() {
    return (
      <div className="App">

      <h1>InstaFight</h1>
      <div>Instagramer 1</div>
      <SearchBox onSearch = {this.onSearch.bind(this)}/>

      <div>Instagramer 2</div>
      <SearchBox onSearch = {this.onSearch.bind(this)}/>
      <div>Parcial 1 web - made by: Nicolás Acevedo Sandoval</div>
      </div>
      );
  }
}

export default App;
