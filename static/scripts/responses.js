let resposta = {};
var update = {
    "cnpj" : "",
    "nome_comercial" : "",
    "email_comercial" : "",
    "faturamento_anual" : "",
    "regime_tributacao" : "",
    "qtd_funcionarios" : "",
    "folha_salarial" : ""
};

let resposta_final = {
    "texto" : ""
};

function getBotResponse(input, numPergunta) {
    
    if (numPergunta == 0){
        update["nome_comercial"] = input;
        return "Qual o seu email?";
    } else if (numPergunta == 1) {
        update["email_comercial"] = input;
        return "Qual CNPJ deseja fazer a consulta? (DIGITE APENAS OS NUMEROS)";
    } else if (numPergunta == 2) {

        update["cnpj"] = input;
        return "Confira se as informações do CNPJ informado estão corretas, digite SIM ou NAO: ";
    } else if (numPergunta == 3) {
        if (input.toLowerCase() == 'sim' || input.toLowerCase() == 's') {
            return "O CNPJ informado se encontra no regime de tributação LUCRO REAL, ou LUCRO PRESUMIDO?";
        } else {
            return 'Verifique se o CNPJ está correto, e o digite novamente. (DIGITE APENAS OS NÚMEROS)';
        }
    } else if (numPergunta == 4) {
        update["regime_tributacao"] = input;
        return "Qual o faturamento anual aproximado?";
    } else if (numPergunta == 5) {
        update["faturamento_anual"] = input;
        return "Qual a quantidade de funcionários aproximada?";
    } else if (numPergunta == 6) {
        update["qtd_funcionarios"] = input;
        return "Qual o valor da folha de pagamento (R$ milhões) aproximada?";
    } else if (numPergunta == 7) {
        update["folha_salarial"] = input;

        var valida = {
            "cnpj": update["cnpj"]
        }

        var options = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(update),
            };

        fetch('http://localhost:8080/empresas/valida', options).then(resp => resp.text()).then(r => {resposta_final["texto"] = r;
                                                                                                        return r;
                                                                                                    }).catch(e => {console.log(e);});
        return resposta_final["texto"];
    } 

}
