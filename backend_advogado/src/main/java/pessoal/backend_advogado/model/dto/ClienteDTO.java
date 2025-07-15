package pessoal.backend_advogado.model.dto;

import pessoal.backend_advogado.model.Cliente;
import pessoal.backend_advogado.model.Endereco;
import pessoal.backend_advogado.model.Usuario;

public class ClienteDTO {

    private Integer id;

    private String cpf;

    private  String RG;

    private String telefone;

    private String ocupacao;

    private String logradouro;

    private String numero;

    private String bairro;

    private String complemento;
    
    private String descricaoProcesso;

    private  Usuario usuario;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCpf() {
        return cpf;
    }

    public String getRG() {
        return RG;
    }

    public String getTelefone() {
        return telefone;
    }


    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }


    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public String getOcupacao() {
        return ocupacao;
    }

    public String getBairro() {
        return bairro;
    }

    public String getLogradouro() {
        return logradouro;
    }

    public String getComplemento() {
        return complemento;
    }

    public String getDescricaoProcesso() {
        return descricaoProcesso;
    }

    public void setOcupacao(String ocupacao) {
        this.ocupacao = ocupacao;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public void setLogradouro(String logradouro) {
        this.logradouro = logradouro;
    }

    public void setRG(String RG) {
        this.RG = RG;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public void setDescricaoProcesso(String descricaoProcesso) {
        this.descricaoProcesso = descricaoProcesso;
    }

    public void setComplemento(String complemento) {
        this.complemento = complemento;
    }


    public ClienteDTO(Integer id, String cpf, String RG, String telefone, String ocupacao,
                      String logradouro, String numero, String bairro, String complemento, String descricaoProcesso) {
        this.id=id;
        this.cpf = cpf;
        this.RG = RG;
        this.telefone = telefone;
        this.ocupacao = ocupacao;
        this.descricaoProcesso = descricaoProcesso;
        this.logradouro = logradouro;
        this.numero = numero;
        this.complemento = complemento;
        this.bairro = bairro;

    }


    public Cliente ToModel() {
        Endereco endereco = new Endereco();

        endereco.setBairro(this.bairro);
        endereco.setComplemento(this.complemento);
        endereco.setNumero(this.numero);
        endereco.setLogradouro(this.logradouro);

        return new Cliente(cpf,RG,ocupacao,telefone,endereco,descricaoProcesso,usuario);
    }

    public Cliente ToModelPut() {
        Endereco endereco = new Endereco();

        endereco.setBairro(this.bairro);
        endereco.setComplemento(this.complemento);
        endereco.setNumero(this.numero);
        endereco.setLogradouro(this.logradouro);

        return new Cliente(id,cpf,RG,ocupacao,telefone,endereco,descricaoProcesso,usuario);
    }

    public static ClienteDTO FromModel(Cliente cliente) {
        return new ClienteDTO(cliente.getId(),cliente.getCpf(), cliente.getRG(), cliente.getTelefone(), cliente.getOcupacao(),
                cliente.getDescricaoProcesso(),
                cliente.getEndereco().getLogradouro(),cliente.getEndereco().getNumero(),
                cliente.getEndereco().getComplemento(),cliente.getEndereco().getBairro());
    }
}
