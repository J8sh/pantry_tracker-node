const QUERY = {
    SELECT_INGREDIENTS: 'SELECT * FROM ingredients ORDER BY created_at DESC LIMIT 100',
    SELECT_INGREDIENT: 'SELECT * FROM ingredients WHERE id = ?',
    CREATE_INGREDIENT: 'INSERT INTO ingredients(name) VALUES (?)',
    UPDATE_INGREDIENT: 'UPDATE ingredients SET name = ?, amount = ? WHERE id = ?',
    DELETE_INGREDIENT: 'DELETE FROM ingredients WHERE id = ?'
}

export default QUERY;