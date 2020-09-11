package br.com.az.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.az.model.Parametro;

@Repository
public interface ParametroRepository extends JpaRepository<Parametro, Long> {

	List<Parametro> findAllByStatusTrue();

	Parametro findByStatusTrueAndNomeEquals(String nome);
}
