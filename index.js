import {
    atrelarCaptcha,
    verificarCaptcha,
    geraCaptchaFull
} from './src/captcha.js';

$(document).ready(()=>{

    (function(){
        geraCaptchaFull();
        atrelarCaptcha('.loginPage');
    })();

    $(document).on('click','#logar',function(){
        let captchaValue = $("#dim-v-captcha").val();
        if(verificarCaptcha(captchaValue)){
            alert('Login pode prosseguir!');
            $('.dim-captcha').remove();
        }else{
            console.log('O Captcha está incorreto, tente novamente!');
            geraCaptchaFull();
            atrelarCaptcha('.loginPage');
        }
    });

});