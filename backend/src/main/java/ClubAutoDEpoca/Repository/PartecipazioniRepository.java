package ClubAutoDEpoca.Repository;

import ClubAutoDEpoca.Domain.ManifestazioneDAO;
import ClubAutoDEpoca.Domain.PartecipazioniDAO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PartecipazioniRepository extends JpaRepository<PartecipazioniDAO, Integer> {//

    List<PartecipazioniDAO> findByManifestazioneDAOLike(ManifestazioneDAO manifestazioneDAO);

}
