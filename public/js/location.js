var currentPage = document.location.href; // получаем текущий путь страницы
var menuLinks = document.querySelectorAll(".nav_link"); // получаем все ссылки меню
menuLinks.forEach(function (link) {

    if (link.href === currentPage) { // проверяем совпадает ли адрес ссылки с текущим путем страницы

        link.classList.add("active"); // если совпадает, добавляем active к ссылке

        link.parentNode.classList.add("underlined"); // добавляем класс "underlined" к родительскому элементу ссылки
    }
});
