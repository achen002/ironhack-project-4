import axios from 'axios';

const baseURL = process.env.REACT_APP_SERVER_POINT;

const service = axios.create({
  baseURL,
  withCredentials: true
});

const WEIGHT_SERVICE = {
  createWeight(userId, weightData) {
    return service.post(`/weight/${userId}`, weightData);
  },
  update(id, weightData) {
    return service.post(`/weight/${id}/update`, weightData);
  },
  delete(id) {
    return service.post(`/weight/${id}/delete`, {});
  },
  getDetails(id) {
    return service.get(`/weight/${id}`);
  },
  getAllWeights(id) {
    return service.get(`/weights/${id}`)
  }
};

export default WEIGHT_SERVICE;
