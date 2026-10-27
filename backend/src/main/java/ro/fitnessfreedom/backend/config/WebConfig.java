package ro.fitnessfreedom.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import ro.fitnessfreedom.backend.admin.AdminApiKeyInterceptor;

@Configuration
class WebConfig implements WebMvcConfigurer {

    private final AppProperties properties;

    WebConfig(AppProperties properties) {
        this.properties = properties;
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/submissions")
                .allowedOrigins(properties.cors().allowedOrigins().toArray(String[]::new))
                .allowedMethods("POST");
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new AdminApiKeyInterceptor(properties.admin().apiKey()))
                .addPathPatterns("/api/admin/**");
    }
}
