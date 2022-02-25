package ClubAutoDEpoca.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ManifestazioneDTO{

    private Integer id_manifestazione;
    private String programma;
    private Date data_inizio;
    private Date data_fine;
    private Integer costo_a_persona;
    private Integer numero_massimo;

    private List<PartecipazioniDTO> partecipazioniDTOset;

}
