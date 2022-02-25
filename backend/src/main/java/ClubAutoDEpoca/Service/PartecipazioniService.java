package ClubAutoDEpoca.Service;

import ClubAutoDEpoca.Domain.AutoDAO;
import ClubAutoDEpoca.Domain.ManifestazioneDAO;
import ClubAutoDEpoca.Domain.PartecipazioniDAO;
import ClubAutoDEpoca.DTO.PartecipazioniDTO;
import ClubAutoDEpoca.Repository.PartecipazioniRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PartecipazioniService {

    @Autowired
    PartecipazioniRepository partecipazioniRepository;

    public ResponseEntity findAll() {
        try{
            List<PartecipazioniDAO> findAll = partecipazioniRepository.findAll();
            List<PartecipazioniDTO> ris = new ArrayList<PartecipazioniDTO>();

            for (PartecipazioniDAO dao : findAll) {
                ris.add(toDTO(dao));
            }
            return ResponseEntity.status(HttpStatus.OK).body(ris);
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(e);
        }
    }

    public ResponseEntity findById(Integer id_partecipazioni) {
        try{
            Optional<PartecipazioniDAO> partecipazioniDAO = partecipazioniRepository.findById(id_partecipazioni);
            if(partecipazioniDAO.isPresent()){
                return ResponseEntity.status(HttpStatus.OK).body(toDTO(partecipazioniDAO.get()));
            }else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("");
            }
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(e);
        }
    }

    public ResponseEntity findAllByIdManifestazione(Integer id_manifestazione) {
        try{

            ManifestazioneDAO mf = new ManifestazioneDAO();

            mf.setId_manifestazione(id_manifestazione);

            List<PartecipazioniDAO> partecipazioniDAO = partecipazioniRepository.findByManifestazioneDAOLike(mf);

            List<PartecipazioniDTO> ris = new ArrayList<PartecipazioniDTO>();

            for (PartecipazioniDAO dao : partecipazioniDAO) {
                ris.add(toDTO(dao));
            }

            return ResponseEntity.status(HttpStatus.OK).body(ris);
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(e);
        }
    }

    public ResponseEntity deleteId (Integer id_partecipazioni) {
        try{
            partecipazioniRepository.deleteById(id_partecipazioni);
            return ResponseEntity.status(HttpStatus.OK).body("");
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(e);
        }
    }

    public ResponseEntity deleteById(Integer[] listaId) {
        try{
            for (Integer id : listaId) {
                partecipazioniRepository.deleteById(id);
            }
            return ResponseEntity.status(HttpStatus.OK).body("");
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(e);
        }
    }

    public ResponseEntity save(PartecipazioniDTO partecipazioniDTO) {
        try{
            PartecipazioniDAO partecipazioniDAO = fromDTO(partecipazioniDTO);
            partecipazioniRepository.save(partecipazioniDAO);
            return ResponseEntity.status(HttpStatus.OK).body("");
        }catch(Exception e){
            System.err.print(e);
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("{\"status\":\"" + e + "\"}");
        }
    }

    private PartecipazioniDTO toDTO(PartecipazioniDAO partecipazioniDAO) {
        PartecipazioniDTO partecipazioniDTO = new ModelMapper().map(partecipazioniDAO, PartecipazioniDTO.class);

        //SET fatti dal ModelMapper

        //Chiave esterna manifestazione
        partecipazioniDTO.setId_manifestazione(partecipazioniDAO.getManifestazioneDAO().getId_manifestazione());

        //chiave esterna auto
        partecipazioniDTO.setN_telaio(partecipazioniDAO.getAutoDAO().getN_telaio());

        return partecipazioniDTO;
    }

    private PartecipazioniDAO fromDTO(PartecipazioniDTO partecipazioniDTO) {

        PartecipazioniDAO partecipazioniDAO = new ModelMapper().map(partecipazioniDTO, PartecipazioniDAO.class);

        //SET fatti dal ModelMapper

        //Chiave esterna manifestazione
        ManifestazioneDAO manifestazioneDAO = new ManifestazioneDAO();
        manifestazioneDAO.setId_manifestazione(partecipazioniDTO.getId_manifestazione());
        partecipazioniDAO.setManifestazioneDAO(manifestazioneDAO);

        //chiave esterna auto
        AutoDAO autoDAO = new AutoDAO();
        autoDAO.setN_telaio(partecipazioniDTO.getN_telaio());
        partecipazioniDAO.setAutoDAO(autoDAO);

        return partecipazioniDAO;
    }
}
