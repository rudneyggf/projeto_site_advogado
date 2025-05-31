package pessoal.backend_advogado.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pessoal.backend_advogado.model.Usuario;
import pessoal.backend_advogado.model.dto.UsuarioDTO;
import pessoal.backend_advogado.model.dto.meDTO;
import pessoal.backend_advogado.repository.UsuarioRepository;

import java.util.Optional;

@RestController
@RequestMapping("usuario")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping("{id}")
    public ResponseEntity<UsuarioDTO> buscarUsuarioporID( @PathVariable Integer id) {
        Optional <Usuario> usuario = usuarioRepository.findById(id);
        if (usuario.isPresent()) {
            UsuarioDTO usuarioDTO = UsuarioDTO.fromModel(usuario.get());
            return ResponseEntity.ok(usuarioDTO);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping
    public ResponseEntity<meDTO> buscarInformacaoPessoal(Authentication authentication) {
            String nome = authentication.getName();
            Optional<Usuario> usuario = usuarioRepository.findByNome(nome);
            if (usuario.isPresent()) {
                meDTO usuarioAutenticado = meDTO.fromModel(usuario.get());
                return ResponseEntity.ok(usuarioAutenticado);
            }
            return ResponseEntity.notFound().build();
    }

}
