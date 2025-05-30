import React, { useState, useEffect } from 'react'

const exampleData = [
    {
        buttonId: '000000',
        title: 'Closure',
        note: 'Closure is a function that returns a function. It gives you access to an outer function’s scope from an inner function. In JavaScript, closures are created every time a function is created, at function creation time.',
        createTime: '2021-08-14-10-00',
        lastTimeChecked: '2021-08-15-10-00',
    },
    {
        buttonId: '000001',
        title: 'Closure',
        note: 'Closure is a function that returns a function. It gives you access to an outer function’s scope from an inner function. In JavaScript, closures are created every time a function is created, at function creation time.',
        createTime: '2021-08-14-10-00',
        lastTimeChecked: '2021-08-15-10-00',
    },
    {
        buttonId: '000002',
        title: 'Closure',
        note: 'Closure is a function that returns a function. It gives you access to an outer function’s scope from an inner function. In JavaScript, closures are created every time a function is created, at function creation time.',
        createTime: '2021-08-14-10-00',
        lastTimeChecked: '2021-08-15-10-00',
    }
]

// I want to create a button that have 7 days timer on it and if the user click on it, it will reset the memory of the user, the timer will have different color on each day left.
const FreshMemory = () => {
    const [buttonGroup, setButtonGroup] = React.useState(exampleData)
    const [currentNoteId, setCurrentNoteId] = React.useState('')

    const handleButtonClick = (buttonId) => {
        setCurrentNoteId(buttonId)
    }

    return (
        <div className='container-FM'>
            {buttonGroup.map((button, index) => {
                const {buttonId, title, note, createTime, lastTimeChecked} = button

                return (
                    <>
                        <button className='container-button' key={buttonId} onClick={() => handleButtonClick(buttonId)}>
                            {title}
                        </button>
                        <div className='container-note'>
                            <div className='note-title'>{title}</div>
                            <div className='note-content'>{note}</div>
                        </div>
                    </>
                )
            })}
        </div>
    )
}

export default FreshMemory
