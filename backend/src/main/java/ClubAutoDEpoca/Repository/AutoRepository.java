package ClubAutoDEpoca.Repository;

/*
il repository è un meccanismo per incapsulare il comportamento di archiviazione, recupero e ricerca,
che emula una raccolta di oggetti. Un repository gestisce anche i dati e nasconde query simili a DAO.(Si trova ad un lvl superiore al DAO)
 */
import ClubAutoDEpoca.Domain.AutoDAO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

//preparato i dati da un oggetto di dominio e inviati a un sistema di archiviazione utilizzando un DAO per la persistenza
@Repository
public interface AutoRepository extends JpaRepository<AutoDAO, String> {//

}

