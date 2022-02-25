package ClubAutoDEpoca;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan({"ClubAutoDEpoca", "ClubAutoDEpoca.ModelMapper"})
public class ClubAutoDEpocaApplication {

    public static void main(String[] args) {

        SpringApplication.run(ClubAutoDEpocaApplication.class, args);
    }
}
