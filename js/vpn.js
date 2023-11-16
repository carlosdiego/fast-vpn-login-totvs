(function () {
    'use strict';
  
    // Função para definir os valores de login e executar a ação de login
    function setValuesAndAct(username, password, domain) {
        // Verifica se o campo de domínio existe na página
        if ($('[name="domain"]').length > 0) {
            // Se existir, define os valores de usuário e domínio
            $('[name="username"]').val(username);
            $('[name="domain"]').val(domain);
        } else {
            // Se não, concatena o domínio com o usuário
            $('[name="username"]').val(domain + '\\' + username);
        }
        // Define o valor da senha
        $('[name="password"]').val(password);
        // Clica no botão de login
        $(".credentials_input_submit").trigger( "click" );
    }
  
    // Função para clicar em um elemento favorito
    function checkAndClick() {
        console.log('Clicando na VPN.');
        $(".favorite").trigger( "click" );
    }
  
    // Busca as credenciais de login no armazenamento local
    chrome.storage.local.get(['username', 'password', 'domain'], function(items) {
        // Verifica se os dados necessários estão disponíveis
        if (items.username && items.password && items.domain) {
            // Se estiver na página de política, executa a ação de login
            if (window.location.href.includes('/my.policy')) {
                setValuesAndAct(items.username, items.password, items.domain);
  
                // Envia um formulário escondido, se existir
                var f = document.getElementById("hidden_form");
                if (f != null) {
                    f.my_result.value = 1;
                    f.submit();
                }
            }
  
            // Se estiver na página webtop, executa a ação de clicar no favorito
            if (window.location.href.includes('vdesk/webtop.eui?webtop')) {
                setTimeout(checkAndClick, 1000);
            }
        } else {
            // Loga um aviso se as credenciais não forem encontradas
            console.log('Dados de login não encontrados no armazenamento.');
        }
    });
  })();
  