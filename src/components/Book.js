import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const Books = ({ auth }) => {
  const [books, setBooks] = useState([])

  useEffect(() => {
    axios
      .get('https://books-api.glitch.me/api/books', {
        auth: auth
      })
      .then((response) => {
        setBooks(response.data.books)
      })
  })

  if (!auth) {
    return <Redirect to='/login' />
  }

  return (
    <div className='Books'>
      <h1>Books</h1>
      {books.map((book) => (
        <div key={book.id}>
          <h2>{book.title}</h2>
          <p>{book.text}</p>
          <p>Written by {book.author}</p>
        </div>
      ))}
    </div>
  )
}

export default Books
