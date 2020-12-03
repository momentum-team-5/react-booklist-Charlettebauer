import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect, NavLink, Link, useParams } from 'react-router-dom'

const Books = ({ auth }) => {
  const [books, setBooks] = useState([])
  const { status } = useParams()
  const statuses = ['toread', 'reading', 'read']
  const statusLabels = { toread: 'To Read', reading: 'Reading', read: 'Read' }

  const getBooks = () => {
    axios
      .get('https://books-api.glitch.me/api/books', {
        auth: auth
      })
      .then((response) => {
        setBooks(response.data.books)
      })
  }

  useEffect(getBooks, [auth])

  if (!auth) {
    return <Redirect to='/login' />
  }

  function markBookAsStatus (book, status) {
    axios.put('https://books-api.glitch.me/api/books/' + book._id, {
      title: book.title,
      authors: book.authors,
      status: status
    }, { auth: auth })
      .then(res => {
        getBooks()
      })
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
      <h1 className='title'>Book List</h1>
      <div className='key flex'>
        <h3 className='all ma2'>
          <NavLink to='/' exact>All Books</NavLink>
        </h3>
        <h3 className='reading ma2 white'>
          <NavLink to='/books/reading'>Reading</NavLink>
        </h3>
        <h3 className='toread ma2'>
          <NavLink to='/books/toread'>To Read</NavLink>
        </h3>
        <h3 className='read ma2'>
          <NavLink to='/books/read'>Read</NavLink>
        </h3>
        <h3 className='add ma2'>
          <NavLink to='/add'>Add a book</NavLink>
        </h3>
      </div>
      {booksToShow.map(book => (
        <div key={book._id}>
          <Link className='bookTitle' to={'/books/' + book._id}>{book.title || 'No Title'}</Link>
          <p>Written by {book.authors}</p>
          <p>Book Status: {statusLabels[book.status]}</p>
          {statuses.filter(s => s !== book.status).map(status => (
            <button key={status} onClick={() => markBookAsStatus(book, status)}>
              Mark as {statusLabels[status]}
            </button>

          ))}
          <p><button onClick={() => deleteBook(book)}>Delete book</button></p>
          <p><Link className='editBook' to={'/edit/' + book._id}>Edit Book</Link></p>
        </div>
      ))}
    </div>
  )
}

export default Books
