package br.com.az.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import br.com.az.model.Perfil;
import br.com.az.model.Usuario;
import br.com.az.model.UsuarioSistema;
import br.com.az.repository.UsuarioRepository;

@Service
public class AutenticacaoService implements UserDetailsService {

	@Autowired
	private UsuarioRepository usuarioRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Usuario usuario = usuarioRepository.findByLogin(username);
		if (usuario == null) {
			throw new UsernameNotFoundException("Dados de acesso inválidos!");
		}
		return new UsuarioSistema(usuario.getNome(), usuario.getLogin(), usuario.getSenha(), authorities(usuario));
	}

	public Collection<? extends GrantedAuthority> authorities(Usuario usuario) {
		return authorities(usuario.getListaPerfis());
	}

	public Collection<? extends GrantedAuthority> authorities(List<Perfil> grupos) {
		Collection<GrantedAuthority> auths = new ArrayList<>();

		for (Perfil perfil : grupos) {
			auths.add(new SimpleGrantedAuthority(perfil.getRegra()));
		}

		return auths;
	}

}
