package ClubAutoDEpoca.Repository;

import ClubAutoDEpoca.Domain.ImmaginiDAO;
import org.springframework.data.repository.CrudRepository;

public interface ImmaginiRepository extends CrudRepository<ImmaginiDAO, Long> {
    ImmaginiDAO findByTitle(String title);
}