package com.c0821g1.sprint1.repository;


import com.c0821g1.sprint1.entity.floor.Floors;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FloorsRepository extends JpaRepository<Floors,Integer> {
    /**
     * created: Duy NP
     * method get list floors
     * @return List<Floors>
     */
    @Query(value = "select * \n" +
            "from floors\n" +
            "where floor_delete_flag = 0;",nativeQuery = true)
    List<Floors> findAllFloors();
}
