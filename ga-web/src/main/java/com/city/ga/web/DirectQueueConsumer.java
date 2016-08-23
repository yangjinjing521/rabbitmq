package com.city.ga.web;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(value = SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations =  {"classpath*:/spring/applicationContext.xml","classpath*:rabbitmq-consumer.xml"})
public class DirectQueueConsumer {

    @Test
    public void custom(){
        System.out.println("=========开启服务器========");
    }

}