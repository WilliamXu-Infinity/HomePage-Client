import { useState, useEffect } from 'react';
import "./WorkFlow.sass";

const initialData = [{
  date: new Date().toLocaleDateString(),
  list: [
    { title: "work1", timePassed: 0, timeDuration: 600, completed: false },
    { title: "work2", timePassed: 0, timeDuration: 1200, completed: false },
    { title: "work3", timePassed: 0, timeDuration: null, completed: false }
  ]
}];

const ProgressBar = ({ progressPrec }) => (
  <div className="pb-container">
    <div className="pb-bar" style={{ width: `${progressPrec}%` }}></div>
  </div>
);

const TaskItem = ({
  task,
  index,
  activeIndex,
  isActive,
  onStart,
  onPause,
  updateTime,
}) => {
  const [startTime, setStartTime] = useState(null);
  const [accumulated, setAccumulated] = useState(task.timePassed || 0);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const elapsed = Math.floor((now - startTime) / 1000);
      const total = accumulated + elapsed;

      updateTime(index, total);
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, startTime, accumulated]);

  const handleStart = () => {
    if (!isActive) {
      setStartTime(Date.now());
      onStart(index);
    }
  };

  const handlePause = () => {
    const now = Date.now();
    const elapsed = Math.floor((now - startTime) / 1000);
    const total = accumulated + elapsed;
    setAccumulated(total);
    onPause(index, total);
  };

  return (
    <li className="task-content">
      <input type="checkbox" checked={task.completed} readOnly />
      <span className="task-text">{task.title}</span>
      <span className="task-time">
        {task.timePassed}s
      </span>
      {isActive ? (
        <button onClick={handlePause}>Pause</button>
      ) : (
        <button onClick={handleStart}>Start</button>
      )}
    </li>
  );
};

const TodoList = ({ date, list, activeIndex, onStartTask, onPauseTask, updateTaskTime }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(prev => !prev);

  return (
    <div className="accordion-container">
      <div className="accordion-title" onClick={toggleOpen}>
        <span>{date}</span>
        <span>{isOpen ? "-" : "+"}</span>
      </div>

      {isOpen && (
        <>
          <div className="accordion-divider" />
          <ul className="todo-container">
            {list.map((task, idx) => (
              <TaskItem
                key={idx}
                index={idx}
                task={task}
                isActive={activeIndex === idx}
                activeIndex={activeIndex}
                onStart={onStartTask}
                onPause={onPauseTask}
                updateTime={updateTaskTime}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default function WorkFlow() {
  const [todoList, setTodoList] = useState(initialData);
  const [activeTaskIndex, setActiveTaskIndex] = useState(null);
  const [progressPrec, setProgressPrec] = useState(null);

  const currentList = todoList[0].list;

  const updateTaskTime = (index, timePassed) => {
    const updated = [...currentList];
    updated[index].timePassed = timePassed;

    // 更新进度条
    const task = updated[index];
    if (task.timeDuration) {
      const percentage = Math.min((timePassed / task.timeDuration) * 100, 100);
      setProgressPrec(percentage);
    } else {
      setProgressPrec(null);
    }

    const updatedList = [...todoList];
    updatedList[0].list = updated;
    setTodoList(updatedList);
  };

  const handleStartTask = (index) => {
    // 如果有其他在运行的任务，先暂停
    if (activeTaskIndex !== null && activeTaskIndex !== index) {
      handlePauseTask(activeTaskIndex);
    }
    setActiveTaskIndex(index);
  };

  const handlePauseTask = (index, finalTime) => {
    updateTaskTime(index, finalTime);
    if (activeTaskIndex === index) {
      setActiveTaskIndex(null);
    }
  };

  return (
    <div className="wf-container">
      {progressPrec !== null && <ProgressBar progressPrec={progressPrec} />}
      <TodoList
        date={todoList[0].date}
        list={currentList}
        activeIndex={activeTaskIndex}
        onStartTask={handleStartTask}
        onPauseTask={handlePauseTask}
        updateTaskTime={updateTaskTime}
      />
    </div>
  );
}
