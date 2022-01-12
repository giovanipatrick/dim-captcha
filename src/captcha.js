var operacao;
var captcha_resul;
var ordem = [];

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
    for(let i = 0; i <= 4; i++){
        num[0] = Math.floor(Math.random() * (10 - 0));
        str[0] = letras[Math.floor(Math.random() * (max - min))];
        num[1] = Math.floor(Math.random() * (10 - 0));
        str[1] = letras[Math.floor(Math.random() * (max - min))];
        num[2] = Math.floor(Math.random() * (10 - 0));
        str[2] = letras[Math.floor(Math.random() * (max - min))];
    }
    let captcha_string = num.concat(str).sort();
    operacao = captcha_string;
    captcha_resul = captcha_string;
}

export function atrelarCaptcha(elemento){
    $('.dim-captcha').remove();
    $(`${elemento}`).append(`
            <div class="dim-captcha border bg-light bg-gradient w-50 mt-2 p-2 mx-auto text-center">
                <div class="input-group">
                    <div class="input-group-prepend">
                    <label id="dim-question">Quanto é ${operacao}?</label>
                    <input type="text" class="dataCaptcha" id="dim-v-captcha" required>
                    </div>                    
                </div>
            </div>
    `);
}

export function verificarCaptcha(valor){
    if(parseInt(valor) === captcha_resul){
        return true;
    }else{
        return false;
    }
}

