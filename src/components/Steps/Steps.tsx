import { useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.min.css"
import st from "./Steps.module.css"

const Steps = () => {
  const [startDate, setStartDate] = useState(new Date())

  return (
    <div className={st.container}>
      <div className={st.steps}>
        <div className={st.header}>
          <div className="dateItem">
            <label htmlFor="date">Дата</label>
            <DatePicker
              name="date"
              id="date"
              selected={startDate}
              onChange={(date: Date) => setStartDate(date)}
              dateFormat="dd.MM.yyyy"
            />
          </div>
          <div className="distanceItem">
            <label htmlFor="distance">км</label>
            <input type="number" name="distance" id="distance" />
          </div>

          <input type="button" name="button" id="button" value="OK" />
        </div>

        <div className={st.result}>2</div>
      </div>
    </div>
  )
}

export default Steps
