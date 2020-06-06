/*global chrome*/
import axios from 'axios'
import { baseURL } from './baseURL'

const AddHolderAPI = (data, token) => {
    return new Promise(function (resolve, reject) {
        axios.post( 
            baseURL+'holder/add',
            data,
            {headers: { Authorization: `Bearer ${token}` }}
          )
            .then(async function (response) {
                resolve(response)
            })

    })

}

const GetHolderAPI = ( token) => {
    return new Promise(function (resolve, reject) {
        axios.get( 
            baseURL+'holder',
            {headers: { Authorization: `Bearer ${token}` }}
          )
            .then(async function (response) {
                resolve(response)
            })
    })
}

const DeleteHolderAPI = (id, token) => {
    return new Promise(function (resolve, reject) {
        axios.delete( 
            baseURL+'holder/'+id,
            {headers: { Authorization: `Bearer ${token}` }}
          )
            .then(async function (response) {
                resolve(response)
            })
    })
}

export { AddHolderAPI, GetHolderAPI, DeleteHolderAPI }