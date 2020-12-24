function slider (){
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
}

module.exports = slider;