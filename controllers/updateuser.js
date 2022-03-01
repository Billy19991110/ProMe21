const db = require('../routes/db-config')
const bcrypt = require('bcryptjs')

const updateuser = async (req, res) => {
    const { email, password: Npasswords } = req.body
    if (!email || !Npasswords) return res.json({ status: 'error', error: 'please enter your email and pawword' })
    else {
        // console.log(emil);
        db.query('select email from users where email =?', [email], async (err, result) => {
            if (err) throw err;
            if (result[0]) {
                const password = await bcrypt.hash(Npasswords, 8);
                db.query(' UPDATE `users` SET `password` = ? WHERE `email` = ?',[password , email]), (error, results) => {
                    if (error) throw error
                    // console.log(password);

                }
            }
            return res.json({ status: 'success', success: '已更改密碼!!!' })
        })
    }
}
module.exports = updateuser