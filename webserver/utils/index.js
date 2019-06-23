const errors = require('./errors');

module.exports = {
    DatabaseError: errors.DatabaseError,
    NotFoundError: errors.NotFoundError,
    CreateTaskError: errors.CreateTaskError,
    BadParameterError: errors.BadParameterError,
    PersistentStoreError: errors.PersistentStoreError
};
