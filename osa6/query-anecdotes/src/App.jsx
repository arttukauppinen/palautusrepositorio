import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAll, get, createNew, changeAnecdote } from './requests'

import { useContext } from 'react'
import { useNotificationDispatch } from './NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation({
    mutationFn: createNew,
    onSuccess: (newAnecdote) => {
      queryClient.invalidateQueries(['anecdotes']);
      const notification = `new anecdote '${newAnecdote.content}' added`
      dispatch({ type: 'CHANGE', payload: notification })
    },
    onError: (error) => {
      if (error.response.status === 400) {
        const notification = `too short anecdote, must have length 5 or more`
        dispatch({ type: 'CHANGE', payload: notification })
      }
    }
  })

  const updateAnecdoteMutation = useMutation({
    mutationFn: changeAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })


  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate(content)
  }

  const addVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1 })
    const notification = `you voted '${anecdote.content}'`
    dispatch({ type: 'CHANGE', payload: notification })
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    retry: 1
  })

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if ( result.isError ) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm addAnecdote={addAnecdote}/>
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => addVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
