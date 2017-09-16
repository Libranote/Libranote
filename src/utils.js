const API_URL = 'http://0.0.0.0:3000'

export function apiUrl (table, query) {
  const url = new URL(API_URL)
  url.pathname = table
  if (query) {
    url.search = encodeURI(Object.keys(query).map(elt => `${elt}=${query[elt]}`).join('&'))
  }
  return url.href
}

export async function fetchAll (urls) {
  const results = await Promise.all(urls.map(u => fetch(u)))
  const toJson = results.map(res => res.json())
  return Promise.all(toJson)
}

export function flatten (arrays) {
  return arrays.reduce((sum, elt, i) => i > 0 ? sum.concat(elt) : sum, arrays[0])
}

export async function fetchDataFor (type, id) {
  switch (type) {
    case 'student':
      return fetchStudentData(id)
    case 'teacher':
      return fetchTeacherData(id)
    default:
      throw new Error('Invalid user type')
  }
}

async function fetchStudentData (id) {
  const [ students, teachers, subjects, marks ] = await fetchAll([
    apiUrl('students', { id }),
    apiUrl('teachers'),
    apiUrl('subjects'),
    apiUrl('marks', { 'studentsId_like': id })
  ])
  const res = { students, teachers, subjects, marks }

  const [ classes ] = await fetchAll([
    apiUrl('classes', { id: res.students[0].classId })
  ])
  res.classes = classes

  res.tests = flatten(await fetchAll(
    marks.filter((mark, i) => marks.findIndex(m => m.testId === mark.testId) >= 0)
      .map(m => apiUrl('tests', { id: m.testId }))
  ))

  return res
}

async function fetchTeacherData (id) {
  const [ students, teachers, subjects, tests, classes ] = await fetchAll([
    apiUrl('students'),
    apiUrl('teachers', { id }),
    apiUrl('subjects'),
    apiUrl('tests', { teacherId: id }),
    apiUrl('classes', { 'teachersId_like': id })
  ])
  return { students, teachers, subjects, classes, tests }
}

export function getDisplayName (type, user) {
  switch (type) {
    case 'teacher':
      return `${user.gender} ${user.name}`
    default:
      return `${user.firstname} ${user.name}`
  }
}
