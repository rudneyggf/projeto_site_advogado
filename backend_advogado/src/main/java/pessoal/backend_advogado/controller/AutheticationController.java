package pessoal.backend_advogado.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import pessoal.backend_advogado.model.Cliente;
import pessoal.backend_advogado.model.Usuario;
import pessoal.backend_advogado.model.dto.AuthenticationDTO;
import pessoal.backend_advogado.model.dto.UsuarioDTO;
import pessoal.backend_advogado.repository.ClienteRepository;
import pessoal.backend_advogado.repository.UsuarioRepository;

@Controller
@RequestMapping("autenticar")
public class AutheticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping("/login")
    public ResponseEntity login (@RequestBody @Validated AuthenticationDTO authenticationDTO) {
        var UsuarioAutenticando = new UsernamePasswordAuthenticationToken(authenticationDTO.getUsername(),authenticationDTO.getSenha());
        var autenticação = this.authenticationManager.authenticate(UsuarioAutenticando);

        return ResponseEntity.ok().build();
    }

    @PostMapping("/cadastrar")
    public ResponseEntity cadastrar(@RequestBody @Validated UsuarioDTO usuarioDTO) {
        if(this.usuarioRepository.loadUserByUsername(usuarioDTO.getNome()) != null) return ResponseEntity.badRequest().build();

        String encryptedPassword = new BCryptPasswordEncoder().encode(usuarioDTO.getSenha());

        Usuario usuario = new Usuario( usuarioDTO.getNome(), usuarioDTO.getEmail(),encryptedPassword);
        this.usuarioRepository.save(usuario);

        return ResponseEntity.ok().build();
    }
}
