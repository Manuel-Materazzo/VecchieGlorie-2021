package ClubAutoDEpoca.Domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="Partecipazioni")
public class PartecipazioniDAO {

    @Id
    @GeneratedValue
    @Column(name = "id_partecipazione")
    private Integer id_partecipazione;

    @NonNull
    @Column(name = "partecipa")
    private Boolean partecipa;

    @NonNull
    @Column(name = "numero_persone")
    private Integer numero_persone;

    @NonNull
    @Column(name = "quota_versata")
    private Integer quota_versata;

    @ManyToOne(cascade = CascadeType.DETACH)
    @NonNull
    @JoinColumn(name="manifestazioneDAO")
    private ManifestazioneDAO manifestazioneDAO;

    @ManyToOne
    @NonNull
    @JoinColumn(name="autoDAO")
    private AutoDAO autoDAO;
}
