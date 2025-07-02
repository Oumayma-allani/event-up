package com.billcom.eventup.controller;
import com.billcom.eventup.entity.Categorie;
import com.billcom.eventup.repository.CategorieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/categories")
//@CrossOrigin("*")
public class CategorieController {
    @Autowired
    private CategorieRepository categorieRepository;

    @GetMapping
    public List<Categorie> getAllCategories() {
        return categorieRepository.findAll();
    }

    @PostMapping
    public Categorie createCategorie(@RequestBody Categorie categorie) {
        return categorieRepository.save(categorie);
    }

    @GetMapping("/{id}")
    public Categorie getCategorieById(@PathVariable Long id) {
        return categorieRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public Categorie updateCategorie(@PathVariable Long id, @RequestBody Categorie updatedCategorie) {
        Categorie categorie = categorieRepository.findById(id).orElse(null);
        if (categorie != null) {
            categorie.setName(updatedCategorie.getName());
            return categorieRepository.save(categorie);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void deleteCategorie(@PathVariable Long id) {
        categorieRepository.deleteById(id);
    }
}
