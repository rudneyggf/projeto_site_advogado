package pessoal.backend_advogado.model.dto;

import jakarta.persistence.*;
import pessoal.backend_advogado.model.Cliente;
import pessoal.backend_advogado.model.Endereco;

public class ClienteProcessoDTO {


    private String cpf;

    private  String RG;

    private String telefone;

    private Endereco endereco;

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

    public ClienteProcessoDTO(String cpf, String RG, String telefone, Endereco endereco) {
        this.cpf = cpf;
        this.RG = RG;
        this.telefone = telefone;
        this.endereco = endereco;
    }

    public void ToModel(Cliente cliente) {
        cliente.setCpf(cpf);
        cliente.setRG(RG);
        cliente.setTelefone(telefone);
        cliente.setEndereco(endereco);
    }

    public static ClienteProcessoDTO FromModel(Cliente cliente) {
        return new ClienteProcessoDTO(cliente.getCpf(), cliente.getRG(), cliente.getTelefone(), cliente.getEndereco());
    }
}
