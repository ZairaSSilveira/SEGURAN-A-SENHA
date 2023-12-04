document.addEventListener('DOMContentLoaded', function () {
    var entradaSenha = document.getElementById('entradaSenha');
    var medidorPoder = document.getElementById('medidorPoder');
    var requisitoComprimento = document.getElementById('requisitoComprimento');
    var requisitoMinuscula = document.getElementById('requisitoMinuscula');
    var requisitoMaiscula = document.getElementById('requisitoMaiscula');
    var requisitoNumero = document.getElementById('requisitoNumero');
    var requisitoSimbolo = document.getElementById('requisitoSimbolo');
    var textoPoder = document.getElementById('textoPoder');
    var mostrarSenha = document.getElementById('mostrarSenha');
    var mensagemIncentivo = document.createElement('div');
    mensagemIncentivo.id = 'mensagemIncentivo';
    document.body.appendChild(mensagemIncentivo);

    entradaSenha.addEventListener('input', function () {
        var senha = entradaSenha.value;
        var Poder = verificaPoder(senha);
        var cor = Poder < 50 ? 'red' : Poder < 80 ? 'yellow' : 'green';
        medidorPoder.style.width = Poder + '%';
        medidorPoder.style.backgroundColor = cor;
        textoPoder.textContent = 'Força da Senha: ' + Poder + '%';
        atualizar(senha);
    });

    mostrarSenha.addEventListener('click', function () {
        entradaSenha.type = entradaSenha.type === 'password' ? 'text' : 'password';
    });

    function verificaPoder(senha) {
        var comprimentoValido = senha.length >= 8;
        var minusculaValida = /[a-z]/.test(senha);
        var maisculaValida = /[A-Z]/.test(senha);
        var numeroValido = /[0-9]/.test(senha);
        var simboloValido = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(senha);

        requisitoComprimento.classList.toggle('verde', comprimentoValido);
        requisitoComprimento.classList.toggle('vermelho', !comprimentoValido);
        requisitoMinuscula.classList.toggle('verde', minusculaValida);
        requisitoMinuscula.classList.toggle('vermelho', !minusculaValida);
        requisitoMaiscula.classList.toggle('verde', maisculaValida);
        requisitoMaiscula.classList.toggle('vermelho', !maisculaValida);
        requisitoNumero.classList.toggle('verde', numeroValido);
        requisitoNumero.classList.toggle('vermelho', !numeroValido);
        requisitoSimbolo.classList.toggle('verde', simboloValido);
        requisitoSimbolo.classList.toggle('vermelho', !simboloValido);

        var totalRequisitos = 0;
        [comprimentoValido, minusculaValida, maisculaValida, numeroValido, simboloValido].forEach(function (requisito) {
            totalRequisitos += requisito ? 1 : 0;
        });

        mensagemIncentivo.innerHTML = '';

        if (senha.length === 0) {
            mensagemIncentivo.textContent = 'Digite uma senha para começar!';
        } else if (totalRequisitos < 4) {
            mensagemIncentivo.textContent = 'Adicione mais elementos à sua senha para torná-la mais forte.';
        } else {
            mensagemIncentivo.textContent = 'Sua senha é forte e resistente. Parabéns!';
        }

        return totalRequisitos * 25;
    }

    function atualizar(senha) {
        verificaPoder(senha);
    }
});
