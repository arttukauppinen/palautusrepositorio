const Total = ({ parts }) => {
    const total = parts.reduce( (s, p) => s + p.exercises, 0 )
  
    return (
      <div>
        Number of exercises {total}
      </div>
    )
  }
  
  const Course = ({ course }) => {
    return (
      <div>
        <h3>{course.name}</h3>
        <ul>
          {course.parts.map(parts =>
            <li key={parts.id}>
              {parts.name + " " + parts.exercises}
            </li>)}
          <li><Total parts={course.parts}/></li>
        </ul>
      </div>
    )
  }
  
  const Courses = ({ courses }) => {
    return (
      <div>
        <h1>Web development curriculum</h1>
        <ul>
          {courses.map(course =>
            <li key={course.id}>
              <Course course={course}/>
            </li>
          )}
        </ul>
      </div>
    )
  
  }


export default Courses