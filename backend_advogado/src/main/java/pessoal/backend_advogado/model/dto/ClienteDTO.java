package pessoal.backend_advogado.model.dto;

import pessoal.backend_advogado.model.Cliente;
import pessoal.backend_advogado.model.Endereco;
import pessoal.backend_advogado.model.Usuario;

public class ClienteDTO {

    private Integer id;

    private String cpf;

    private  String RG;

    private String telefone;

    private String logradouro;

    private String numero;

    private String complemento;

    private String bairro;

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



    public ClienteDTO(String cpf, String RG, String telefone, String descricaoProcesso,Usuario usuario,
                      String logradouro, String numero, String complemento, String bairro) {
        this.cpf = cpf;
        this.RG = RG;
        this.telefone = telefone;
        this.descricaoProcesso = descricaoProcesso;
        this.usuario = usuario;
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

        return new Cliente(cpf,RG,telefone,endereco,descricaoProcesso,usuario);
    }

    public Cliente ToModelPut() {
        Endereco endereco = new Endereco();

        endereco.setBairro(this.bairro);
        endereco.setComplemento(this.complemento);
        endereco.setNumero(this.numero);
        endereco.setLogradouro(this.logradouro);

        return new Cliente(id,cpf,RG,telefone,endereco,descricaoProcesso,usuario);
    }

    public static ClienteDTO FromModel(Cliente cliente) {
        return new ClienteDTO(cliente.getCpf(), cliente.getRG(), cliente.getTelefone(),
                cliente.getDescricaoProcesso(), cliente.getUsuario(),
                cliente.getEndereco().getLogradouro(),cliente.getEndereco().getNumero(),
                cliente.getEndereco().getComplemento(),cliente.getEndereco().getBairro());
    }
}
