import React from 'react'
// import axios form 'axios';

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
 
 
  render() {

    const { x, y, matrix, steps, message, email } = this.state;
    const { className } = this.props;

    
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates (2, 2)</h3>
          <h3 id="steps">You moved 0 times</h3>
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
          <h3 id="message"></h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={this.left}>LEFT</button>
          <button id="up">UP</button>
          <button id="right">RIGHT</button>
          <button id="down">DOWN</button>
          <button id="reset">reset</button>
        </div>
        <form>
          <input id="email" type="email" placeholder="type email"></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
