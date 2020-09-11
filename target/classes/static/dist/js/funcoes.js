$(document).ready(
	function () {
		$('#selectall').change(function () {
			$('.case').prop('checked', this.checked);
		});

		$('.telefone').mask("(99) 99999-9999").focusout(function (event) {
			let target, phone, element;
			target = (event.currentTarget) ? event.currentTarget : event.srcElement;
			phone = target.value.replace(/\D/g, '');
			element = $(target);
			element.unmask();
			if (phone.length > 10) {
				element.mask("(99) 99999-9999");
			} else {
				element.mask("(99) 9999-99999");
			}
		});

		$("#cpfcnpj").keydown(function () {
			try {
				$("#cpfcnpj").unmask();
			} catch (e) { }

			let tamanho = $("#cpfcnpj").val().length;

			if (tamanho < 11) {
				$("#cpfcnpj").mask("999.999.999-99");
			} else {
				$("#cpfcnpj").mask("99.999.999/9999-99");
			}

			// ajustando foco
			let elem = this;
			setTimeout(function () {
				// mudo a posição do seletor
				elem.selectionStart = elem.selectionEnd = 10000;
			}, 0);
			// reaplico o valor para mudar o foco
			let currentValue = $(this).val();
			$(this).val('');
			$(this).val(currentValue);
		});

		$(".uppercase").keyup(function () {
			let start = this.selectionStart;
			let end = this.selectionEnd;
			this.value = this.value.toUpperCase();
			this.setSelectionRange(start, end);
		});

		let keyStop = {
			8: ":not(input:text, textarea, input:file, input:password)", // stop backspace = back
			13: "input:text, input:password", // stop enter = submit 

			end: null
		};

		$(".disableSubmit").bind("keydown", function (event) {
			let selector = keyStop[event.which];
			if (selector !== undefined && $(event.target).is(selector)) {
				event.preventDefault(); //stop event
			}
			return true;
		});

		$(".lowercase").keyup(function () {
			this.value = this.value.toLowerCase();
		});

		$('.soNumeros').keyup(function () {
			this.value = this.value.replace(/[^0-9\.]/g, '');
		});

		$('.datarange').datepicker({
			format: 'dd/mm/yyyy'
		});

		$('.money').mask("###0.00", {
			reverse: true
		});

		$('.percent').mask('##0.00%', {
			reverse: true
		});

		$('.cpf').mask('000.000.000-00', {
			reverse: true
		});

		$('.cnpj').mask('00.000.000/0000-00', {
			reverse: true
		});
		$('.ie').mask('00.000.000-0', {
			reverse: true
		});

		$('.date').mask('00/00/0000');

		$('.datetime').mask('00/00/0000 00:00');

	});

function showOkAlert(msgOk) {
	$("#msgOk").text(msgOk);
	$(".alert-success").show();
	setTimeout(function () {
		$(".alert-success").fadeOut();
		$("#msgOk").text("");
	}, 3000);
}

function ajusteDataHora(data) {
	let dia = data.dayOfMonth;
	let mes = data.monthValue;
	let ano = data.year;
	let hora = data.hour;
	let minuto = data.minute;
	if (dia < 10) {
		dia = "0" + dia;
	}
	if (mes < 10) {
		mes = "0" + mes;
	}
	if (hora < 10) {
		hora = "0" + hora;
	}
	if (minuto < 10) {
		minute = "0" + minuto;

	}
	if (hora == null && minuto == null) {
		let dataHoraAjustada = dia + '/' + mes + '/' + ano;
	} else {
		let dataHoraAjustada = dia + '/' + mes + '/' + ano + ' ' + hora + ':' + minuto;
	}
	return dataHoraAjustada;
}

function formatarData(d) {
	if (d != null) {
		let dia = (d.dayOfMonth).toString();
		let mes = (d.monthValue).toString();

		if (dia.length == 1) {
			dia = "0" + dia;
		}

		if (mes.length == 1) {
			mes = "0" + mes;
		}

		let dataFormatada = d.year + "-" + mes + "-" + dia;
		return dataFormatada;
	} else {
		return "";
	}
}

function modalConfirmacao(table, url, id) {
	$('#modalConfirmacao').modal('show');
	$("#btnSim").attr("onclick", 'btnSim("' + table + '","' + url + '","' + id + '")');

}
function btnSim(table, url, id) {
	$.ajax({
		type: 'GET',
		url: url,
		data: 'id=' + id,
		success: function (result) {
			$('#' + table + ' tr#' + result).remove();
			loadValorTotal();
		}
	});
}

function limparModal(formulario) {
	$('#' + formulario).find('input:text').val('');
	$('#' + formulario).find('input[type=date]').val('');
	$('#' + formulario).find('input[type=hidden]').val('');
	$('#' + formulario).find('input[type=time]').val('');

}