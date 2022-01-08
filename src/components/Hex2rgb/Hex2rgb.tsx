import { useState } from "react"
import st from "./Hex2rgb.module.css"

const Hex2rgb = () => {
  const [hex, setHex] = useState("")
  const [result, setResult] = useState("")

  const hexHandler = (e: any) => {
    if (e.target.value.length !== 7) {
      setHex(e.target.value)
      setResult("")
    } else {
      setHex(e.target.value)
      const r = `${e.target.value[1]}${e.target.value[2]}`
      const g = `${e.target.value[3]}${e.target.value[4]}`
      const b = `${e.target.value[5]}${e.target.value[6]}`
      setResult(
        e.target.value.match(/^#[0-9a-f]{6}$/i)
          ? `rgb(${hex2rgbConverter(r)},${hex2rgbConverter(g)},${hex2rgbConverter(b)})`
          : "ОШИБКА!"
      )
    }
  }

  const hex2rgbConverter = (hexVal: string): number => parseInt(hexVal, 16)

  return (
    <div className={st.container} style={hex.length === 7 ? { backgroundColor: hex } : {}}>
      <input type="text" className={st.hex} value={hex} onChange={(e) => hexHandler(e)} maxLength={7} placeholder="#000000" />
      <div className={st.rgb} style={result === "ОШИБКА!" ? { backgroundColor: "red" } : {}}>
        {result}
      </div>
    </div>
  )
}

export default Hex2rgb
