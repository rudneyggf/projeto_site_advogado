package pessoal.backend_advogado.model.dto;

import pessoal.backend_advogado.model.Usuario;

public class meDTO {

    private Integer id;

    private String nome;

    private String email;

    public Integer getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public meDTO(Integer id,String nome, String email) {
        this.id = id;
        this.nome = nome;
        this.email = email;
    }

    public static meDTO fromModel(Usuario usuario) {
        return new meDTO(usuario.getId(), usuario.getUsername(), usuario.getEmail());
    }
}
