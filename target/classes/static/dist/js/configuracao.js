$(document).ready(function(){
	
	$(".setValor").change(function(){
		let novoValor = Number($(this).val());
		let id = $(this).closest("tr").find(".id").val();
		
		if(novoValor != "" && novoValor != null){
			$.ajax({
				type : 'POST',
				url : '/configuracao/editar',
				data: 'id=' + id+"&valor="+novoValor,
				success : function(result) {
					showOkAlert("Valor Alterado Com Sucesso!");
				},
				error : function(result){
					alert("Não foi possível alterar o valor");
				}
			});
		}

	});

});

