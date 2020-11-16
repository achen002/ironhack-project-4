import axios from 'axios';

const baseURL = process.env.REACT_APP_SERVER_POINT;

const service = axios.create({
  baseURL,
  withCredentials: true
});

const DEADLIFT_SERVICE = {
  createRecord(Id,PRData) {
    return service.post(`/deadliftrecord/${Id}`, PRData);
  },
  update(id, PRData) {
    return service.post(`/deadliftrecord/${id}/update`, PRData);
  },
  getDetails(id) {
    return service.get(`/deadliftrecord/${id}`);
  },
  getAll(id) {
    return service.get(`/deadliftrecords/${id}`);
  }
};

export default DEADLIFT_SERVICE;
