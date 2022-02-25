package ClubAutoDEpoca.Controller;

import ClubAutoDEpoca.DTO.AutoDTO;
import ClubAutoDEpoca.Service.AutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/ClubAutoDEpoca")
public class AutoController {

    @Autowired
    AutoService autoService;

    // ############# CREAZIONE RICHIESTE #############

    @PostMapping("/createAuto")
    public ResponseEntity newAuto(@RequestPart("fotoAuto") MultipartFile img,
                                  @RequestPart("richiesta") AutoDTO autoDTO) {
        return autoService.save(autoDTO, img);
    }

    @GetMapping("/getAllAuto")
    public ResponseEntity<List<AutoDTO>> all() {
        return autoService.findAll();
    }

    @PutMapping("/updateAuto/{id_auto}")
    public ResponseEntity update(@PathVariable String id_auto, @RequestBody AutoDTO autoDTO) {
        return autoService.update(autoDTO);
    }

    @GetMapping("/getById/{id_auto}")
    public ResponseEntity getByIdAuto(@PathVariable String n_telaio) {
        return autoService.findById(n_telaio);
    }

    @DeleteMapping("/deleteAutoById/{n_telaio}")
    public ResponseEntity deleteById(@PathVariable String n_telaio) {
        return autoService.deleteId(n_telaio);
    }

    @PostMapping("/deleteAutoByListId")
    public ResponseEntity deleteAllByList(@RequestBody String[] listaId) {
        return autoService.deleteAllById(listaId);
    }

}

// ############# FINE CREAZIONE RICHIESTE #############

