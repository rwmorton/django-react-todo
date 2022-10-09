import React from 'react'
import logo from './logo.svg';
import {Switch,Route,Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import AddTodo from './components/add-todo'
import TodosList from './components/todos-list'
import Login from './components/login'
import Signup from './components/signup'

import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'

import TodoDataService from './services/todos'

function App() {
  const [user,setUser] = React.useState(null)
  const [token,setToken] = React.useState(null)
  const [error,setError] = React.useState('')

  async function login(user = null) {
    console.log('logging in...')
    TodoDataService.login(user)
    .then(response => {
      setToken(response.data.token)
      setUser(user.username)
      localStorage.setItem('token',token)
      localStorage.setItem('user',user)
      setError('')
    })
    .catch(error => {
      console.log('login',error)
      setError(error.toString())
    })
  }

  async function logout() {
    setUser(null)
  }

  async function signup(user = null) {
    setUser(user)
  }

  return (
    <div className="App">
      <Navbar bg="primary" variant="dark">
        <div className="container-fluid">
          <Navbar.Brand>Todos App</Navbar.Brand>
          <Nav className="me-auto">
            <Container>
              <Link className="nav-link" to={"/todos"}>Todos</Link>
              {user ? (
                <Link className="nav-link">Logout {{user}}</Link>
              ) : (
                <>
                  <Link className="nav-link" to={"/login"}>Login</Link>
                  <Link className="nav-link" to={"/signup"}>Signup</Link>
                </>
              )}
            </Container>
          </Nav>
        </div>
      </Navbar>

      <div className="container mt-4">
        <Switch>
          <Route
            exact
            path={["/","/todos"]}
            render={props => <TodosList {...props} token={token} />}
          ></Route>

          <Route
            path="/todos:id"
            render={props => <AddTodo {...props} token={token} />}
          ></Route>

          <Route
            path="/login"
            render={props => <Login {...props} login={login} />}
          ></Route>

          <Route
            path="/signup"
            render={props => <Signup {...props} signup={signup} />}
          ></Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
