package ClubAutoDEpoca.Domain;

import com.sun.istack.Nullable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.persistence.*;
import java.sql.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="Auto")
public class AutoDAO {

    @Id
    @NonNull
    @Column(name = "n_telaio")
    private java.lang.String n_telaio;

    @NonNull
    @Column(name = "marca")
    private String marca;

    @NonNull
    @Column(name = "modello")
    private String modello;

    @NonNull
    @Column(name = "anno_immatricolazione")
    private Date anno_immatricolazione;

    @Nullable
    @Column(name = "foto")
    private String foto;

    @Nullable
    @Column(name = "cod_certificazione")
    private Integer cod_certificazione;

    @ManyToOne(cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
    @JoinColumn(name = "id_persona")
    private PersonaDAO personaDAO;

    @Nullable
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name="partecipazioniDAO")
    private List<PartecipazioniDAO> partecipazioniDAO;

}
