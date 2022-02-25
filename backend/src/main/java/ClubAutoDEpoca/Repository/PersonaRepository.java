package ClubAutoDEpoca.Repository;

import ClubAutoDEpoca.Domain.PersonaDAO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonaRepository extends JpaRepository<PersonaDAO, Integer> {//

    //List<PersonaDAO> groupByTesseraDAO_Id_tessera(Integer id_tessera);
    //PersonaDAO findByAutoDAOset_AutoDAO_N_telaio(String n_telaio);
}
