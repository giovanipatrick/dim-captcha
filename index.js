import {
    atrelarCaptcha,
    verificarCaptcha,
    geraCaptchaFull,
    redrawCaptch
} from './src/captcha.js';

$(document).ready(()=>{

    (function(){
        geraCaptchaFull();
        atrelarCaptcha('#d-captcha-draw');
    })();

    $(document).on('click','#logar',function(){
        let captchaValue = $("#dim-v-captcha").val();
        if(verificarCaptcha(captchaValue)){
            alert('Login pode prosseguir!');
            $('.d-container').remove();
        }else{
            console.log('O Captcha está incorreto, tente novamente!');
            redrawCaptch();
            geraCaptchaFull();
            atrelarCaptcha('#d-captcha-draw');
        }
    });

});