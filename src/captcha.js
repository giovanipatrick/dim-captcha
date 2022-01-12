var operacao;
var captcha_resul;
var ordem = [];

(function(){
    geraCaptcha();
})();

export function geraCaptcha(){
    let operacoes = ['+','-','*','/'];
    let op_sel = Math.floor(Math.random() * (3 - 0) + 0); 
    let min = 1;
    let max = 200;
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

export function atrelarCaptcha(elemento){
    $('.dim-captcha').remove();
    $(`${elemento}`).append(`
            <div class="dim-captcha border bg-secondary bg-gradient w-50 mt-2 p-2 mx-auto text-center">
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

