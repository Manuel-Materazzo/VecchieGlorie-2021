package ClubAutoDEpoca.Domain;

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
@Table(name="Manifestazione")
public class ManifestazioneDAO {

    @Id
    @GeneratedValue
    @Column(name = "id_manifestazione")
    private Integer id_manifestazione;

    @NonNull
    @Column(name = "programma")
    private String programma;

    @NonNull
    @Column(name = "data_inizio")
    private Date data_inizio;

    @NonNull
    @Column(name = "data_fine")
    private Date data_fine;

    @NonNull
    @Column(name = "costo_a_persona")
    private Integer costo_a_persona;

    @NonNull
    @Column(name = "numero_massimo")
    private Integer numero_massimo;

    @NonNull
    @OneToMany(mappedBy="manifestazioneDAO", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<PartecipazioniDAO> partecipazioniDAOset;

}
