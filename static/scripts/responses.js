let resposta = {};

function getBotResponse(input, numPergunta) {
    
    if (numPergunta == 0){
        return "Qual o seu email?";
    } else if (numPergunta == 1) {
        return "Qual CNPJ deseja fazer a consulta? (DIGITE APENAS OS NUMEROS)";
    } else if (numPergunta == 2) {
        return "Confira se as informações do CNPJ informado estão corretas, digite SIM ou NAO: ";
    } else if (numPergunta == 3) {
        if (input == 'SIM' || input == 'sim' || input == 's') {
            return "O CNPJ informado se encontra no regime de tributação LUCRO REAL, ou LUCRO PRESUMIDO?";
        } else {
            return 'Verifique se o CNPJ está correto, e o digite novamente. (DIGITE APENAS OS NÚMEROS)';
        }
    } else if (numPergunta == 4) {
        return "Qual o faturamento anual aproximado?";
    } else if (numPergunta == 5) {
        return "Qual a quantidade de funcionários aproximada?";
    } else if (numPergunta == 6) {
        return "Qual o valor da folha de pagamento (R$ milhões) aproximada?";
    } else if (numPergunta == 7) {
        return "Obrigado pelas informações. A LMA AI irá analisar e retorna a você em 72h! Obrigado pela preferência.";
    } 

}
