import React from 'react'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

function Login(props) {
    const [username,setUsername] = React.useState('')
    const [password,setPassword] = React.useState('')

    const onChangeUsername = event => {
        setUsername(event.target.value)
    }

    const onChangePassword = event => {
        setPassword(event.target.value)
    }

    const login = () => {
        props.login({username,password})
        props.history.push('/')
    }

    return (
        <Container>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter username'
                        value={username}
                        onChange={onChangeUsername}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={onChangePassword}
                    />
                </Form.Group>
                <Button variant='primary' onClick={login}>Login</Button>
            </Form>
        </Container>
    )
}

export default Login
