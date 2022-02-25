package ClubAutoDEpoca.DTO;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

//per la conversione dei RequestParam da Stringa ad AutoDTO
@Component
public class StringToAutoConverter implements Converter<String, AutoDTO> {

    @Autowired
    private ObjectMapper objectMapper;

    @Override
    @SneakyThrows
    public AutoDTO convert(String source) {
        return objectMapper.readValue(source, AutoDTO.class);
    }
}