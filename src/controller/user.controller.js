import database from '../config/mysql.config.js';
import Response from '../domain/response.js';
import Logger from '../util/logger.js';
import QUERY from '../query/user.query.js';

const HttpStatus = {
    OK: { code: 200, status: 'OK' },
    CREATED: { code: 201, status: 'CREATED' },
    NO_CONTENT: { code: 204, status: 'NO_CONTENT' },
    BAD_REQUEST: { code: 400, status: 'BAD_REQUEST' },
    NOT_FOUND: { code: 404, status: 'NOT_FOUND' },
    INTERNAL_SERVER_ERROR: { code: 500, status: 'INTERNAL_SERVER_ERROR' }
};

export const getUsers = (req, res) => {
    Logger.info(`${req.method} ${req.values}, fetching users`);
    database.query(QUERY.SELECT_USERS, (error, results) => {
        if(!results){
            res.status(HttpStatus.OK.code).send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `No users found`));
        }else{
            res.status(HttpStatus.OK.code).send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Users retrieved`, { users: results }));
        }
    })
}

export const createUser = (req, res) => {
    Logger.info(`${req.method}, creating user`);
    // hash password here
    
    database.query(QUERY.CREATE_USER, Object.values(req.body), (error, results) => {
        if(!results){
            Logger.error(error.message);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `Error occurred`));
        }else{
            // create session
            const user = { id: results.insertedId, ...req.body, registration_date: new Date() };
            res.status(HttpStatus.CREATED.code).send(new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, `user created`, { user }));
        }
    })
}

export const getUser = (req, res) => {
    Logger.info(`${req.method} ${req.originalurl}, fetching user`);
    database.query(QUERY.SELECT_USER, Object.values(req.body), (error, results) => {
        if(!results){
            res.status(HttpStatus.NOT_FOUND.code).send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `User by email ${req.params.email} was not found or password did not work`));
        }else{
            // session
            req.session.regenerate(function (err) {
                if (err) next(err)
            
                // store user information in session, typically a user id
                req.session.user = results[0]
            
                // save the session before redirection to ensure page
                // load does not happen before session is saved
                req.session.save(function (err) {
                    if (err) return next(err)
                    res.status(HttpStatus.OK.code).send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `user retrieved`, results ));
                })
            })
        }
    })
}

export const updateUser = (req, res) => {
    Logger.info(`${req.method} ${req.originalurl}, fetching user`);
    database.query(QUERY.SELECT_USER, [req.params.email], [req.params.password], (error, results) => {
        if(!results[0]){
            res.status(HttpStatus.NOT_FOUND.code).send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `User by email ${req.params.email} was not found or password did not work`));
        }else{
            Logger.info(`${req.method} ${req.originalurl}, updating user`);
            database.query(QUERY.UPDATE_USER, [...Object.values(req.body), req.params.id],  (error, results) => {
                if(!error){
                    res.status(HttpStatus.OK.code).send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `User updated`, { id: req.params.id, ...req.body}))
                }else{
                    Logger.error(error.message);
                    res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `Error occured`));
                }
            });
        }
    })
}

export const deleteUser = (req, res) => {
    Logger.info(`${req.method} ${req.originalurl}, deleting user`);
    database.query(QUERY.DELETE_USER, [req.params.email], (error, results) => {
        if (results.affectedRows > 0) {
            res.status(HttpStatus.OK.code).send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `user deleted`, results[0]));
        } else {
            res.status(HttpStatus.NOT_FOUND.code).send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `User by email ${req.params.id} was not found`));
        }
    })
}

export default HttpStatus;