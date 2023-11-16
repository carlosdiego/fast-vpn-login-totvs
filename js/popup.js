document.addEventListener('DOMContentLoaded', function () {
  // Carrega dados salvos e preenche os campos se existirem
  chrome.storage.local.get(['username', 'password', 'domain', 'selectedHost'], function (items) {
    if (items.username && items.password && items.domain) {
      document.getElementById('username').value = items.username;
      document.getElementById('password').value = items.password;
      document.getElementById('input_3').value = items.domain;
      if (items.selectedHost) {
        document.getElementById('hostPermissions').value = items.selectedHost;
      }
    }
  });

  // Carrega as URLs de host_permissions
  var manifest = chrome.runtime.getManifest();
  var hostSelect = document.getElementById('hostPermissions');

  manifest.host_permissions.forEach(function (host) {
    var option = document.createElement('option');
    option.value = host;
    option.textContent = host;
    hostSelect.appendChild(option);
  });

  document.getElementById('save').addEventListener('click', function () {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var domain = document.getElementById('input_3').value;
    var selectedHost = hostSelect.value;

    // Salva os dados no armazenamento local do Chrome, incluindo o host selecionado
    chrome.storage.local.set({ username: username, password: password, domain: domain, selectedHost: selectedHost }, function () {
      console.log('Usuário, senha, domínio e host selecionado salvos.');

      // Redireciona para a página de login selecionada
      chrome.tabs.create({ url: selectedHost });
    });
  });

  // Toggle para a visibilidade da senha
  var togglePassword = document.getElementById('togglePassword');
  var password = document.getElementById('password');
  var passwordIcon = togglePassword.querySelector('img');

  togglePassword.addEventListener('click', function () {
    password.type = (password.type === 'password') ? 'text' : 'password';
    passwordIcon.src = (password.type === 'password') ? 'icons/view.png' : 'icons/hide.png'; // Alterna o ícone
  });
});
