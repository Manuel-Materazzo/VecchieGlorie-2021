package ClubAutoDEpoca.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PersonaDTO {

    private Integer idPersona;
    private String nome;
    private String cognome;
    private Date data_nascita;
    private String cod_fiscale;
    private Long n_telefono;
    private Boolean consiglio;
    private String mail;

    private TesseraDTO tesseraDTO;
    private List<AutoDTO> autoDTOset;

    private Integer id_tessera;

}
