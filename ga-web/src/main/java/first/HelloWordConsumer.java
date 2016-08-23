package first;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.QueueingConsumer;

/**
 * Created by apple on 16/8/14.
 */
public class HelloWordConsumer {
    private final static String QUEUE_NAME = "hello";

    public static void main(String[] argv) throws Exception {
        int hashCode = HelloWordConsumer.class.hashCode();
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("172.168.83.201");
        factory.setUsername("yangjinjing");
        factory.setPassword("yangjinjing");
        factory.setPort(5672);
        Connection connection = factory.newConnection();
        Channel channel = connection.createChannel();

        channel.queueDeclare(QUEUE_NAME, false, false, false, null);

        QueueingConsumer consumer = new QueueingConsumer(channel);
        boolean ack = false;//打开应答机制
        channel.basicConsume(QUEUE_NAME, ack, consumer);

        while (true) {
            QueueingConsumer.Delivery delivery = consumer.nextDelivery();
            String message = new String(delivery.getBody());
            System.out.println(hashCode + " [x] Received '" + message + "'");
            doWork(message);
            System.out.println(hashCode + " [x] Done");
            //消息确认
            channel.basicAck(delivery.getEnvelope().getDeliveryTag(), false);
        }
    }


    /**
     * 每个点耗时1s
     * @param task
     * @throws InterruptedException
     */
    private static void doWork(String task) throws InterruptedException
    {
        for (char ch : task.toCharArray())
        {
            if (ch == '.')
                Thread.sleep(1000);
        }
    }
}
