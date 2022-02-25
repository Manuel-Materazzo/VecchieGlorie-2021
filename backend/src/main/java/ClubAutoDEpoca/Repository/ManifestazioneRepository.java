package ClubAutoDEpoca.Repository;

import ClubAutoDEpoca.Domain.ManifestazioneDAO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ManifestazioneRepository extends JpaRepository<ManifestazioneDAO, Integer> {//

}
