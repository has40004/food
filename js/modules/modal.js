
function openModal (modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
}

function closeModal (modalSelector){
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
    // clearInterval(ModalTimerId);
}


function modal (triggerSelector, modalSelector) {
    const modalTrigger =  document.querySelectorAll (triggerSelector),
          modal = document.querySelector(modalSelector);

     modalTrigger.forEach( item => {
        item.addEventListener('click', () =>  openModal (modalSelector));
    });  

    modal.addEventListener('click', (e) => {
        if ( e.target === modal || e.target.getAttribute('data-close') == ''){
            closeModal(modalSelector);
        }
    });

    // использование клавиаторы нажать на кнопку Esc 
    document.addEventListener('keydown', (e) => {
        if ( e.code === "Escape" && modal.classList.contains('show')){
            closeModal(modalSelector);
        }
    });

    // const ModalTimerId = setTimeout(openModal , 300000);

    function showModalByScoll (){
        if ( window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            openModal(modalSelector);
            window.removeEventListener('scroll',showModalByScoll);
        }
    }

    window.addEventListener('scroll',showModalByScoll);
}

export default  modal;
export {closeModal};
export {openModal};