import { createActions, handleActions } from 'redux-actions'

const { setQueryIds } = createActions({
  SET_QUERY_IDS: ids => ({ ids })
})

const reducer = handleActions({
  [setQueryIds]: (state, { payload: { ids } }) => ({
    queryIds: ids
  })
}, {
  queryIds: []
})

export default reducer
export { setQueryIds }
