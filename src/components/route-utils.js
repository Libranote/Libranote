import StudentHome from '../routes/home/student'
import TeacherHome from '../routes/home/teacher'
import NewTest from '../routes/tests/new'
import Test from '../routes/tests'

export default function getRoutes (role, userId) {
  const routes = {
    home: {
      student: r('Home', '/', <StudentHome studentId={userId}/>),
      teacher: r('Home', '/', <TeacherHome teacherId={userId}/>)
    },
    tests: {
      new: r('New Test', '/tests/new', <NewTest teacherId={userId}/>),
      view: r('Test', '/tests/:id', <Test />, false)
    }
  }

  switch (role) {
    case 'student':
      return [ routes.home.student ]
    case 'teacher':
      return [ routes.home.teacher, routes.tests.new, routes.tests.view ]
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
