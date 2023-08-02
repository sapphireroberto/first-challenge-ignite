import { MouseEvent, ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';
import { CheckCircle, Circle, Notepad, PlusCircle, Trash } from "@phosphor-icons/react";

import { v4 as uuidv4 } from 'uuid';

import styles from './Task.module.css';



export function Task() {
  const [tasks, setTasks] = useState(
    [
      { 
        id: uuidv4(),
        task: 'Estudar ReactJS na Rocketseat',
        conclude: false
      }
    ]
  );
  
  const [newTask, setNewTask] = useState(
    {
      id: '',
      task: '',
      conclude: false
    }
  );


  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    setTasks(
      [
        ...tasks,
        {
         ...newTask
        }
      ]
    );
    setNewTask({id: '', task: '', conclude: false});

    console.log(tasks)
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('');
    setNewTask({id: uuidv4(),task: event.target.value, conclude: false});
    
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity('Esse Campo é obrigatório!');
  }

  function testeTasks(){
  console.log(tasks);
  }

  function handleCheckCompleteTask(event: MouseEvent<HTMLButtonElement>){
    console.log(event.currentTarget.id)
    const changeTask = tasks.map(function(task){
      if(task.id == event.currentTarget.id){

        if(task.conclude == true) {
          task.conclude = false
        }else{
          task.conclude = true
        }
      }
      return task
    })
    console.log(changeTask);
    setTasks(changeTask);
  }

  function handleDeleteTask(event: MouseEvent<HTMLButtonElement>){

    const taskWithoutDeleted = tasks.filter(task => {
      return task.id !== event.currentTarget.id
    })

    setTasks(taskWithoutDeleted)

  }


  

  return(

    <div>
      <form onSubmit={handleCreateNewTask} className={styles.taskForm}>
        <input 
          type="text"
          name="task"
          placeholder="Adicione uma nova tarefa"
          value={newTask.task}
          onChange={handleNewTaskChange}
          onInvalid={handleNewCommentInvalid}
          required
        />

        <div>
          <button type="submit">
            Criar
            <PlusCircle size={16} />
          </button>
        </div>
      </form>

      <section className={styles.tasks}>

        <div className={styles.taskIndicator}>
          
          <div className={styles.taskCreated}>
            <p>Tarefas criadas</p>
            <div className={styles.count}>{tasks.length}</div>
          </div>

          <div className={styles.taskCompleted}>
            <p onClick={testeTasks}>Concluídas</p>
            <div className={styles.count}>
              { tasks.length == 0 ? `0` :
                `
                  ${tasks.reduce((count, task) => {
                    return count + (task.conclude ? 1 : 0) 
                  }, 0 )} de ${tasks.length}
                `
              }
            </div>
          </div>

        </div>

        <div className={styles.taskContainer}>
          <div className={`${styles.taskEmpty} ${tasks.length == 0 ? '' : styles.hasTask}`}>
            <div>
              <Notepad size={56}/>
              <div>
                <p>Você ainda não tem tarefas cadastradas</p>
                <p>Crie tarefas e organize seus itens a fazer</p>
              </div>
            </div>
          </div>

          <div className={styles.tasksList}>
            <ul>
                {tasks.map(function(task){

                  if (task.conclude) {
                    return(
                      <li key={task.id} className={styles.task}>
                        <div className={styles.taskTrue}>
                          <button id={task.id} onClick={handleCheckCompleteTask} className={styles.iconCheck}>
                            <CheckCircle weight='fill' size={17.45}/>
                          </button>

                          <div className={styles.taskText}>{task.task}</div>

                          <button id={task.id} onClick={handleDeleteTask} className={styles.iconDelete}>
                            <Trash size={17.45}/>
                          </button>
                        </div>
                      </li>
                    )
                  }else{
                    return(
                      <li key={task.id} className={styles.task}>
                        <div className={styles.taskFalse}>

                          <button id={task.id} onClick={handleCheckCompleteTask} className={styles.iconCheck}>
                            <Circle size={17.45}/>
                          </button>

                          <div className={styles.taskText}>{task.task}</div>

                          <button id={task.id} onClick={handleDeleteTask} className={styles.iconDelete}>
                            <Trash size={17.45}/>
                          </button>
                        </div>
                      </li>
                    )
                  }
                })}
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}