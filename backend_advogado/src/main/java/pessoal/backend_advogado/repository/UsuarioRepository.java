package pessoal.backend_advogado.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import pessoal.backend_advogado.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException;
}
