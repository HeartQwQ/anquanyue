const axios = require('axios');

exports.handler = async (event, context) => {
  try {
    const response = await axios.get('http://122.152.233.35:8000/login');
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};