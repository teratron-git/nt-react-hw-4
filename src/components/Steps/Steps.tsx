import React, { Dispatch, SetStateAction, useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.min.css"
import { v4 as uuidv4 } from "uuid"
import st from "./Steps.module.css"

interface IResultItem {
  id: string
  date: Date
  distance: number | string
}

const Steps = () => {
  const [selectedDate, setSelectedDate]: [Date, Dispatch<SetStateAction<Date>>] = useState<Date>(undefined)
  const [selectedDistance, setSelectedDistance]: [number | string, Dispatch<SetStateAction<number | string>>] = useState<
    number | string
  >(undefined)
  const [resultAmout, setResultAmount] = useState<IResultItem[]>([])

  function formatDate(date: any) {
    const newDate = new Date(date)
    let dd: number | string = newDate.getDate()
    if (dd < 10) dd = `0${dd}`
    let mm: number | string = newDate.getMonth() + 1
    if (mm < 10) mm = `0${mm}`
    const yy: number | string = newDate.getFullYear()

    return `${dd}.${mm}.${yy}`
  }

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const dateMs: any = Date.parse(selectedDate.toString())
    const found = resultAmout.findIndex((item) => item.date === dateMs)

    if (found == -1) {
      setResultAmount(
        [...resultAmout, { id: uuidv4(), date: dateMs, distance: selectedDistance }].sort((a, b) => b.date - a.date)
      )
    } else {
      resultAmout[found].date = dateMs
      resultAmout[found].distance = +resultAmout[found].distance + +selectedDistance
      setResultAmount([...resultAmout])
    }

    setSelectedDate(undefined)
    setSelectedDistance("")
  }

  const changeDistance = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDistance(e.target.value)
  }
  const deleteHandler = (id: string) => {
    setResultAmount(resultAmout.filter((item) => item.id !== id))
  }
  const editHandler = (id: string, date: Date, distance: number) => {
    deleteHandler(id)
    setSelectedDate(new Date(date))
    setSelectedDistance(distance)
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
              required
              autoComplete="off"
              maxDate={new Date()}
            />
          </div>

          <div className="distanceItem">
            <label htmlFor="distance">Дистанция</label>
            <input
              type="number"
              name="distance"
              id="distance"
              value={selectedDistance}
              onChange={changeDistance}
              required
              autoComplete="off"
              step={0.1}
            />
          </div>

          <input type="submit" name="button" id="button" value="OK" />
        </form>

        <div className={st.result}>
          <ol>
            <li className={st.resultHeader}>
              <span>Дата</span>
              <span>Дистанция</span>
              <span>Действия</span>
            </li>

            {resultAmout.map((item, i) => (
              <div key={item.id} className={st.resultItem}>
                <li>
                  <span>{formatDate(item.date)}</span>
                  <span>{item.distance}</span>

                  <span>
                    <i className="far fa-edit" onClick={() => editHandler(item.id, item.date, item.distance as number)} />
                    <i className="far fa-window-close" onClick={() => deleteHandler(item.id)} />
                  </span>
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
