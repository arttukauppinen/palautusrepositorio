import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const GetPos = () => {return (Math.floor(Math.random() * 7))}
let points = new Array(7).fill(0)

const updatePoints = (select) => {
  const copy = [ ...points ]
  copy[select] += 1
  points = copy
  return points[select]
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  const [vote, updateVote] = useState(0)

  const setToSelected = () => {
    setSelected(GetPos)
  }

  const setToVotes = () => {
    updateVote(updatePoints(selected))
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]}
      <br></br>
      has {points[selected]} votes
      <br></br>
      <Button handleClick={() => setToVotes()} text="vote" />
      <Button handleClick={() => setToSelected()} text="next anecdote" />
      <h2>Anecdote with most votes</h2>
      {anecdotes[points.indexOf(Math.max(...points))]}
    </div>
  )
}

export default App