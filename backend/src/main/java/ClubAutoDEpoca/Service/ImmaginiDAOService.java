package ClubAutoDEpoca.Service;

import ClubAutoDEpoca.Domain.ImmaginiDAO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ImmaginiDAOService {
    ImmaginiDAO save(String title, String description, MultipartFile file);

}
