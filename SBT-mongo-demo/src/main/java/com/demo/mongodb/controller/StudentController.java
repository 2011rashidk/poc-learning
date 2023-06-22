package com.demo.mongodb.controller;

import com.demo.mongodb.dto.StudentDTO;
import com.demo.mongodb.entity.StudentEntity;
import com.demo.mongodb.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/university/student")
public class StudentController {

    @Autowired
    StudentService studentService;

    @PostMapping("add")
    public StudentEntity addRecord(@RequestBody StudentDTO studentDTO) {
        return studentService.addRecord(studentDTO);
    }

    @GetMapping("getStudents")
    public List<StudentEntity> getAllRecord() {
        return studentService.getAllRecord();
    }

    @GetMapping("getStudentById")
    public Optional<StudentEntity> getRecord(@RequestParam Integer id){
        return studentService.getRecord(id);
    }
}
