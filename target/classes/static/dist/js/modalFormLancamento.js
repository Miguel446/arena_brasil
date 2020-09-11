$(document).ready(function () {

    $('#lancamentoMultaJuros').blur(function () {
        var valorJuros = $('#lancamentoMultaJuros').val();
        var valor = $('#lancamentoValor').val();

        if (valor != '') {
            $('#lancamentoValorPago').val(Number(valor) + Number(valorJuros));

        }
        $("#meses").focus();
    });

    $("#isRecorrente").change(function () {
        var isRecorrente = $("#isRecorrente").val();
        if (isRecorrente == 'true') {
            $('#divMeses').show();
        } else {
            $('#divMeses').hide();
            $('#divTable').hide();
        }
    });

    $("#meses").blur(function () {
        $("#tbodyLancamentoRecorrente").empty();

        var dataVencimento;
        if ($("#dataVencimento").val() != "") {
            dataVencimento = $("#dataVencimento").val();
        } else {
            dataVencimento = moment().format("YYYY-MM-DD");
        }

        var meses = Number($("#meses").val());
        var valorLancamento = Number($("#lancamentoValor").val());

        $.ajax({
            type: 'GET',
            url: '/lancamento/gerarRecorrente',
            data: "dataVencimento=" + dataVencimento + "&valor=" + valorLancamento + "&meses=" + meses,
            success: function (result) {
                $(result).each(function (i, r) {
                    $("#tbodyLancamentoRecorrente").append(
                        "<tr>" +
                        "<td><input id='data" + i + "' type='date' class='form-control'" +
                        " value='" + formatarData(r.dataVencimento) + "' onchange='setDataVencimento(" + i + ");'></td>" +
                        "<td><input id='valor" + i + "' class='form-control' onchange='setValorRecorrente(" + i + ");'" + "value='" + r.valor + "'></td>" +
                        "</tr>"
                    );
                    $("#valor" + i).mask("###0.00", {
                        reverse: true
                    });
                });
            }
        });
        $('#divTable').show();
    });

});

function setDataVencimento(i) {
    var data = $("#data" + i).val();
    $("#btnModalSalvar").prop('disabled', true);
    $.ajax({
        type: 'POST',
        url: '/lancamento/setDataRecorrente',
        data: "novaData=" + data + "&index=" + i,
        success: function () {
            $("#btnModalSalvar").prop('disabled', false);
        }
    });
}

function setValorRecorrente(i) {
    var valor = $("#valor" + i).val();
    $("#btnModalSalvar").prop('disabled', true);
    $.ajax({
        type: 'POST',
        url: '/lancamento/setValorRecorrente',
        data: "novoValor=" + valor + "&index=" + i,
        success: function () {
            $("#btnModalSalvar").prop('disabled', false);
        }
    });
}

function abrirModal(id) {
    $.ajax({
        type: 'POST',
        url: '/contasReceber/modalBaixa',
        data: 'id=' + id,
        success: function (result) {
            $('#dataPagamentoModal').val(formatarData(result.dataPagamento));
            $("#modalBaixa").modal("show");
            $('#idRecebimento').val(result.id);
            $('#valorModal').val(result.valor);

            $('#valorPagoModal').val(result.valorPago);
            $('#multaModal').val(result.multaJuros);
        }
    })
}

function abrirModalPagamento(id) {
    $.ajax({
        type: 'POST',
        url: '/contasPagar/modalBaixa',
        data: 'id=' + id,
        success: function (result) {
            $("#modalBaixa").modal("show");
            $('#idPagamento').val(result.id);
            $('#valorModal').val(result.valor);
            $('#dataPagamentoModal').val(formatarData(result.dataPagamento));
            $('#valorPagoModal').val(result.valorPago);
            $('#multaModal').val(result.multaJuros);
        }
    })
}

function baixarTodosPagamentos() {
    var retVal = confirm("Tem certeza que deseja baixar todos os Pagamentos ?");
    if (retVal == true) {
        var lancamento = $("#formPagamento").serialize();
        $.ajax({
            type: 'POST',
            url: '/contasPagar/baixarTodos',
            data: lancamento,
            success: function (result) {
                $("#valorTotal").val('R$ ' + result.toFixed(2));
                location.reload();
            }
        });

    }
}

