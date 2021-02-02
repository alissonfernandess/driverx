import axios from 'axios';

const graph = axios.create({
  baseURL: 'https://graph.facebook.com/v9.0',
});

export default graph;
