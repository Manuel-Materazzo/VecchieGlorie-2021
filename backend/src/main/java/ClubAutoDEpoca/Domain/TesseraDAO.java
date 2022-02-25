package ClubAutoDEpoca.Domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.persistence.*;
import java.sql.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="Tessera")
public class TesseraDAO {

    @Id
    @GeneratedValue
    @Column(name = "id_tessera")
    private Integer id_tessera;

    @NonNull
    @Column(name = "data_creazione")
    private Date data_creazione;

    @NonNull
    @Column(name = "inizio_abbonamento")
    private Date inizio_abbonamento;

    @OneToOne(cascade = CascadeType.REFRESH)
    @JoinColumn(name = "id_persona")
    private PersonaDAO personaDAO;

}
