import React, { Component } from 'react';

class SearchBox extends Component {

  

  onKeyPress(evt){
    this.props.onSearch(evt.target.value, this.props.which); 
  }
  render() {

    return (
      <div className="SearchBox">
      <input type="text"
      ref={(input)=>this.input = input}
      onKeyUp={this.onKeyPress.bind(this)}/>
      </div>


      );
  }
}

export default SearchBox;