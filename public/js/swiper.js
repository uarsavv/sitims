var swiper = new Swiper(".swiper", {
    spaceBetween: 20,
    slidesPerView: 1,
    centeredSlides: true,
    // включаем автоматическую прокрутку слайдов с задержкой
    autoplay: {
        delay: 2500,
    },
    // включаем скроллбар с возможностью его перетаскивания
    scrollbar: {
        el: '.swiper-scrollbar',
        draggable: false, // штучка которая позволяет их перетаскивать с помощью мыши

    },
    pagination: {
        el: '.swiper-pagination',
        clickable: false,
    },

    // устанавливаем эффект перелистывания слайдов как "flip"
    effect: 'flip',
    flipEffect: {
        slideShadows: false,
    },
    allowTouchMove: false,
});
