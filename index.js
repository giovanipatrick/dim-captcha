import {
    drawCaptcha,
    redrawCaptch,
    verificarCaptcha
} from './src/captcha.js';

$(document).ready(()=>{

    (function(){
        drawCaptcha('full');
    })();

    $(document).on('click','#logar',function(){
        let captchaValue = $("#dim-v-captcha").val();
        if(verificarCaptcha(captchaValue)){
            alert('Login pode prosseguir!');
            $('.d-container').remove();
        }else{
            console.log('O Captcha está incorreto, tente novamente!');
            redrawCaptch('full');
        }
    });

});