document.addEventListener('DOMContentLoaded', function () {

	$("#horaInicial").change(function () {
		setValorReserva();
	});

	$("#horaFinal").change(function () {
		setValorReserva();
	});

	let calendarEl = document.getElementById('calendar');

	let calendar = new FullCalendar.Calendar(calendarEl, {
		plugins: ['interaction', 'dayGrid', 'timeGrid'],
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'dayGridMonth,timeGridWeek,timeGridDay'
		},
		navLinks: true,
		editable: false,
		durationEditable: false,
		defaultView: "dayGridMonth",
		contentHeight: 600,
		slotDuration: '00:15:00',
		slotEventOverlap: false,
		eventTextColor: "white",
		dateClick: function (info) {
			let data = moment(info.dateStr).format("YYYY-MM-DD");
			let horaInicial = moment(info.dateStr).format("HH:mm");
			let horaFinal = moment(info.dateStr).add(1, 'hours').format("HH:mm");


			limparModal('eventoForm');
			
			buscarValorHora(1);
			$('#eventoModal').modal('show');
			$("#data").val(data);
			$("#horaInicial").val(horaInicial);
			$("#horaFinal").val(horaFinal);

		},
		eventClick: function (info) {

			editarEventoCalendario(info.event.id);
			$('#eventoModal').modal('show');

		},
		events: function (info, successCallback, failureCallback) {
			$.ajax({
				url: '/calendario/carregar',
				type: 'GET',
				success: function (doc) {
					let events = [];
					$(doc).each(function (i, v) {
						let data = formatarData(v.data);

						events.push({
							title: v.nome,
							id: v.id,
							start: data + " " + v.horaInicial,
							end: data + " " + v.horaFinal,
							color: "#11540F",
							overlap: false
						});


					});
					successCallback(events);
				}
			});

		}
	});
	calendar.setOption('locale', 'pt-br');
	calendar.render();
});

function editarEventoCalendario(id) {
	$.ajax({
		type: 'GET',
		url: '/calendario/evento',
		data: '&id=' + id,
		success: function (e) {
			$('#eventoModal').modal('show');
			$.each(e, function (key, value) {
				if (value?.year != null) {
					$('#eventoForm').find('[name=' + key + ']').val(formatarData(value));
				} else {
					$('#eventoForm').find('[name=' + key + ']').val(value);
				}
			});
		}
	});
}

function setValorReserva() {
	let dataInicial = moment();
	let horaInicial = $("#horaInicial").val().substring(0, 2);
	let minutoInicial = $("#horaInicial").val().substring(3, 6);
	dataInicial.hour(horaInicial);
	dataInicial.minutes(minutoInicial);

	let dataFinal = moment();
	let horaFinal = $("#horaFinal").val().substring(0, 2);
	let minutoFinal = $("#horaFinal").val().substring(3, 6);
	dataFinal.hour(horaFinal);
	dataFinal.minutes(minutoFinal);

	let horas = parseInt(moment.duration(dataFinal.diff(dataInicial)).asHours());

	if (horas > 0) {
		buscarValorHora(horas);
	}
}

function buscarValorHora(horas){
	$.ajax({
		type: 'GET',
		url: '/configuracao/buscar',
		data: '&nome=VALOR_HORA',
		success: function (valor) {
			$("#valor").val(valor * horas);
		}
	});
}