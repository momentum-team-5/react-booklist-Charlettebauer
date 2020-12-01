import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect, NavLink, useParams } from 'react-router-dom'

const Books = ({ auth }) => {
  const [books, setBooks] = useState([])
  const { status } = useParams()

  useEffect(() => {
    axios
      .get('https://books-api.glitch.me/api/books', {
        auth: auth
      })
      .then((response) => {
        setBooks(response.data.books)
      })
  }, [auth])

  if (!auth) {
    return <Redirect to='/login' />
  }

  let booksToShow = books
  if (status) {
    booksToShow = books.filter(book => book.status === status)
  }

  function deleteBook (bookToDelete) {
    axios.delete(`https://books-api.glitch.me/api/books/${bookToDelete._id}`, {
      auth: auth
    })
      .then(res => {
        // Remove the book that we just deleted
        // from our books array in state.
        setBooks(books.filter(currentBook => (
          currentBook._id !== bookToDelete._id)
        ))
      })
  }

  return (
    <div className='Books'>
      <h1 className='mh2 mv3'>Book List</h1>
      <div className='key flex'>
        <h3 className='all ma2'>
          <NavLink to='/' exact>All Books</NavLink>
        </h3>
        <h3 className='reading ma2'>
          <NavLink to='/books/reading'>Reading</NavLink>
        </h3>
        <h3 className='toread ma2'>
          <NavLink to='/books/toread'>To Read</NavLink>
        </h3>
        <h3 className='read ma2'>
          <NavLink to='/books/read'>Read</NavLink>
        </h3>
      </div>
      {booksToShow.map((book) => (
        <div key={book.id}>
          <h2>{book.title}</h2>
          <p>{book.text}</p>
          <p>Written by {book.authors}</p>
          <p>Book Status: {book.status}</p>
          <p><button onClick={() => deleteBook(book)}>Delete book</button></p>
        </div>
      ))}
    </div>
  )
}

export default Books
