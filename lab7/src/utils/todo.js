export function getActiveCount(list) {
  return list.filter((todo) => !todo.done).length;
}

export function filterTodos(list, status) {
  if (status === "active") return list.filter((todo) => !todo.done);
  if (status === "done") return list.filter((todo) => todo.done);
  return list;
}
