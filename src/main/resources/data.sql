insert into perfil values(1, 'ADMIN', 'ROLE_ADMIN', true);
insert into perfil values(2, 'FUNCIONARIO', 'ROLE_FUNCIONARIO', true);

insert into usuario values (1, null, null, null, 'ADMIN', 'ADMINISTRADOR', '$2a$10$wN4LUZSQGoDLM6Sc1WE2auVYzpRqD2s/yLwD/Wrbu9BKG3q4IAe0C', true  );
insert into usuario values (2, null, null, null, 'FUNCIONARIO', 'FUNCIONARIO', '$2a$10$wN4LUZSQGoDLM6Sc1WE2auVYzpRqD2s/yLwD/Wrbu9BKG3q4IAe0C', true  );

INSERT INTO public.usuario_lista_perfis(
	usuario_id, lista_perfis_id)
	VALUES (1, 1);
	
INSERT INTO public.usuario_lista_perfis(
	usuario_id, lista_perfis_id)
	VALUES (2, 2);
	
insert into parametro values(1, 'VALOR_HORA', true, 40);