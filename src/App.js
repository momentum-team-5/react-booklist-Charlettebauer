import './App.css'
import 'tachyons'
import Register from './components/Register'
import Login from './components/Login'
import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route
} from 'react-router-dom'
import { useLocalStorage } from './Hooks'
import Books from './components/Books'

function App () {
  const [auth, setAuth] = useLocalStorage('book_auth', null)

  return (
    <Router>
      <div className='User'>
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
          <Route path='/books/:status'>
            <Books auth={auth} />
          </Route>
          <Route path='/'>
            <Books auth={auth} />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
