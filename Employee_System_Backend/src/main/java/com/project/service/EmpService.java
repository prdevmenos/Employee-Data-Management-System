package com.project.service;

import java.util.List;

import com.project.model.Emp;

public interface EmpService {
	
	public Emp createEmp(Emp emp);
	
	public List<Emp> getAllEmp();
	
	public Emp getEmptyById(int id);
	
	public void deleteEmp(int id);
	
	public Emp updateEmp(int id, Emp emp);
}
