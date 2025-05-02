package pessoal.backend_advogado.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pessoal.backend_advogado.model.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Integer> {

}
