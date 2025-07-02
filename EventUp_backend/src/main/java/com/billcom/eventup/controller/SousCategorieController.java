package com.billcom.eventup.controller;
import com.billcom.eventup.entity.SousCategorie;
import com.billcom.eventup.repository.SousCategorieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sousCategories")
//@CrossOrigin(origins = "*")
public class SousCategorieController {
    @Autowired
    private SousCategorieRepository sousCategorieRepository;

    @GetMapping
    public List<SousCategorie> getAllSousCategories() {
        return sousCategorieRepository.findAll();
    }

    @PostMapping
    public SousCategorie createSousCategorie(@RequestBody SousCategorie sousCategorie) {
        return sousCategorieRepository.save(sousCategorie);
    }

    @GetMapping("/{id}")
    public SousCategorie getSousCategorieById(@PathVariable Long id) {
        return sousCategorieRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public SousCategorie updateSousCategorie(@PathVariable Long id, @RequestBody SousCategorie updatedSousCategorie) {
        SousCategorie sc = sousCategorieRepository.findById(id).orElse(null);
        if (sc != null) {
            sc.setName(updatedSousCategorie.getName());
            sc.setCategorie(updatedSousCategorie.getCategorie());
            return sousCategorieRepository.save(sc);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void deleteSousCategorie(@PathVariable Long id) {
        sousCategorieRepository.deleteById(id);
    }
}
