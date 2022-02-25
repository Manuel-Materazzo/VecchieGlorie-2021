package ClubAutoDEpoca.Service;

import ClubAutoDEpoca.Domain.AutoDAO;
import ClubAutoDEpoca.Domain.PartecipazioniDAO;
import ClubAutoDEpoca.Domain.PersonaDAO;
import ClubAutoDEpoca.DTO.AutoDTO;
import ClubAutoDEpoca.DTO.PartecipazioniDTO;
import ClubAutoDEpoca.Domain.ImmaginiDAO;
import ClubAutoDEpoca.Repository.AutoRepository;
import ClubAutoDEpoca.Repository.PartecipazioniRepository;
import ClubAutoDEpoca.Repository.PersonaRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AutoService {

    @Autowired
    AutoRepository autoRepository;

    @Autowired
    PersonaRepository personaRepository;

    @Autowired
    PartecipazioniRepository partecipazioniRepository;

    @Autowired
    private ImmaginiDAOServiceImpl immaginiDAOServiceImpl;

    public ResponseEntity findAll() {

        try{
            List<AutoDAO> findAll = autoRepository.findAll();
            List<AutoDTO> ris = new ArrayList<AutoDTO>();

            for (AutoDAO dao : findAll) {
                ris.add(toDTO(dao));
            }

            return ResponseEntity.status(HttpStatus.OK).body(ris);
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(e);
        }
    }

    public ResponseEntity findById(String n_telaio) {
        try{
            Optional<AutoDAO> autoDAO = autoRepository.findById(n_telaio);
            if(autoDAO.isPresent()){
                return ResponseEntity.status(HttpStatus.OK).body(toDTO(autoDAO.get()));
            }else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("");
            }
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(e);
        }
    }

    public ResponseEntity deleteId(String n_telaio) {
        try{

            AutoDAO autoDAO = autoRepository.findById(n_telaio).get();
            PersonaDAO personaDAO = personaRepository.findById(autoDAO.getPersonaDAO().getIdPersona()).get();
            if(personaDAO.getAutoDAOset().size() < 2){
                deletePersonaId(personaDAO.getIdPersona());
            }else{
                autoRepository.deleteById(n_telaio);
            }

            return ResponseEntity.status(HttpStatus.OK).body("");
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(e);
        }
    }

    public ResponseEntity deletePersonaId (Integer idPersona) {
        try{

            //Elimino prima le partecipazioni
            List<PartecipazioniDAO> partecipazioniDAOset = partecipazioniRepository.findAll();

            for(PartecipazioniDAO partecipazioniDAO: partecipazioniDAOset){

                PersonaDAO personaDAO = personaRepository.findById(idPersona).get();

                for(AutoDAO autoDAO: personaDAO.getAutoDAOset()){
                    if(autoDAO.getPartecipazioniDAO() == null){
                        break;
                    }else if(partecipazioniDAO.getAutoDAO().getN_telaio() == autoDAO.getN_telaio()){
                        partecipazioniRepository.deleteById(partecipazioniDAO.getId_partecipazione());
                    }
                }
            }

            personaRepository.deleteById(idPersona);
            return ResponseEntity.status(HttpStatus.OK).body("");
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(e);
        }
    }

    public ResponseEntity deleteAllById(String[] listaId) {
        try{
            for (String id : listaId) {
                AutoDAO autoDAO = autoRepository.findById(id).get();
                PersonaDAO personaDAO = personaRepository.findById(autoDAO.getPersonaDAO().getIdPersona()).get();
                if(personaDAO.getAutoDAOset().size() < 2){
                    deletePersonaId(personaDAO.getIdPersona());
                }else{
                    autoRepository.deleteById(id);
                }
            }
            return ResponseEntity.status(HttpStatus.OK).body("");
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(e);
        }
    }

    public ResponseEntity save(AutoDTO autoDTO, MultipartFile file) {
        try{

            ImmaginiDAO img = immaginiDAOServiceImpl.save(autoDTO.getN_telaio(), "immagine auto", file);
            String url = (img.getImagePath() + "/" + img.getImageFileName());

            AutoDAO autoDAO = fromDTO(autoDTO, url);
            autoRepository.save(autoDAO);
            return ResponseEntity.status(HttpStatus.OK).body("");
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(e);
        }

    }

    public ResponseEntity update(AutoDTO autoDTO) {
        try{

            AutoDAO autoDAO = fromDTO(autoDTO, autoDTO.getFoto());
            autoRepository.save(autoDAO);
            return ResponseEntity.status(HttpStatus.OK).body("");
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(e);
        }
    }

    private AutoDTO toDTO(AutoDAO autoDAO) {
        AutoDTO autoDTO = new ModelMapper().map(autoDAO, AutoDTO.class);

        //SET fatti dal ModelMapper
        autoDTO.setIdPersona(autoDAO.getPersonaDAO().getIdPersona());

        //Chiave esterna persona
        autoDTO.setIdPersona(autoDAO.getPersonaDAO().getIdPersona());

        autoDTO.setFoto("https://s3.eu-west-3.amazonaws.com/" + autoDAO.getFoto());

        //Ciave esterna partecipazioni
        if (autoDAO.getPartecipazioniDAO() != null) {
            List<PartecipazioniDTO> lista = new ArrayList<PartecipazioniDTO>();
            for (PartecipazioniDAO prtDAO : autoDAO.getPartecipazioniDAO()) {
                PartecipazioniDTO partecipazioniDTO = new PartecipazioniDTO();
                partecipazioniDTO.setId_partecipazione(prtDAO.getId_partecipazione());
            }
            autoDTO.setPartecipazioniDTO(lista);
        }

        return autoDTO;
    }

    private AutoDAO fromDTO(AutoDTO autoDTO, String url) {
        AutoDAO autoDAO = new ModelMapper().map(autoDTO, AutoDAO.class);

        //SET fatti dal ModelMapper
        autoDAO.setFoto(url);

        //Chiave esterna persona
        PersonaDAO personaDAO = new PersonaDAO();
        personaDAO.setIdPersona(autoDTO.getIdPersona());
        autoDAO.setPersonaDAO(personaDAO);

        //Ciave esterna partecipazioni
        if (autoDTO.getPartecipazioniDTO() != null) {
            List<PartecipazioniDAO> lista = new ArrayList<PartecipazioniDAO>();
            for (PartecipazioniDTO prtDTO : autoDTO.getPartecipazioniDTO()) {
                PartecipazioniDAO partecipazioniDAO = new PartecipazioniDAO();
                partecipazioniDAO.setId_partecipazione(prtDTO.getId_partecipazione());
            }
            autoDAO.setPartecipazioniDAO(lista);
        }

        return autoDAO;
    }

}
