class DatabaseError extends Error {
    constructor(message = 'Database error') {
        super();
        this.message = message;
    }
}

class NotFoundError extends Error {
    constructor(message = 'Not found') {
        super();
        this.message = message;
    }
}

class PersistentStoreError extends Error {
    constructor(message = 'Error on store file to server') {
        super();
        this.message = message;
    }
}

class BadParameterError extends Error {
    constructor(message = 'Missing parameter') {
        super();
        this.message = message;
    }
}

class CreateTaskError extends Error {
    constructor(message = 'Unable to push task to queue') {
        super();
        this.message = message;
    }
}

module.exports = {
    DatabaseError,
    NotFoundError,
    CreateTaskError,
    BadParameterError,
    PersistentStoreError
};
