import StudentHome from '../routes/home/student'
import TeacherHome from '../routes/home/teacher'
import NewTest from '../routes/tests/new'
import Test from '../routes/tests'
import NewMark from '../routes/marks/new'

export default function getRoutes (role, userId) {
  const routes = {
    home: {
      student: r('Home', '/', <StudentHome studentId={userId}/>),
      teacher: r('Home', '/', <TeacherHome teacherId={userId}/>)
    },
    tests: {
      new: r('New Test', '/tests/new', <NewTest teacherId={userId}/>),
      view: r('Test', '/tests/:id', <Test />, false)
    },
    marks: {
      new: r('New Mark', '/marks/new/:testId/:studentId?', <NewMark />, false)
    }
  }

  switch (role) {
    case 'student':
      return [ routes.home.student ]
    case 'teacher':
      return [ routes.home.teacher, routes.tests.new, routes.tests.view, routes.marks.new ]
    default:
      return []
  }
}

function r (title, url, component, display = true) {
  component.attributes = component.attributes || {}
  component.attributes.path = url
  return {
    title,
    url,
    component,
    display
  }
}
