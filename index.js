import {
    atrelarCaptcha,
    verificarCaptcha,
    geraCaptcha
} from './src/captcha.js';

$(document).ready(()=>{

    (function(){
        atrelarCaptcha('.loginPage');
    })();

    $(document).on('click','#logar',function(){
        let captchaValue = $("#dim-v-captcha").val();
        if(verificarCaptcha(captchaValue)){
            alert('Login pode prosseguir!');
            $('.dim-captcha').remove();
        }else{
            console.log('O Captcha está incorreto, tente novamente!');
            geraCaptcha();
            atrelarCaptcha('.loginPage');
        }
    });

});