tz7ggWidget = function() {
    var widget = this;
    this.code = null;

    this.yourVar = {};
    this.yourFunc = function() {};

    // вызывается один раз при инициализации виджета, в этой функции мы вешаем события на $(document)
    this.bind_actions = function(){
        //пример $(document).on('click', 'selector', function(){});
    };

    // вызывается каждый раз при переходе на страницу
    this.render = function() {
        let pipeLine = Array.from(document.querySelectorAll('.pipeline_status__head'))

        var arrWithoutHiddenEl = []

        pipeLine.forEach(function(item, i, arr) {  
            if(!pipeLine[i].classList.contains('pipeline_status__head-unsorted')) {
                arrWithoutHiddenEl.push(pipeLine[i])
            }
        })    
        let color = arrWithoutHiddenEl[2].children[2].style.color
        arrWithoutHiddenEl[2].children[0].style.color = color;  
                
    };  

    // вызывается один раз при инициализации виджета, в этой функции мы загружаем нужные данные, стили и.т.п
    this.init = function(){       

    };

    // метод загрузчик, не изменяется
    this.bootstrap = function(code) {
        widget.code = code;
        // если frontend_status не задан, то считаем что виджет выключен
        // var status = yadroFunctions.getSettings(code).frontend_status;
        var status = 1;

        if (status) {
            widget.init();
            widget.render();
            widget.bind_actions();
            $(document).on('widgets:load', function () {
                widget.render();
            });
        }
    }
};
// создание экземпляра виджета и регистрация в системных переменных Yadra
// widget-name - ИД и widgetNameIntr - уникальные названия виджета
yadroWidget.widgets['tz7gg-widget'] = new tz7ggWidget();
yadroWidget.widgets['tz7gg-widget'].bootstrap('tz7gg-widget');

