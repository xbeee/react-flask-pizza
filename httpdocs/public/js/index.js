/*  document.addEventListener('DOMContentLoaded', ()=> {
      [...document.querySelectorAll('.masked')].forEach(item=>{Inputmask({"mask": "+7 (999) 999 99 99"}).mask(item);});
  )}
*/
document.addEventListener("DOMContentLoaded", () => {
	let masked = document.querySelectorAll(".masked");
	masked.forEach((item) => {
		Inputmask({ mask: "+7 (999) 999 99 99" }).mask(item);
	});
});
// оторабжение сайдабара/каталога в шапке
document.addEventListener("DOMContentLoaded", () => {
	const catalogBtnOpen = document.getElementById("header-catalog-open");
	const catalogBtnClose = document.getElementById("header-catalog");
	const catalogCategories = document.getElementById("header-catalog-close");
	console.log("mdksksdf");
	catalogBtnOpen.forEach(function (item) {
		item.addEventListener("click", function () {
			catalogCategories.classList.add = "active";
		});
	});
});

document.addEventListener("DOMContentLoaded", () => {
	[...document.querySelectorAll(".recall, .productPage-btn")].forEach((item) => {
		item.addEventListener("click", (e) => {
			e.preventDefault();
			// document.querySelector('.b24-widget-button-inner-container').dispatchEvent(new Event("click",{bubbles: true, cancelable: false, composed: false}));
			document.querySelector('[data-b24-crm-button-widget="crmform"]').dispatchEvent(new Event("click", { bubbles: true, cancelable: false, composed: false }));
		});
	});
	/*document.querySelector('header .headerCatalog').style.top=document.querySelector('header').offsetHeight+'px';
    document.addEventListener('resize', ()=>{
        document.querySelector('header .headerCatalog').style.top=document.querySelector('header').offsetHeight+'px';
    });*/
});

document.addEventListener("DOMContentLoaded", () => {
	const populate = new Swiper(".populate.blade.php-swiper", {
		direction: "horizontal",
		slidesPerView: 3,
		spaceBetween: 30,
		navigation: {
			nextEl: ".populate.blade.php .swiper-button-next",
			prevEl: ".populate.blade.php .swiper-button-prev",
		},
		breakpoints: {
			1200: {
				slidesPerView: 4,
				spaceBetween: 20,
				centeredSlides: false,
			},
			1500: {
				slidesPerView: 5,
				spaceBetween: 20,
				centeredSlides: false,
			},
		},
	});
	const profit = new Swiper(".profit-swiper", {
		direction: "horizontal",
		slidesPerView: 3,
		spaceBetween: 20,
		navigation: {
			nextEl: ".profit .swiper-button-next",
			prevEl: ".profit .swiper-button-prev",
		},
		breakpoints: {
			1200: {
				slidesPerView: 4,
				spaceBetween: 20,
				centeredSlides: false,
			},
			1500: {
				slidesPerView: 5,
				spaceBetween: 20,
				centeredSlides: false,
			},
		},
	});
	const related = new Swiper(".related-swiper", {
		direction: "horizontal",
		slidesPerView: 3,
		spaceBetween: 20,
		navigation: {
			nextEl: ".related .swiper-button-next",
			prevEl: ".related .swiper-button-prev",
		},
		breakpoints: {
			1200: {
				slidesPerView: 4,
				spaceBetween: 20,
				centeredSlides: false,
			},
			1500: {
				slidesPerView: 5,
				spaceBetween: 20,
				centeredSlides: false,
			},
		},
	});
	const similar = new Swiper(".similar-swiper", {
		direction: "horizontal",
		slidesPerView: 3,
		spaceBetween: 20,
		navigation: {
			nextEl: ".similar .swiper-button-next",
			prevEl: ".similar .swiper-button-prev",
		},
		breakpoints: {
			1200: {
				slidesPerView: 4,
				spaceBetween: 20,
				centeredSlides: false,
			},
			1500: {
				slidesPerView: 5,
				spaceBetween: 20,
				centeredSlides: false,
			},
		},
	});
});
