import StudentHome from './student'
import TeacherHome from './teacher'

export function getHomePage (role, userId) {
  console.log(role)
  switch (role) {
    case 'student':
      return <StudentHome path='/' studentId={userId}/>
    case 'teacher':
      return <TeacherHome path='/' teacherId={userId}/>
    default:
      console.log('TODO: show login page')
  }
}
