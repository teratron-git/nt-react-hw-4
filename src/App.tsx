import { useState } from "react"
import "./App.css"
import Hex2rgb from "./components/Hex2rgb"
import Steps from "./components/Steps"
import TaskSwitcher from "./components/TaskSwitcher"

const App = () => {
  const [task, setTask] = useState("1")

  const handler = (e: any) => {
    setTask(e.target.value)
  }

  return (
    <>
      <TaskSwitcher task={task} onChangeHandler={handler} />

      {task == "1" && <Hex2rgb />}

      {task == "2" && <Steps />}

      {task == "3" && <>Task 3</>}
    </>
  )
}

export default App
