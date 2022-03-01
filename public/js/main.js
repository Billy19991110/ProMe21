$(function() {

	$.get("/data", function(e) {
		buyList = JSON.parse(e);
		// console.log(buyList);
		refreshNewsUI();
	});

	function refreshNewsUI() {
		$(".productMain:odd").addClass("oddColor");
		$(".deleteButton").on("click", function() {
			var productIndex = $(this).closest(".oneProduct").index();
			console.log(productIndex);
			console.log(buyList[productIndex]);
			$.ajax({
					type: "delete",
					url: "cart",
					data: buyList[productIndex],
					success: function() {
						alert("商品已刪除");
					}
				})
				.then(function(e) {
					$.get("/data", function(e) {
						buyList = JSON.parse(e);
						refreshNewsUI();
					});
				});
			window.location = "/cart";
		});
		$(".minusButton").on("click", function() {
			var productIndex = $(this).closest(".oneProduct").index();
			if (buyList[productIndex].productNUM > 1) {
				buyList[productIndex].productNUM = buyList[productIndex].productNUM - 1;
				$.ajax({
						type: "put",
						url: "/cart",
						data: buyList[productIndex]
					})
					.then(function(e) {
						$.get("/data", function(e) {
							buyList = JSON.parse(e);
							// console.log(buyList);
							refreshNewsUI();
						});
					});
				window.location = "/cart";
			} else {
				alert("NO");
			}
		});
		$(".plusButton").on("click", function() {
			var productIndex = $(this).closest(".oneProduct").index();
			buyList[productIndex].productNUM = buyList[productIndex].productNUM + 1;
			$.ajax({
					type: "put",
					url: "/cart",
					data: buyList[productIndex]
				})
				.then(function(e) {
					$.get("/data", function(e) {
						buyList = JSON.parse(e);
						refreshNewsUI();
					});
				});
			window.location = "/cart";
		});

	}
});