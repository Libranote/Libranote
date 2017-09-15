import StudentHome from '../routes/home/student'
import TeacherHome from '../routes/home/teacher'
import NewTest from '../routes/tests/new'
import Test from '../routes/tests'

export default function getRoutes (role, userId) {
  const routes = {
    home: {
      student: <StudentHome path='/' studentId={userId}/>,
      teacher: <TeacherHome path='/' teacherId={userId}/>
    },
    tests: {
      new: <NewTest path='tests/new' teacherId={userId}/>,
      view: <Test path='tests/:id' />
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
