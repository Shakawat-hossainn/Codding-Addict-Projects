

class customApiError extends Error {
    constructor(message,statusCode){
    super(message)
    this.statusCode = statusCode
    }}


    const createCustomError = (msg,status)=>{
        return new customApiError(msg,status)
    }

    export {createCustomError,customApiError}