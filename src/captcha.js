var operacao;
var captcha_resul;
var ordem = [];


/* Desenha o Captcha */
function canvasCaptcha(captcha){
    $("#d-captcha-draw").append(`
    <canvas id="d-canv" width="300" height="30"></canvas>
    `);
    let ctx = document.getElementById('d-canv').getContext('2d');
    ctx.font = '20px serif';
    ctx.strokeText(captcha, 20, 20);
}

/*
Captcha de Operações Matemáticas 
*/
export function geraCaptcha(){
    let operacoes = ['+','-','*','/'];
    let op_sel = Math.floor(Math.random() * (3 - 0) + 0); 
    let min = 1;
    let max = 100;
    let valor_um = Math.floor(Math.random() * (max - min) + min);
    let valor_dois = Math.floor(Math.random() * (max - min) + min);
    operacoes = operacoes[op_sel];
    if(valor_um > valor_dois){
        operacao = valor_um+operacoes+valor_dois;
        ordem[0] = parseInt(valor_um);
        ordem[1] = parseInt(valor_dois);
    }else{
        operacao = valor_dois+operacoes+valor_um;
        ordem[0] = parseInt(valor_dois);
        ordem[1] = parseInt(valor_um);
    }
    switch(operacoes){
        case '+':
            captcha_resul = ordem[0]+ordem[1];
        break;

        case '-':
            captcha_resul = ordem[0]-ordem[1];
        break;

        case '*':
            captcha_resul = ordem[0]*ordem[1];
        break;

        case '/':
            captcha_resul = ordem[0]/ordem[1];
        break;
    }
    canvasCaptcha(operacao);
}

/* 
Captcha com Letra em Números 
*/
export function geraCaptchaFull(){
    let min = 0;
    let max = 51;
    let letras = [
    'a','A','b','B','c','C','d','D','e','E','f','F',
    'g','G','h','H','i','I','j','J','k','K','l','L','m','M',
    'n','N','o','O','p','P','q','Q','r','R','s','S','t','T','u','U',
    'v','V','w','W','x','X','y','Y','z','Z'];
    let num = [];
    let str = [];
    for(let i = 0; i < 3; i++){
        num[i] = Math.floor(Math.random() * (10 - 0));
        str[i] = letras[Math.floor(Math.random() * (max - min))];
    }
    let captcha_string = num.concat(str).sort().toString().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
    captcha_string = captcha_string.split('').sort(function(){return 0.5-Math.random()}).join('');
    captcha_resul = captcha_string;
    operacao = captcha_string;
    canvasCaptcha(operacao);
}

export function atrelarCaptcha(elemento){
    $(`${elemento}`).append(`
            <div class="dim-captcha bg-light bg-gradient w-50  mx-auto text-center">
                <div class="input-group">
                    <div class="input-group-prepend">
                    <input type="text" class="dataCaptcha" id="dim-v-captcha" required>
                    <p>Não sou um robo!</p>
                    </div>                    
                </div>
            </div>
    `);
}

export function redrawCaptch(){
    $('.dim-captcha').remove();
    let canvas = document.getElementById('d-canv');
    canvas.remove();
}

export function verificarCaptcha(valor){
    if(valor == captcha_resul){
        return true;
    }else{
        return false;
    }
}

