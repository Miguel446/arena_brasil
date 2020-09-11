package br.com.az.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import br.com.az.model.Evento;
import br.com.az.service.EventoService;

@Controller
@RequestMapping("/relatorio")
public class RelatorioController {

	@Autowired
	private EventoService eventoService;

	@GetMapping("/listar")
	public String listar(Model model) {
		Evento evento = new Evento();
		evento.setDataInicial(LocalDate.now().minusMonths(1));
		evento.setDataFinal(LocalDate.now());

		List<Evento> lista = eventoService.buscarPorData(evento.getDataInicial(), evento.getDataFinal());
		double valorTotal = 0;
		for (Evento e : lista) {
			valorTotal = valorTotal + e.getValor();
		}
		model.addAttribute("lista", lista);
		model.addAttribute("evento", evento);
		model.addAttribute("valorTotal", valorTotal);
		return "relatorio";
	}

	@PostMapping("/consultar")
	public String listar(Model model, Evento evento) {

		List<Evento> lista = eventoService.buscarPorData(evento.getDataInicial(), evento.getDataFinal());
		double valorTotal = 0;
		for (Evento e : lista) {
			valorTotal = valorTotal + e.getValor();
		}
		model.addAttribute("lista", lista);
		model.addAttribute("evento", evento);
		model.addAttribute("valorTotal", valorTotal);
		return "relatorio";
	}
}
