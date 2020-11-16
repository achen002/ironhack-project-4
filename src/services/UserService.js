import axios from 'axios';

const baseURL = process.env.REACT_APP_SERVER_POINT;

const service = axios.create({
  baseURL,
  withCredentials: true
});

const USER_SERVICE = {
  update(id, userData) {
    return service.post(`/user/${id}/update`, userData);
  },
  delete(id) {
    return service.post(`/user/${id}/delete`, {});
  },
  getDetails(id) {
    return service.get(`/user/${id}`);
  }
};

export default USER_SERVICE;
