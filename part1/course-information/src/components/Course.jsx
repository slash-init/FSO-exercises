const Course = ({ course }) => {
  console.log(course[0].name)
  return (
    course.map(course => {
      const total = course.parts.reduce((sum, part) => sum + part.exercises, 0);
      return (
        <div key={course.id}>
          <h1>{course.name}</h1>
          {course.parts.map(part => (
            <div key={part.id}>{part.name} {part.exercises}</div>
          ))}
          <div><b>total of {total} exercises</b></div>
        </div>
      );
    })
  )
}

export default Course