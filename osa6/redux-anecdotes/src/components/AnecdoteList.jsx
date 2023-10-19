/* eslint-disable react/prop-types */
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return(
    <div key={anecdote.id}>
        <div>
            {anecdote.content}
        </div>
        <div>
            has {anecdote.votes} votes
            <button onClick={handleClick}>vote</button>
        </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => [...state.anecdotes].filter(a => a.content.includes(state.filter)).sort((a, b) => b.votes - a.votes))
  return(
    <ul>
      {anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => {
            dispatch(addVote(anecdote.id));
            dispatch(setNotification(`you voted '${anecdote.content}'`, 5));
          }}
        />
      )}
    </ul>
  )
}

export default AnecdoteList