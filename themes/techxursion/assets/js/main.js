document.addEventListener("DOMContentLoaded", initSwiper);
document.addEventListener("DOMContentLoaded", initPage);
document.addEventListener("DOMContentLoaded", initAccordions);
document.addEventListener("DOMContentLoaded", initCountDownTimers);
document.addEventListener("DOMContentLoaded", initLearningPlans);

function initLearningPlans() {
    document.querySelectorAll('.learning-plans__radio').forEach(el=>{
        el.onchange =function(e) {
            document.querySelectorAll('.learning-plan').forEach(pl=>{pl.style.display = 'none';});
            document.querySelector('.learning-plan[data-offer-id="'+e.target.value+'"]').style.display = 'block';
            document.querySelector('[data-learning-plan-hours]').innerHTML = e.target.dataset.hours + " часов";
        }
    });
}
function initSwiper() {
    const swiper = window.swp =  new Swiper('.advert-slider-simple,.advert-slider-courses,.info__slider', {
        loop: true,
        autoHeight:true,
        spaceBetween: 50,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            dynamicBullets: true,
            dynamicMainBullets: 1,
            clickable: true,
        },
     
        on: {
            init: function (sw) {
                if(sw.slides.length > 1)
                    sw.slideTo(sw.slides.length / 2 - !(sw.slides.length % 2));
            },
        },
       
    });

    const swiperReviews = window.sr = new Swiper('.reviews__slider', {
        //autoHeight:true,
        loop: true,
        //autoHeight:true,
        calculateHeight:true,
        spaceBetween: 50,
        slidesPerView: 1,
        breakpoints: {
            1023: {
              slidesPerView: 2,
              spaceBetween: 50,
            },
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            dynamicBullets: true,
            dynamicMainBullets: 1,
            clickable: true,
           renderBullet: function (index, className) {
                return '<span class="' + className + ' qw">' + (index + 1) + '</span>';
              }
        },
     
        on: {
            init: function (sw) {
                if(sw.slides.length > 1)
                    sw.slideTo(sw.slides.length / 2 - !(sw.slides.length % 2));
            },
        },
        
       
    });

    /*function reinitSwiper(swiper) {
        if(swiper) {
        setTimeout(function () {
            console.log(swiper);
            if(swiper.length > 1) {
                swiper.forEach(element => {
                    element.slideTo(element.slides.length / 2 - !(element.slides.length % 2));
                });
            }
            else {
            swiper.slideTo(swiper.slides.length / 2 - !(swiper.slides.length % 2));
            }
        }, 500);
    }
      }*/



    const swiperGuide = new Swiper('.guide__slider', {
        loop: true,
        autoHeight:true,
        spaceBetween: 50,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        on: {
            init: function (sw) {
                if(sw.slides.length > 1)
                    sw.slideTo(sw.slides.length / 2 - !(sw.slides.length % 2));
            },
        },
       
    });

   /* reinitSwiper(swiperReviews);
    reinitSwiper(swiperGuide);
    reinitSwiper(swiper);*/

}

function Timer(elementsSelector) {
    var elements = document.querySelectorAll(elementsSelector);
    elements.forEach(el => {
        var countDownDate = new Date(el.innerHTML).getTime();
        el.innerHTML = "10 : 59 : 59";
        // Update the count down every 1 second
        function update(el) {
        
            // Get today's date and time
            var now = new Date().getTime();
          
            // Find the distance between now and the count down date
            var distance = countDownDate - now;
          
            // Time calculations for days, hours, minutes and seconds
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            var d_label = "";
            switch(days % 10) {
                case 2:
                case 3:
                case 4:
                 d_label = " дня ";
                 break;
                
                default: d_label = " дней ";break;
            }
            switch(days % 100) {
                case 1:
                case 11-20: d_label = " дней "; break;
                default: break;
            }
            el.innerHTML = days + d_label + hours + " : "
            + minutes + " : " + seconds;
          
            if (distance < 0) {
              clearInterval(x);
            }
        }
        update(el);
        var x = setInterval( ()=>{update(el)}, 1000);
    });

}

function initCountDownTimers(){
   Timer(".countdown-timer");
}


