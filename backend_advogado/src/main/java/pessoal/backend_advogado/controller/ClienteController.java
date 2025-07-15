package pessoal.backend_advogado.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import pessoal.backend_advogado.model.Cliente;
import pessoal.backend_advogado.model.Usuario;
import pessoal.backend_advogado.model.dto.ClienteDTO;
import pessoal.backend_advogado.repository.ClienteRepository;
import pessoal.backend_advogado.repository.UsuarioRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("cliente")
@CrossOrigin("*")
public class ClienteController {

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping
    public List<ClienteDTO> listarClientesEmOrdemAlfabetica (){
        return clienteRepository.findAll().
                stream().
                map(ClienteDTO::FromModel).
                collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClienteDTO> buscarClientePorId (@PathVariable Integer id){

        Optional<Cliente> cliente = clienteRepository.findById(id);
        if(cliente.isPresent()){
           ClienteDTO clienteDto = ClienteDTO.FromModel(cliente.get());
           return ResponseEntity.ok(clienteDto);
        }else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/me")
    public List<ClienteDTO> buscarClienteMe (Authentication authentication){
     String nome = authentication.getName();
        List<Cliente> lista = clienteRepository.findByUsuarioNome(nome);
        return lista
                .stream()
                .map(ClienteDTO::FromModel)
                .collect(Collectors.toList());
    }

    @PostMapping
    public ResponseEntity<ClienteDTO> criarCliente (@RequestBody ClienteDTO clienteDto,Authentication authentication){
        System.out.println("Cliente recebido: " + clienteDto.getRG());
        String nome = authentication.getName();
        Usuario usuario = usuarioRepository.findByNome(nome).get();
        clienteDto.setUsuario(usuario);
        Cliente cliente = clienteDto.ToModel();
        clienteRepository.save(cliente);
        return ResponseEntity.ok(ClienteDTO.FromModel(cliente));
    }


   @DeleteMapping("/{id}")
   public ResponseEntity<ClienteDTO> deletarCliente (@PathVariable Integer id){
       clienteRepository.deleteById(id);

       return ResponseEntity.noContent().build();
   }


   @PutMapping("/{id}")
    public ResponseEntity<ClienteDTO> atualizarCliente (@RequestBody ClienteDTO clienteDTO, @PathVariable Integer id){
        clienteDTO.setId(id);
        Cliente cliente = clienteDTO.ToModelPut();
        clienteRepository.save(cliente);
        return ResponseEntity.ok(ClienteDTO.FromModel(cliente));
   }

}
