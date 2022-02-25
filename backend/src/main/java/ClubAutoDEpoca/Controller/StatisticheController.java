package ClubAutoDEpoca.Controller;

import ClubAutoDEpoca.Service.StatisticheService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/ClubAutoDEpoca")
public class StatisticheController {

    @Autowired
    StatisticheService statisticheService;

    //-Intere statistiche in DTO
    @GetMapping("/getStatistiche")
    public ResponseEntity getManifestazioniAnnoCorrent() {
        return statisticheService.getStatistiche();
    }

}
