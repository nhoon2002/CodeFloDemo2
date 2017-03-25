export function todosReducer (state={todos: ""}, action) {

  switch(action.type) {
    case "SET_TODOS": {
      console.log("SET TODOS", action.payload);

      return {
        ...state,
        todos: action.payload };
      }
    }
    return state;
  };
