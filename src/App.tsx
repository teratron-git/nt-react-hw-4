import { useState } from "react"
import "./App.css"
import TaskSwitcher from "./components/TaskSwitcher"

const App = () => {
  const [task, setTask] = useState("1")

  const handler = (e: any) => {
    setTask(e.target.value)
  }

  return (
    <>
      <TaskSwitcher task={task} onChangeHandler={handler} />

      {task == "1" && <>Task 1</>}

      {task == "2" && <>Task 2</>}

      {task == "3" && <>Task 3</>}
    </>
  )
}

export default App
