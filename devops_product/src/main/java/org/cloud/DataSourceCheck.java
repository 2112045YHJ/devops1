package org.cloud; // 본인의 패키지 경로에 맞게 확인해 주세요.

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import javax.sql.DataSource;

@Component
public class DataSourceCheck implements CommandLineRunner {

    private final DataSource dataSource;

    public DataSourceCheck(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @Override
    public void run(String... args) throws Exception {
        System.out.println("\n=========================================");
        System.out.println("현재 사용 중인 DataSource: " + dataSource.getClass().getName());
        System.out.println("=========================================\n");
    }
}