package ClubAutoDEpoca.Repository;

import ClubAutoDEpoca.Domain.TesseraDAO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TesseraRepository extends JpaRepository<TesseraDAO, Integer> {//

    Optional<TesseraDAO> findTesseraDAOByPersonaDAO_IdPersona(int idPersona);

}
