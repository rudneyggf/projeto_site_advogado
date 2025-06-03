package pessoal.backend_advogado.controller;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import pessoal.backend_advogado.model.Role;
import pessoal.backend_advogado.model.Usuario;
import pessoal.backend_advogado.model.dto.meDTO;
import pessoal.backend_advogado.repository.UsuarioRepository;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UsuarioControllerTest {

    @Mock
    private UsuarioRepository usuarioRepository;

    @Mock
    private Authentication authentication;

    @InjectMocks
    private UsuarioController usuarioController;


    @Test
    void buscarInformacaoPessoal() {
        when(authentication.getName()).thenReturn("Marcelo Henrique");
        Usuario usuario = new Usuario(3,"Marcelo Henrique","Marcelin@hotmail.com","motovlog", Role.USUARIO);
        meDTO dto = meDTO.fromModel(usuario);
        when(usuarioRepository.findByNome("Marcelo Henrique")).thenReturn(Optional.of(usuario));

        ResponseEntity<meDTO> response =usuarioController.buscarInformacaoPessoal(authentication);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(dto.getId(), response.getBody().getId());

    }
}