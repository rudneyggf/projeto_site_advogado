package pessoal.backend_advogado.model;

import jakarta.persistence.*;

@Entity
@Table(name = "cliente")
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String nome;

    private String cpf;

    private  String RG;

    private String telefone;

    @Column(nullable = false, unique = true)
    private String email;

    private String senha;

    @Embedded
    private Endereco endereco;

    public Cliente(Integer id,String nome, String email, String senha) {
        this.id = id;
        this.nome=nome;
        this.email=email;
        this.senha=senha;
    }

    public Cliente() {

    } public Integer getId() {
        return id;
    }

    public String getNome() {
        return nome;
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

    public String getEmail() {
        return email;
    }

    public String getSenha() {
        return senha;
    }

    public Endereco getEndereco() {
        return endereco;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setEndereco(Endereco endereco) {
        this.endereco = endereco;
    }


    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public void setRG(String RG) {
        this.RG = RG;
    }
}
