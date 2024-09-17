import react from "react"
import { createContext, useContext } from "react"

export const NoteContext = createContext({
    note: [
        {
            id: 1,
            note : "messagenote"
        }
    ],
    addnote: (note)=>{},
    updatenote:(id,note)=>{},
    daletenote:(id)=>{},
})

export const useNote = ()=>{
    return useContext(NoteContext);
}
export const NoteProvider = NoteContext.Provider