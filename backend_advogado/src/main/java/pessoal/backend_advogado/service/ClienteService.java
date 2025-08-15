package pessoal.backend_advogado.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import pessoal.backend_advogado.model.Cliente;
import pessoal.backend_advogado.model.dto.ClienteDTO;
import pessoal.backend_advogado.repository.ClienteRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    public Page<ClienteDTO> buscarClienteMe (String nome,int pagina, int itens){
        Page<Cliente> listaCliente = clienteRepository.findByUsuarioNome(nome, PageRequest.of(pagina, itens));

            return listaCliente.map(ClienteDTO::FromModel);
    }

    public Page<ClienteDTO> listarClientesEmOrdemAlfabetica (int pagina, int itens){

        Page<Cliente> listaCliente = clienteRepository.findAllOrderByNomeUsuario(PageRequest.of(pagina, itens));

        return listaCliente.map(ClienteDTO::FromModel);
    }

}
