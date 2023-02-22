
var update = {
    "cnpj" : "",
    "nome_comercial" : "",
    "email_comercial" : "",
    "faturamento_anual" : "",
    "regime_tributacao" : "",
    "qtd_funcionarios" : "",
    "folha_salarial" : ""
};

function getBotResponse(input, numPergunta) {
    
    if (numPergunta == 0){
        
        update["nome_comercial"] = input;
        document.getElementById("textInput").type = "email";
        document.getElementById("textInput").placeholder = "example@example.com";
        
        return "Digite seu email, por favor:";
    } else if (numPergunta == 1) {
        resposta = validacaoEmail(input);
        if (resposta != 'Email inválido') {
            update["email_comercial"] = input;
            document.getElementById("textInput").type = "text";
            formataCnpj(numPergunta);
            document.getElementById("textInput").placeholder = "XX.XXX.XXX/XXXX-XX";
            return "Qual CNPJ deseja fazer a consulta?";
        } else {
            return "Email inválido, digite um email válido por favor. Ex: email@example.com";
        }
        
    } else if (numPergunta == 2) {

        if (validaCNPJ(input)) {
            update["cnpj"] = input.replace("/","").replace(".","").replace("-","");
            formataCnpj(numPergunta);
            document.getElementById("textInput").type = "button";
            return "Confira se as informações do CNPJ informado estão corretas e selecione uma opção abaixo:";
        } else {
            return "CNPJ inválido";
        }

    } else if (numPergunta == 3) {
        document.getElementById("textInput").placeholder = "";
        
        if (input.toLowerCase() == 'sim' || input.toLowerCase() == 's') {
            return "O CNPJ informado se encontra em qual regime de tributação LUCRO REAL, ou LUCRO PRESUMIDO?";
        } else {
            return 'Verifique se o CNPJ está correto, e o digite novamente.';
        }
    } else if (numPergunta == 4) {
        document.getElementById("textInput").addEventListener("keypress", onlynumber);
        update["regime_tributacao"] = input;
        document.getElementById("textInput").type = "text";

        document.getElementById("textInput").addEventListener('input', moeda);
        
        return "Qual o faturamento anual aproximado? Caso não souber, basta digitar 0.";
    } else if (numPergunta == 5) {
        update["faturamento_anual"] = input;
        document.getElementById("textInput").removeEventListener('input', moeda);
        return "Qual a quantidade de funcionários aproximada? Caso não souber, basta digitar 0.";
    } else if (numPergunta == 6) {
        update["qtd_funcionarios"] = input;
        document.getElementById("textInput").addEventListener('input', moeda);
        return "Qual o valor da folha de pagamento aproximada? Caso não souber, basta digitar 0.";
    } else if (numPergunta == 7) {
        update["folha_salarial"] = input;

        var options = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(update),
            };

            fetch('https://lma-ia.lmarestapi.click/empresas/valida', options).then(resp => resp.text())
            .then(r => {
                    let botHtml = '<p class="botText"><span>' + r + '</span></p>';
                    $("#chatbox").append(botHtml);
                    document.getElementById("chat-bar-bottom").scrollIntoView(true);
                    
                     var options = {
                     method: 'POST',
                     headers: {
                     'Content-Type': 'application/json',
                     },
                     body: JSON.stringify(update),
                     };
                    if (r == 'Obrigado pelas informações. A LAWTECH IA irá analisar e assim que o processo terminar vamos retorna a você. Obrigado pela preferência.'){
                        fetch('https://lma-ia.lmarestapi.click/empresas', options).catch(e => {console.log(e);});
                    };
            }).catch(e => {console.log(e);});

        return "terminou";
    } 
}

var listener = function fn (event){
    var x = event.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})/);
    event.target.value = !x[2] ? x[1] : x[1] + '.' + x[2] + '.' + x[3] + '/' + x[4] + (x[5] ? '-' + x[5] : '');    
}


// HABILITA SOMENTE NUMEROS NO INPUT

function onlynumber(evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode( key );
    //var regex = /^[0-9.,]+$/;
    var regex = /^[0-9.]+$/;
    if( !regex.test(key) ) {
       theEvent.returnValue = false;
       if(theEvent.preventDefault) theEvent.preventDefault();
    }
 }


 // ABILITA E DESABILITA MASCARA CNPJ
function formataCnpj(numPergunta) {

    if (numPergunta == 1){
        document.getElementById('textInput').addEventListener('input', listener);
    } else {
        document.getElementById('textInput').removeEventListener('input', listener);
    }
}

function validacaoEmail(email) {

    var re = /\S+@\S+\.\S+/;
    if (re.test(email)) {
        return "Email válido";
    } else {
        return "Email inválido";
    }
}

function validaCNPJ (cnpj) {
    var b = [ 6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2 ]
    var c = String(cnpj).replace(/[^\d]/g, '')
    
    if(c.length !== 14)
        return false

    if(/0{14}/.test(c))
        return false

    for (var i = 0, n = 0; i < 12; n += c[i] * b[++i]);
    if(c[12] != (((n %= 11) < 2) ? 0 : 11 - n))
        return false

    for (var i = 0, n = 0; i <= 12; n += c[i] * b[i++]);
    if(c[13] != (((n %= 11) < 2) ? 0 : 11 - n))
        return false

    return true
}


String.prototype.reverse = function(){
    return this.split('').reverse().join(''); 
  };
  
var moeda =  function mascaraMoeda(evento){
    campo = document.getElementById('textInput');
    var tecla = (!evento) ? window.event.keyCode : evento.which;
    var valor  =  campo.value.replace(/[^\d]+/gi,'').reverse();
    var resultado  = "";
    var mascara = "###.###.###.###,##".reverse();
    for (var x=0, y=0; x<mascara.length && y<valor.length;) {
      if (mascara.charAt(x) != '#') {
        resultado += mascara.charAt(x);
        x++;
      } else {
        resultado += valor.charAt(y);
        y++;
        x++;
      }
    }
    campo.value = resultado.reverse();
  }