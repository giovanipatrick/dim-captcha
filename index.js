import {
    drawCaptcha,
    redrawCaptch,
    verificarCaptcha,
    voiceCaptcha
} from './src/captcha.js';


    (function(){
        drawCaptcha('full');
        voiceCaptcha('full');
    })();


    document.querySelector("#logar").addEventListener('click',function(){
        let captchaValue = document.querySelector("#dim-v-captcha").value;
        if(verificarCaptcha(captchaValue)){
            alert('Login pode prosseguir!');
        }else{
            redrawCaptch('full',true);
        }
    });