function baixarTodosRecebimentos() {
    var retVal = confirm("Tem certeza que deseja BAIXAR TODOS OS PAGAMENTOS ?");
    if (retVal == true) {
        var lancamento = $("#formRecebimento").serialize();
        $.ajax({
            type: 'POST',
            url: '/contasReceber/baixarTodos',
            data: lancamento,
            success: function (result) {
                $("#valorTotal").val('R$ ' + result.toFixed(2));
                location.reload();
            }
        });

    }
}

function limparModalFormLancamento() {
    $("#idLancamento").val("");
    $("#descricao").val("");
    var data = moment().format("YYYY-MM-DD");
    $("#dataCompetencia").val(data);
    $("#dataVencimento").val("");
    $("#dataPagamento").val("");
    $("#lancamentoValor").val("");
    $("#lancamentoMulta").val("");
    $("#lancamentoValorPago").val("");
    $("#lancamentoPlanoContas").val("");

    $.ajax({
        type: 'POST',
        url: '/lancamento/limparListaRecorrente',
        success: function () {

        }
    });

}

function carregarModalFormLancamento(id) {
    $.ajax({
        type: 'GET',
        url: '/lancamento/buscar',
        data: 'id=' + id,
        success: function (l) {
            $("#idLancamento").val(l.id);
            $("#descricao").val(l.descricao);
            $("#idFormaPagamento").val(l.formaPagamento.id);
            $("#dataCompetencia").val(formatarData(l.dataCompetencia));
            $("#dataVencimento").val(formatarData(l.dataVencimento));
            $("#dataPagamento").val(formatarData(l.dataPagamento));
            $("#lancamentoValor").val(l.valor);
            $("#lancamentoMulta").val(l.multaJuros);
            $("#lancamentoValorPago").val(l.valorPago);
            $("#lancamentoPlanoContas").val(l.planoContas.id);
            $("#lancamentoFornecedor").val(l.fornecedor.id);
        }
    });
}

function submitForm() {
    if ($("#lancamentoPlanoContas").val() == "" || $("#lancamentoPlanoContas").val() == null) {
        alert("Por favor selecione um Plano de Contas");
    } else {
        if ($("#dataVencimento").val() == "" || $("#dataVencimento").val() == "") {
            alert("Por favor selecione uma Data de Vencimento");
        } else {

            if ($("#lancamentoValorPago").val() != "" && $("#dataPagamento").val() == "") {
                alert("Por favor selecione a Data do Pagamento");
            } else {
                $("#formGravar").submit();
                $("#modalFormLancamento").modal('hide')
            }

        }
    }
}

function finalizarBaixaModalRecebimento() {
    var id = $('#idRecebimento').val();
    var valor = $('#valorModal').val();
    var dataPagamento = $('#dataPagamentoModal').val();
    var multa = $('#multaModal').val();
    var valorPago = $('#valorPagoModal').val();
    $.ajax({
        type: 'POST',
        url: '/contasReceber/finalizarBaixaModal',
        data: 'id=' + id + '&valor=' + valor + '&dataPagamento=' + dataPagamento + '&multa=' + multa + '&valorPago=' + valorPago,
        success: function (result) {
            $("#modalBaixa").modal("hide");
            location.reload();
        }
    });
}

function finalizarBaixaModalPagamento() {
    var id = $('#idPagamento').val();
    var valor = $('#valorModal').val();
    var dataPagamento = $('#dataPagamentoModal').val();
    var multa = $('#multaModal').val();
    var valorPago = $('#valorPagoModal').val();
    $.ajax({
        type: 'POST',
        url: '/contasPagar/finalizarBaixaModal',
        data: 'id=' + id + '&valor=' + valor + '&dataPagamento=' + dataPagamento + '&multa=' + multa + '&valorPago=' + valorPago,
        success: function (result) {
            $("#modalBaixa").modal("hide");
            location.reload();
        }
    });
}