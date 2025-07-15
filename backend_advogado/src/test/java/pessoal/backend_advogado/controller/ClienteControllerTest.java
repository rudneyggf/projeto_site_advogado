package pessoal.backend_advogado.controller;


import org.assertj.core.api.Assert;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import pessoal.backend_advogado.model.Cliente;
import pessoal.backend_advogado.model.Role;
import pessoal.backend_advogado.model.Usuario;
import pessoal.backend_advogado.model.dto.ClienteDTO;
import pessoal.backend_advogado.repository.ClienteRepository;
import pessoal.backend_advogado.repository.UsuarioRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;


@ExtendWith(MockitoExtension.class)
class ClienteControllerTest {

    @Mock
    private ClienteRepository clienteRepository;

    @Mock
    private UsuarioRepository usuarioRepository;

    @Mock
    private  Authentication authentication;

    @InjectMocks
    private ClienteController clienteController;


    @Test
    void criarCliente() {
        when(authentication.getName()).thenReturn("Marcelo Henrique");
        Usuario usuario = new Usuario(3,"Marcelo Henrique","Marcelin@hotmail.com","motovlog", Role.USUARIO);

        when(usuarioRepository.findByNome("Marcelo Henrique")).thenReturn(Optional.of(usuario));

        ClienteDTO clienteDTO = new ClienteDTO("040.543.422-35","2312313-42","(67)1231-2445", "Pedreiro",
                "Casa de Rochell","43","Bairro de buerarema"
                ,"Proximo a chupetinha ana bar","Roubou um caminhão de Kitut");

        clienteController.criarCliente(clienteDTO, authentication);

        verify(clienteRepository,times(1)).save(any(Cliente.class));
    }

    @Test
    void atualizarCliente() {

        ClienteDTO clienteDTO = new ClienteDTO("040.543.422-35","2312313-42","(67)1231-2445", "Pedreiro",
                "Casa de Rochell","43","Bairro de buerarema"
                ,"Proximo a chupetinha ana bar","Roubou um caminhão de Camarão");

        clienteController.atualizarCliente(clienteDTO,1);

        verify(clienteRepository,times(1)).save(any(Cliente.class));
    }

    @Test
    void buscarClienteMe() {

        when(authentication.getName()).thenReturn("PedroPereiraPelo");
        List<Cliente> clientes = new ArrayList<>();
        when(clienteRepository.findByUsuarioNome("PedroPereiraPelo")).thenReturn(clientes);

        List <ClienteDTO> lista = clienteController.buscarClienteMe(authentication);
        assertNotNull(lista);
    }
}