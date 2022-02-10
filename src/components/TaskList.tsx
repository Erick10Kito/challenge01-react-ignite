import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    if (!newTaskTitle) return alert('poe a porra do titulo');

    const newTask = {
      id: Math.random(),
      title: newTaskTitle,
      isComplete: false
    }
    setTasks(oldstate => [...oldstate, newTask])
    //esse oldstate foi usado para salvar os dados antigos que estavam la antes, e depois adicionar um novo utilizando o newTask
    setNewTaskTitle('');
    //resetei pro começo para que ele nao fique aparecendo na tela dps de eu ja ter enviado a atividade
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    const completedTask = tasks.map(task => task.id === id ? {
      ...task, isComplete: true
    } : task)

    setTasks(completedTask)
  }


  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    const filteredTasks = tasks.filter(task => task.id !== id);//esse ultimo id se refere ao id entre parenteses na função
    //nesse const ele vai retornar todas as tasks que o id dela for diferente que o id que foi passado no handleRemoveTasks
    //ou seja ele vai retornar somente as tasks que nao estiverem chamando o handleRemove
    setTasks(filteredTasks)

  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            //onChange= sempre que mudar vai executar a função
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    //task checada
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  //quando clicar a função referida ira executar com o parametro task.id
                  //na linha <div className={task.isComplete ? 'completed' : ''} data-testid="task" > significa que se task for isComolete a classe vai se chamar completed
                  />

                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16} />
              </button>
            </li>
          ))}

        </ul>
      </main>
    </section>
  )
}