import axios from 'axios';

const baseURL = process.env.REACT_APP_SERVER_POINT;

const service = axios.create({
  baseURL,
  withCredentials: true
});

const SQUATRECORD_SERVICE = {
  createRecord(Id,PRData) {
    return service.post(`/squatrecord/${Id}`, PRData);
  },
  update(id, PRData) {
    return service.post(`/squatrecord/${id}/update`, PRData);
  },
  getDetails(id) {
    return service.get(`/squatrecord/${id}`);
  },
  getAll(id) {
    return service.get(`/squatrecords/${id}`);
  }
};

export default SQUATRECORD_SERVICE;
