package com.city.ga.web;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(value = SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations =  {"classpath*:/spring/applicationContext.xml","classpath*:rabbitmq-product.xml"})
public class DirectQueueProduct {
    @Autowired
    private AmqpTemplate amqpTemplate;


    private static final String queue_yang = "queue_yang_key";
    private static final String queue_jin = "queue_jin_key";
    private static final String queue_jing = "queue_jing_key";


    @Test
    public void send(){
        amqpTemplate.convertAndSend(queue_yang, "44444445555");
    }


}