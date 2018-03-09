import React, { Component } from 'react';
import SearchBox from "./SearchBox";

class ProfileStats extends Component {

   constructor(props) {
    super(props);

    this.state={
      meanLikes:0, 
      meanComments:0,
      bestImg:'', 
      worstImg:'',
      ratio:0
    };

     
  }

  componentDidMount() {
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
      var cuentaLikes = 0; 
      var cuentaCom = 0; 
      var nodes = data.user.media.nodes; 
      var max = 0; 
      var min = 100000000; 
      var mejorImagen = ''; 
      var peorImagen = ''; 
      console.log(nodes);

      for(let i =0 ; i < nodes.length; i++)
      {
        var valorLikes = data.user.media.nodes[i].likes.count; 
        var valorCom = data.user.media.nodes[i].comments.count;
        cuentaLikes += valorLikes;
        cuentaCom += valorCom;
        if (valorLikes > max) 
        {
          mejorImagen = data.user.media.nodes[i].thumbnail_src;
          max=valorLikes;
        }
        if(valorLikes < min)
        {
          min = valorLikes; 
          peorImagen = data.user.media.nodes[i].thumbnail_src;
        }
      }
        console.log("esta es la cuenta de likes "+cuentaLikes);
        console.log("esta es la cuenta de comentarios "+cuentaCom);
        var meanl = cuentaLikes/nodes.length; 
        var meanc = cuentaCom/nodes.length;

        var fby = data.user.followed_by.count;
        var f = data.user.follows.count;

        var ratiof = fby/f; 

        this.setState({meanLikes:meanl});
        this.setState({meanComments:meanc});
        this.setState({bestImg:mejorImagen});
        this.setState({worstImg:peorImagen});
        this.setState({ratio:ratiof})

    } )
    .catch(error  => {
      console.log('There has been a problem with your fetch operation: '+ error.message);
    });
    
  }

  render() {

    return (
      <div className="everything">
          <h1 className = "main">Profile Stats <span role="img">🕵</span> </h1>
            <h2>Introduce instagramer to investigate..</h2>
          <SearchBox which = {1} onSearch = {this.onSearch.bind(this)}/>
          <div> Mean Likes: {this.state.meanLikes}</div>
          <div> Mean Comments: {this.state.meanComments}</div>
          <div> Ratio (FollowedBy/follows): {this.state.ratio}</div>
          <div> Best photo & Worst photo (by likes)</div>
          <img src = {this.state.bestImg}/>
          <img src = {this.state.worstImg}/>
      </div>

    );
  }
}


export default ProfileStats;


