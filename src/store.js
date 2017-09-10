import { apiUrl } from './utils'

const store = {
  data: {},
  changeCallbacks: [],
  readyCallbacks: [],
  triggeredReady: [],

  query: async function (predicates) {
    const res = {}
    for (const table in predicates) {
      if (this.data[table]) {
        const result = this.data[table].filter(predicates[table])

        const classes = table === 'classes'
        if ((table.endsWith('s') || classes) && result.length === 1) {
          const singularTable = table.slice(0, table.length - (classes ? 2 : 1))
          res[singularTable] = result[0]
        }
        res[table] = result
      } else {
        const res = {}
        res[table] = await (await fetch(apiUrl(table))).json()
        this.set(res)
        return this.query(predicates)
      }
    }
    return res
  },

  set: function (values) {
    Object.assign(this.data, values)

    for (const key in values) {
      this.changed(key)
    }
  },

  onChange (table, cb) {
    this.changeCallbacks.push({ cb, table })

    return () => this.changeCallbacks.remove(cb)
  },

  changed (table) {
    for (const cb of this.changeCallbacks) {
      if (cb.table === table || cb.table === '*') {
        cb.cb(table, this.data[table])
      }
    }
  },

  onReadyFor (type, id, cb) {
    if (this.triggeredReady.find(x => x.type === type && x.id === id)) {
      cb()
    } else {
      this.readyCallbacks.push({ cb, id, type })
      return () => this.readyCallbacks.remove(cb)
    }
  },

  readyFor (type, id) {
    for (const cb of this.readyCallbacks) {
      if (cb.type === type && cb.id === id) {
        cb.cb()
        this.triggeredReady.push({ type, id })
      }
    }
  }
}

export default store
