// application error is for unknown errors only
class ApplicationError extends Error{
    constructor(message){
        super()
        this.message = message
    }
    getCode() {return 500;}
}

// for login
class Unauthorized extends ApplicationError{
    constructor(message){
        super(message)
        this.name = 'Unauthorized'
    }
    getCode() {return 401;}
}

// Conflict -> Duplication
class Conflict extends ApplicationError{
    constructor(message){
        super(message)
        this.name = 'Conflict'
    }
    getCode() {return 409;}
}

// Forbidden
class Forbidden extends ApplicationError{
    constructor(message){
        super(message)
        this.name = 'Forbidden'
    }
    getCode() {return 403;}
}

// Badrequest
class Badrequest extends ApplicationError{
    constructor(message){
        super(message)
        this.name = 'Badrequest'
    }
    getCode() {return 400;}
}

// Notfound
class Notfound extends ApplicationError{
    constructor(message){
        super(message)
        this.name = 'Badrequest'
    }
    getCode() {return 404;}
}

module.exports = {
    ApplicationError,
    Unauthorized,
    Conflict,
    Forbidden,
    Badrequest,
    Notfound
}