package ClubAutoDEpoca.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PartecipazioniDTO {

    private Integer id_partecipazione;
    private Boolean partecipa;
    private Integer numero_persone;
    private Integer quota_versata;

    private ManifestazioneDTO manifestazioneDTO;
    private AutoDTO autoDTO;

    private Integer id_manifestazione;
    private String n_telaio;

}
