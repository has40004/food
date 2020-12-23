"use strict";
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

     const deadline = '2020-12-31';

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
          modal = document.querySelector('.modal');

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

    

    modal.addEventListener('click', (e) => {
        if ( e.target === modal || e.target.getAttribute('data-close') == ''){
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

    const getResource = async( url ) => {
        const res = await fetch( url);
        if (!res.ok){
            throw new Error(`Could not fetch ${url}, statuse: ${res.status}`);
        }
        return await res.json();
    };

    getResource('http://localhost:3000/menu')
    .then(data => {
        data.forEach (({img, altimg, title, descr, price }) => {
            new MenuCard ( img, altimg, title, descr, price, '.menu .container')
            .render();
        });
    });

    

    //forms

    const forms = document.querySelectorAll('form');
   
    const message = {
        loading: 'img/form/spinner.svg',
        success : 'Спасибо! Скоро с вами свяжемся',
        failure : 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        
            bindPostData(item);
        });
    
        const postData = async( url , data) => {
            const res = await fetch( url , {
               method :"POST",
               headers : { 'Content-type': 'application/json'},
               body : data
            });
            return await res.json();
        };

        // функция проверки данных форм
    const phone = document.querySelector('#telephon'),
              names = document.querySelector('#names');


    function getNameOrPhon () {
       phone.addEventListener('input', () => {
            if ( phone.value.match(/\D/g)){
                phone.style.border = ' 1px solid red';
                phone.style.color = 'red';
                alert('добрый день Хешам! как жизнь молодая');
            } 
       });
       names.addEventListener('input', () => {
            if ( !names.value.match(/\D/g)){
                names.style.border = ' 1px solid red';
                names.style.color = 'red';
                alert('добрый день Хешам! как жизнь молодая');
            } 
       });
       
    }
    getNameOrPhon ();


    function bindPostData(form){
        
        form.addEventListener('submit', (e) => {
            
            e.preventDefault();
            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin : 0 auto ;
            `;

            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify( Object.fromEntries(formData.entries()));
            
            postData('http://localhost:3000/requests', json)
           .then( data => {
                console.log(data);
                showThanksModal(message.success) ;
                statusMessage.remove();
           })
           .catch ( () => {
                showThanksModal(message.failure);
           })
           .finally(() => {
                form.reset();
           });
          
        });
    }

    function showThanksModal (message){
        const prevModalDialog = document.querySelector('.modal__dialog');
              prevModalDialog.classList.add('hide');
              openModal();
              const thanksModal = document.createElement('div');
              thanksModal.classList.add('modal__dialog');
              thanksModal.innerHTML = `
                <div class= "modal__content">
                <div data-close class="modal__close">&times;</div>
                <div class="modal__title">${message}</div>
            
                </div> 

              `;
              document.querySelector('.modal').append(thanksModal);
              setTimeout (() => {
                  thanksModal.remove();
                  prevModalDialog.classList.add('show');
                  prevModalDialog.classList.remove('hide');
                  closeModal();
              },4000);
    }

    // sliders 
    const slides = document.querySelectorAll('.offer__slide'),
          prev = document.querySelector('.offer__slider-prev'),
          slider = document.querySelector('.offer__slider'),
          next = document.querySelector('.offer__slider-next'),
          total = document.querySelector('#total'),
          current = document.querySelector('#current'),
          slidesWrapper = document.querySelector('.offer__slider-wrapper'),
          slidesField = document.querySelector('.offer__slider-inner'),
          width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1;
    let offset = 0;
    if (slides.length < 10){
        total.textContent = ` 0${slides.length}`;
        current.textContent = ` 0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '1.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });


    // навигация слайдов
    slider.style.position = 'relative';
    const indicators = document.createElement('ol'),
           dots = [];

    indicators.classList.add('carousel-indicators');

    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 5px;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    
    `;
    slider.append(indicators);

    for( let i = 0; i < slides.length; i++){
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i+1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 11px;
            height: 11px;
            margin-right: 5px;
            margin-left: 5px;
            bottom:10px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top-left-radius: 100%;
            border-top-right-radius: 100%;
            border-bottom-right-radius: 100%;
            border-bottom-left-radius: 100%;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if ( i == 0){
            dot.style.opacity = 1;
        }
        
        indicators.append(dot);
        
        dots.push(dot);

    }

    function dotes () {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex-1].style.opacity = 1;
    }

   function slideTotalCurrent (i){
        if ( slides.length < 10){
            current.textContent = ` 0${i}`;
        } else {
            current.textContent = i;
        }
   }

   function transiltion (){
        slidesField.style.transform = ` translateX(-${offset}px)`;
   }

   function deletNotDigites ( str) {
       return +str.replace(/\D/g, '');
   }
   
//timer
   function timers () {
        if ( offset == deletNotDigites ( width) * (slides.length -1)){
            offset= 0;
            
        }else {
            offset += deletNotDigites ( width);
            
        }

        transiltion ();

        if ( slideIndex == slides.length){
            slideIndex = 1;
        }else {
            slideIndex++;
        }

        if ( slides.length < 10){
            current.textContent = ` 0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dotes ();
   }

   setInterval(timers, 5000);

    next.addEventListener('click', () => {
        if ( offset == deletNotDigites ( width) * (slides.length -1)){
            offset= 0;
            
        }else {
            offset += deletNotDigites ( width);
            console.log(offset);
        }

        transiltion ();

        if ( slideIndex == slides.length){
            slideIndex = 1;
        }else {
            slideIndex++;
        }

        if ( slides.length < 10){
            current.textContent = ` 0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

         dotes ();

    });

     prev.addEventListener('click', () => {

        if ( offset == 0){
            offset = deletNotDigites ( width)* (slides.length - 1);
        }else {
            offset -= deletNotDigites ( width);
            
        }
        
        transiltion ();
        
        if ( slideIndex == 1){
            slideIndex = slides.length;
        }else {
            slideIndex--;
        }
        slideTotalCurrent (slideIndex);
        dotes ();
    });
    
    
    dots.forEach( dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');
            slideIndex = slideTo;

            offset = deletNotDigites ( width) * (slideTo- 1);

            transiltion ();
            slideTotalCurrent (slideTo);
            
            dotes ();

        });
    });

    //calc

    const result = document.querySelector('.calculating__result span');

    let sex , height, age, weight, ratio;  

    // LocalStorage

    if (localStorage.getItem('sex')){
        sex = localStorage.getItem('sex');
    }else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')){
        ratio = localStorage.getItem('ratio');
    }else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function initLocalStorage (selector, activeClass) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if(elem.getAttribute('id') === localStorage.getItem('sex')){
                elem.classList.add(activeClass);
            }

            if(elem.getAttribute('data-ratio') === localStorage.getItem('ratio')){
                elem.classList.add(activeClass);
            }
        });

    }

    initLocalStorage('#gender div', 'calculating__choose-item_active');
    initLocalStorage('.calculating__choose_big div', 'calculating__choose-item_active');

    function calcTotal () {
        if (!sex || !height || !weight || !ratio || !age){
            result.textContent = '___';
            return;
        }

        if( sex === 'female'){
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age))*ratio);
        } else {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age))*ratio);
        }

    }
    calcTotal();

    function getStaticInformation (selector, activeClass) {
        const elements = document.querySelectorAll (selector);

        elements.forEach(element => {
            element.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')){
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio',+e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }

                elements.forEach (elem => {
                    elem.classList.remove(activeClass);
                });
                
                e.target.classList.add(activeClass);
                calcTotal();
            });
           
        }); 
        
    }

     getStaticInformation ('#gender div', 'calculating__choose-item_active');
     getStaticInformation ('.calculating__choose_big div', 'calculating__choose-item_active');

     function getDynamicInformation (selector){
         const input = document.querySelector(selector);
               

         input.addEventListener('input', () => {
             
            //  input.style.border = ' 1px solid hsl(111deg 83% 58%)';

            if (input.value.match(/\D/g)){
             input.style.border = ' 1px solid red';
             input.style.color = 'red';
               
            }else {
                input.style.border = ' 1px solid hsl(111deg 83% 58%)';
            }
            switch(input.getAttribute('id')){
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            calcTotal();
         });
     }

     getDynamicInformation ('#height');
     getDynamicInformation ('#weight');
     getDynamicInformation ('#age');

   
});