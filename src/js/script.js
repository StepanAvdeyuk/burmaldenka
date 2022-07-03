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


    const wheelButton = document.querySelector('.wheel__button');

    let spinsCount = 0;
    let spinsAvalible;

    const spanCount = document.querySelector('.spins span');

    fetch('https://x8ki-letl-twmt.n7.xano.io/api:vTFmrVeI/win/1')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.spins) {
                    spanCount.innerHTML = data.spins; 
                    spinsAvalible = data.spins;
                    if (data.spins == 0) {
                        spinButton.classList.add('disabled');
                    }
                } else {
                    spinButton.classList.add('disabled');
                }
            })
            .catch((e) => {
                console.log(e)
            });

    let canSpin = true;
    const spinButton = document.querySelector('.wheel__button button');

    wheelButton.addEventListener('click', (e) => {
        e.preventDefault();

        if (canSpin) {
            fetch('https://x8ki-letl-twmt.n7.xano.io/api:vTFmrVeI/win/1')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (spinsCount < data.spins) {
                    canSpin = false;
                    spinButton.classList.add('disabled');
                    setTimeout(() => {
                        canSpin = true;
                        if (spinsCount < data.spins) {
                            spinButton.classList.remove('disabled');
                        }
                    }, 5100);
                    theWheel.draw();
                    let stopAt = theWheel.getRandomForSegment(data.section);
                    theWheel.animation.stopAngle = stopAt;
                    theWheel.startAnimation();
                    spinsCount = spinsCount + 1;
                    if (spinsAvalible - spinsCount) {
                        spanCount.innerHTML = spinsAvalible - spinsCount;
                    } else {
                        spanCount.innerHTML = '0';
                    }
                } 
            })
            .catch((e) => {
                console.log(e)
            });
        }
    })
});