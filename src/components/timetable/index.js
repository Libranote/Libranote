import { Component } from 'preact'
import style from './style'

export default class Timetable extends Component {
  render ({ student, teachers, subjects }) {
    const cls = this.props.class
    return <div class={style.timetable}>
      {cls.timetable.map(day =>
        <div class={style.day}>
          <h3>{day.day}</h3>
          {this.fillBlanks(day.courses, { begin: '7:50', end: '18:05' }).map(c => {
            const duration = this.getDuration(c)
            const height = `${duration / 7.5}em`

            if (c.blank) {
              if (duration > 20) {
                return <div class={style.course} style={{ height: height }}></div>
              } else {
                return null
              }
            } else {
              const teacher = teachers.find(t => t.id === c.teacher)
              const subject = subjects.find(s => s.id === c.subject)
              return <div class={style.course} style={{ backgroundColor: subject.color, height: height }}>
                <p>
                  {subject.name}
                  <br />
                  {teacher.gender} {teacher.name}
                </p>
                <p>
                  {c.room}
                  <br />
                  {c.hour[0]} — {c.hour[1]}
                </p>
              </div>
            }
          })}
        </div>
      )}
    </div>
  }

  fillBlanks (courses, { begin, end }) {
    const res = []
    let lastEnd = begin
    for (const course of courses) {
      res.push({ blank: true, hour: [ lastEnd, course.hour[0] ] })
      res.push(course)
      lastEnd = course.hour[1]
    }

    if (this.toMinutes(lastEnd) < this.toMinutes(end)) {
      res.push({ blank: true, hour: [ lastEnd, end ] })
    }

    return res
  }

  getDuration (course) {
    const hours = course.hour.map(h => this.toMinutes(h))
    return hours[1] - hours[0]
  }

  toMinutes (time) {
    const [ hours, minutes ] = time.split(':').map(x => Number.parseInt(x))
    return hours * 60 + minutes
  }
}
