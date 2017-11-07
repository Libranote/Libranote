const emptyWeek = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday',
  'Friday', 'Saturday', 'Sunday'
].map(d => ({
  name: d,
  courses: []
}))

// Remove week-end if there is no courses
const removeWeekEndIfPossible = d => d.courses.length > 0 || (d.name !== 'Saturday' && d.name !== 'Sunday')

export function timetable (courses, student, week, subjects, classes) {
  return courses.reduce((days, course, i) => {
    if ((course.group === null || course.group === student.group) &&
        (course.week === week || course.week === '')) {
      days.find(d => d.name === course.day).courses.push({
        start: course.start,
        end: course.end,
        subject: {
          name: (subjects.find(s => s.id === course.subject) || { name: course.subject }).name,
          color: '#24ed00'
        },
        room: 'TODO',
        teacher: course.teacher,
        class: classes.find(c => c.id === course.class),
        group: course.group
      })
    }

    return days
  }, emptyWeek).filter(removeWeekEndIfPossible)
}

export function teacherTimetable (courses, teacher, week, subjects, classes) {
  return courses.reduce((days, course, i) => {
    if ((course.teacher.id === teacher.id) && (course.week === week || course.week === '')) {
      days.find(d => d.name === course.day).courses.push({
        start: course.start,
        end: course.end,
        subject: {
          name: (subjects.find(s => s.id === course.subject) || { name: course.subject }).name,
          color: '#24ed00'
        },
        room: 'TODO',
        teacher: course.teacher,
        class: classes.find(c => c.id === course.class),
        group: course.group
      })
    }

    return days
  }, emptyWeek).filter(removeWeekEndIfPossible)
}
