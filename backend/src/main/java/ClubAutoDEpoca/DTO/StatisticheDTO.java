package ClubAutoDEpoca.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StatisticheDTO {

    Integer manifestazioniAnnoCorrente;
    Integer manifestazioniAnnoPrecedente;
    Integer partecipantiAnnoCorrente;
    Integer partecipantiAnnoPrecedente;
    Integer membriAnnoPrecedente;
    Integer membriAnnoCorrente;
    Integer autoRegistrateAnnoPrecedente;
    Integer autoRegistrateAnnoCorrente;
    Integer autoAnticheRegistrateAnnoPrecedente;
    Integer autoAnticheRegistrateAnnoCorrente;
    Integer tesseratiAnnoPrecedente;
    Integer tesseratiAnnoCorrente;
    Integer visitatoriAnnoPrecedente;
    Integer visitatoriAnnoCorrente;

    Integer[] nuoviMembriPerMeseAnnoPrecedente;
    Integer[] nuoviMembriPerMeseAnnoCorrente;

}
