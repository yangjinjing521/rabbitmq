package secend;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.QueueingConsumer;

public class Work
{
    // 队列名称
    private final static String QUEUE_NAME = "test";

    public static void main(String[] argv) throws java.io.IOException,
            java.lang.InterruptedException
    {
        // 区分不同工作进程的输出
        int hashCode = Work.class.hashCode();
        // 创建连接和频道
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("172.168.83.201");
        factory.setUsername("yangjinjing");
        factory.setPassword("yangjinjing");
        factory.setPort(5672);
        Connection connection = factory.newConnection();
        Channel channel = connection.createChannel();
        // 声明队列
        boolean durable = true;
        channel.queueDeclare(QUEUE_NAME, durable, false, false, null);
        System.out.println(hashCode
                + " [*] Waiting for messages. To exit press CTRL+C");
        //设置最大服务转发消息数量
        int prefetchCount = 3;
        channel.basicQos(prefetchCount);
        QueueingConsumer consumer = new QueueingConsumer(channel);
        // 指定消费队列
        boolean ack = false; // 打开应答机制
        channel.basicConsume(QUEUE_NAME, ack, consumer);
        while (true)
        {
            QueueingConsumer.Delivery delivery = consumer.nextDelivery();
            String message = new String(delivery.getBody());

            System.out.println(hashCode + " [x] Received '" + message + "'");
            doWork(message);
            System.out.println(hashCode + " [x] Done");
            //channel.basicAck(delivery.getEnvelope().getDeliveryTag(), false);
            channel.basicAck(delivery.getEnvelope().getDeliveryTag(), false);

        }

    }

    /**
     * 每个点耗时1s
     *
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
