import React, { useState } from "react"
import JsonData from './data.json'
import { logRoles } from "@testing-library/react"

function ShareNotes({}) {
    const NoteData = JsonData.data.sort((a, b) => {
        const timeA = new Date(a.modifyTime);
        const timeB = new Date(b.modifyTime);
        return timeA - timeB;
    })
    const [currentNote, setcurrentNote] = useState(0)
    const changeNote = (index) => {
        setcurrentNote(() => index)
    }

    const NoteFileLists = (NotesData) => {
        
    }

    const NoteContent = ({contents}) => {
        console.log('\x1b[31m%s\x1b[0m', `WX - contents: ${JSON.stringify(contents)}`)
        return (
            <ul>
                {contents.map((content) => {
                    const {contentText, children} = content

                    return (
                        <li key={content.contentText}>
                            <p>{contentText}</p>
                            {children && <NoteContent contents={children} />}
                        </li>
                        
                    )
                })}
            </ul> 
        )
    }

    const MenuHeader = () => {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-7">
                        <button type="button" className="btn btn-outline-success">Success</button>
                    </div>
                    <div className="col-md-3">
                        <button type="button" className="btn btn-success">Success</button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="P_ShareNotes">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2">
                    <div className="scrollable-list">
                        <ul className="list-group">
                        <MenuHeader />
                        {NoteData.map((file, index) => (
                            <li 
                                key={file.title} 
                                className="list-group-item"
                                onClick={() => changeNote(index)}
                            >
                                {file.title}
                            </li>
                        ))}
                        </ul>
                    </div>
                    </div>
                    <div className="col-md-10">
                        <ul className="list-group">
                        {NoteData[currentNote].notes.map((note, index) => (
                            <li 
                                key={note.header} 
                                className="list-group-item"
                            >
                                {note.header}
                                <NoteContent contents={note.children}/>
                            </li>
                        ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShareNotes