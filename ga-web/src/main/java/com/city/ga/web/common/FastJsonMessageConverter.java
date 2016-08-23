package com.city.ga.web.common;

import com.alibaba.fastjson.JSONObject;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.core.MessageProperties;
import org.springframework.amqp.support.converter.AbstractMessageConverter;
import org.springframework.amqp.support.converter.MessageConversionException;

import java.io.UnsupportedEncodingException;

public class FastJsonMessageConverter extends AbstractMessageConverter {
	public static final String DEFAULT_CHARSET = "UTF-8";
	private volatile String defaultCharset = DEFAULT_CHARSET;

	public FastJsonMessageConverter() {
		super();
	}

	public void setDefaultCharset(String defaultCharset) {
		this.defaultCharset = (defaultCharset != null) ? defaultCharset : DEFAULT_CHARSET;

	}

	public Object fromMessage(Message message) throws MessageConversionException {
		return null;
	}

	public Object fromMessage(Message message, Object t) {
		String json = "";
		try {
			json = new String(message.getBody(), defaultCharset);
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return JSONObject.parseObject(json, t.getClass());
	}

	protected Message createMessage(Object objectToConvert, MessageProperties messageProperties) throws MessageConversionException {
		byte[] bytes = null;
		try {
			String jsonString = JSONObject.toJSONString(objectToConvert);
			bytes = jsonString.getBytes(this.defaultCharset);
		} catch (UnsupportedEncodingException e) {
			throw new MessageConversionException("Failed to convert Message content", e);
		}
		messageProperties.setContentType(MessageProperties.CONTENT_TYPE_JSON);
		messageProperties.setContentEncoding(this.defaultCharset);
		if (bytes != null) {
			messageProperties.setContentLength(bytes.length);
		}
		return new Message(bytes, messageProperties);
	}
}