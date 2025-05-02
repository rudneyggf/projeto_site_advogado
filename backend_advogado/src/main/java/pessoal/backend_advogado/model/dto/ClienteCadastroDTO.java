package pessoal.backend_advogado.model.dto;

import pessoal.backend_advogado.model.Cliente;
import pessoal.backend_advogado.model.Endereco;

public class ClienteCadastroDTO {


    private Integer id;

    private String nome;

    private String email;

    private String senha;


    public ClienteCadastroDTO(String nome, String email, String senha) {
        this.nome=nome;
        this.email=email;
        this.senha=senha;
    }

    public ClienteCadastroDTO() {

    }

    public Integer getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public String getEmail() {
        return email;
    }

    public String getSenha() {
        return senha;
    }


    public void setEmail(String email) {
        this.email = email;
    }

    public Cliente toModel(){
        Cliente cliente = new Cliente(id,nome,email,senha);
        return cliente;
    }

    public static ClienteCadastroDTO fromModel(Cliente model){
            return new ClienteCadastroDTO(model.getNome(),model.getEmail(),model.getSenha());
    }
}
