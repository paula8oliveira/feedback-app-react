import { useState, useContext, useEffect } from "react"
import Card from "./shared/Card"
import Button from "./shared/Button"
import RatingSelect from "./RatingSelect"
import FeedbackContext from "../context/FeedbackContext"

function FeedbackForm() {
    const [text, setText] = useState('')
    const [rating, setRating] = useState(10)
    const [btnDisabled, setBtnDisabled] = useState('true')
    const [message, setMessage] = useState('')

    const {addFeedback, feedbackEditable, updateFeedback} = useContext(FeedbackContext)

    useEffect(() => {
        if(feedbackEditable.edit === true) {
            setBtnDisabled(false)
            setText(feedbackEditable.item.text)
            setRating(feedbackEditable.item.rating)
        }
    }, [feedbackEditable])

    const handleTextChange = (e) => {
        if(text === '') {
            setBtnDisabled(true)
            setMessage(null)
        } else if (text !== '' && text.trim().length <= 10) {
            setBtnDisabled(true)
            setMessage('Text must be at least 10 characteres')
        } else {
            setBtnDisabled(false)
            setMessage(null)
        }

        setText(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const newFeedback = {
            text,
            rating
        }

        if(feedbackEditable.edit === true) {
            updateFeedback(feedbackEditable.item.id, newFeedback)
        } else {
            addFeedback(newFeedback) 
        }

        

        setText('')

    }

    return (
        <Card>
            <form onSubmit={handleSubmit}>
                <h2>How would you rate your service with us?</h2>
                <RatingSelect  select={(rating) => setRating(rating)}/>
                <div className="input-group">
                    <input onChange={handleTextChange} type="text" placeholder="Write a review" value={text} />
                    <Button type="submit" isDisabled={btnDisabled}>Send</Button>
                </div>
                {message && <div className="message">{message}</div>}
            </form>
        </Card>
    )
}

export default FeedbackForm