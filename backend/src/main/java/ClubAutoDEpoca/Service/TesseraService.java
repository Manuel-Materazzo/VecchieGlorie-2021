package ClubAutoDEpoca.Service;

import ClubAutoDEpoca.Domain.PersonaDAO;
import ClubAutoDEpoca.Domain.TesseraDAO;
import ClubAutoDEpoca.DTO.TesseraDTO;
import ClubAutoDEpoca.Repository.TesseraRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TesseraService {

    @Autowired
    TesseraRepository tesseraRepository;

    public ResponseEntity findAll() {
        try {
            List<TesseraDAO> findAll = tesseraRepository.findAll();
            List<TesseraDTO> ris = new ArrayList<TesseraDTO>();

            for (TesseraDAO dao : findAll) {
                ris.add(toDTO(dao));
            }

            return ResponseEntity.status(HttpStatus.OK).body(ris);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(e);
        }
    }

    public ResponseEntity findById(Integer id_tessera) {
        try {
            Optional<TesseraDAO> tesseraDAO = tesseraRepository.findById(id_tessera);
            if (tesseraDAO.isPresent()) {
                return ResponseEntity.status(HttpStatus.OK).body(toDTO(tesseraDAO.get()));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(e);
        }
    }

    public ResponseEntity deleteId(Integer id_tessera) {
        try {
            tesseraRepository.deleteById(id_tessera);

            return ResponseEntity.status(HttpStatus.OK).body("");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(e);
        }
    }

    public ResponseEntity deleteById(String[] listaId) {
        try {
            for (String id : listaId) {
                deleteById(listaId);
            }
            return ResponseEntity.status(HttpStatus.OK).body("");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(e);
        }

    }

    public ResponseEntity save(TesseraDTO tesseraDTO) {
        TesseraDAO tesseraDAO = fromDTO(tesseraDTO);

        TesseraDAO tesseraEsistente = tesseraRepository.findTesseraDAOByPersonaDAO_IdPersona(tesseraDTO.getIdPersona())
                .orElse(null);
        if(tesseraEsistente != null)
            return ResponseEntity.badRequest().body("");

        tesseraRepository.save(tesseraDAO);
        return ResponseEntity.status(HttpStatus.OK).body("");
    }

    public ResponseEntity update(TesseraDTO tesseraDTO) {
        TesseraDAO tesseraDAO = fromDTO(tesseraDTO);

        tesseraRepository.save(tesseraDAO);
        return ResponseEntity.status(HttpStatus.OK).body("");
    }

    private TesseraDTO toDTO(TesseraDAO tesseraDAO) {
        TesseraDTO tesseraDTO = new ModelMapper().map(tesseraDAO, TesseraDTO.class);

        //SET fatti dal ModelMapper

        //chiave esterna persona
        tesseraDTO.setIdPersona(tesseraDAO.getPersonaDAO().getIdPersona());

        return tesseraDTO;
    }

    private TesseraDAO fromDTO(TesseraDTO tesseraDTO) {
        TesseraDAO tesseraDAO = new ModelMapper().map(tesseraDTO, TesseraDAO.class);

        //SET fatti dal ModelMapper

        //chiave esterna persona
        PersonaDAO personaDAO = new PersonaDAO();
        personaDAO.setIdPersona(tesseraDTO.getIdPersona());

        tesseraDAO.setPersonaDAO(personaDAO);

        return tesseraDAO;
    }
}
