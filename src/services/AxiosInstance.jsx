    // api/axiosInstance.js
    import axios from 'axios';

    const instance = axios.create({
      baseURL: 'http://localhost:9090/api', // Replace with your backend's base URL
      headers: {
        'Content-Type': 'application/json'
      }
    });

    export default instance;