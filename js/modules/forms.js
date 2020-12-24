function forms () {
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

    
  
    function showHeshamModal (){
        const prevModalDialog = document.querySelector('.modal__dialog');
              prevModalDialog.classList.add('hide');
              openModal();
              const thanksModal = document.createElement('div');
              thanksModal.classList.add('modal__dialog');
              thanksModal.innerHTML = `
                <div class= "modal__content">
                <div data-close class="modal__close">&times;</div>
                <div  ><img src="img/form/IMG_5412.jpg" alt=""></div>
            
                </div> 

              `;
              thanksModal.style.cssText = ` 
              width : 100%; height: 100%;`;
              document.querySelector('.modal').append(thanksModal);
              setTimeout (() => {
                  thanksModal.remove();
                  prevModalDialog.classList.add('show');
                  prevModalDialog.classList.remove('hide');
                  closeModal();
              },9000);
    }

  

    function getNameOrPhon () {
       phone.addEventListener('input', () => {
            if ( phone.value.match(/\D/g) ){
                phone.style.border = ' 1px solid red';
                phone.style.color = 'red';
                showHeshamModal();
                alert('добрый день Хешам! как жизнь молодая');
            } 
       });
       names.addEventListener('input', () => {
            if ( !names.value.match(/\D/g) || names.value.match(/\W/g)){

                names.style.border = ' 1px solid red';
                names.style.color = 'red';
                showHeshamModal();
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
}
module.exports = forms;