package ClubAutoDEpoca.Repository;


import ClubAutoDEpoca.Domain.LoginDAO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LoginRepository extends JpaRepository<LoginDAO, Integer> {//

    List<LoginDAO> findByUsername(String username);
}
