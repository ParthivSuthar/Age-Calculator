import { useCallback, useEffect } from "react"
import { useRef } from "react"
import { useState } from "react"


function App() {

  const [result, setResult] = useState("")
  const [ageInput, setAgeInput] = useState("")
  const ageRef = useRef(null)

  useEffect(() => {
    if(ageRef.current){
      ageRef.current.max = new Date().toISOString().split("T")[0];
    }
  },[])

  const calculateAge = useCallback(() => {
    let birthday = new Date(ageInput)

    let d1 = birthday.getDay()
    let m1 = birthday.getMonth() + 1
    let y1 = birthday.getFullYear()

    let today = new Date()

    let d2 = today.getDay()
    let m2 = today.getMonth()
    let y2 = today.getFullYear()

    let d3, m3, y3;

    y3 = y2 - y1;

    if(m2 >= m1){
      m3 = m2 - m1
    } else {
      y3--
      m3 = 12 + m2 - m1
    }


    if(d2 >= d1){
      d3 = d2 - d1
    } else {
      m3--
      d3 = getDaysInMonth(y1, m1) + d2 - d1
    }


    if(m3 < 0){
      m3 = 11;
      y3--
    }
   
   
    setResult(`You are ${y3} years, ${m3} months and ${d3} days old`)
  },[ageInput])

  function getDaysInMonth(year, month){
    return new Date(year, month, 0).getDate()
  }

  

  return (
    <div className="w-full px-4 text-center py-5">
      <h1 className="text-3xl bg-gradient-to-r from-blue-700 to-yellow-100 text-transparent bg-clip-text font-extrabold">Age Calculator</h1>
      <div className="max-w-2xl mx-auto p-4 my-6 flex bg-slate-400 rounded-lg">
        <input onChange={(e) => setAgeInput(e.target.value)}   value={ageInput} ref={ageRef} type="date" className="w-full px-2" />
        <button onClick={calculateAge} className="bg-red-700 p-2 text-white">Calculate</button>
      </div>
      <p className="text-white text-xl">Result: {result}</p>
    </div>
  )
}

export default App
