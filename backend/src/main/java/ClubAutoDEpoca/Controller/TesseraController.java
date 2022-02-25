package ClubAutoDEpoca.Controller;

import ClubAutoDEpoca.DTO.TesseraDTO;
import ClubAutoDEpoca.Service.TesseraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ClubAutoDEpoca")
public class TesseraController {

    @Autowired
    TesseraService tesseraService;


    @PostMapping("/createTessera")
    public ResponseEntity<TesseraDTO> newTessera (@RequestBody TesseraDTO tesseraDTO) {
        return tesseraService.save(tesseraDTO);
    }

    @GetMapping("/getAllTessera")
    public ResponseEntity<List<TesseraDTO>> all() {
        return tesseraService.findAll();
    }

    @PutMapping("/updateTessera/{id_tessera}")
    public ResponseEntity update(@PathVariable String id_tessera, @RequestBody TesseraDTO tesseraDTO) {
        return tesseraService.update(tesseraDTO);
    }

    @GetMapping("/getById/{id_tessera}")
    public ResponseEntity getByIdTessera (@PathVariable Integer id_tessera) {
        return tesseraService.findById(id_tessera);
    }

    @DeleteMapping("/deleteTesseraById/{id_tessera}")
    public ResponseEntity deleteById(@PathVariable Integer id_tessera) {
        return tesseraService.deleteId(id_tessera);
    }

    @PostMapping("/deleteTesseraByListId")
    public ResponseEntity deleteAllByList (@RequestBody String[] listaId) {
        return tesseraService.deleteById(listaId);
    }


}
