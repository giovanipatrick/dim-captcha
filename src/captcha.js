/* 
Atributos utilizados entre os metódos
*/
var operacao;
var captcha_resul;
var ordem = [];
var type_captcha;
var string_value;
var numeric_value;

(function(){
    animateShowCaptcha();
});

/* Event Listner */
function buttonReload(){
    document.querySelector("button.dim-reload-c").addEventListener('click',function(){
        redrawCaptch(type_captcha,false);
    });
}

function buttonVoice(){
    document.querySelector("button.dim-speech-c").addEventListener('click',function(){
        if('speechSynthesis' in window){
            let speech = new SpeechSynthesisUtterance();
            speech.text  = (type_captcha === 'full') ? string_value : numeric_value;
            speechSynthesis.speak(speech);
        }else{
            alert("Desculpe mas o seu navegador ainda não possui suporte para esta funcionalidade!");
        }
    });
}

/* 
Desenha o Captcha 
*/
function canvasCaptcha(captcha,value){
    type_captcha = value;
    let canvas_captcha = document.querySelector("#d-captcha-draw");
    canvas_captcha.innerHTML += '<canvas id="d-canv" width="130" height="30"></canvas>';
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
    numeric_value = operacao;
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
    string_value = captcha_string;
    canvasCaptcha(operacao,'full');
}

/* 
Atrela o Captcha ao Elemento 
*/
function atrelarCaptcha(){
    let atr_html = document.querySelector('#d-rest');
    atr_html.innerHTML += `
        <div class="dim-captcha w-75 mx-auto text-center">
            <div class="input-group">
                <button class="dim-reload-c bg-transparent border rounded border-secondary">
                <img class="mb-1" src="images/refresh.png" style="width:20px; height:20px;"/>
                </button>
                <input type="text" class="border border-secondary rounded dataCaptcha form-control" id="dim-v-captcha">
                <button class="dim-speech-c bg-transparent border rounded border-secondary">
                <img class="mb-1" src="images/voice.png" style="width:20px; height:20px;"/>
                </button>
                <p class="altText ms-2">Digite os caracteres no campo acima, respeitando letras maiúsculas e minúsculas...
                <br>
                <a href="https://diminua.me">dim-captcha v1</a>
                </p>
            </div>
        </div>
    `;
    buttonReload();
    buttonVoice();
}

/* 
Animações - Importadas do Animate.css 
*/
function animateShowCaptcha(){
    document.querySelector('.d-container').classList.add('animate__animated');
    document.querySelector('.d-container').classList.add('animate__bounceIn');
    setTimeout(()=>{
        document.querySelector('.d-container').classList.toggle('animate__animated');
        document.querySelector('.d-container').classList.toggle('animate__bounceIn');
    },1200);
}

function animateShakeCaptcha(){
    document.querySelector('.d-container').classList.add('animate__animated');
    document.querySelector('.d-container').classList.add('animate__shakeX');
    setTimeout(()=>{
        document.querySelector('.d-container').classList.toggle('animate__animated');
        document.querySelector('.d-container').classList.toggle('animate__shakeX');
    },800);
}

function animateDownCaptcha(){
    document.querySelector('.d-container').classList.add('animate__animated');
    document.querySelector('.d-container').classList.add('animate__bounceOut');
    setTimeout(()=>{
        document.querySelector('.d-container').remove();
    },1200);
}


/* 
Leitura de Voz - Captcha 
*/
export function voiceCaptcha(type){
    type_captcha = type;
}

/* 
Desenha o Captcha 
*/
export function drawCaptcha(type){
    if(type === 'full'){
        geraCaptchaFull();
    }else{
        geraCaptcha();
    }
    atrelarCaptcha();
}

/* 
Redesenha caso o usuarío erre 
*/
export function redrawCaptch(type,bvalue){
    let dim_cap = document.querySelector('.dim-captcha');
    dim_cap.remove();
    let canvas = document.getElementById('d-canv');
    canvas.remove();
    if(type === 'full'){
        geraCaptchaFull();
    }else{
        geraCaptcha();
    }
    atrelarCaptcha();
    if(bvalue){
        animateShakeCaptcha();
    }
}

/* 
Verifica se foi preenchido corretamente ou não 
*/
export function verificarCaptcha(valor){
    if(valor == captcha_resul){
        animateDownCaptcha();
        return true;
    }else{
        return false;
    }
}



