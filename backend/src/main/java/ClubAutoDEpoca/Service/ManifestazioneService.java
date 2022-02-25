package ClubAutoDEpoca.Service;

import ClubAutoDEpoca.Domain.ManifestazioneDAO;
import ClubAutoDEpoca.DTO.ManifestazioneDTO;
import ClubAutoDEpoca.Repository.ManifestazioneRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ManifestazioneService {

    @Autowired
    ManifestazioneRepository manifestazioneRepository;


    public ResponseEntity findAll() {
        try{
            List<ManifestazioneDAO> findAll = manifestazioneRepository.findAll();
            List<ManifestazioneDTO> ris = new ArrayList<>();

            for (ManifestazioneDAO dao : findAll) {
                ris.add(toDTO(dao));
            }

            return ResponseEntity.status(HttpStatus.OK).body(ris);
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(e);
        }
    }

    public ResponseEntity findById(Integer id_manifestazione) {
        try{
            Optional<ManifestazioneDAO> manifestazioneDAO = manifestazioneRepository.findById(id_manifestazione);
            if(manifestazioneDAO.isPresent()){
                return ResponseEntity.status(HttpStatus.OK).body(toDTO(manifestazioneDAO.get()));
            }else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("");
            }
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(e);
        }
    }

    public ResponseEntity deleteId (Integer id_manifestazione) {
        try{
            manifestazioneRepository.deleteById(id_manifestazione);
            return ResponseEntity.status(HttpStatus.OK).body("");
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(e);
        }
    }

    public ResponseEntity deleteById(Integer[] listaId) {
        try{
            for (Integer id : listaId) {
                manifestazioneRepository.deleteById(id);
            }
            return ResponseEntity.status(HttpStatus.OK).body("");
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(e);
        }
    }

    public ResponseEntity save(ManifestazioneDTO manifestazioneDTO) {
        try{
            ManifestazioneDAO manifestazioneDAO = fromDTO(manifestazioneDTO);
            manifestazioneRepository.save(manifestazioneDAO);
            return ResponseEntity.status(HttpStatus.OK).body("");
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(e);
        }
    }

    private ManifestazioneDTO toDTO(ManifestazioneDAO manifestazioneDAO) {
        ManifestazioneDTO  manifestazioneDTO = new ModelMapper().map(manifestazioneDAO,  ManifestazioneDTO.class);

        //SET fatti dal ModelMapper

        return manifestazioneDTO;
    }

    private ManifestazioneDAO fromDTO(ManifestazioneDTO manifestazioneDTO) {
        ManifestazioneDAO manifestazioneDAO = new ModelMapper().map(manifestazioneDTO, ManifestazioneDAO.class);

        //SET fatti dal ModelMapper

        return manifestazioneDAO;
    }

}
