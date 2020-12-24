function modal () {
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
}

module.exports = modal;