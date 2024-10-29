import React, { useState } from 'react'

function Gooup() {

    const colors =["red","black","green"];
    const [color, setColor] = useState("red");
    const possible = ["bg-red-400","bg-black","bg-green-400","bg-green-800"]

  return (

    <div className={`mx-auto max-w-full h-screen bg-${color} bg-bl`}>
        <div>
                   <select
      className={`bg-${color}`}
      value={color} 
      onChange={(e)=>setColor(e.target.value)}
      >
        <option>choose</option>
        {
            colors.map((color)=>{
                return <option value={color}>{color}</option>
            })
        }
      </select>

      <div className={`h-[200px] w-[400px] rounded-lg m-8 shadow-[0_0_20px_theme('colors.purple.700')]`}>

      </div> 
        </div>

        
    </div>

      
  )
}

export default Gooup
