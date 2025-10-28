package com.carrental.reservation_service.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {

  @Bean
  public WebClient.Builder webClientBuilder() {
    return WebClient.builder();
  }

  @Bean
  public WebClient userServiceWebClient(WebClient.Builder webClientBuilder) {
    return webClientBuilder.baseUrl("http://localhost:8083").build();
  }
}
