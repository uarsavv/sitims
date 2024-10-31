(function () {
    function measureLoadTime() { //используем для измерения времени загрузки страницы
        const startTime = window.performance.now();


        window.addEventListener('load', function () { //будет выполнен при загрузке страницы
            const loadTime = window.performance.now() - startTime;
            displayLoadStatistics(loadTime); // отвечает за за отображение статистики загрузки
        });
    }

    function formatTime(milliseconds) {
        const seconds = (milliseconds / 1000).toFixed(3); //преобразует время загрузки из миллесекунд в секунды и форматирует его
        return seconds + " сек";
    }

    function displayLoadStatistics(loadTime) {
        const formattedLoadTime = formatTime(loadTime);

        const footer = document.createElement('footer');
        footer.innerHTML = "<p>Время загрузки страницы: " + performance.now() + "</p>";

        document.body.appendChild(footer);//добавляет узел в конец списка дочерних элементов указанного родительского узла. элемент футера добавляем к элементу бади
    }

    measureLoadTime(); // запускает измерение времени загрузки при загрузке страницы.
})();