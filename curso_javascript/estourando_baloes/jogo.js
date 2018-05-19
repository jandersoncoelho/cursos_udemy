
var timerId = null; //variável que armazena a chamada da função timeout

function iniciaJogo() {
	
	var url = window.location.search;
	var nivel_jogo = url.replace('?', '');
	var tempo_segundos = 0;
	var quantidade_baloes = 80;

	//nivel_jogo = 1: fácil com tempo de 120 segundos
	if (nivel_jogo == 1) {

		tempo_segundos = 120;

	}

	//nível_jogo = 2: normal com tempo de 60 segundos
	if (nivel_jogo == 2) {

		tempo_segundos = 60;

	}
	//nível_jogo = 3: normal com tempo de 30 segundos
	if (nivel_jogo == 3) {

		tempo_segundos = 30;

	}

	criarBaloes(quantidade_baloes);

	//inserir os segundos no span
	document.getElementById('cronometro').innerHTML = tempo_segundos;

	
	//imprimir a quantidade de balões inteiros
	document.getElementById('baloes_inteiros').innerHTML = quantidade_baloes;

	//imprimir a quantidade de balões estourados
	document.getElementById('baloes_estourados').innerHTML = 0;

	contagemTempo(tempo_segundos + 1);
	//contagemTempo(5);

}

function contagemTempo(segundos) {
	
	segundos = segundos - 1;

	if (segundos == -1) {

		clearTimeout(timerId); //para a execução da função do setTimeout
		gameOver();
		return false;
		

	}

	document.getElementById('cronometro').innerHTML = segundos;

	timerId = setTimeout("contagemTempo("+segundos+")", 1000);

}

function gameOver(){

	remove_eventos_baloes();
	alert('Puxa, que pena! Você não conseguiu estourar tudo :\'(')
}

function criarBaloes(quantidade) {
	
	for (var i = 1; i <= quantidade; i++) {
		
		var balao = document.createElement('img');
		balao.src = 'imagens/balao_azul_pequeno.png';
		balao.style.margin = '12px';
		balao.id = 'balao' + i;
		balao.onclick = function(){ estourar(this) };
		document.getElementById('cenario').appendChild(balao);

	}

}

function estourar(e) {

	var id_balao = e.id;

	//remover evendo onclick para que o jogador evite estourar o mesmo balão até teminar o jogo
	document.getElementById(id_balao).setAttribute('onclick','');

	document.getElementById(id_balao).src = 'imagens/balao_azul_pequeno_estourado.png';

	pontuacao(-1);
}

function pontuacao(acao) {
	
	var baloes_inteiros   = document.getElementById('baloes_inteiros').innerHTML;
	var baloes_estourados = document.getElementById('baloes_estourados').innerHTML;

	baloes_inteiros   = parseInt(baloes_inteiros);
	baloes_estourados = parseInt(baloes_estourados);

	baloes_inteiros   = baloes_inteiros + acao;
	baloes_estourados = baloes_estourados - acao;

	document.getElementById('baloes_inteiros').innerHTML   = baloes_inteiros;
	document.getElementById('baloes_estourados').innerHTML = baloes_estourados;

	situacao_jogo(baloes_inteiros);

}

function situacao_jogo(baloes_inteiros) {
	
	if (baloes_inteiros == 0) {

		alert('Viva!! Você conseguiu estourar todos os balões a tempo! ' + "\\o/")
		parar_jogo();
	}

}

function parar_jogo() {
	clearTimeout(timerId);
}

function remove_eventos_baloes() {

    var i = 1; //contado para recuperar balões por id
    
    //percorre o lementos de acordo com o id e só irá sair do laço quando não houver correspondência com elemento
    while(document.getElementById('balao' + i)) {
        //retira o evento onclick do elemnto
        document.getElementById('balao' + i).onclick = '';
        i++; //faz a iteração da variávei i
    }

}

