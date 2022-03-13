package com.c0821g1.sprint1.controller;

import com.c0821g1.sprint1.entity.floor.Floors;
import com.c0821g1.sprint1.service.impl.FloorServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping(value = "/api/floors")
public class FloorsRestController {
    @Autowired
    FloorServiceImpl floorService;
    /**
     * Created: DuyNP
     * Method: return List floors
     * @param
     * @returnResponseEntity<>(floors, HttpStatus.OK)
     */
    @GetMapping("/list")
    public ResponseEntity<List<Floors>> findAllFloors() {
        List<Floors> floors = floorService.findAllFloors();
        if (floors.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(floors, HttpStatus.OK);
    }

    /**
     * Created: DuyNP
     * Method: return floors by id
     * @param id
     * @return ResponseEntity<>(floors, HttpStatus.OK);
     */
    @GetMapping("/find-by-id/{id}")
    public ResponseEntity<Floors> findFloorsById(@PathVariable Integer id) {
        Floors floors = floorService.findById(id);
        if (floors==null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(floors, HttpStatus.OK);
    }
    /**
     * Created: DuyNP
     * Method: delete flag floors by id
     * @param id
     * @return ResponseEntity<>(floors,HttpStatus.OK);
     */

    @DeleteMapping(value = "/delete-flag/{id}")
    public ResponseEntity<Floors> deleteFlagFloorsById(@PathVariable Integer id) {
        Floors floors = this.floorService.findById(id);
        if (floors==null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        floors.setFloorDeleteFlag(true);
        this.floorService.editFloors(floors);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
