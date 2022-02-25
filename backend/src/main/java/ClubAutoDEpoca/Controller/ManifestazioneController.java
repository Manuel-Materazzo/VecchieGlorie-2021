package ClubAutoDEpoca.Controller;

import ClubAutoDEpoca.DTO.ManifestazioneDTO;
import ClubAutoDEpoca.Service.ManifestazioneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ClubAutoDEpoca")
public class ManifestazioneController {

    @Autowired
    ManifestazioneService manifestazioneService;

    @PostMapping("/createManifestazione")
    public ResponseEntity newManifestazione (@RequestBody ManifestazioneDTO manifestazioneDTO) {
        return manifestazioneService.save(manifestazioneDTO);
    }

    @GetMapping("/getAllManifestazione")
    public ResponseEntity all() {
        return manifestazioneService.findAll();
    }

    @PutMapping("/updateManifestazione/{id}")
    public ResponseEntity update(@PathVariable Long id, @RequestBody ManifestazioneDTO manifestazioneDTO) {
        return manifestazioneService.save(manifestazioneDTO);
    }

    @GetMapping("/getById/{id_manifestazione}")
    public ResponseEntity getByIdmanifestazione (@PathVariable Integer id_manifestazione) {
        return manifestazioneService.findById(id_manifestazione);
    }

    @DeleteMapping("/deleteManifestazioneById/{id_manifestazione}")
    public ResponseEntity deleteById (@PathVariable Integer id_manifestazione) {
        return manifestazioneService.deleteId(id_manifestazione);
    }

    @PostMapping("/deleteManifestazioneByListId")
    public ResponseEntity deleteAllByList (@RequestBody Integer[] listaId) {
        return manifestazioneService.deleteById(listaId);
    }


}

