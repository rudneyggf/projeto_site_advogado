package pessoal.backend_advogado.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    @Bean
    public SecurityFilterChain configure(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity.
                csrf(csrf->csrf.disable())
                .sessionManagement(session-> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorizeRequests -> authorizeRequests
                        .requestMatchers(HttpMethod.POST,"/autenticar/login").permitAll()
                        .requestMatchers(HttpMethod.POST,"/autenticar/cadastrar").permitAll()
                        .requestMatchers(HttpMethod.GET,"/usuario/{id}").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET,"/cliente").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET,"/cliente/{id}").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT,"/cliente/{id}").hasRole("USUARIO")
                        .requestMatchers(HttpMethod.POST,"/cliente").hasRole("USUARIO")
                        .anyRequest().permitAll())
                .formLogin(formLogin -> formLogin.permitAll())
                .build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
