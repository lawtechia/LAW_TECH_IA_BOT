
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
        
        update["email_comercial"] = input;
        document.getElementById("textInput").type = "text";
        
        formataCnpj(numPergunta);
        
        return "Qual CNPJ deseja fazer a consulta? (DIGITE APENAS OS NUMEROS)";
    } else if (numPergunta == 2) {
        
        update["cnpj"] = input.replace("/","").replace(".","").replace("-","");
        formataCnpj(numPergunta);
        document.getElementById("textInput").type = "button";
        
        return "Confira se as informações do CNPJ informado estão corretas e selecione uma opção abaixo:";
    } else if (numPergunta == 3) {
        document.getElementById("textInput").type = "text";
        
        if (input.toLowerCase() == 'sim' || input.toLowerCase() == 's') {
            return "O CNPJ informado se encontra no regime de tributação LUCRO REAL, ou LUCRO PRESUMIDO?";
        } else {
            return 'Verifique se o CNPJ está correto, e o digite novamente. (DIGITE APENAS OS NÚMEROS)';
        }
    } else if (numPergunta == 4) {
        update["regime_tributacao"] = input;
        return "Qual o faturamento anual aproximado? (R$ milhões)";
    } else if (numPergunta == 5) {
        update["faturamento_anual"] = input;
        return "Qual a quantidade de funcionários aproximada?";
    } else if (numPergunta == 6) {
        update["qtd_funcionarios"] = input;
        return "Qual o valor da folha de pagamento aproximada? (R$ milhões)";
    } else if (numPergunta == 7) {
        update["folha_salarial"] = input;

        var options = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(update),
            };

            fetch('https://restapilma-production.up.railway.app/empresas/valida', options).then(resp => resp.text())
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
                    if (r == 'Obrigado pelas informações. A LMA IA irá analisar e assim que o processo terminar vamos retorna a você. Obrigado pela preferência.'){
                        fetch('https://restapilma-production.up.railway.app/empresas', options).catch(e => {console.log(e);});
                    };
            }).catch(e => {console.log(e);});

        return "terminou";
    } 
}

var listener = function fn (event){
    var x = event.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})/);
    event.target.value = !x[2] ? x[1] : x[1] + '.' + x[2] + '.' + x[3] + '/' + x[4] + (x[5] ? '-' + x[5] : '');
}

function formataCnpj(numPergunta) {

    if (numPergunta == 1){
        document.getElementById('textInput').addEventListener('input', listener);
    } else {
        document.getElementById('textInput').removeEventListener('input', listener);
    }
}
