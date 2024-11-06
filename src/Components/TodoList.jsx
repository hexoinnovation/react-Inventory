// src/components/TodoList.jsx
const TodoList = () => {
    return (
      <div className="todo">
        <div className="head">
          <h3>Todos</h3>
          <i className="bx bx-plus"></i>
          <i className="bx bx-filter"></i>
        </div>
        <ul className="todo-list">
          {['Todo List', 'Todo List', 'Todo List', 'Todo List', 'Todo List'].map((item, index) => (
            <li key={index} className={index % 2 === 0 ? 'completed' : 'not-completed'}>
              <p>{item}</p>
              <i className="bx bx-dots-vertical-rounded"></i>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default TodoList;
  