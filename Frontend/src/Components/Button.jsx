import React from 'react';
import { useState } from 'react';
const Button = () => {
    const [location, setLocation]= useState("")
    const handleClick = () =>{
       setLocation([59.505, -0.09])
       console.log(location)
    }
    return (    
        <div className='flex justify-center my-5'>
            <button className="rounded-full bg-gray-800 px-5 py-3 text-base font-medium text-white transition duration-200 hover:bg-gray-700 active:bg-gray-700 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-700 dark:active:bg-gray-700 mr-4 border-none" onClick={handleClick}>
                Manchester
            </button>
            <button className="rounded-full bg-gray-800 px-5 py-3 text-base font-medium text-white transition duration-200 hover:bg-gray-700 active:bg-gray-700 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-700 dark:active:bg-gray-700 mx-2 border-none" onClick={handleClick}>
                London
            </button>
            <button className="rounded-full bg-gray-800 px-5 py-3 text-base font-medium text-white transition duration-200 hover:bg-gray-700 active:bg-gray-700 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-700 dark:active:bg-gray-700 mx-2 border-none" onClick={handleClick}>
                Sheffield
            </button>
            <button className="rounded-full bg-gray-800 px-5 py-3 text-base font-medium text-white transition duration-200 hover:bg-gray-700 active:bg-gray-700 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-700 dark:active:bg-gray-700 mx-2 border-none" onClick={handleClick}>
                Leeds
            </button>
            <button className="rounded-full bg-gray-800 px-5 py-3 text-base font-medium text-white transition duration-200 hover:bg-gray-700 active:bg-gray-700 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-700 dark:active:bg-gray-700 ml-4 border-none" onClick={handleClick}>
                Birmingham
            </button>
        </div>
    );
}

export default Button;
