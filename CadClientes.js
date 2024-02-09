
$(".divform").hide();
$(".spanImport").hide();
$(".bloco_resposta").hide()
$(".txtTitulo").hide()

// let code = "";
// let cnpj = "";
// let nome = "";
// let rs = "";
// let cidade ="";
// let endereco = "";
// let bairro = "";
// let inicioFat = "";
// let dtVencimento = "";
// let assiPrem = "";
// let sistema = "";
// let suporte = "";
// let hrsTreinamento = "";
// let validContrato = "";
// let numSerie = "";
// let linCertificado = "";

//função para limpar campo
function limparPesquisa(){
    $("#inputCode").val("")
    $("#inputCNPJ").val("")
    $("#rSocial").val("")
    $("#inicioFaturamento").val("")
    $("#divDataVencimento").val("")
    $("#assisPrem").val("")
    $("#nomeId").val("")
    $("#cidadeId").val("")
    $("#enderecoId").val("")
    $("#bairroId").val("")
    $("#identidade").val("")
}

//limpar campo do input de pesquisa
$("#LimparFiltros").on('click',function(){
    $("#filtroCliente").val("")
    $("#filtroSolicitante").val("")
})

//Campo de Pesquisa dos clientes por cnpj
$("#filtroCliente").on('input',function(){
    var consulta = $(this).val()
    $(".grupoCad").each(function(){
        var cnpjitem = $(this).text()
        if(cnpjitem.includes(consulta)){
            $(this).show()
        }else{
            $(this).hide();
        }
    })
    
})

//Campo de pesquisa dos clientes por nome
$("#filtroSolicitante").on('input', function(){
    var consultaNome = $(this).val().toLowerCase(); // Convertendo tudo para minúsculas
    $(".grupoCad").each(function(){
        var nomeitem = $(this).text().toLowerCase(); // Convertendo o que ja existe para minúsculas
        if(nomeitem.includes(consultaNome)){
            $(this).show();
        } else {
            $(this).hide(); // Ocultar os itens que não correspondem a pesquisa
        }
    });
});


//add cadastro
$(".novasolicitacao").on('click',function(){
    $(".spanImport").hide();
    $(".divform").show();
})


function Editar(index){
    alert($(index).html());
    console.log($(index).html());
}

$("#enviardados").on('click',function(){
 
    var code = $("#inputCode").val()
    var cnpj = $("#inputCNPJ").val()
    var nome = $("#nomeId").val()
    var rs = $("#rSocial").val()
    var cidade = $("#cidadeId").val()
    var endereco = $("#enderecoId").val()
    var bairro = $("#bairroId").val()
    var inicioFat = $("#inicioFaturamento").val()
    var dtVencimento = $("#divDataVencimento").val()
    var assiPrem = $("input[name='divAssisCheck']:checked").val();
    // novas adesões
    var sistema = $("#sistema").val();
    var suporte = $("#suporte").val();
    var hrsTreinamento = $("#numSerie").val();
    var validContrato = $("#validContrato").val();
    var numSerie = $("#numSerie").val();
    var linkCertificado = $("#certificado").val();

    $(".novaDiv").append(`
    <div class="grupoCad" onclick='Editar($(this))'>

                        <div class="grupoCad1">

                            <div class="cad Nome">
                                <p>Nome:</p>
                                <span id='nomeAdd'>${nome}</span>
                            </div>

                            
                            <div class="cad RSocial">
                                <p>Razão Social:</p>
                                <span id='rsAdd'>${rs}</span>
                            </div>
                            
                        </div>

                        <div class="grupoCad2">
                    
                            <div class="cad Codigo">
                                <p>Código:</p>
                                <span id='codigoAdd'>${code}</span>
                            </div>

                            <div class="cad Cnpj">
                                <p>CNPJ:</p>
                                <span id='cnpjAdd'>${cnpj}</span>
                            </div>

                            <div class="cad Cidade">
                                <p>Cidade:</p>
                                <span id='cidadeAdd'> ${cidade}</span>
                            </div>

                            <div class="cad Vencimento">
                                <p>Data de Vencimento:</p>
                                <span id='vencAdd'>${dtVencimento}</span>
                            </div>

                        </div>

    `)

    limparPesquisa()
    $(".divform").hide();
    $(".bloco_resposta").hide()
    $(".txtTitulo").hide()
 })

//Btn para cancelar a operação
$("#cancelarCad").on('click',function(){
    limparPesquisa()
    $(".divform").hide();
    $(".bloco_resposta").hide()
    $(".txtTitulo").hide()
})


//Btn para requisição GET pelo CNPJ
$("#btnCampoReqDados").on('click',function(e){
    e.preventDefault()
    var cnpjBuscar = $("#inputCNPJ").val()
    var codigoBuscar = $("#inputCode").val() 

    var url = servidor + helpdesk + 'clientes/';
    if(cnpjBuscar){
        url +=cnpjBuscar;
    }else if(codigoBuscar){
        url +=codigoBuscar;
    }else{
        $(".spanImport").show();
        return;
    }
    
    $.ajax({
        url: url,
        method: 'GET',
        dataType: 'json',
        headers: {
            'Authorization': 'Bearer ' + token,
        }
    })

    .done(function(elemento){
        $('#inputCode').val(elemento.data.codigo)
        $("#rSocial").val(elemento.data.fantasia)

        //ainda não criado/recebido
        $("#cidadeId").val(elemento.data.cidade)
        $("#enderecoId").val(elemento.data.endereco)
        $("#bairroId").val(elemento.data.bairro)
        //ainda não criado/recebido

        $("#identidade").val(elemento.data.id)
        $("#nomeId").val(elemento.data.nome)

        if(cnpjBuscar||codigoBuscar){
            $(".txtTitulo").show()
            $(".bloco_resposta").show()
        }else{
            $(".spanImport").show()
        }
    })

    .fail(function (error) {
        console.error('Erro ao obter clientes:', error);
    })
})

