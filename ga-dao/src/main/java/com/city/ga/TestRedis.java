package com.city.ga;

import org.junit.Test;
import redis.clients.jedis.Jedis;

import java.util.Set;

/**
 * Created by apple on 15/12/7.
 */
public class TestRedis {

    @Test
    public void testJedis() throws InterruptedException {

        Jedis jedis = new Jedis("10.11.100.152", 6379);

        // String测试
        System.out.println(jedis.get("foo")); // 首次获取，redis中还没有，返回null

        jedis.set("foo", "bar", "NX", "EX", 1);// 添加缓存项foo，过期时间为1s，只有该项原来不存在时，才添加

        System.out.println(jedis.get("foo"));// bar

        Thread.sleep(1000);// 暂停1s

        System.out.println(jedis.get("foo"));// 已过期，返回null



        Set<String> keys= jedis.keys("*");
        for (String k : keys) {
            System.out.println(k);
        }
        jedis.close();
    }
}
