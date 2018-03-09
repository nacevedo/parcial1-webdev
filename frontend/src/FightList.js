import React, { Component } from 'react';
import Fight from "./Fight"

class FightList extends Component {

   constructor(props) {
    super(props);

    this.state={
      fights:[]
    };

     this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    let me = this;
    fetch("api")
      .then((res) => {
        return res.json();
      })
      .then((info) => {
        me.setState({fights : info});
      })
      .catch((err) => console.log(err) );
    
  }

  render() {

    return (
      <div className="everything">
          <h1 className = "main" >Fights Record <span role="img">📖</span> </h1>
          <ul>
            {console.log(this.state)}
            {this.state.fights.map((d,index) => {
              return <Fight user1 = {d.user1} user2 = {d.user2} likes1 = {d.likes1} likes2 = {d.likes2} winner = {d.winner} key={d.user1+d.user2}/> 
            })}
          </ul>
      </div>

    );
  }
}
export default FightList;


