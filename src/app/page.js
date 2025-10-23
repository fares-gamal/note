"use client"


import React, { useEffect, useState } from 'react'


function Notes() {


const [note, setNote] = useState("")
const [title, setTitle] = useState("")
const [notes, setNotes] = useState([])
const [color, setColor] = useState("#EBF6F2" )
const [models, setModels] = useState(false)
const [editId,setEditId] = useState(null)
const colors = ['#F9CED7',"#FFF8A7","#B0CDEB" ,"#EBF6F2" ,"#F24822","#4e81f8d0"]

const handleNotes = () => { 
  if(note.trim() === "" && title.trim() === "") return

  if(editId){
    const ubdateNotes = notes.map((n) => n.id === editId ?  {...n,text: note, title: title, color: color} : n)
    setNotes(ubdateNotes)
    setEditId(null)
  }else{
  const newNote = {   id: `${Date.now()}-${Math.floor(Math.random() * 100000)}`,  text:note ,title:title, color:color}
  setNotes([...notes, newNote])

  }
setNote("")
setModels(false)
setTitle("")

}
const handleDelete=(id) => {
  const deleteNote = notes.filter((n) => n.id !== id)
  setNotes(deleteNote)
}
const startEdit = (note) => {
    setEditId(note.id)
    setTitle(note.title)
    setNote(note.text)
    setColor(note.color)
    setModels(true) 
  }

useEffect(() => {
    const saved = localStorage.getItem("lest_notes")
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
       const normalized = parsed.map((n, idx) => ({
    id: n.id ?? `${Date.now()}-${idx}-${Math.floor(Math.random()*100000)}`,
    text: n.text ?? "",
    title: n.title ?? "",
    color: n.color ?? "#EBF6F2",
}))
        setNotes(normalized)
      } catch (e) {
        console.error("Failed to parse saved notes:", e)
        setNotes([])
      }
    }
  }, [])

useEffect(() => {
  localStorage.setItem("lest_notes",JSON.stringify(notes))
},[notes])
  return (
    <div className='  h-full w-full'>

      <div className=' flex justify-center  w-full h-full  ' >
        <div className='w-[500px]  flex flex-col gap-1 justify-center items-center  mt-20'>
       <h1 className="text-[27px] text-[#cec391]  font-bold mb-4">📒 Welcome to Notepad Web</h1>
        <button onClick={() => setModels(true)} className='w-[310px] text-[25px] text-[#FFFFFF]   font-bold rounded-[10px]  h-[47px] bg-[#3471FF] text-center hover:bg-[#223970]'> New Note </button>
        </div>
        </div>
        <div className='flex flex-wrap gap-4 p-6 items-start'>
           {notes.map((not) => (
          <div key={not.id} className='w-[250px] min-h-[150px]  shadow-2xl  gap-22 text-[18px]  p-4 rounded-xl wrap-break-word '
          style={{backgroundColor:not.color}}>
                <h2 className="font-bold text-xl">{not.title}</h2>
          <hr className="my-2"/>

            <p className='whitespace-pre-line'>{not.text}</p>

            <button 
              onClick={() => startEdit(not)} 
              className="mt-2 px-3 py-1 bg-[#223970] text-white rounded hover:bg-[#111c3a]">
               Edit
            </button>
            <button 
              onClick={() => handleDelete(not.id)} 
              className="mt-2 ml-2 px-3 py-1 bg-[#223970] text-white rounded hover:bg-[#111c3a]">
               Delete
            </button>
          </div>
        ))}
        </div>
       
        {models && (
          <div className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center'>
            <div className='bg-white p-6 rounded shadow-lg w-[400px] flex flex-col gap-3'>  

              <input value={title} onChange={(e) => setTitle(e.target.value)} className='border p-2 rounded w-full' />         
              <hr></hr>
            <textarea value={note} placeholder='fares' onChange={(e) => setNote(e.target.value) } className='border p-2 rounded w-full min-h-[100px]'  />
          <div className='flex flex-wrap gap-2 my-2'>
            {colors .map((c) => (
          <button key={c} onClick={() => setColor(c)} className={`w-8 h-8 rounded-full border-2 ${color === c ? "border-black" : "border-amber-600"}`} style={{backgroundColor:c}}></button>
              
            ))}
          <div className='flex gap-3 justify-end'> 
          <button onClick={handleNotes} className='w-[100px] text-[20px] text-[#FFFFFF]   font-bold rounded-[10px]  h-[47px] bg-[#3471FF] text-center hover:bg-[#223970]' >
            {editId !== null ? "Update" : "Add"}
            </button>
          <button onClick={() =>  {setEditId(null), setModels(false)}} className='w-[100px] text-[20px] text-[#FFFFFF]   font-bold rounded-[10px]  h-[47px] bg-[#3471FF] text-center hover:bg-[#223970]' >Close</button>
          </div>
          </div>
            </div>
          </div>
        )}


      


    </div>
  )
}

export default Notes
