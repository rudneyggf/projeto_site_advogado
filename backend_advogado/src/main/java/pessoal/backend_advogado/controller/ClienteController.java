package pessoal.backend_advogado.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import pessoal.backend_advogado.model.Cliente;
import pessoal.backend_advogado.model.dto.ClienteDTO;
import pessoal.backend_advogado.repository.ClienteRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Controller
@RequestMapping("cliente")
public class ClienteController {

    @Autowired
    private ClienteRepository clienteRepository;

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

    @PostMapping
    public ResponseEntity<ClienteDTO> criarCliente (@RequestBody ClienteDTO clienteDto){
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
