import { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import clsx from 'clsx'

export default function Addbook ({ auth }) {
  const [title, setTitle] = useState('')
  const [authors, setAuthors] = useState('')
  const [status, setStatus] = useState('')
  const [feedbackMsg, setFeedbackMsg] = useState('')

  function handleSubmit (event) {
    event.preventDefault()
    axios.post('https://books-api.glitch.me/api/books', {
      title: title,
      authors: authors.split(/\s*,\s*/),
      status: status
    }, { auth })
      .then(response => {
        setFeedbackMsg({ type: 'success', message: 'Book was successfully added!' })
        console.log(response)
      })
      .catch(error => {
        setFeedbackMsg({ type: 'error', message: 'Information was invalid' })
        console.log(error)
      })
  }
  if (feedbackMsg.type === 'success') {
    return (
      <div>
        <Redirect exact to='/' />
      </div>
    )
  }

  if (!auth) {
    return <Redirect to='/login' />
  }

  return (
    <div>
      <h1 className='f2 b washed-yellow'>Add a Book</h1>
      {
          feedbackMsg &&
          (
            <div className={clsx(
              'ba', 'bw1', 'pa3',
              {
                'bg-black': (feedbackMsg.type === 'error'),
                'bg-washed red': (feedbackMsg.type === 'success')
              }
            )}
            >
              {feedbackMsg.message}
            </div>
          )
      }
      <form onSubmit={handleSubmit}>
        <div className='mv2'>
          <label className='db b mv2 washed-yellow' htmlFor='title'>Title</label>
          <input
            required
            type='text'
            id='title'
            value={title}
            onChange={event => setTitle(event.target.value)}
          />
        </div>
        <div className='mv2'>
          <label className='db b mv2 washed-yellow' htmlFor='authors'>Authors</label>
          <input
            required
            type='text'
            id='authors'
            value={authors}
            onChange={event => setAuthors(event.target.value)}
          />
        </div>
        <div className='mv2'>
          <label className='db b mv2 washed-yellow' htmlFor='status'>Status</label>
          <select
            required
            type='text'
            id='status'
            value={status}
            onChange={event => setStatus(event.target.value)}
          >
            <option value='null'>Choose from below</option>
            <option value='toread'>To Read</option>
            <option value='reading'>Reading</option>
            <option value='read'>Read</option>
          </select>

        </div>
        <div className='mv2'>
          <button type='submit'>Submit</button>
          <p><Link className='goBack' to='/'>Go back</Link></p>
        </div>
      </form>
    </div>
  )
}
