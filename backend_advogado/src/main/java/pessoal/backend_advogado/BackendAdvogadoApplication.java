package pessoal.backend_advogado;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import pessoal.backend_advogado.model.Role;
import pessoal.backend_advogado.model.Usuario;
import pessoal.backend_advogado.repository.UsuarioRepository;

@SpringBootApplication
public class BackendAdvogadoApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendAdvogadoApplication.class, args);
	}

}
