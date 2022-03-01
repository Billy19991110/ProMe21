const db = require('../routes/db-config')
const bcrypt = require('bcryptjs')

const register = async (req, res) => {
    const { email, password: Npasswords } = req.body
    if (!email || !Npasswords) return res.json({ status: 'error', error: 'please enter your email and pawword' })
    else {
        // console.log(emil);
        db.query('select email from users where email =?', [email], async (err, result) => {
            if (err) throw err;
            if (result[0]) return res.json({ status: 'error', error: '此信箱已經註冊' })
            else {
                const password = await bcrypt.hash(Npasswords, 8);
                db.query('INSERT INTO users SET ?', { email: email, password: password }), (error, results) => {
                    if (error) throw error
                // console.log(password);
                }
            }
            return res.json({ status: 'success', success: '註冊成功!!!' })
        })
    }
}
module.exports = register