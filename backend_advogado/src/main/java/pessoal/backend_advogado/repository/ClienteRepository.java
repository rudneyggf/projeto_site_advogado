package pessoal.backend_advogado.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pessoal.backend_advogado.model.Cliente;

import java.util.List;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Integer> {

    public List<Cliente> findByUsuarioNome(String nome);

    @Query("SELECT c FROM Cliente c ORDER BY c.usuario.nome")
    List<Cliente> findAllOrderByNomeUsuario();
}
