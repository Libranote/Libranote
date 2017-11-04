import { Component } from 'preact'
import style from './style'
import { getDisplayName } from '../../utils'

export default class Timetable extends Component {
  render ({ schedule, showTeacher }) {
    console.log(schedule)
    return <table class={style.timetable}>
      <thead>
        {schedule.map(day =>
          <td class={style.day}>{day.name}</td>
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
                      {c.start.substring(0, 5)} — {c.end.substring(0, 5)}
                      <br />
                      {c.room}
                    </p>
                    <p>
                      {c.subject.name}
                      <br />
                      {showTeacher ? getDisplayName(c.teacher) : c.class.name}
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
      // add a blank course before each course to fill the gap between this course and the previous
      res.push({ blank: true, start: lastEnd, end: course.start })
      res.push(course)
      lastEnd = course.end
    }

    // add a blank course from the end of the last real course, to the end of the day
    if (this.toMinutes(lastEnd) < this.toMinutes(end)) {
      res.push({ blank: true, start: lastEnd, end })
    }

    return res
  }

  getDuration (course) {
    return this.toMinutes(course.end) - this.toMinutes(course.start)
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
