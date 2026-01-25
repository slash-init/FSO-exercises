import { useContext } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { createAnecdote, getAnecdotes, voteAnecdote } from './requests/anecdotes'
import NotificationContext from './contexts/NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const { dispatch: notificationDispatch } = useContext(NotificationContext)

  const notify = (message) => {
    notificationDispatch({ type: 'SHOW', payload: message })
    setTimeout(() => {
      notificationDispatch({ type: 'CLEAR' })
    }, 5000)
  }

  const anecdotesQuery = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })

  const createAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      queryClient.setQueryData(['anecdotes'], (old = []) => old.concat(newAnecdote))
      notify(`anecdote '${newAnecdote.content}' created`)
    },
    onError: (error) => {
      notify(error.message)
    }
  })

  const voteAnecdoteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: (updated) => {
      queryClient.setQueryData(['anecdotes'], (old = []) =>
        old.map(a => a.id === updated.id ? updated : a)
      )
      notify(`you voted '${updated.content}'`)
    }
  })

  const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate(anecdote)
  }

  const handleCreate = (content) => {
    createAnecdoteMutation.mutate(content)
  }

  if (anecdotesQuery.isLoading) {
    return <div>loading data...</div>
  }

  if (anecdotesQuery.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = anecdotesQuery.data ?? []

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm onCreate={handleCreate} />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
