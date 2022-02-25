package ClubAutoDEpoca.Service;

import ClubAutoDEpoca.Domain.AutoDAO;
import ClubAutoDEpoca.Domain.PartecipazioniDAO;
import ClubAutoDEpoca.Domain.PersonaDAO;
import ClubAutoDEpoca.Domain.TesseraDAO;
import ClubAutoDEpoca.DTO.AutoDTO;
import ClubAutoDEpoca.DTO.PersonaDTO;
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
public class PersonaService {

    @Autowired
    PersonaRepository personaRepository;

    @Autowired
    AutoRepository autoRepository;

    @Autowired
    PartecipazioniRepository partecipazioniRepository;

    @Autowired
    ImmaginiDAOServiceImpl immaginiDAOServiceImpl;

    public ResponseEntity findAll() {
        try{
            List<PersonaDAO> findAll = personaRepository.findAll();
            List<PersonaDTO> ris = new ArrayList<PersonaDTO>();

            for (PersonaDAO dao : findAll) {
                ris.add(toDTO(dao));
            }
            return ResponseEntity.status(HttpStatus.OK).body(ris);
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(e);
        }
    }

    public ResponseEntity groupByTesseraDAO_Id_tessera() {
        try{
            //TODO
            return ResponseEntity.status(HttpStatus.OK).body("");
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(e);
        }
    }

    public ResponseEntity findById(Integer idPersona) {
        try{
            Optional<PersonaDAO> personaDAO = personaRepository.findById(idPersona);
            if(personaDAO.isPresent()){
                return ResponseEntity.status(HttpStatus.OK).body(toDTO(personaDAO.get()));
            }else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("");
            }
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(e);
        }
    }

    public ResponseEntity deleteId (Integer idPersona) {
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

    public void deletePartecipazioniCollegate(Integer id_partecipazioni){
        partecipazioniRepository.deleteById(id_partecipazioni);
    }

    public ResponseEntity deleteById(Integer[] listaId) {
        try{
            for (Integer id : listaId) {

                //Elimino prima le partecipazioni
                List<PartecipazioniDAO> partecipazioniDAOset = partecipazioniRepository.findAll();

                for(PartecipazioniDAO partecipazioniDAO: partecipazioniDAOset){

                    PersonaDAO personaDAO = personaRepository.findById(id).get();

                    for(AutoDAO autoDAO: personaDAO.getAutoDAOset()){
                        if(autoDAO.getPartecipazioniDAO() == null){
                            break;
                        }else if(partecipazioniDAO.getAutoDAO().getN_telaio() == autoDAO.getN_telaio()){
                            partecipazioniRepository.deleteById(partecipazioniDAO.getId_partecipazione());
                        }
                    }
                }

                personaRepository.deleteById(id);
            }
            return ResponseEntity.status(HttpStatus.OK).body("");
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(e);
        }
    }


    public ResponseEntity save(PersonaDTO personaDTO, MultipartFile file) {
        try {

            ImmaginiDAO img = immaginiDAOServiceImpl.save("Prima auto proprietario: " + personaDTO.getCod_fiscale(),
                    "Immagine auto", file);
            String url = (img.getImagePath() + "/" + img.getImageFileName());

            PersonaDAO personaDAO = fromDTO(personaDTO, url);
            personaRepository.save(personaDAO);
            return ResponseEntity.status(HttpStatus.OK).body("");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(e);
        }
    }

    public ResponseEntity update(PersonaDTO personaDTO) {
        try {
            String url = null;
            PersonaDAO personaDAO = fromDTO(personaDTO, url);
            personaRepository.save(personaDAO);
            return ResponseEntity.status(HttpStatus.OK).body("");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(e);
        }
    }

    private PersonaDTO toDTO(PersonaDAO personaDAO) {
        PersonaDTO personaDTO = new ModelMapper().map(personaDAO, PersonaDTO.class);

        //SET fatti dal ModelMapper

        //chiave esterna tessera
        if(personaDAO.getTesseraDAO() != null){
            personaDTO.setId_tessera(personaDAO.getTesseraDAO().getId_tessera());
        }

        return personaDTO;
    }

    public PersonaDAO fromDTO(PersonaDTO personaDTO, String url) {

        PersonaDAO personaDAO = new ModelMapper().map(personaDTO, PersonaDAO.class);

        //SET fatti dal ModelMapper

        //Chiave esterna tessera
        if((personaDTO.getTesseraDTO() != null) && personaDTO.getTesseraDTO().getInizio_abbonamento() != null){

            TesseraDAO tesseraDAO = new TesseraDAO();

            tesseraDAO.setInizio_abbonamento(personaDTO.getTesseraDTO().getInizio_abbonamento());
            tesseraDAO.setData_creazione(personaDTO.getTesseraDTO().getData_creazione());

            tesseraDAO.setPersonaDAO(personaDAO);

            personaDAO.setTesseraDAO(tesseraDAO);
        }

        //chiave esterna auto
        if(personaDTO.getAutoDTOset() != null){

            List<AutoDAO> lista = new ArrayList<AutoDAO>();
            for(AutoDTO auDTO: personaDTO.getAutoDTOset())
            {
                AutoDAO autoDAO = new ModelMapper().map(auDTO, AutoDAO.class);

                //SET fatti dal ModelMapper

                autoDAO.setFoto(url);

                autoDAO.setPersonaDAO(personaDAO);

                lista.add(autoDAO);
            }
            personaDAO.setAutoDAOset(lista);
        }

        return personaDAO;
    }

}
