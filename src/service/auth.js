import axios from 'axios'
import {baseURL} from './baseURL'
const RegisterAPI = (data) => {
  return new Promise(function (resolve, reject) {
    axios({
      method: 'post',
      data: data,
      url: baseURL + 'auth/signup',
    })
      .then(async function (response) {
        console.log(response)
        resolve(response)
      })

  })

}

const LoginAPI = (data) => {
    return new Promise(function (resolve, reject) {
      axios({
        method: 'post',
        data: data,
        url: baseURL + 'auth/signin',
      })
        .then(async function (response) {
          console.log(response)
          resolve(response)
        })
  
    })
  
  }
export {RegisterAPI, LoginAPI}