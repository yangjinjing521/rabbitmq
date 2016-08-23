package first;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;

import java.io.IOException;

public class HelloWordProduct {
    private final static String QUEUE_NAME = "hello";

    public static void main(String[] args) throws IOException {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("172.168.83.201");
        factory.setUsername("yangjinjing");
        factory.setPassword("yangjinjing");
        factory.setPort(5672);
        Connection connection = factory.newConnection();
        Channel channel = connection.createChannel();
        channel.queueDeclare(QUEUE_NAME, false, false, false, null);
        for (int i = 0; i < 10; i++)
        {
            String dots = "";
            for (int j = 0; j <= i; j++)
            {
                dots += ".";
            }
            String message = "helloworld" + dots+dots.length();
            channel.basicPublish("", QUEUE_NAME, null, message.getBytes());
            //声明数据持久化
            //channel.basicPublish("", QUEUE_NAME, MessageProperties.PERSISTENT_TEXT_PLAIN,message.getBytes());
            System.out.println(" [x] Sent '" + message + "'");
        }
        channel.close();
        connection.close();
    }
}
