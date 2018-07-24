const logger = store => next => (action) => {
  console.group(action.type)
  console.log('the action ', action)
  const returnAction = next(action) // next going to dispatch the action
  console.log('The new state is: ', store.getState())
  console.groupEnd()
  return returnAction
}
export default logger
