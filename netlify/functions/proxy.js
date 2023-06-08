const axios = require('axios');

exports.handler = async (event, context) => {
  try {
    // 获取请求的路径和查询参数
    const path = event.path;
    const queryStringParameters = event.queryStringParameters;

    // 将请求转发到目标URL
    const response = await axios.get(`http://122.152.233.35:8000${path}`, {
      params: queryStringParameters,
    });

    // 将响应返回给Netlify网站
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    // 如果请求失败，则返回错误响应
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        error: error.message,
      }),
    };
  }
};