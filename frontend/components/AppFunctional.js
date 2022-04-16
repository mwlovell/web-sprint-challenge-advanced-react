import React, {useState} from 'react'

const URL = `http://localhost:9000/api/result`;


export default function AppFunctional(props) {
  const [state, setState] = useState({
    email:'',
    message:'',
    x: 2,
    y: 2,
    matrix:[
    [0, 0, 0], 
    [0, 1, 0], 
    [0, 0, 0]],
    steps: 0,
});

const left  = () => {
  if(state.x === 1){
    setState({ ...state, message:`You can't go left`})
  }
  else
  {
    const newMatrix= [...state.matrix]
    newMatrix[state.y - 1][state.x -1 ] = 0
    newMatrix[state.y - 1][state.x - 2] = 1
    setState({
      ...state,
      steps: state.steps + 1, 
      x: state.x - 1, 
      matrix:[...newMatrix],
      message:'',  
    })      
  }    
}

const right  = () => {
  if(state.x === 3){
    setState({ ...state, message:`You can't go right`})
  }
  else
  {
    const newMatrix= [...state.matrix]
    newMatrix[state.y - 1][state.x -1 ] = 0
    newMatrix[state.y - 1][state.x] = 1
    setState({
      ...state,
      steps: state.steps + 1, 
      x: state.x + 1, 
      matrix:[...newMatrix],
      message:'',  
    })      
  }    
}



  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates (2, 2)</h3>
        <h3 id="steps">You moved 0 times</h3>
      </div>
      <div id="grid">
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square active">B</div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
      </div>
      <div className="info">
        <h3 id="message"></h3>
      </div>
      <div id="keypad">
        <button onClick={left} id="left">LEFT</button>
        {/* <button onClick={up} id="up">UP</button> */}
        <button onClick={right} id="right">RIGHT</button>
        {/* <button onClick={down} id="down">DOWN</button>
        <button onClick={reset}id="reset">reset</button> */}
      </div>
      <form>
        <input id="email" type="email" placeholder="type email"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