function touchScroll(bind = '') {
    const els = document.querySelectorAll(bind);
    let isDown = false;
    let startX;
    let scrollLeft;

    els.forEach(element => {
 
        if (element.scrollHeight > element.clientHeight ||
            element.scrollWidth > element.clientWidth) {
                element.classList.add('scrollable');
        }

        element.addEventListener('mouseenter', ()=>{
            element.classList.add('scrollable-red-thumb');
        })
          
        element.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - element.offsetLeft;
            scrollLeft = element.scrollLeft;
            cancelMomentumTracking();
        });

        element.addEventListener('mouseleave', () => {
            isDown = false;
            element.classList.remove('scrollable-active');
        });

        element.addEventListener('mouseup', () => {
            isDown = false;
            element.classList.remove('scrollable-active');
            beginMomentumTracking();
        });

        element.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - element.offsetLeft;
            const walk = (x - startX); //scroll-fast
            var prevScrollLeft = element.scrollLeft;
            element.scrollLeft = scrollLeft - walk;
            velX = element.scrollLeft - prevScrollLeft;
        });

        element.addEventListener('wheel', (e) => {
            cancelMomentumTracking();
        });

    });
    var velX = 0;
    var momentumID;

    function beginMomentumTracking() {
        cancelMomentumTracking();
        momentumID = requestAnimationFrame(momentumLoop);
    }
    function cancelMomentumTracking() {
        cancelAnimationFrame(momentumID);
    }
    function momentumLoop() {
        els.forEach(element => {
            element.scrollLeft += velX;
            velX *= 0.95;
            if (Math.abs(velX) > 0.5) {
                momentumID = requestAnimationFrame(momentumLoop);
            }
        });
    }
}



function initPage() {
    $('.search-bar input').keydown(function(){
        var _self = $(this)
    
        setTimeout(function() {
            if( _self.val().length > 2 ){
                // число 2 можно менять, число 2 значит что запрос выполнится только если введено минимум 3 символа в строку поиска.
                // Здесь ajax запрос на сервер со вставкой результата
                $('.search-bar .tips').fadeIn(300)
    
                var text=_self.val();
                var url="/search.php?text="+text;
    
                $.ajax({
                    type: "GET",
                    dataType: "html",
                    url: url,
                    success: function(data){
                        if(data) {$('.search-bar .tips .scroll').html(data);}
                        else {
                            $('.search-bar .tips').fadeOut(200);
                        }
                        
                    }
                });
    
    
            } else {
                $('.search-bar .tips').fadeOut(200);
            }
        }, 10)
    });
    touchScroll(".scrollable-mobile");


    $("#add-to-cart").on("click", function() {
        var productID = $(this).data("product_id");
        $.ajax({
            url: "/ajax/cart.php",
            type: "POST",
            data: {
                productID: productID
            },
            dataType: "json",
            success: function(data) {
                if (data.success) {
                    alert("Товар успешно добавлен в корзину!");
                    let cart = $(".btn-cart__label")[0];
                    let count = data.cart.count;
                    if(count > 0) {
                        cart.innerHTML = count;
                        $(cart).show();
                    } else {
                        $(cart).hide();
                    }
                } else {
                    alert("Ошибка при добавлении товара в корзину.");
                }
            },
            error: function() {
                alert("Произошла ошибка при выполнении AJAX-запроса.");
            }
        });
    });
    
window.onscroll = function() {myFunction()};

var header = document.querySelector("header");
var sticky = header.offsetTop;

function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

var menuBtns = document.querySelectorAll('.menu-btn');
menuBtns.forEach(menuBtn=> {
menuBtn.onclick = function(e){
    var openingMenu = document.querySelector('.opening-menu');
    openingMenu.classList.toggle('open');
    var banner = document.querySelector('.banner');
    var h = banner.offsetHeight-window.scrollY;
    if(h <= 0) {
        h = 0;
    }
    openingMenu.style.height = "calc(100vh - 100% - "+h+"px)";
    document.querySelector('html').classList.toggle('locked');

}});


}

function initAccordions() {
    var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].querySelector('.accordion__title').addEventListener("click", function() {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
   this.parentElement.classList.toggle("active");

    /* Toggle between hiding and showing the active panel */
    var panel = this.nextElementSibling;
  });
}
}

