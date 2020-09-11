package br.com.az.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.az.model.Parametro;
import br.com.az.repository.ParametroRepository;

@Service
public class ParametroService {

	@Autowired
	private ParametroRepository parametroRepository;

	public List<Parametro> listarTodos() {
		return parametroRepository.findAllByStatusTrue();
	}

	public Parametro buscar(Long id) {
		return parametroRepository.getOne(id);
	}

	public Parametro buscarPorNome(String nome) {
		return parametroRepository.findByStatusTrueAndNomeEquals(nome);
	}

	public void salvar(Parametro parametro) {
		parametroRepository.save(parametro);
	}

	public void remover(Long id) {
		Parametro parametro = buscar(id);
		parametro.setStatus(false);
		salvar(parametro);
	}
}
