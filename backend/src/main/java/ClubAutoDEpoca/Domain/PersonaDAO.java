package ClubAutoDEpoca.Domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import java.sql.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="Persona")
public class PersonaDAO {

    @Id
    @GeneratedValue
    @Column(name = "id_persona")
    private Integer idPersona;

    @NonNull
    @Column(name = "nome")
    private String nome;

    @NonNull
    @Column(name = "cognome")
    private String cognome;

    @NonNull
    @Column(name = "data_nascita")
    private Date data_nascita;

    @NonNull
    @Column(name = "cod_fiscale")
    private String cod_fiscale;

    @Nullable
    @Column(name = "n_telefono")
    private Long n_telefono;

    @Nullable
    @Column(name = "mail")
    private String mail;

    @Nullable
    @Column(name = "consiglio")
    private Boolean consiglio;


    @OneToOne(mappedBy = "personaDAO", cascade = CascadeType.ALL)
    @PrimaryKeyJoinColumn
    @Nullable
    private TesseraDAO tesseraDAO;

    @NonNull
    @OneToMany(mappedBy="personaDAO", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<AutoDAO> autoDAOset;
}
