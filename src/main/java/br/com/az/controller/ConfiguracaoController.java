package br.com.az.controller;

import java.math.BigDecimal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import br.com.az.model.Parametro;
import br.com.az.service.ParametroService;

@Controller
@RequestMapping("/configuracao")
public class ConfiguracaoController {

	@Autowired
	private ParametroService parametroService;

	@GetMapping("/listar")
	public String listar(Model model) {
		model.addAttribute("lista", parametroService.listarTodos());
		return "configuracao";
	}

	@PostMapping("/editar")
	@ResponseBody
	public void editar(Long id, BigDecimal valor) {
		Parametro p = parametroService.buscar(id);
		p.setValor(valor);
		parametroService.salvar(p);
	}

	@GetMapping("/buscar")
	@ResponseBody
	public BigDecimal buscar(String nome) {
		return parametroService.buscarPorNome(nome).getValor();
	}

}
