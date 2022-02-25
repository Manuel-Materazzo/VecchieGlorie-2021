package ClubAutoDEpoca.Service;

import ClubAutoDEpoca.Config.BucketName;
import ClubAutoDEpoca.Domain.ImmaginiDAO;
import ClubAutoDEpoca.Repository.ImmaginiRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

import static org.apache.http.entity.ContentType.*;

@Service
@AllArgsConstructor
public class ImmaginiDAOServiceImpl implements ImmaginiDAOService {


    private final FileStoreService fileStore;
    private final ImmaginiRepository repository;

    @Override
    public ImmaginiDAO save(String title, String description, MultipartFile file) {

        /*if (file.isEmpty()) {
            throw new IllegalStateException("File vuoto");
        }
        if (!Arrays.asList(IMAGE_PNG.getMimeType(),
                IMAGE_BMP.getMimeType(),
                IMAGE_GIF.getMimeType(),
                IMAGE_JPEG.getMimeType()).contains(file.getContentType())) {
            throw new IllegalStateException("Il file non è un immagine");
        }
        Map<String, String> metadata = new HashMap<>();
        metadata.put("Content-Type", file.getContentType());
        metadata.put("Content-Length", String.valueOf(file.getSize()));
        String path = String.format("%s/%s", BucketName.TODO_IMAGE.getBucketName(), "Immagine auto");
        String fileName = String.format("%s", file.getOriginalFilename());
        try {
            fileStore.upload(path, fileName, Optional.of(metadata), file.getInputStream());
        } catch (IOException e) {
            throw new IllegalStateException("Upload Fallito", e);
        }
        ImmaginiDAO immaginiDAO = ImmaginiDAO.builder()
                .description(description)
                .title(title)
                .imagePath(path)
                .imageFileName(fileName)
                .build();*/

        ImmaginiDAO immaginiDAO = ImmaginiDAO.builder()
                .description("descrizione")
                .title("titolo")
                .imageFileName("")
                .imagePath("https://i.kym-cdn.com/photos/images/newsfeed/001/878/329/dfa.jpg")
                .build();

        return repository.save(immaginiDAO);
    }
}
