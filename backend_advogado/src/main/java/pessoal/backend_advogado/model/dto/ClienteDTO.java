package pessoal.backend_advogado.model.dto;

import pessoal.backend_advogado.model.Cliente;
import pessoal.backend_advogado.model.Endereco;

public class ClienteDTO {

    private Integer id;

    private String cpf;

    private  String RG;

    private String telefone;

    private Endereco endereco;

    private String descricaoProcesso;

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

    public Endereco getEndereco() {
        return endereco;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public void setEndereco(Endereco endereco) {
        this.endereco = endereco;
    }

    public ClienteDTO(String cpf, String RG, String telefone, Endereco endereco, String descricaoProcesso) {
        this.cpf = cpf;
        this.RG = RG;
        this.telefone = telefone;
        this.endereco = endereco;
        this.descricaoProcesso = descricaoProcesso;
    }


    public Cliente ToModel() {
        return new Cliente(cpf,RG,telefone,endereco,descricaoProcesso);
    }

    public Cliente ToModelPut() {
        return new Cliente(id,cpf,RG,telefone,endereco,descricaoProcesso);
    }

    public static ClienteDTO FromModel(Cliente cliente) {
        return new ClienteDTO(cliente.getCpf(), cliente.getRG(), cliente.getTelefone(), cliente.getEndereco(), cliente.getDescricaoProcesso());
    }
}
