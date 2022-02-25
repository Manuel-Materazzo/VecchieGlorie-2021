package ClubAutoDEpoca.Controller;


import ClubAutoDEpoca.DTO.PartecipazioniDTO;
import ClubAutoDEpoca.Service.PartecipazioniService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ClubAutoDEpoca")
public class PartecipazioniController {

    @Autowired
    PartecipazioniService partecipazioniService;


    @PostMapping("/createPartecipazioni")
    public ResponseEntity newPartecipazioni(@RequestBody PartecipazioniDTO partecipazioniDTO) {
        return partecipazioniService.save(partecipazioniDTO);
    }

    @GetMapping("/getAllPartecipazioni")
    public ResponseEntity all() {
        return partecipazioniService.findAll();
    }

    @GetMapping("/getAllPartecipazioniByIdManifestazione/{id_manifestazione}")
    public ResponseEntity getAllPartecipazioniByIdManifestazione(@PathVariable Integer id_manifestazione) {
        return partecipazioniService.findAllByIdManifestazione(id_manifestazione);
    }

    @PutMapping("/updatePartecipazioni/{id}")
    public ResponseEntity update(@PathVariable String id, @RequestBody PartecipazioniDTO partecipazioniDTO) {
        return partecipazioniService.save(partecipazioniDTO);
    }

    @GetMapping("/getById/{id_partecipazione}")
    public ResponseEntity getByIdPartecipzione(@PathVariable Integer id_partecipazione) {
        return partecipazioniService.findById(id_partecipazione);
    }

    @DeleteMapping("/deletePartecipazioniById/{id_partecipazioni}")
    public ResponseEntity deleteById(@PathVariable Integer id_partecipazioni) {
        return partecipazioniService.deleteId(id_partecipazioni);
    }

    @PostMapping("/deletePartecipazioniByListId")
    public ResponseEntity deleteAllByList (@RequestBody Integer[] listaId) { return partecipazioniService.deleteById(listaId);
    }



}
