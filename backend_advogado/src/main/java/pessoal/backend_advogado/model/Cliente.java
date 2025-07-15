package pessoal.backend_advogado.model;

import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "cliente")
public class Cliente  {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true)
    private String cpf;

    @Column(nullable = false)
    private  String RG;

    @Column(nullable = false)
    private String telefone;

    @Column(nullable = false)
    private String ocupacao;

    @Embedded
    private Endereco endereco;

    @Column(name = "descricao_processo", nullable = false)
    private String descricaoProcesso;

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Usuario usuario;


    public Cliente() {}

    public Cliente(String cpf, String RG, String telefone,String ocupacao , Endereco endereco, String descricaoProcesso, Usuario usuario) {
        this.cpf = cpf;
        this.RG = RG;
        this.ocupacao = ocupacao;
        this.telefone = telefone;
        this.endereco = endereco;
        this.descricaoProcesso = descricaoProcesso;
        this.usuario = usuario;
    }

    public Cliente(Integer id,String cpf, String RG,String ocupacao , String telefone, Endereco endereco, String descricaoProcesso, Usuario usuario) {
        this.id = id;
        this.cpf = cpf;
        this.ocupacao = ocupacao;
        this.RG = RG;
        this.telefone = telefone;
        this.endereco = endereco;
        this.descricaoProcesso = descricaoProcesso;
        this.usuario = usuario;
    }

    public Integer getId() {
        return id;
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


    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public void setRG(String RG) {
        this.RG = RG;
    }

    public void setDescricaoProcesso(String descricaoProcesso) {
        this.descricaoProcesso = descricaoProcesso;
    }
    public String getDescricaoProcesso() {
        return descricaoProcesso;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setOcupacao(String ocupacao) {
        this.ocupacao = ocupacao;
    }

    public String getOcupacao() {
        return ocupacao;
    }
}
