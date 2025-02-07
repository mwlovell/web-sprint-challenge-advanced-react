import React from 'react'
import axios from 'axios';

const url = 'http://localhost:9000/api/result';


export default class AppClass extends React.Component {
  
  state = {

    email:'',
    message:'',
    x: 2,
    y: 2,
    matrix:[
    [0, 0, 0], 
    [0, 1, 0], 
    [0, 0, 0]],
    steps: 0,
      
  };

  left  = () => {
    if(this.state.x === 1){
      this.setState({ ...this.state, message:`You can't go left`})
    }
    else
    {
      const newMatrix= [...this.state.matrix]
      newMatrix[this.state.y - 1][this.state.x -1 ] = 0
      newMatrix[this.state.y - 1][this.state.x - 2] = 1
      this.setState({
        ...this.state,
        steps: this.state.steps + 1, 
        x: this.state.x - 1, 
        matrix:[...newMatrix],
        message:'',  
      })      
    }    
  }

  right  = () => {
    if(this.state.x === 3){
      this.setState({ ...this.state, message:`You can't go right`})
    }
    else
    {
      const newMatrix= [...this.state.matrix]
      newMatrix[this.state.y - 1][this.state.x -1 ] = 0
      newMatrix[this.state.y - 1][this.state.x] = 1
      this.setState({
        ...this.state,
        steps: this.state.steps + 1, 
        x: this.state.x + 1, 
        matrix:[...newMatrix],
        message:'',  
      })      
    }    
  }
  up  = () => {
    if(this.state.y === 1){
      this.setState({ ...this.state, message:`You can't go up`})
    }
    else
    {
      const newMatrix= [...this.state.matrix]
      newMatrix[this.state.y - 1][this.state.x - 1 ] = 0
      newMatrix[this.state.y - 2][this.state.x - 1] = 1
      this.setState({
        ...this.state,
        steps: this.state.steps + 1, 
        y: this.state.y - 1, 
        matrix:[...newMatrix],
        message:'',  
      })      
    }    
  }

  down  = () => {
    if(this.state.y === 3){
      this.setState({ ...this.state, message:`You can't go down`})
    }
    else
    {
      const newMatrix= [...this.state.matrix]
      newMatrix[this.state.y - 1][this.state.x -1 ] = 0
      newMatrix[this.state.y][this.state.x - 1] = 1
      this.setState({
        ...this.state,
        steps: this.state.steps + 1, 
        y: this.state.y + 1, 
        matrix:[...newMatrix],
        message:'',  
      })      
    }    
  }

  reset  = () => {
    this.setState({
      
      email:'',
      message:'',
      x: 2,
      y: 2,
      matrix:[[0, 0, 0], [0, 1, 0], [0, 0, 0]],
      steps: 0,
        
    })
  }
  changeInput = (evt) => {
    const { value } = evt.target;
    this.setState({
        ...this.state,
        email: value,
    });

  };

  onSubmit = (evt)=>{
    evt.preventDefault()
    axios.post(
      url,
      {...this.state, email: this.state.email})
    .then(
      (res)=>{this.setState({
        ...this.state, message: res.data.message
      })}
    ).catch((error)=>
    {this.setState({
        ...this.state, 
        message:error.response.data.message
      })}
    )
    this.setState({ ...this.state, email: '' });
  }

 

 
  render() {

    const { x, y, matrix, steps, message, email } = this.state;
    const { className } = this.props;

    
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates ({x}, {y})</h3>
          <h3 id="steps">You moved {steps} {steps === 1 ? 'time' : 'times'}</h3>
        </div>
        <div id="grid">
        {matrix
            .flatMap((x) => x)
            .map((spot, idx) => {
                return (
                        <div key={idx} 
                        className={`square${spot  ? ' active' :'' }`}>
                        {spot ? 'B' : ''}
                        </div>
                        );
                        })}
        </div>
        <div className="info">
          <h3 id="message">{message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={this.left}>LEFT</button>
          <button id="up" onClick={this.up}>UP</button>
          <button id="right" onClick={this.right}>RIGHT</button>
          <button id="down" onClick={this.down}>DOWN</button>
          <button id="reset" onClick={this.reset}>reset</button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input onChange={this.changeInput}
                        value={email}
                        id='email'
                        type='email'
                        placeholder='type email'
                        ></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
