const QUERY = {
    SELECT_USERS: 'SELECT * FROM users ORDER BY id',
    SELECT_USER: 'SELECT * FROM users WHERE email = ? AND password = ?',
    CREATE_USER: 'INSERT INTO users(name, email, password) VALUES (?, ?, ?)',
    UPDATE_USER: 'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?',
    DELETE_USER: 'DELETE FROM users WHERE email = ? AND id = ?'
}

export default QUERY;