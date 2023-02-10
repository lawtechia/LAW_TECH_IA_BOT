// Collapsible
var coll = document.getElementsByClassName("collapsible");
var cont = 0;

var textoButton = "";

var listener_ok = function fn () {
    textoButton = "sim";
    getResponse("button");
}

var listener_cancel = function fn () {
    textoButton = "nao";
    getResponse("button");
}

for (let i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
        this.classList.toggle("active");

        var content = this.nextElementSibling;

        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }

    });
}

function getTime() {
    let today = new Date();
    hours = today.getHours();
    minutes = today.getMinutes();

    if (hours < 10) {
        hours = "0" + hours;
    }

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    let time = hours + ":" + minutes;
    return time;
}

// Gets the first message
function firstBotMessage() {
    let firstMessage = "Bem vindo a LMA IA. Por favor, nos informe seu nome completo para melhor atende-lo!"
    document.getElementById("botStarterMessage").innerHTML = '<p class="botText"><span>' + firstMessage + '</span></p>';

    let time = getTime();

    $("#chat-timestamp").append(time);
    document.getElementById("userInput").scrollIntoView(false);
}

firstBotMessage();
// 60765823000130
// Retrieves the response
function getHardResponse(userText) {
    let botResponse;
    if (cont == 2) {
        
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '3f83a43f58msh17ab7270b8117dap16c090jsnc35f465d7b29',
                'X-RapidAPI-Host': 'consulta-cnpj-gratis.p.rapidapi.com'
            }
        };
        
        fetch('https://consulta-cnpj-gratis.p.rapidapi.com/office/' + userText + '?simples=false', options)
            .then((response) => response.json())
            .then((response) => {
                
                
                botResponse = 'CNPJ: ' + response['taxId'].replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
                exibeChat(botResponse);

                if (response['alias'] != null){
                    botResponse = 'NOME: ' + response['alias'];
                } else {
                    botResponse = 'NOME: ' + response['company']['name'];
                }
                exibeChat(botResponse);
                botResponse = 'SITUAÇÃO CADASTRAL: ' + response['status']['text'];
                exibeChat(botResponse);
                botResponse = 'CNAE: ' + response['mainActivity']['id'] + ' - ' + response['mainActivity']['text'];
                exibeChat(botResponse);
                botResponse = getBotResponse(userText, 2);
                exibeChat(botResponse);
            
                let btnconfirma = '<input type="button" class="btnOpcoes ok" value="SIM">';
                $("#chatbox").append(btnconfirma);
                let btnCancela = '<input type="button" class="btnOpcoes cancel" value="NÃO">';
                $("#chatbox").append(btnCancela);
                document.getElementById("chat-bar-bottom").scrollIntoView(true);
            
                var buttons_ok = document.getElementsByClassName("btnOpcoes ok");
                var buttons_cancel = document.getElementsByClassName("btnOpcoes cancel");

                for (let i = 0; i < buttons_ok.length; i++) {
                    buttons_ok[i].addEventListener("click", listener_ok);
                }

                for (let i = 0; i < buttons_cancel.length; i++) {
                    buttons_cancel[i].addEventListener("click", listener_cancel);
                }
            
            }).catch(
                exibeChat("O servidor no momento está congestionado, por favor tente mais tarde.")
            );
    } else {
        botResponse = getBotResponse(userText, cont);
       
        if ( botResponse == 'Verifique se o CNPJ está correto, e o digite novamente. (DIGITE APENAS OS NÚMEROS)'){
            cont = 1;
            exibeChat(botResponse);
        } else {

            if (cont == 3){
                exibeChat('Para realizar uma análise mais detalhada, por favor nos informe alguns dados...')
                exibeChat(botResponse);    
            } else {
                if (botResponse != "terminou") {
                    exibeChat(botResponse);
                }
            }
        }
        
    }
    
    cont += 1;
}

function exibeChat(botResponse) {
    let botHtml = '<p class="botText"><span>' + botResponse + '</span></p>';
    $("#chatbox").append(botHtml);
    document.getElementById("chat-bar-bottom").scrollIntoView(true);
}

//Gets the text text from the input box and processes it
function getResponse(tipoEntrada) {
    
    if (tipoEntrada == "chat") {
        let userText = $("#textInput").val();
        
        // if (userText == "") {
        //     userText = "I love Code Palace!";
        // }

        let userHtml = '<p class="userText"><span>' + userText + '</span></p>';

        $("#textInput").val("");
        $("#chatbox").append(userHtml);
        document.getElementById("chat-bar-bottom").scrollIntoView(true);
        
        setTimeout(() => {
            getHardResponse(userText);
        }, 1000)
    } else {
        setTimeout(() => {
            getHardResponse(textoButton);
        }, 1000)
    }
}

// Handles sending text via button clicks
function buttonSendText(sampleText) {
    let userHtml = '<p class="userText"><span>' + sampleText + '</span></p>';

    $("#textInput").val("");
    $("#chatbox").append(userHtml);
    document.getElementById("chat-bar-bottom").scrollIntoView(true);

    //Uncomment this if you want the bot to respond to this buttonSendText event
    // setTimeout(() => {
    //     getHardResponse(sampleText);
    // }, 1000)
}

function sendButton() {
   getResponse("chat");
}

function heartButton() {
    buttonSendText("Heart clicked!")
}

// Press enter to send a message
$("#textInput").keypress(function (e) {
    if (e.which == 13) {
        getResponse("chat");
    }
});
