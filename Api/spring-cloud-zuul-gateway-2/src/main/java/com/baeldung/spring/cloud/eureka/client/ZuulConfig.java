package com.baeldung.spring.cloud.eureka.client;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.baeldung.spring.cloud.eureka.client.auth.SimpleFilter;

@SpringBootApplication
@EnableZuulProxy
@EnableDiscoveryClient
@CrossOrigin
public class ZuulConfig {
    public static void main(String[] args) {
        SpringApplication.run(ZuulConfig.class, args);
    }
    
    @Bean
    public SimpleFilter simpleFilter() {
      return new SimpleFilter();
    }
}
