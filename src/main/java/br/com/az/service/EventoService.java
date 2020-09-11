package br.com.az.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.az.model.Evento;
import br.com.az.repository.EventoRepository;

@Service
public class EventoService {

	@Autowired
	private EventoRepository eventoRepository;

	public List<Evento> listarTodos() {
		return eventoRepository.findAllByStatusTrue();
	}

	public void salvar(Evento evento) {
		eventoRepository.save(evento);
	}

	public Evento buscar(Long id) {
		return eventoRepository.getOne(id);
	}

	public void remover(Long id) {
		Evento evento = buscar(id);
		evento.setStatus(false);
		eventoRepository.save(evento);
	}

	public List<Evento> buscarPorData(LocalDate dataInicial, LocalDate dataFinal) {
		return eventoRepository.findAllByStatusTrueAndDataBetweenOrderByDataDesc(dataInicial, dataFinal);
	}
}
