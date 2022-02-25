package ClubAutoDEpoca.Service;


import ClubAutoDEpoca.Domain.LoginDAO;
import ClubAutoDEpoca.DTO.LoginClientDTO;
import ClubAutoDEpoca.DTO.LoginDTO;
import ClubAutoDEpoca.Repository.LoginRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LoginService {//

    @Autowired
    LoginRepository loginRepository;


    public ResponseEntity findByUsername(LoginClientDTO loginClientDTO) {
        ResponseEntity ris = ResponseEntity.status(HttpStatus.FORBIDDEN).body("Password o username errate");
        List<LoginDAO> lista = loginRepository.findByUsername(loginClientDTO.getUsername());
        System.out.println("********** Tentativo di login **********");
        System.out.println("Username: " + loginClientDTO.getUsername());
        System.out.println("Password: " + loginClientDTO.getPassword());
        for(LoginDAO loginDAO: lista){
            if(loginDAO.getPassword().equals(loginClientDTO.getPassword()) && loginDAO.getUsername().equals(loginClientDTO.getUsername())){
                System.out.println("Esito: Successo!");
                ris = ResponseEntity.status(HttpStatus.OK).body(toDTO(loginDAO));
            }else{
                System.out.println("Esito: Fallito.");
            }
        }
        System.out.println("****************************************");
        return ris;
    }

    private LoginDTO toDTO(LoginDAO loginDAO) {
        LoginDTO loginDTO = new ModelMapper().map(loginDAO, LoginDTO.class);

        loginDTO.setId(loginDAO.getId());
        loginDTO.setUsername(loginDAO.getUsername());

        return loginDTO;
    }
}
