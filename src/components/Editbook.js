import { useEffect, useState } from 'react'
import { Redirect, useParams, Link } from 'react-router-dom'
import axios from 'axios'
import clsx from 'clsx'

export default function EditBook ({ auth }) {
  const [book, setBook] = useState({})
  const { id } = useParams()
  const [title, setTitle] = useState('')
  const [authors, setAuthors] = useState('')
  const [status, setStatus] = useState('')
  const [feedbackMsg, setFeedbackMsg] = useState('')

  useEffect(() => {
    axios.get('https://books-api.glitch.me/api/books/' + id, {
      auth: auth
    })
      .then(response => {
        setBook(response.data.book)
      })
  }, [auth, id])

  function handleEdit (e) {
    e.preventDefault()
    axios.put('https://books-api.glitch.me/api/books/' + id, {
      title: title,
      authors: authors.split(/\s*,\s*/),
      status: status
    }, { auth })
      .then(response => {
        setFeedbackMsg({ type: 'success', message: 'The book was edited successfully.' })
        console.log(response)
      })
      .catch(error => {
        setFeedbackMsg({ type: 'error', message: 'The book information you entered is not valid' })
        console.log(error)
      })
  }

  if (!auth) {
    return <Redirect to='/' />
  }

  if (feedbackMsg.type === 'success') {
    return (
      <div>
        <Redirect exact to='/' />
      </div>
    )
  }

  return (
    <div>
      <h1 className='ma2'>Edit Book</h1>
      {
        feedbackMsg &&
        (
          <div className={clsx(
            {
              'bg-navy': (feedbackMsg.type === 'error'),
              white: (feedbackMsg.type === 'error'),
              'bg-dark-green': (feedbackMsg.type === 'success')
            }
          )}
          >
            {feedbackMsg.message}
          </div>
        )
      }

      <form onSubmit={handleEdit}>
        <div>
          <div className='mh2 mv2'>
            <label className='mv2 b' htmlFor='title'>Title</label>
            <input
              required
              type='text'
              id='title'
              value={title}
              onChange={event => setTitle(event.target.value)}
              name='bookTitle'
              component='input'
              placeholder={book.title}
            />
          </div>
          <div className='mh2 mv2'>
            <label className='mv2 b' htmlFor='authors'>Authors</label>
            <input
              required
              type='text'
              id='authors'
              value={authors}
              onChange={event => setAuthors(event.target.value)}
              name='bookAuthors'
              component='input'
              placeholder={book.authors}
            />
          </div>
          <div className='mh2 mv2'>
            <label className='mv2 b' htmlFor='status'>Status</label>
            <select
              required
              id='status'
              value={status}
              onChange={event => setStatus(event.target.value)}
              name='bookStatus'
            >
              <option value='null'>Choose book status</option>
              <option value='toread'>To Read</option>
              <option value='reading'>Reading</option>
              <option value='read'>Read</option>
            </select>

          </div>
          <button className='mh2 mv2' type='submit'>Submit</button>
          <p><Link className='goBack' to='/'>Go back</Link></p>
        </div>
      </form>
    </div>
  )
}
