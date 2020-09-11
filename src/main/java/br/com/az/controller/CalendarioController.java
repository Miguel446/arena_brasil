package br.com.az.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import br.com.az.model.Evento;
import br.com.az.service.EventoService;

@Controller
@RequestMapping("/calendario")
public class CalendarioController {

	@Autowired
	private EventoService eventoService;

	@PostMapping("/gravarEvento")
	public String gravarEvento(Model model, Evento evento) {
		eventoService.salvar(evento);
		model.addAttribute("evento", new Evento());
		return "calendario";
	}

	@GetMapping("/evento")
	@ResponseBody
	public Evento evento(Long id) {
		return eventoService.buscar(id);
	}

	@GetMapping("/carregar")
	@ResponseBody
	public List<Evento> carregar() {
		return eventoService.listarTodos();
	}

}
