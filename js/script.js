window.addEventListener('DOMContentLoaded', function(){
    'use strict';
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');


    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i ++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        } 

    }

    hideTabContent(1);


    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')){
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', function(event){

        let target = event.target;

        if (target && target.classList.contains('info-header-tab')) {

            for(let i = 0; i < tab.length; i++ ) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }

        }

    });

    //timer

    let deadLine = '2019-10-21';

    function getTimeRemaining (endDate) {


        let t = Date.parse(endDate) - Date.parse(new Date()),
        seconds = Math.floor((t/1000) % 60),
        minutes = Math.floor((t/1000/60) % 60),
        hours = Math.floor((t/(1000*60*60)));
        // for days = Math.floor((t/(1000*60*60*24));
        return {
            'total' : t,
            'hours' : hours,
            'minutes' : minutes,
            'seconds' : seconds
        };

 
    }

    function setClock(id, endtime) {
        
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock,1000);

        function updateClock() {
            let t = getTimeRemaining(endtime);

            function addZero(num){
                if(num <= 9) {
                    return '0' + num;
                } else return num;
            };

            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);
            
            if (t.total <= 0 ) {
                clearInterval(timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        }

    }

    setClock('timer',deadLine);

    //Modal

    let   more = document.querySelector('.more'),
          overlay = document.querySelector('.overlay'),
          close = document.querySelector('.popup-close');

     more.addEventListener('click', function(){
         overlay.style.display = 'block';
         this.classList.add('more-splash');
         document.body.style.overflow = 'hidden';
     });

     close.addEventListener('click', function(){
         overlay.style.display = 'none';
         more.classList.remove('more-splash');
         document.body.style.overflow = '';
     });


     //Form

     let message = {
         loading: 'Loading...',
         success: 'Thanks we we call you back!',
         failure: 'Something went wrong'
     };

     let form = document.querySelector('.main-form'),
        input  = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div');

        statusMessage.classList.add('status');


    form.addEventListener('submit' , event => {
            event.preventDefault();

            form.appendChild(statusMessage);

            let formData = new FormData(form);

            function postData(data) {

                return new Promise(function(resolve,reject){
                    let request = new XMLHttpRequest();

                    request.open('POST','server.php');
                    request.setRequestHeader('Content-Type', 'application/json; charset=utf-8' );
 
                    let obj = {};
        
                    formData.forEach(function(value,key){
                        obj[key]  = value;
                    });
        
                    let jsonObj = JSON.stringify(obj);
        
                    request.send(jsonObj);

                    request.addEventListener('readystatechange', function(){
                        if (request.readyState<4) {
                            resolve();
                        } else if (request.readyState === 4 && request.status == 200 ){       
                          resolve();
                        } else {
                           reject();
                        }
                    });

                });
            }

            postData()
            .then(()=> statusMessage.innerHTML = message.loading)
            .then (()=>statusMessage.innerHTML = message.success)
            .catch(()=>statusMessage.innerHTML = message.failure)
            .then(clearInput);
    });

    function clearInput() {
        for(let i = 0; i< input.length; i++) {
            input[i].value = '';
        }
    }


    //slider

    let slideIndex = 1,
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');


        showSlides(slideIndex);

    function showSlides(n) {

        if (n > slides.length) {
            slideIndex = 1;
        }

        if (n < 1) {
            slideIndex = slides.length;
        }


        slides.forEach((item) => item.style.display = 'none');
        dots.forEach((item) => item.classList.remove('dot-active'));

        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex - 1].classList.add('dot-active');
    }


    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }


    prev.addEventListener('click', () => {
            plusSlides(-1);
    });

    next.addEventListener('click', () => {
        plusSlides(1);
});

    dotsWrap.addEventListener('click',event => {
        for (let i = 0; i < dots.length + 1; i++) {
            if (event.target.classList.contains('dot') && event.target == dots[i-1]){
                currentSlide(i);
            }
            
        }
    });

    //Calc

    let persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1],
        place = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        personsSum = 0,
        daysSum = 0,
        total = 0;


        totalValue.innerHTML = 0;

        persons.addEventListener('change',function(){
            personsSum = +this.value;
            t
        });


}); 