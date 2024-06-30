import React from 'react'
import "./dropdown.css"
import {ChevronDown, ChevronUp } from "lucide-react"

const DropDownButton = ({children,open,toggle}) => {
  return (
    <div onClick={toggle} className={`flex align-middle w-full p-2 px-4 bg-white border rounded-lg cursor-pointer shadow-xl ${open? "button-open" : null}`}>{children}{open ? <ChevronDown height={20} width={20} className='flex align-middle justify-center ml-2 mt-1' /> : <ChevronUp height={20} width={20} className='flex align-middle justify-center ml-2 mt-1' /> }</div>
  )
}

export default DropDownButton