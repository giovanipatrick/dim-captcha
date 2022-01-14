var operacao;
var captcha_resul;
var ordem = [];
var type_captcha;


/* Desenha o Captcha */
function canvasCaptcha(captcha,value){
    type_captcha = value;
    $("#d-captcha-draw").append(`
    <canvas id="d-canv" width="130" height="30"></canvas>
    `);
    let ctx = document.getElementById('d-canv').getContext('2d');
    let cores = ['red','blue','black','green','silver'];
    let fonts = ['Arial','Verdana','Times New Roman','Courier New','serif'];
    let f_style = ['normal','italic','oblique','italic','normal'];
    let f_weight = ['normal','bold','bolder','lighter','normal'];
    let numSort = Math.floor(Math.random() * (4 - 0));
    ctx.font = `${f_style[numSort]} ${f_weight[numSort]} 20px ${fonts[numSort]}`;
    ctx.strokeStyle = cores[numSort];
    ctx.strokeText(captcha, 20, 20);
}

/*
Captcha de Operações Matemáticas 
*/
function geraCaptcha(){
    let operacoes = ['+','-','*','/'];
    let op_sel = Math.floor(Math.random() * (3 - 0) + 0); 
    let min = 1;
    let max = 100;
    let valor_um = Math.floor(Math.random() * (max - min) + min);
    let valor_dois = Math.floor(Math.random() * (max - min) + min);
    operacoes = operacoes[op_sel];
    (valor_um > valor_dois) ? operacao = valor_um+operacoes+valor_dois : operacao = valor_dois+operacoes+valor_um;
    (valor_um > valor_dois) ? ordem[0] = parseInt(valor_um) : ordem[0] = parseInt(valor_dois);
    (valor_um > valor_dois) ? ordem[1] = parseInt(valor_dois) : ordem[1] = parseInt(valor_um);
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
    canvasCaptcha(operacao,'numerico');
}

/* 
Captcha com Letra em Números 
*/
function geraCaptchaFull(){
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
    canvasCaptcha(operacao,'full');
}

function atrelarCaptcha(elemento){
    $(`${elemento}`).append(`
            <div class="dim-captcha w-50 mb-3 mx-auto text-center">
                <div class="input-group mb-3">
                    <button class="dim-reload-c bg-transparent border rounded border-secondary">
                    <img class="mb-1" src="images/refresh.png" style="width:20px; height:20px;"/>
                    </button>
                    <input type="text" class="border border-secondary rounded dataCaptcha form-control" id="dim-v-captcha">
                </div>
            </div>
    `);
}

(function(){
    $(document).on('click','.dim-reload-c',function(){
        redrawCaptch(type_captcha);
    });
})();

export function drawCaptcha(type){
    if(type === 'full'){
        geraCaptchaFull();
    }else{
        geraCaptcha();
    }
    atrelarCaptcha('#d-captcha-draw');
}

export function redrawCaptch(type){
    $('.dim-captcha').remove();
    let canvas = document.getElementById('d-canv');
    canvas.remove();
    if(type === 'full'){
        geraCaptchaFull();
    }else{
        geraCaptcha();
    }
    atrelarCaptcha('#d-captcha-draw');
}

export function verificarCaptcha(valor){
    if(valor == captcha_resul){
        return true;
    }else{
        return false;
    }
}

