import { Component } from 'preact'
import style from './style'

export default class Timetable extends Component {
  render ({ schedule, showTeacher }) {
    return <table class={style.timetable}>
      <thead>
        {schedule.map(day =>
          <td class={style.day}>{day.day}</td>
        )}
      </thead>
      <tbody>
        <tr>
          {schedule.map(day =>
            <td class={style.day}>
              {this.fillBlanks(day.courses, { begin: '7:50', end: '18:05' }).map(c => {
                const duration = this.getDuration(c)
                const height = `${duration / 7.5}em`

                if (c.blank) {
                  return <div class={style.course} style={{ height: height }}></div>
                } else {
                  const color = this.lightenDarkenColor(c.subject.color, -75)
                  return <div class={style.course} style={{
                    background: this.lightenDarkenColor(c.subject.color, 75),
                    color: color,
                    borderLeft: `2px solid ${color}`,
                    height: height
                  }}>
                    <p class={style.secondary}>
                      {c.hour[0]} — {c.hour[1]}
                      <br />
                      {c.room}
                    </p>
                    <p>
                      {c.subject.name}
                      <br />
                      {showTeacher ? `${c.teacher.gender} ${c.teacher.name}` : c.class.name}
                    </p>
                  </div>
                }
              })}
            </td>
          )}
        </tr>
      </tbody>
    </table>
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

  lightenDarkenColor (col, amt) {
    var usePound = false

    if (col[0] === '#') {
      col = col.slice(1)
      usePound = true
    }

    var num = parseInt(col, 16)

    var r = (num >> 16) + amt

    if (r > 255) r = 255
    else if (r < 0) r = 0

    var b = ((num >> 8) & 0x00FF) + amt

    if (b > 255) b = 255
    else if (b < 0) b = 0

    var g = (num & 0x0000FF) + amt

    if (g > 255) g = 255
    else if (g < 0) g = 0

    return (usePound ? '#' : '') + String('000000' + (g | (b << 8) | (r << 16)).toString(16)).slice(-6)
  }
}
