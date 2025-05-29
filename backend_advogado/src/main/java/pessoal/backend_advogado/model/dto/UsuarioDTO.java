package pessoal.backend_advogado.model.dto;

import pessoal.backend_advogado.model.Usuario;

public class UsuarioDTO {


    private String nome;

    private String email;

    private String senha;


    public UsuarioDTO(String nome, String email, String senha) {
        this.nome=nome;
        this.email=email;
        this.senha=senha;
    }

    public UsuarioDTO() {}

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

    public Usuario toModel(){
        return new Usuario(nome,email,senha);
    }

    public static UsuarioDTO fromModel(Usuario model){
            return new UsuarioDTO(model.getUsername(), model.getEmail(), model.getPassword());
    }
}
