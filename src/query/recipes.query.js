const QUERY = {
    SELECT_RECIPES: 'SELECT * FROM recipes ORDER BY id',
    SELECT_RECIPE: 'SELECT * FROM recipes WHERE email = ? AND password = ?',
    CREATE_RECIPE: 'INSERT INTO recipes(image, name) VALUES (?, ?)',
}

export default QUERY;