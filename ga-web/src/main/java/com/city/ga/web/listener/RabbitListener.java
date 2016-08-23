package com.city.ga.web.listener;

import com.city.ga.model.Rabbit;
import com.city.ga.service.impl.RabbitServiceImpl;
import org.apache.log4j.Logger;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.core.MessageListener;
import org.springframework.beans.factory.DisposableBean;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * Created by apple on 16/7/14.
 */
public class RabbitListener implements MessageListener, DisposableBean {
    private Logger logger = Logger.getLogger(RabbitListener.class);
    private ExecutorService pool = Executors.newFixedThreadPool(20);

   private RabbitServiceImpl rabbitServiceImpl;

    public void setRabbitServiceImpl(RabbitServiceImpl rabbitServiceImpl) {
        this.rabbitServiceImpl = rabbitServiceImpl;
    }

    @Override
    public void destroy() throws Exception {
        if (!pool.isShutdown()) {
            pool.shutdown();
        }
        logger.info("RabbitMqTestListener消息处理池已关闭!");
    }

    public void onMessage(Message message) {
        String json = new String(message.getBody());
        logger.info("数据:"+json);
        System.out.print("====");
        if (json != null) {
            System.out.print("----");
            pool.execute(new Runnable() {
                @Override
                public void run() {
                    handle(json);
                }
            });
        }
    }

    private void handle(String map) {
        logger.info("mq插入数据:"+map);
        try {
            Rabbit rabbit = new Rabbit();
            rabbit.setContent(map);
            rabbitServiceImpl.save(rabbit);
        } catch (Exception e) {
            e.printStackTrace();
            logger.error("插入数据出错了",e);
        }
    }
}
