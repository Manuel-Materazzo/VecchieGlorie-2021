package ClubAutoDEpoca.Service;

import ClubAutoDEpoca.DTO.StatisticheDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class StatisticheService {

    public ResponseEntity getStatistiche(){
        //TODO
        StatisticheDTO statisticheDTO = new StatisticheDTO();

        statisticheDTO.setManifestazioniAnnoCorrente(5);
        statisticheDTO.setManifestazioniAnnoPrecedente(13);
        statisticheDTO.setPartecipantiAnnoCorrente(39);
        statisticheDTO.setPartecipantiAnnoPrecedente(145);

        statisticheDTO.setMembriAnnoPrecedente(16);
        statisticheDTO.setMembriAnnoCorrente(6);
        statisticheDTO.setAutoRegistrateAnnoPrecedente(78);
        statisticheDTO.setAutoRegistrateAnnoCorrente(22);

        statisticheDTO.setAutoAnticheRegistrateAnnoPrecedente(7);
        statisticheDTO.setAutoAnticheRegistrateAnnoCorrente(2);
        statisticheDTO.setTesseratiAnnoPrecedente(16);
        statisticheDTO.setTesseratiAnnoCorrente(6);

        statisticheDTO.setVisitatoriAnnoPrecedente(45);
        statisticheDTO.setVisitatoriAnnoCorrente(20);

        Integer[] ris1 = {5, 8, 2, 4, 8, 6, 9, 3, 2, 4, 5, 1};
        statisticheDTO.setNuoviMembriPerMeseAnnoPrecedente(ris1);
        Integer[] ris2 = {7, 9, 3, 5, 10};
        statisticheDTO.setNuoviMembriPerMeseAnnoCorrente(ris2);

        return ResponseEntity.status(HttpStatus.OK).body(statisticheDTO);
    }
}
