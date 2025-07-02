package com.billcom.eventup.controller;
import com.billcom.eventup.entity.Local;
import com.billcom.eventup.repository.LocalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/locals")
//@CrossOrigin("*")
public class LocalController {
    @Autowired
    private LocalRepository localRepository;

    @GetMapping
    public List<Local> getAllLocals() {
        return localRepository.findAll();
    }

    @PostMapping
    public Local createLocal(@RequestBody Local local) {
        return localRepository.save(local);
    }

    @GetMapping("/{id}")
    public Local getLocalById(@PathVariable Long id) {
        return localRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public Local updateLocal(@PathVariable Long id, @RequestBody Local updatedLocal) {
        Local local = localRepository.findById(id).orElse(null);
        if (local != null) {
            local.setName(updatedLocal.getName());
            local.setAddress(updatedLocal.getAddress());
            local.setCapacity(updatedLocal.getCapacity());
            local.setType(updatedLocal.getType());
            return localRepository.save(local);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void deleteLocal(@PathVariable Long id) {
        localRepository.deleteById(id);
    }
}
