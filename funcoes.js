$(function(){

	var operacao = "A"; //"A"=Adição; "E"=Edição

	var indice_selecionado = -1;

	var tbEventos = localStorage.getItem("tbEventos");// Recupera os dados armazenados

	tbEventos = JSON.parse(tbEventos); // Converte string para objeto

	if(tbEventos == null) // Caso não haja conteúdo, iniciamos um vetor vazio
		tbEventos = [];

	function Adicionar(){
		var cli = GetEvento("Timestamp", $("#txtTimestamp").val());

		if(cli != null){
			alert("Timestamp já cadastrado.");
			return;
		}

		var evento = JSON.stringify({
			event       : $("#txtEvent").val(),
			timestamp   : $("#txtTimestamp").val()
		});

		tbEventos.push(evento);

		localStorage.setItem("tbEventos", JSON.stringify(tbEventos));

		alert("Evento adicionado.");
		return true;
	}

	function Editar(){
		tbEventos[indice_selecionado] = JSON.stringify({
				event       : $("#txtEvent").val(),
				timestamp   : $("#txtTimestamp").val()
			});
		localStorage.setItem("tbEventos", JSON.stringify(tbEventos));
		alert("Informações do evento foram editadas.")
		operacao = "A";
		return true;
	}

	function Listar(){
		$("#tblListar").html("");
		$("#tblListar").html(
			"<thead>"+
			"	<tr>"+
			"<th></th>"+
			"	<th>Event</th>"+
			"	<th>Timestamp</th>"+
			"	</tr>"+
			"</thead>"+
			"<tbody>"+
			"</tbody>"
			);

		 for(var i in tbEventos){
			var cli = JSON.parse(tbEventos[i]);
		  	$("#tblListar tbody").append("<tr>"+
			"	<td><img src='edit.png' alt='"+i+
			"' class='btnEditar'/><img src='delete.png' alt='"+i+
			"' class='btnExcluir'/></td>" + 
			"	<td>"+cli.event+"</td>" + 
			"	<td>"+cli.timestamp+"</td>" + 
		  	"</tr>");
		 }
	}

	function Excluir(){
		tbEventos.splice(indice_selecionado, 1);
		localStorage.setItem("tbEventos", JSON.stringify(tbEventos));
		alert("Evento excluído.");
	}

	function GetEvento(tstamp, valor){
		var ev = null;
        for (var item in tbEventos) {
            var i = JSON.parse(tbEventos[item]);
            if (i[tstamp] == valor)
                ev = i;
        }
        return ev;
	}

	Listar();

	$("#formDITO").on("submit",function(){
		if(operacao == "A")
			return Adicionar();
		else
			return Editar();		
	});

	$("#tblListar").on("click", ".btnEditar", function(){
		operacao = "E";
		indice_selecionado = parseInt($(this).attr("alt"));
		var ev = JSON.parse(tbEventos[indice_selecionado]);
		$("#txtEvent").val(ev.event);
		$("#txtTimestamp").val(ev.timestamp);
		$("#txtTimestamp").attr("readonly","readonly");
		$("#txtEvent").focus();
	});

	$("#tblListar").on("click", ".btnExcluir", function(){
		indice_selecionado = parseInt($(this).attr("alt"));
		Excluir();
		Listar();
	});
});
