package com.sanosysalvos.geo.repository;

import com.sanosysalvos.geo.model.Ubicacion;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Repository
public class UbicacionRepository {

    private static final String KEY = "UBICACIONES";
    private final RedisTemplate<String, Object> redisTemplate;

    public UbicacionRepository(RedisTemplate<String, Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public List<Ubicacion> findAll() {
        Map<Object, Object> entries = redisTemplate.opsForHash().entries(KEY);
        List<Ubicacion> lista = new ArrayList<>();
        for (Object value : entries.values()) {
            lista.add((Ubicacion) value);
        }
        return lista;
    }

    public Ubicacion save(Ubicacion ubicacion) {
        if (ubicacion.getId() == null) {
            ubicacion.setId(System.currentTimeMillis()); // ID temporal autogenerado
        }
        redisTemplate.opsForHash().put(KEY, ubicacion.getId().toString(), ubicacion);
        return ubicacion;
    }
}