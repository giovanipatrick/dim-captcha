<!DOCTYPE html>
<html lang="pt-br">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Página de Teste</title>
        <meta name="description" content="Utilizada para realizar testes do Captcha">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
        <script type="module" src="src/captcha.js?v=<?php echo time(); ?>"></script>
        <script type="module" src="index.js?v=<?php echo time(); ?>"></script>
        <link rel="stylesheet" href="style/style.css?v=<?php echo time(); ?>">
    </head>
    <body>
        <div class="loginPage mx-auto text-center w-25" style="margin-top:14%;">
               <p>Index Of</p>

                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text">Username</span>
                    </div>
                    <input type="text" class="form-control" id="username">
                </div>

                <div class="input-group mt-2">
                    <div class="input-group-prepend">
                        <span class="input-group-text">
                            Password
                        </span>
                    </div>
                    <input type="password" class="form-control" id="password">
                </div>

                <div class="d-container border border-secondary rounded">
                    <div id="d-captcha-draw">
                    <!-- Captcha será desenhado aqui -->
                    </div>
                    <div id="d-rest">
                    <!-- Preenchimento do Captcha -->
                    </div>
                </div>

                <div class="input-group mt-2 d-flex justify-content-center">
                    <button class="btn btn-success" id="logar">
                    Entrar no Sistema
                    </button>
                </div>
        </div>
        
    </body>
</html>