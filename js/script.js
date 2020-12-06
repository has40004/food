'use strict';
window.addEventListener('DOMContentLoaded', () => {

    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabParent = document.querySelector('.tabheader__items');

        
        function hideTabContent (){
            tabsContent.forEach(item =>{
                item.classList.add('hide');
                item.classList.remove('show', 'fade');
            });
            tabs.forEach(item => {
                item.classList.remove('tabheader__item_active');
            });
        }

        function showTabContent (i){
            tabsContent[i].classList.add('show', 'fade');
            tabsContent[i].classList.remove('hide');
            tabs[i].classList.add('tabheader__item_active');
        }

        hideTabContent();
        showTabContent(0);

     tabParent.addEventListener('click', (event) =>{
         const target = event.target;

         if(target && target.classList.contains('tabheader__item')){
          tabs.forEach((item , i )=> {
              if (target == item){
                hideTabContent();
                showTabContent(i);
              }
          });
         }

     });
 
     //timer

     const deadline = '2020-12-09';

     function gitTimeRemaining (endtime){

        const t = Date.parse(endtime) - Date.parse( new Date()),
              days = Math.floor( t / (1000 * 60 * 60 * 24)),
              hours = Math.floor( (t / (1000 * 60 * 60) % 24)),
              minutes = Math.floor( (t / 1000 / 60 ) % 60),
              seconds = Math.floor ( (t / 1000) % 60);
         
         return {
             'total': t,
             'days': days,
             'hours': hours,
             'minutes': minutes,
             'seconds': seconds
         };
     }

     function getZero (num) {
         if ( num >= 0 && num < 10){
             return `0 ${num}`;
         } else {
             return num;
         }
     }

     //установка таймера на странице 
     function setClock ( selector, endtime){

        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval (updetClock, 1000);
              updetClock ();

        function updetClock (){

            const t = gitTimeRemaining(deadline);
            days.innerHTML =  getZero(t.days);
            hours.innerHTML = getZero(t.hours );
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0){
                clearInterval(timeInterval);
            }
        }
        
     }
        
     setClock('.timer', deadline);
     
     // modol

    const modalTrigger =  document.querySelectorAll ('[datd-modal]'),
          modal = document.querySelector('.modal'),
          modalClose = document.querySelector('[datd-close]');

    function openModal () {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        // clearTimeout(ModalTimerId);
    }

    modalTrigger.forEach( item => {
        item.addEventListener('click', openModal);
    });
    
    function closeModal (){
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    modalClose.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if ( e.target === modal){
          closeModal();
        }
    });

    // использование клавиаторы нажать на кнопку Esc 
    document.addEventListener('keydown', (e) => {
        if ( e.code === "Escape" && modal.classList.contains('show')){
            closeModal();
        }
    });

    // const ModalTimerId = setTimeout(openModal , 5000);

    function showModalByScoll (){
        if ( window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            openModal();
            window.removeEventListener('scroll',showModalByScoll);
        }
    }

    window.addEventListener('scroll',showModalByScoll);

  // class for cards

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes){
            this.src = src ;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes ;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 74;
            this.changToRub();
        }

        changToRub(){
            this.price = this.price * this.transfer ;
            
        }

        render(){
            const element = document.createElement('div');
            
                if (this.classes.length === 0){
                    element.classList.add('menu__item');
                } else{
                    this.classes.forEach(className => element.classList.add(className));
                }
                

            element.innerHTML = `
                <img src= ${this.src} alt= ${this.alt}>
                <h3 class="menu__item-subtitle"> ${this.title} </h3>
                <div class="menu__item-descr"> ${this.descr} </div>
                <div class="menu__item-divider"> </div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span> ${this.price} </span> руб/день</div>
                </div>
            
            `;
            this.parent.append(element);
        }
    }

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container',
        "menu__item"
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню "Премиум"',
        ' В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан! ',
        11,
        '.menu .container',
        "menu__item"
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        7,
        '.menu .container',
        "menu__item"
    ).render();

});