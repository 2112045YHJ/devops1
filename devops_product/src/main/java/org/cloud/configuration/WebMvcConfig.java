package org.cloud.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer{
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		String projectPath = System.getProperty("user.dir");
		String uploadPath = "file:///" + projectPath + "/src/main/resources/static/uploads/";
		
		registry.addResourceHandler("/uploads/**").addResourceLocations(uploadPath).setCachePeriod(3600);
	}
}
