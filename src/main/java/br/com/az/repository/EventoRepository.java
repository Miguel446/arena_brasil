package br.com.az.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.az.model.Evento;

@Repository
public interface EventoRepository extends JpaRepository<Evento, Long> {

	List<Evento> findAllByStatusTrue();

	List<Evento> findAllByStatusTrueAndDataBetweenOrderByDataDesc(LocalDate dataInicial, LocalDate dataFinal);
}
