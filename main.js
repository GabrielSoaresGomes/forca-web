const palavrasSorteaveisAlimento = ['queijo', 'amora', 'arroz', 'melancia'];
var gameIsStart = false
var palavraSorteada = ""
var numeroErro = 0
var palavrasLivres = palavrasSorteaveisAlimento
var letrasUsadas = []
var perdeu = false
// Função para iniciar o game ao clicar no botão começar


$('#btn-start').click(comecarJogo)
function comecarJogo () {
    if (!gameIsStart && !perdeu ) {
        gameIsStart = true
        if (palavrasLivres.length == 0) {
            $('#titulo').html("Acabou as palavras!")
            $("#input-resposta").addClass('d-none')

            return
        }
        let sorteado = Math.floor(Math.random() * (palavrasLivres.length))
        palavraSorteada = palavrasLivres[sorteado]

        let tamanhoPalavra = palavraSorteada.length

        for (let i = 0; i < tamanhoPalavra; i++) {
            $('.palavra-resposta').append(`<div class='${i} mx-1'><span style="font-family: monospace;color: transparent"></span></div>`)
        }

        $('.palavra-resposta div span').each(function () {
            $(this).css('border-bottom', '1px solid black')
        })
        $(this).addClass('d-none')

        $('#input-resposta').removeClass('d-none')
        var c = 0
        $('.palavra-resposta div').each(function () {
            $(this).children().html(palavraSorteada[c])
            c++
        })

    }
}



//Função para conferir se tem a letra inserida na palavra
function conferirLetra() {
    var c = 0
    var certo = false
    if (!perdeu && ($.inArray($('input#input-resposta').val(), letrasUsadas) < 0) && $('#input-resposta').val() != "") {
        for (let letter of palavraSorteada) {
            if (letter === $('#input-resposta').val()) {
                $('.palavra-resposta div').each(function () {
                    if ($(this).hasClass("" + c)) {
                        $(this).removeClass("" + c)
                        $(this).children().html(letter).css('color',"")

                    }
                })
                certo = true
            }
            c++
        }
        if (certo === false) {
            $('.letrasUtilizadas').append($('#input-resposta').val() + " - ")
            numeroErro++
            switch (numeroErro) {
                case 1:
                    $('#cabeca').removeClass('d-none');
                    break
                case 2:
                    $('#corpo').removeClass('d-none');
                    break
                case 3:
                    $('#bracoEsquerdo').removeClass('d-none');
                    break
                case 4:
                    $('#bracoDireito').removeClass('d-none');
                    break
                case 5:
                    $('#pernaEsquerda').removeClass('d-none');
                    break
                case 6:
                    $('#pernaDireita').removeClass('d-none');
                    break

            }
            if (numeroErro === 6) {
                $('#titulo').text("Sinto muito, você perdeu")
                $("#input-resposta").addClass('d-none')
                $("#btn-restart").removeClass('d-none')
                perdeu = true
            }
        }
        letrasUsadas.push($('#input-resposta').val())
        var letrasFaltando = 0
        $('.palavra-resposta div span').each(function () {
            if ($(this).css('color') == "rgba(0, 0, 0, 0)") {
                letrasFaltando ++
            }
        })
        if (letrasFaltando == 0) {
            $('#titulo').text("Meus Parabéns, você ganhou!")
            $('#input-resposta').addClass('d-none')
            $('#btn-proxima').removeClass('d-none')
            gameIsStart = false
        }
    }
}

$('input#input-resposta').on('keydown', function (e) {
    if (e.keyCode === 13) {
        conferirLetra()
        $(this).val("")
    }
})

//Função para apenas aceitar letra no input
$("#input-resposta").on("input", function(){
    let regexp = /[^a-zA-Z]/g;
    if(this.value.match(regexp)){
        $(this).val(this.value.replace(regexp,''));
    }
});


//Função para recomeçar o jogo
$("#btn-restart").click(function () {
    $(".palavra-resposta").html("")
    $(".letrasUtilizadas").html("")
    $("#cabeca").addClass('d-none')
    $("#bracoEsquerdo").addClass('d-none')
    $("#corpo").addClass('d-none')
    $("#bracoDireito").addClass('d-none')
    $("#pernaEsquerda").addClass('d-none')
    $("#pernaDireita").addClass('d-none')
    gameIsStart = false
    palavraSorteada = ""
    numeroErro = 0
    letrasUsadas = []
    perdeu = false
    $(this).addClass('d-none')
    comecarJogo()
})

$('#btn-proxima').click(function () {
    comecarJogo()
})