import axios from 'axios';

const baseURL = process.env.REACT_APP_SERVER_POINT;

const service = axios.create({
  baseURL,
  withCredentials: true
});

const BENCHPRESS_SERVICE = {
  createRecord(Id,PRData) {
    return service.post(`/benchpressrecord/${Id}`, PRData);
  },
  update(id, PRData) {
    return service.post(`/benchpressrecord/${id}/update`, PRData);
  },
  getDetails(id) {
    return service.get(`/benchpressrecord/${id}`);
  },
  getAll(id) {
    return service.get(`/benchpressrecords/${id}`);
  }
};

export default BENCHPRESS_SERVICE;
