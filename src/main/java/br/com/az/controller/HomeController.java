package br.com.az.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import br.com.az.model.Evento;

@Controller
public class HomeController {

	@RequestMapping(path = "/login")
	public String login() {
		return "login";
	}

	@RequestMapping(path = "/")
	public String home(Model model) {
		model.addAttribute("evento", new Evento());
		return "calendario";
	}

}
