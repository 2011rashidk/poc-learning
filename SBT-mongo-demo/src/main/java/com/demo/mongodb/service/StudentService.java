package com.demo.mongodb.service;

import com.demo.mongodb.dto.StudentDTO;
import com.demo.mongodb.entity.StudentEntity;
import com.demo.mongodb.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    @Autowired
    StudentRepository studentRepository;

    public StudentEntity addRecord(StudentDTO studentDTO) {
        StudentEntity studentEntity = new StudentEntity();
        studentEntity.setId(studentDTO.getId());
        studentEntity.setName(studentDTO.getName());
        studentEntity.setMobile(studentDTO.getMobile());
        return studentRepository.save(studentEntity);
    }

    public List<StudentEntity> getAllRecord() {
        return studentRepository.findAll();
    }

    public Optional<StudentEntity> getRecord(Integer id) {
        return studentRepository.findById(id);
    }
}
