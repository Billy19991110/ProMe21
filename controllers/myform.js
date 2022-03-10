const db = require('../routes/db-config')


const myform = async (req, res) => {
    const { email, productName, problem, problemOptions } = req.body

    //    console.log(typeof(req.body));
    //    console.log(typeof(productName));

    db.query('INSERT INTO form SET ?', { email: email, productName: productName, problem: problem, problemOptions: problemOptions }), async (err, result) => {
        if (err) throw err;
        return req.body
    }
}
module.exports = myform




