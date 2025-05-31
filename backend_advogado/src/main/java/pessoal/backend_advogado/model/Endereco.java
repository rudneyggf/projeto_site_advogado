package pessoal.backend_advogado.model;


import jakarta.persistence.Embeddable;

@Embeddable
public class Endereco {

    private String logradouro;

    private String numero;

    private String complemento;

    private String bairro;

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }
    public String getBairro() {
        return bairro;
    }
    public void setLogradouro(String logradouro) {
        this.logradouro = logradouro;
    }
    public String getLogradouro() {
        return logradouro;
    }
    public void setNumero(String numero) {
        this.numero = numero;
    }
    public String getNumero() {
        return numero;
    }
    public void setComplemento(String complemento) {
        this.complemento = complemento;
    }
    public String getComplemento() {
        return complemento;
    }

}
