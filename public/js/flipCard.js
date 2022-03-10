const cards = document.querySelectorAll(".cards");

// 被翻開的卡片
let flippedCard = false;
let flipped_1;
// 不同時翻開卡片
let same = false;

function flipCard() {
	if (same) return;
	if (this === flipped_1) return;

	this.classList.add("flip");
	if (!flippedCard) {
		flippedCard = true;
		flipped_1 = this;
	}
	same = true;
	saleType();
}

function saleType() {
	let sale = flipped_1.dataset.picture;
	if (sale === "sale_1") {
		Swal.fire({
			imageUrl: "/icon/logo-black.png",
			imageWidth: 208,
			imageHeight: 246,
			title: "恭喜獲得八折優惠！",
			confirmButtonColor: '#545b6e',
			confirmButtonText: "前往結帳"
		}).then((result) => {
			if (result.isConfirmed) {
				window.location = "/checkout_2";
			}
		});
	} else if (sale === "sale_2") {
		Swal.fire({
			imageUrl: "/icon/logo-black.png",
			imageWidth: 208,
			imageHeight: 246,
			title: "恭喜獲得免運優惠！",
			confirmButtonColor: '#545b6e',
			confirmButtonText: "前往結帳"
		}).then((result) => {
			if (result.isConfirmed) {
				window.location = "/checkout_2";
			}
		});
	} else if (sale === "sale_3") {
		Swal.fire({
			imageUrl: "/icon/logo-black.png",
			imageWidth: 208,
			imageHeight: 246,
			title: "恭喜獲得折價三百！",
			confirmButtonColor: '#545b6e',
			confirmButtonText: "前往結帳"
		}).then((result) => {
			if (result.isConfirmed) {
				window.location = "/checkout_2";
			}
		});
	} else {
		Swal.fire({
			imageUrl: "/icon/goat.png",
			imageWidth: 199.5,
			imageHeight: 186,
			title: "銘謝惠顧",
			confirmButtonColor: '#545b6e',
			confirmButtonText: "前往結帳"
		}).then((result) => {
			if (result.isConfirmed) {
				window.location = "/checkout_2";
			}
		});
	}
}
// 洗牌
(function shuffle() {
	cards.forEach(card => {
		let randomCard = Math.floor(Math.random() * 12);
		card.style.order = randomCard;
	});
})();
// 翻開
cards.forEach(card => card.addEventListener("click", flipCard));