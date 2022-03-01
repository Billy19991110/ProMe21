const jwt = require('jsonwebtoken')
const db = require('../routes/db-config')
const bcrypt = require('bcryptjs')

const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) return res.json({ status: 'error', error: 'pls enter your email amd password' });
    else {
        db.query('SELECT * FROM `users` WHERE email= ?', [email], async (Err, result) => {
            if (Err) throw Err;
            if (!result.length || !await bcrypt.compare(password, result[0].password)) return res.json({
                status: 'error',
                error: '密碼錯誤 或者無此使用者'
            })
            else {
                const token = jwt.sign({ id: result[0].id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES
                })
                const cookieOptions = {
                    expiresIn: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                    httpOnly: true
                }
                res.cookie('userRegistered', token, cookieOptions);
                return res.json({ status: 'success', success: '歡迎登入' } )

            }

        })
    }
}
module.exports = login