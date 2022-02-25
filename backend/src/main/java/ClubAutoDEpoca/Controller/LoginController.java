package ClubAutoDEpoca.Controller;


import ClubAutoDEpoca.DTO.LoginClientDTO;
import ClubAutoDEpoca.Service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ClubAutoDEpoca")
public class LoginController {

    @Autowired
    LoginService loginService;


    @PostMapping("/getByUsername")
    public ResponseEntity getByIdUsername(@RequestBody LoginClientDTO loginClientDTO) {
        return loginService.findByUsername(loginClientDTO);
    }



}

