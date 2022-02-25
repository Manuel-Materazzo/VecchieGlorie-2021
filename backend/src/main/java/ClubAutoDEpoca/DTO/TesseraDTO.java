package ClubAutoDEpoca.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TesseraDTO {

    private Integer id_tessera;
    private Date data_creazione;
    private Date inizio_abbonamento;

    private PersonaDTO personaDTO;

    private Integer idPersona;

}
