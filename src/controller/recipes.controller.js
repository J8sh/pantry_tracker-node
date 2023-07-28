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

export const getRecipes = (req, res) => {
    Logger.info(`${req.method} ${req.values}, fetching recipes`);
    database.query(QUERY.SELECT_USERS, (error, results) => {
        if(!results){
            res.status(HttpStatus.OK.code).send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `No users found`));
        }else{
            res.status(HttpStatus.OK.code).send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Users retrieved`, { recipes: results }));
        }
    })
}

export const createRecipe = (req, res) => {
    Logger.info(`${req.method}, creating recipe`);
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

export const getRecipe = (req, res) => {
    Logger.info(`${req.method} ${req.originalurl}, fetching recipe`);
    database.query(QUERY.SELECT_USER, Object.values(req.body), (error, results) => {
        if(!results){
            res.status(HttpStatus.NOT_FOUND.code).send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `User by email ${req.params.email} was not found or password did not work`));
        }else{
            // session

            res.status(HttpStatus.OK.code).send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `user retrieved`, results ));
        }
    })
}



export default HttpStatus;