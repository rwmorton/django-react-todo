import axios from 'axios'

class TodoDataService {
    url

    constructor(url = 'http://localhost:8000/api') {
        this.url = url
    }

    setUrl(url) {
        this.url = url
    }

    appendToUrl(path) {
        return `${this.url}/${path}`
    }

    setToken(token) {
        axios.defaults.headers.common["Authorization"] = "Token " + token
        axios.defaults.headers.post["Access-Control-Allow-Origin"] = '*'
    }

    getAll(token) {
        this.setToken(token)
        return axios.get(this.appendToUrl('todos'))
    }

    createTodo(data,token) {
        this.setToken(token)
        return axios.put(this.appendToUrl('todos'),data)
    }

    updateTodo(id,data,token) {
        this.setToken(token)
        return axios.put(this.appendToUrl(`todos/${id}`),data)
    }

    deleteTodo(id,token) {
        this.setToken(token)
        return axios.delete(this.appendToUrl(`todos/${id}`))
    }

    toggleTodo(id,token) {
        this.setToken(token)
        return axios.put(this.appendToUrl(`todos/${id}/complete`))
    }

    login(data) {
        console.log(this.appendToUrl('login'))
        console.log('data',data)
        return axios.post(this.appendToUrl('login'),data)
    }

    signup(data) {
        return axios.post(this.appendToUrl('signup'),data)
    }
}

export default new TodoDataService()
