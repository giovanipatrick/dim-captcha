import {
    drawCaptcha,
    redrawCaptch,
    verificarCaptcha,
    voiceCaptcha
} from './src/captcha.js';

$(document).ready(()=>{

    (function(){
        drawCaptcha('full');
        voiceCaptcha('full');
    })();

    $(document).on('click','#logar',function(){
        let captchaValue = $("#dim-v-captcha").val();
        if(verificarCaptcha(captchaValue)){
            alert('Login pode prosseguir!');
        }else{
            redrawCaptch('full',true);
        }
    });

});