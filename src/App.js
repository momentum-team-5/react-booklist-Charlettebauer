import './App.css'
import 'tachyons'
import Register from './components/Register'
import Login from './components/Login'
import { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route
} from 'react-router-dom'
import Blog from './components/Book'
import { useLocalStorage } from './Hooks'
import Nav from './components/Nav'
import TBR from './components/TBR'
import Read from './components/Read'
import Reading from './components/Reading'
import Books from './components/Book'

function App () {
  const [auth, setAuth] = useLocalStorage('book_auth', null)

  return (
    <Router>
      <div className='App pv3 ph2 mw8 f3 center bg-washed-red'>
        <Nav />
        <Route path='/TBR' component={TBR} />
        <Route path='Read' component={Read} />
        <Route path='Reading' component={Reading} />
        <Route path='Books' component={Books} />

        {auth && (
          <div>
            <span>Logged in as {auth.username}</span> | <button onClick={() => setAuth(null)}>Log out</button>
          </div>
        )}

        <Switch>
          <Route path='/signup'>
            <Register
              auth={auth}
              onRegister={setAuth}
            />
          </Route>
          <Route path='/login'>
            <Login
              auth={auth}
              onLogin={setAuth}
            />
          </Route>
          <Route path='/'>
            <Blog auth={auth} />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
