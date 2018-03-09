import React from "react";


export default class Fight extends React.Component {

	constructor(props) {
    super(props);

    this.state={
      user1:'',
      user2:'',
      likes1:0,
      likes2:0,
      winner:'',

    };


  }


  render() {
  	return (

  	<div className="everything">
      <div className="col-sm-3">
      <br/>
        <div> User 1: {this.props.user1} </div>
        <div> User 2:{this.props.user2} </div>
        <div> Likes user 1: {this.props.likes1} </div>
        <div> Likes user 2: {this.props.likes2} </div>
      </div>  
    </div>
   );
  }
}