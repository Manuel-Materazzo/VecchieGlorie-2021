package ClubAutoDEpoca.Controller;

import ClubAutoDEpoca.Domain.ImmaginiDAO;
import ClubAutoDEpoca.Repository.ImmaginiRepository;
import ClubAutoDEpoca.Service.ImmaginiDAOService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("api/v1/immaginiDAO")
@AllArgsConstructor
public class ImmaginiController {
    ImmaginiDAOService service;
    ImmaginiRepository immaginiRepository;

    @PostMapping(
            path = "",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<ImmaginiDAO> save(@RequestParam("title") String title,
                                            @RequestParam("description") String description,
                                            @RequestParam("file") MultipartFile file) {
        return new ResponseEntity<>(service.save(title, description, file), HttpStatus.OK);
    }

}