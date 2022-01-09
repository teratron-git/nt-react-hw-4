import { useEffect, useState } from "react"
import st from "./Hex2rgb.module.css"

const Hex2rgb = () => {
  const [hex, setHex] = useState("")
  const [result, setResult] = useState("")

  const hex2rgbConverter = (hexVal: string): number => parseInt(hexVal, 16)

  useEffect(() => {
    if (hex.length === 7) {
      const r = `${hex[1]}${hex[2]}`
      const g = `${hex[3]}${hex[4]}`
      const b = `${hex[5]}${hex[6]}`
      setResult(
        hex.match(/^#[0-9a-f]{6}$/i) ? `rgb(${hex2rgbConverter(r)},${hex2rgbConverter(g)},${hex2rgbConverter(b)})` : "ОШИБКА!"
      )
    }
  }, [hex])

  const hexHandler = (e: any) => {
    if (e.target.value.length !== 7) {
      setHex(e.target.value)
      setResult("")
    } else {
      setHex(e.target.value)
    }
  }

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
