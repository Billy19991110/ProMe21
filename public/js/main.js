$(function() {

	$.get("/data", function(e) {
		buyList = JSON.parse(e);
		refreshNewsUI();
	});

	function refreshNewsUI() {
		$(".productMain:even").addClass("evenColor");
		var cartHeight = $(".cart").height();
		var barHeight = $("footer").height();
		var windowHeight = $(window).height();
		var Height = windowHeight - (barHeight * 2);
		if (cartHeight < Height) {
			$("main").addClass("cartHeight");
		}

		$(".deleteButton").on("click", function() {
			var productIndex = $(this).closest(".oneProduct").index();
			// console.log(productIndex);
			// console.log(buyList[productIndex]);
			$.ajax({
					type: "delete",
					url: "/cart",
					data: buyList[productIndex],
					success: function() {
						Swal.fire({
							icon: "info",
							iconColor: "#89b0ae",
							color: "#545b6e",
							title: "商品已從購物車刪除",
							html: "沒有喜歡的商品?去" + '<a href="todowishingPond">許願池</a>' + "看看",
							confirmButtonColor: '#545b6e'
						});
					},
					error: function() {
						console.log("NO");
					}
				})
				.then(function(e) {
					$.get("/data", function(e) {
						buyList = JSON.parse(e);
						refreshNewsUI();
					});
				});
			// window.location = "/cart";
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
							refreshNewsUI();
						});
					});
				// window.location = "/cart";
			} else {
				Swal.fire({
					icon: "error",
					color: "#545b6e",
					title: "商品數量不可低於1",
					confirmButtonColor: '#545b6e'
				});
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