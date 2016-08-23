package com.city.ga.service.impl;

import com.city.ga.dao.RabbitMapper;
import com.city.ga.model.Rabbit;
import com.city.ga.service.RabbitService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * Created by apple on 16/7/21.
 */
@Service
public class RabbitServiceImpl implements RabbitService {

    @Resource
    private RabbitMapper rabbitMapper;

    @Override
    public void save(Rabbit rabbit) {
        rabbitMapper.save(rabbit);
    }
}
