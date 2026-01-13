import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => [...state].sort((a, b) => b.votes - a.votes))
    const dispatch = useDispatch()

    return (
        <div>
            {anecdotes.map(a => (
                <div key={a.id}>
                    <div>{a.content}</div>
                    <div>
                        has {a.votes}
                        <button onClick={() => dispatch(vote(a.id))}>vote</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default AnecdoteList
