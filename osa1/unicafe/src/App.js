import { useState } from 'react'


const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = (props) => {
  return(
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const all = props.good + props.neutral + props.bad;
  const average = ((props.good)+(props.bad*(-1)))/all;
  const positive = 100*(props.good/all);

  if(all === 0){return <div>No  feedback given</div>}

  return(
    <table>
      <tbody>
        <StatisticLine text="good" value ={props.good} />
        <StatisticLine text="neutral" value ={props.neutral} />
        <StatisticLine text="bad" value ={props.bad} />
        <StatisticLine text="all" value ={all} />
        <StatisticLine text="average" value ={average} />
        <StatisticLine text="positive" value ={positive} />
    </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToGood = () => {setGood(good + 1)}
  const setToNeutral = () => {setNeutral(neutral + 1)}
  const setToBad = () => {setBad(bad + 1)}
  
  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setToGood()} text="good" />
      <Button handleClick={() => setToNeutral()} text="neutral" />
      <Button handleClick={() => setToBad()} text="bad" />
      <h2>statistics</h2> 
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App