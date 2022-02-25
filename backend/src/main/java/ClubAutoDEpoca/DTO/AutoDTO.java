package ClubAutoDEpoca.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AutoDTO {

    private String n_telaio;
    private String marca;
    private String modello;
    private Date anno_immatricolazione;
    private String foto;
    private Integer cod_certificazione;

    private PersonaDTO personaDTO;
    private List<PartecipazioniDTO> partecipazioniDTO;

    private Integer idPersona;
}
