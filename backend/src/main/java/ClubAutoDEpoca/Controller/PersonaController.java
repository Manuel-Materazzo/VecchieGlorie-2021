package ClubAutoDEpoca.Controller;

import ClubAutoDEpoca.DTO.PersonaDTO;
import ClubAutoDEpoca.Service.PersonaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/ClubAutoDEpoca")
public class PersonaController {

    @Autowired
    PersonaService personaService;


    @PostMapping("/createPersona")
    public ResponseEntity newPersona (@RequestPart("fotoAuto") MultipartFile img,
                                      @RequestPart("richiesta") PersonaDTO personaDTO) {
        return personaService.save(personaDTO, img);
    }

    @GetMapping("/getAllPersona")
    public ResponseEntity<List<PersonaDTO>> all() {
        return personaService.findAll();
    }

    @GetMapping("/getAllSoci")
    public ResponseEntity<List<PersonaDTO>> allSoci() {
        return personaService.groupByTesseraDAO_Id_tessera();
    }

    @PutMapping("/updatePersona/{id}")
    public ResponseEntity update(@PathVariable String id, @RequestBody PersonaDTO personaDTO) {
        return personaService.update(personaDTO);
    }

    @GetMapping("/getById/{idPersona}")
    public ResponseEntity getByIdPersona (@PathVariable Integer idPersona) {
        return personaService.findById(idPersona);
    }

    @DeleteMapping("/deletePersonaById/{idPersona}")
    public ResponseEntity deleteByIdPersona (@PathVariable Integer idPersona) {
        return personaService.deleteId(idPersona);
    }

    @PostMapping("/deletePersonaByListId")
    public ResponseEntity deleteAllByList (@RequestBody Integer[] listaId) {
        return personaService.deleteById(listaId);
    }
    // ############# FINE CREAZIONE RICHIESTE #############

}
