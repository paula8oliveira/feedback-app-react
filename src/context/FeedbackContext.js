import {v4 as uuidv4} from 'uuid'
import { createContext, useState, useEffect } from "react";

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
    const[isloading, setIsLoading] = useState(true)
    const [feedback, setFeedback] = useState([])

    const [feedbackEditable, setfeedbackEditable] = useState({
        item: {},
        edit: false
    })

    useEffect(() => {
        fetchFeedback()
    }, [])

    const fetchFeedback = async () => {
        const response = await fetch(`http://localhost:5000/feedback?_sort=id&_order=desc`)
        const data = await response.json()

        setFeedback(data)
        setIsLoading(false)
    }

    const deleteFeedback = (id) => {
        if(window.confirm('Are you sure you want to delete?')) {
            setFeedback(feedback.filter((item) => item.id !== id))
        }
    }

    const addFeedback = (newFeedback) => {
        newFeedback.id = +uuidv4()
        setFeedback([newFeedback, ...feedback])
    }

    const updateFeedback = (id, updItem) => {
        setFeedback(feedback.map((item) => (
            item.id === id ? {...item,  ...updItem} : item))
        )
    }

    const editFeedback = (item) => {
        setfeedbackEditable({
            item,
            edit: true
        })
    }

    return <FeedbackContext.Provider 
        value={{
            feedback,
            feedbackEditable,
            isloading,
            deleteFeedback,
            addFeedback,
            editFeedback,
            updateFeedback,
        }}
    >
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext