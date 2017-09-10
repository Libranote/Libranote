import { Component } from 'preact'
import style from './style'

export default class Timetable extends Component {
  render ({ schedule, showTeacher }) {
    return <div class={style.timetable}>
      {schedule.map(day =>
        <div class={style.day}>
          <h3>{day.day}</h3>
          {this.fillBlanks(day.courses, { begin: '7:50', end: '18:05' }).map(c => {
            const duration = this.getDuration(c)
            const height = `${duration / 7.5}em`

            if (c.blank) {
              return <div class={style.course} style={{ height: height }}></div>
            } else {
              return <div class={style.course} style={{ backgroundColor: c.subject.color, height: height }}>
                <p>
                  {c.subject.name}
                  <br />
                  {showTeacher ? `${c.teacher.gender} ${c.teacher.name}` : c.class.name}
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
