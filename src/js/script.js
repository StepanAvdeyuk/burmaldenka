'use strict';

window.addEventListener('DOMContentLoaded', () => { 

    const screenWidth = screen.width;

    let wheelSet = {
        wrapWidth: 1320,
        outerRadius: 655,
        textFontSize: 30,
        lineWidth: 6
    };

    // if (screenWidth < 1200) {
    //     wheelSet.outerRadius = 360;
    //     wheelSet.textFontSize = 16;
    //     wheelSet.wrapWidth = 620;
    // }

    // console.log(document.getElementById('canvas'));

    let theWheel = new Winwheel({
        'outerRadius'     : wheelSet.outerRadius,       
        'textFontSize'    : wheelSet.textFontSize,        
        'textOrientation' : 'horizontal', 
        'textAlignment'   : 'center',    
        'numSegments'     : 16,
        'lineWidth'   : wheelSet.lineWidth,    
        'strokeStyle' :  '#fff',
        'textFontWeight' : '600',
        // 'textFillStyle': 'red',
        'segments'        :      
        [                               
           {'fillStyle' : '#BE202F', 'text' :  `          Планер подготовки к ЕГЭ`, 'textFillStyle' : '#fff'},
           {'fillStyle' : '#fff', 'text' : `        Ежедневник подготовки к ЕГЭ`, 'textFillStyle' : '#3F3F3F'},
           {'fillStyle' : '#BE202F', 'text' :  `    Набор косметики Летик`, 'textFillStyle' : '#fff'},
           {'fillStyle' : '#fff', 'text' : `            Индивидуальная консультация 
           (предмет по выбору)`, 'textFillStyle' : '#3F3F3F'},
           {'fillStyle' : '#BE202F', 'text' :  `          Мини-проектор`, 'textFillStyle' : '#fff'},
           {'fillStyle' : '#fff', 'text' : '        Колонка Яндекс-мини', 'textFillStyle' : '#3F3F3F'},
           {'fillStyle' : '#BE202F', 'text' :  `        Практикум по самооценке`, 'textFillStyle' : '#fff'},
           {'fillStyle' : '#fff', 'text' : `            План подготовки:
           ЕГЭ по русскому`, 'textFillStyle' : '#3F3F3F'},
           {'fillStyle' : '#BE202F', 'text' :  `           Мини-курс «1-3 задания
           тестовой части»`, 'textFillStyle' : '#fff'},
           {'fillStyle' : '#fff', 'text' : 'Мини-курс «Учисть читать»', 'textFillStyle' : '#3F3F3F'},
           {'fillStyle' : '#BE202F', 'text' :  `               Индивидуальная консультация 
           (оснвоной предмет)`, 'textFillStyle' : '#fff'},
           {'fillStyle' : '#fff', 'text' : 'Фитнес-браслет', 'textFillStyle' : '#3F3F3F'},
           {'fillStyle' : '#BE202F', 'text' :  `Ланч-бокс`, 'textFillStyle' : '#fff'},
           {'fillStyle' : '#fff', 'text' : '     Набор канцелярии', 'textFillStyle' : '#3F3F3F'},
           {'fillStyle' : '#BE202F', 'text' :  `Сертификат Литрес`, 'textFillStyle' : '#fff'},
           {'fillStyle' : '#fff', 'text' : 'Плюшевый мишка', 'textFillStyle' : '#3F3F3F'},
            
        ],
        'animation' :           // Specify the animation to use.
        {
            'type'     : 'spinToStop',
            'duration' : 5,
            'spins' : 3,
            'callbackFinished': clearWheel,
            // 'repeat' : 2
        }
    });

    function clearWheel() {
        theWheel.rotationAngle = 0;
    }


    const wheelButton = document.querySelector('button');

    const canvasWrapper = document.querySelector('#canvas');

    const prizeWrap = document.querySelector('.prize__wrapper');
    const prizeSpan = document.querySelector('.prize__wrapper span');

    wheelButton.addEventListener('click', (e) => {
        e.preventDefault();
            fetch(`http://127.0.0.1:8000/get_reward/${email}/?key=${key}`)
            .then((response) => {
            //    console.log(response);
                return response.json();
            })
            .then((data) => {
                    console.log(data);
                    if (data.success) {
                        wheelButton.classList.add('disabled');

                        setTimeout(() => {
                            prizeSpan.innerHTML = data.reward_text;
                            prizeWrap.classList.add('active');
                            setTimeout(() => {
                                prizeWrap.classList.remove('active');
                            }, 3000);
                            wheelButton.classList.remove('disabled');
                        }, 5000);

                        theWheel.draw();
                        let stopAt = theWheel.getRandomForSegment(data.reward_code + 1);
                        theWheel.animation.stopAngle = stopAt;
                        theWheel.startAnimation();

                    } else {
                        wheelButton.classList.add('disabled');
                    }
            })
            .catch((e) => {
                console.log(e)
            });
    })

    canvasWrapper.addEventListener('click', (e) => {
        e.preventDefault();
            fetch(`http://127.0.0.1:8000/get_reward/${email}/?key=${key}`)
            .then((response) => {
            //    console.log(response);
                return response.json();
            })
            .then((data) => {
                    console.log(data);
                    if (data.success) {
                        wheelButton.classList.add('disabled');

                        setTimeout(() => {
                            prizeSpan.innerHTML = data.reward_text;
                            prizeWrap.classList.add('active');
                            setTimeout(() => {
                                prizeWrap.classList.remove('active');
                            }, 3000);
                            wheelButton.classList.remove('disabled');
                        }, 5000);

                        theWheel.draw();
                        let stopAt = theWheel.getRandomForSegment(data.reward_code + 1);
                        theWheel.animation.stopAngle = stopAt;
                        theWheel.startAnimation();

                    } else {
                        wheelButton.classList.add('disabled');
                    }
            })
            .catch((e) => {
                console.log(e)
            });
    })
});