import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const filter = useSelector(state => state.filter)
    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()

    const filtered = anecdotes
        .filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
        .sort((a, b) => b.votes - a.votes)

    return (
        <div>
            {filtered.map(a => (
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
