import { useState } from 'react'
const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

const StatisticLine = (props) => (
  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad, total, averageVal, posVal }) => {
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={total} />
        <StatisticLine text="average" value={averageVal} />
        <StatisticLine text="positive" value={posVal} />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleFeedback = (type) => {
    if (type === "good") setGood(good + 1)
    else if (type === "neutral") setNeutral(neutral + 1)
    else if (type === "bad") setBad(bad + 1)
  }
  const total = good + bad + neutral;
  const averageVal = (good - bad) / total * 100
  console.log(averageVal)
  const posVal = good / total * 100
  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => handleFeedback("good")} text="good" />
      <Button onClick={() => handleFeedback("neutral")} text="neutral" />
      <Button onClick={() => handleFeedback("bad")} text="bad" />
      <h1>statistics</h1>
      {total === 0 ? (
        <div>No feedback given.</div>
      ) : (
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          total={total}
          averageVal={averageVal}
          posVal={posVal}
        />
      )}
    </div>
  )
}

export default App