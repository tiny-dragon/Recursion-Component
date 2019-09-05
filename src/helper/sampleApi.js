import axios from 'axios'

export const addEmployee = () => {

}

export const updateEmployee = () => {

}

export const getEmployeeById = (id, callback) => {
    axios.get('http://dummy.restapiexample.com/api/v1/employee/' + id)
        .then(response => {
            callback(null, response.data);
        })
        .catch(function (error) {
            callback(error, null)
        })
}

export const getEmployeeList = (callback) => {
    // fetch('https://jsonplaceholder.typicode.com/todos/1')
    //     .then(response => response.json())
    //     .then(json => console.log(json))

    axios.get('http://dummy.restapiexample.com/api/v1/employees')
        .then(response => {
            callback(null, response.data)
        })
        .catch(function (error) {
            callback(error, null)
        })
}

export const deleteEmployee = (id, callback) => {
    axios.delete('http://dummy.restapiexample.com/api/v1/update/' + id)
        .then(response => {
            callback(null, id);
        })
        .catch(function (error) {
            callback(error, null)
        })
}