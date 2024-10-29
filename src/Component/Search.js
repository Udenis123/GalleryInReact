import React, { useState } from 'react'
import {FaHeart, FaSearch} from 'react-icons/fa'
import { MdMenu } from 'react-icons/md';

function Search({searchTerm}) {
    const[text,setText] =useState('');
    const Submit =(e)=>{
     e.preventDefault();
     searchTerm(text);
     setText('');
    }
  return (
    <>
    <div className='max-w-[full] flex  justify-between items-center py-3 px-3 border-b '>
      <div className='flex items-center text-xl md:text-2xl'>
       <MdMenu size={20}/>
       <h1 className='ml-2 font-bold text-gray-600'>My <span>Gallery</span></h1>
      <div className='group m-2 ml-20 text-red-500 '>
        <FaHeart/>
        <div className='absolute group-hover:bg-red-500/70 h-1 w-5 group-hover:ease-in-out group-hover:duration-500'></div>
        </div> 
      </div>
    
      <div className='max-w-[50%]  md:mr-[10%] px-7 md:px-9 bg-gray-300/40  py-1 rounded-full'>
      <form onSubmit={Submit} className='w-full '>
        <div className='max-w-full flex justify-between '>
            <input className='w-full  bg-transparent text-gray-800 text-xl font-medium focus:outline-none'
             value={text} onChange={(e)=>setText(e.target.value)} type='text' placeholder='Search Image Term ...'/>
            <button className='ml-7  text-teal-400/70'type='submit'>
                <FaSearch size={20}/>
            </button>
           
        </div>
      </form>
      
      </div>
    
      


    </div>


    
    </>


  )
}

export default Search
