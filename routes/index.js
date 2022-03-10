/*
* GET home page.
*/

exports.wishList = function (req, res) {
	message = '';
	if (req.method == "POST") {
		var post = req.body;
		// console.log(post);
		var email = post.email;
		var name = post.name;
		var commodity_name = post.commodity_name;
		var Product_Description = post.Product_Description;
		var count = 1
		if (!req.files)
			return res.status(400).send('No files were uploaded.');
		var file = req.files.uploaded_image;
		var img_name = file.name;
		if (file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/gif") {
			file.mv('public/images/upload_images/' + file.name, function (err) {
				if (err)
					return res.status(500).send(err);
				var sql = "INSERT INTO `users_image`(`email`,`name`,`commodity_name`,`Product_Description`, `image` , `count`) VALUES ('" + email + "','" + name + "','" + commodity_name + "','" + Product_Description + "','" + img_name + "','" + count + "')";
				var query = db.query(sql, function (err, result) {
					console.log(result.insertId);
					res.redirect('todowishingPond');
				});
			});
		} else {
			message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
			res.render('wishList.ejs', { message: message });
		}
	} else {
		res.render('wishList');
	}

};






exports.todowishingPond = function (req, res) {
	var sql = "SELECT * FROM `users_image` ";
	db.query(sql, function (err, result) {
		res.render('todowishingPond.ejs', { result });
	});
};