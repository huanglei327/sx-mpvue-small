import fly from './flyPlus'

export  function post(apiname, parameters) {
    return new Promise((resolve, reject) => {
        fly.post(apiname, parameters)
            .then(res => {
                resolve(res.data);
            }).catch(err => {
                console.log(err);
                reject(err)
            })
    })
}
export function get(apiname) {
    return new Promise((resolve, reject) => {
        fly.get(apiname)
            .then(res => {
                resolve(res.data);
            }).catch(err => {
                console.log(err);
                reject(err)
            })
    })
}
