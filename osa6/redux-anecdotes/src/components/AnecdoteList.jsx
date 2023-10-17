/* eslint-disable react/prop-types */
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return(
    <div key={anecdote.id}>
        <div>
            {anecdote.content}
        </div>
        <div>
            has {anecdote.votes}
            <button onClick={handleClick}>vote</button>
        </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => [...state].sort((a, b) => b.votes - a.votes))

  return(
    <ul>
      {anecdotes.sort().map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => 
            dispatch(voteAnecdote(anecdote.id))
          }
        />
      )}
    </ul>
  )
}

export default AnecdoteList