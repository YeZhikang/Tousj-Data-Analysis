let count = 0;

function increaseCount( state ) {
  state.count ++
}

function mu_increaseCount( {commit} ) {
  commit("increaseCount")
}

export {
  count,
  increaseCount,
  mu_increaseCount
}
