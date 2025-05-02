package pessoal.backend_advogado.model;


import jakarta.persistence.Embeddable;

@Embeddable
public class Endereco {

    private String logradouro;

    private String numero;

    private String complemento;

    private String bairro;
}
