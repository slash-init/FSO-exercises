import axios from 'axios'
const baseUrl = 'api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    if (window.confirm(`${newObject.name} is already added to the phonebook, replace the old number with a new one?`)) {
        const request = axios.put(`${baseUrl}/${id}`, newObject)
        return request.then(response => response.data)
    }
}

const deletion = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}'s contact?`)) {
        const request = axios.delete(`${baseUrl}/${id}`)
        return request.then(response => console.log("Deleted:", response.data))
    }
}

export default { getAll, create, update, deletion }