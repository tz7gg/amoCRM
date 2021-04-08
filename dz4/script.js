tz7ggWidget = function() {
    var widget = this;
    this.code = null;

    this.yourVar = {};
    this.yourFunc = function() {};
    // вызывается один раз при инициализации виджета, в этой функции мы вешаем события на $(document)
    this.bind_actions = function(){                              

    };

    // вызывается каждый раз при переходе на страницу
    this.render = function() {
        listAllEmails = Array.from(document.querySelectorAll("[data-pei-code='email']"))         
    
        let HiddenList = []

        listAllEmails.forEach(function(item, i, arr) {       
        
            if(listAllEmails[i].classList.contains('js-linked-with-actions') && listAllEmails[i].classList.contains('js-linked-has-value') ) {
                HiddenList.push(listAllEmails[i])
            }          
        }) 

        HiddenList.forEach(function(item, i, arr) {
            newListItem = document.createElement('div')
            HiddenList[i].children[1].children[0].append(newListItem)
            newListItem.classList.add('tips-item', 'js-tips-item', 'js-cf-actions-item')
            newListItem.setAttribute('data-type', 'google')
            newListItem.innerHTML = 'нагуглить'
        })  

        let google = Array.from(document.querySelectorAll("[data-type='google']"))                     

        google.forEach(function(item, i, arr) {      
            
            google[i].addEventListener('click', function (event) {

                email = HiddenList[i].children[0].children[1]      
                getEmail = email.getAttribute('value')                
  
                window.open('http://letmegooglethat.com/?q=' + getEmail, '_blank');            
                window.open('https://yandex.ru/search/?text=' + getEmail, '_blank'); 

            }) 
                    
        })     
        
        // телефоны

        listAllPhones = Array.from(document.querySelectorAll("[data-pei-code='phone']"))         
    
        let HiddenListPhones = []

        listAllPhones.forEach(function(item, i, arr) {       
        
            if(listAllPhones[i].classList.contains('js-linked-with-actions') && listAllPhones[i].classList.contains('js-linked-has-value') ) {
                HiddenListPhones.push(listAllPhones[i])
            }          
        }) 
        
        HiddenListPhones.forEach(function(item, i, arr) {
            newListItem = document.createElement('div')
            HiddenListPhones[i].children[1].children[0].append(newListItem)
            newListItem.classList.add('tips-item', 'js-tips-item', 'js-cf-actions-item')
            newListItem.setAttribute('data-type', 'tz7ggphone')
            newListItem.innerHTML = 'нагуглить'
        })  

        let googlePhone = Array.from(document.querySelectorAll("[data-type='tz7ggphone']"))                     

        googlePhone.forEach(function(item, i, arr) {      
            
            googlePhone[i].addEventListener('click', function (event) {

                phone = HiddenListPhones[i].children[0].children[1].children[1]   
                getPhone = phone.getAttribute('value') 
                
                console.log(HiddenListPhones[i].children[0].children[1].children[1])

                window.open('http://letmegooglethat.com/?q=' + getPhone, '_blank'); 
                window.open('https://yandex.ru/search/?text=' + getPhone, '_blank'); 
            }) 
                    
        })        
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

