import React, { Component } from 'react';
import './App.css';
import SearchBox from "./SearchBox";
import FightList from "./FightList";
import ProfileStats from "./ProfileStats";


const request = require('superagent');

class App extends Component {

  constructor(props) {
    super(props);

    this.state={
      followers:0,
      followers1:0,
      nombre: '',
      nombre1:'',
      winner: '',
      click:false
    };
  }

  componentDidMount() {
    
  }

  winner(){
    if(this.state.followers === 0 || this.state.followers1 === 0)
    {
      window.alert("No ha sido posible encontrar uno de los usuarios especificado");
    }
     
    if (this.state.followers > this.state.followers1)
    {
      this.setState({winner:this.state.nombre});  
    }
    else 
    {
      this.setState({winner:this.state.nombre1}); 
    }
    this.setState({click:true});
    console.log(this.state);
    request
    .post('/api')
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .send({ user1: this.state.nombre, 
        user2: this.state.nombre1,
        likes1: this.state.followers,
        likes2: this.state.followers1,
    })
    .end(function(err, res){
        console.log(res.text);
    });

  }

  onSearch(user, which){
    console.log(user); 
    fetch("https://www.instagram.com/"+user+"/?__a=1")
    .then((res)=>res.json())
    .then((data)=> {

      if(data.error){
        window.alert("No ha sido posible encontrar al usuario especificado");
      }

      //cuento cuantos likes tiene 
      var cuenta = 0; 
      var nodes = data.user.media.nodes; 
      console.log(nodes);

      for(let i =0 ; i < nodes.length; i++)
      {
        var valor = data.user.media.nodes[i].likes.count; 
        console.log(valor);
        cuenta += valor;
      }


      console.log(cuenta); 

      if(which === 1){
        this.setState({followers:cuenta});
        this.setState({nombre:user});
      }
      else {
        this.setState({followers1:cuenta});
        this.setState({nombre1:user});
      }

    } )
    .catch(error  => {
      console.log('There has been a problem with your fetch operation: '+ error.message);
    });
    
  }


  render() {
    return (
      <div className="App">

      <h1 className = "main">InstaFight <span role="img">👊</span></h1>
      <div className ="row">
        <div className = "col-sm-6">
          <h2>Instagramer 1</h2>
            <SearchBox which = {1} onSearch = {this.onSearch.bind(this)}/>
          <div> Likes: {this.state.followers}</div>
        </div>

        <div className = "col-sm-6">
          <h2 >Instagramer 2</h2>
            <SearchBox which = {2} onSearch = {this.onSearch.bind(this)}/>
          <div> Likes: {this.state.followers1}</div>
        </div>
      </div>

      <button onClick = {this.winner.bind(this)}> FIGTH! </button> 
      {this.state.click && <div> The winner is {this.state.winner}</div> }
      
      <ProfileStats/>
      <FightList/>

      </div>
      );
  }
}

export default App;
