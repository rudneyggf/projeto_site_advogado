package pessoal.backend_advogado.model;

public enum Role {
    ADMIN("ADMIN"),
    USUARIO("USUARIO");


    private String role;
    private Role(String role) {
        this.role = role;
    }
}
