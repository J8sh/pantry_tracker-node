import database from '../config/mysql.config.js';
import Response from '../domain/response.js';
import Logger from '../util/logger.js';
import QUERY from '../query/ingredients.query.js';

const HttpStatus = {
    OK: { code: 200, status: 'OK' },
    CREATED: { code: 201, status: 'CREATED' },
    NO_CONTENT: { code: 204, status: 'NO_CONTENT' },
    BAD_REQUEST: { code: 400, status: 'BAD_REQUEST' },
    NOT_FOUND: { code: 404, status: 'NOT_FOUND' },
    INTERNAL_SERVER_ERROR: { code: 500, status: 'INTERNAL_SERVER_ERROR' }
};

export const getIngredients = (req, res) => {
    Logger.info(`${req.method} ${req.originalurl}, fetching ingredients`);
    database.query(QUERY.SELECT_INGREDIENTS, (error, results) => {
        if(!results){
            res.status(HttpStatus.OK.code).send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `No ingredients found`));
        }else{
            res.status(HttpStatus.OK.code).send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Igredients retrieved`, { ingredients: results }));
        }
    })
}

export const createIngredient = (req, res) => {
    Logger.info(`${req.method} ${req.originalurl}, creating ingredient`);
    database.query(QUERY.CREATE_INGREDIENT, Object.values(req.body), (error, results) => {
        if(!results){
            Logger.error(error.message);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `Error occurred`));
        }else{
            const ingredient = { id: results.insertedId, ...req.body, created_at: new Date() };
            res.status(HttpStatus.CREATED.code).send(new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, `Igredient created`, { ingredient }));
        }
    })
}

export const getIngredient = (req, res) => {
    Logger.info(`${req.method} ${req.originalurl}, fetching ingredient`);
    database.query(QUERY.SELECT_INGREDIENT, [req.params.id], (error, results) => {
        if(!results[0]){
            res.status(HttpStatus.NOT_FOUND.code).send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Ingredient by id ${req.params.id} was not found`));
        }else{
            res.status(HttpStatus.OK.code).send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Igredient retrieved`, results[0] ));
        }
    })
}

export const updateIngredient = (req, res) => {
    Logger.info(`${req.method} ${req.originalurl}, fetching ingredient`);
    database.query(QUERY.SELECT_INGREDIENT, [req.params.id], (error, results) => {
        if(!results[0]){
            res.status(HttpStatus.NOT_FOUND.code).send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Ingredient by id ${req.params.id} was not found`));
        }else{
            Logger.info(`${req.method} ${req.originalurl}, fetching ingredient`);
            database.query(QUERY.UPDATE_INGREDIENT, [...Object.values(req.body), req.params.id],  (error, results) => {
                if(!error){
                    res.status(HttpStatus.OK.code).send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Ingredient updated`, { id: req.params.id, ...req.body}))
                }else{
                    Logger.error(error.message);
                    res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `Error occured`));
                }
            });
        }
    })
}

export const deleteIngredient = (req, res) => {
    Logger.info(`${req.method} ${req.originalurl}, deleting ingredient`);
    database.query(QUERY.DELETE_INGREDIENT, [req.params.id], (error, results) => {
        if (results.affectedRows > 0) {
            res.status(HttpStatus.OK.code).send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Ingredient deleted`, results[0]));
        } else {
            res.status(HttpStatus.NOT_FOUND.code).send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Ingredient by id ${req.params.id} was not found`));
        }
    })
}

export default HttpStatus;