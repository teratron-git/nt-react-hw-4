import { useEffect, useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.min.css"
import { v4 as uuidv4 } from "uuid"
import st from "./Steps.module.css"

const Steps = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedDistance, setSelectedDistance] = useState(1)
  const [resultAmout, setResultAmount] = useState([])

  console.log("🚀 ~ file: Steps.tsx ~ line 9 ~ Steps ~ resultAmout", resultAmout)

  useEffect(() => {
    const dateMs: any = Date.parse(selectedDate.toString())
    const test = resultAmout.findIndex((item) => {
      return item.date === dateMs
    })
    console.log("🚀 ~ file: Steps.tsx ~ line 32 ~ clickHandler ~ test", test)
  }, [resultAmout])

  function formatDate(date: any) {
    const newDate = new Date(date)
    let dd: number | string = newDate.getDate()
    if (dd < 10) dd = `0${dd}`

    let mm: number | string = newDate.getMonth() + 1
    if (mm < 10) mm = `0${mm}`

    let yy: number | string = newDate.getFullYear() % 100
    if (yy < 10) yy = `0${yy}`

    return `${dd}.${mm}.${yy}`
  }

  const submitHandler = (e: any) => {
    e.preventDefault()
    const dateMs: any = Date.parse(selectedDate.toString())

    // console.log(formatDate(selectedDate))

    const arr = [...resultAmout, { id: uuidv4(), date: dateMs, distance: selectedDistance }]
    const arr2 = arr.sort((a, b) => b.date - a.date)

    console.log("🚀 ~ file: Steps.tsx ~ line 27 ~ clickHandler ~ arr", arr2)
    setResultAmount(arr2)
    console.log("🚀 ~ file: Steps.tsx ~ line 39 ~ clickHandler ~ resultAmout", resultAmout)
  }

  const changeDistance = (e: any) => {
    setSelectedDistance(e.target.value)
  }

  return (
    <div className={st.container}>
      <div className={st.steps}>
        <form className={st.header} onSubmit={(e) => submitHandler(e)}>
          <div className="dateItem">
            <label htmlFor="date">Дата</label>
            <DatePicker
              name="date"
              id="date"
              selected={selectedDate}
              onChange={(date: Date) => setSelectedDate(date)}
              dateFormat="dd.MM.yyyy"
            />
          </div>

          <div className="distanceItem">
            <label htmlFor="distance">км</label>
            <input type="number" name="distance" id="distance" value={selectedDistance} onChange={changeDistance} required />
          </div>

          <input type="submit" name="button" id="button" value="OK" />
        </form>

        <div className={st.result}>
          <ol>
            {console.log(`render ${JSON.stringify(resultAmout)} `)}
            {resultAmout.map((item, i) => (
              <div key={item.id} className={st.resultItem}>
                <li>
                  {formatDate(item.date)} {item.distance}
                  {console.log(`render ${i + 1} - ${formatDate(item.date)} `)}
                </li>
              </div>
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}

export default Steps
