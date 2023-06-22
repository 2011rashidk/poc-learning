package com.hm.dockerdemo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DockerDemoController {

    @GetMapping("docker-demo")
    public String get() {
        return "This is a demo project for Docker";
    }
}