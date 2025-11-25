package com.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.model.Emp;

public interface EmpRepository extends JpaRepository<Emp, Integer>{

}
