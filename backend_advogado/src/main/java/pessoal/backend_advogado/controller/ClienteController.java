package pessoal.backend_advogado.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import pessoal.backend_advogado.model.Cliente;
import pessoal.backend_advogado.model.Usuario;
import pessoal.backend_advogado.model.dto.ClienteDTO;
import pessoal.backend_advogado.repository.ClienteRepository;
import pessoal.backend_advogado.repository.UsuarioRepository;
import pessoal.backend_advogado.service.ClienteService;

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
    private ClienteService clienteService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping
    public Page<ClienteDTO> listarClientesEmOrdemAlfabetica (@RequestParam int pagina, @RequestParam int itens){
        return clienteService.listarClientesEmOrdemAlfabetica(pagina,itens);
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

    @GetMapping("/me/paginado")
    public Page<ClienteDTO> buscarClienteMePaginas (@RequestParam int pagina,@RequestParam int itens,Authentication authentication){
        String nome = authentication.getName();

        return clienteService.buscarClienteMe(nome, pagina, itens);
    }

    @GetMapping("/nome/{id}")
    public ResponseEntity<String> buscarNomeUsuarioDoCliente(@PathVariable Integer id){
        Cliente cliente = clienteRepository.findById(id).get();
        Usuario usuario = cliente.getUsuario();
        String nome = usuario.getUsername();

        return ResponseEntity.ok(nome);
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
        Usuario usuario = clienteRepository.findById(id).get().getUsuario();
        clienteDTO.setUsuario(usuario);
        Cliente cliente = clienteDTO.ToModelPut();
        clienteRepository.save(cliente);
        return ResponseEntity.ok(ClienteDTO.FromModel(cliente));
   }

}
