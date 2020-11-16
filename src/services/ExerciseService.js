import axios from 'axios';

const baseURL = process.env.REACT_APP_SERVER_POINT;

const service = axios.create({
  baseURL,
  withCredentials: true
});

const EXERCISE_SERVICE = {
  createExercise(workoutId,exerciseData) {
    return service.post(`/exercise/${workoutId}`, exerciseData);
  },
  update(id, exerciseData) {
    return service.post(`/exercise/${id}/update`, exerciseData);
  },
  delete(id) {
    return service.post(`/exercise/${id}/delete`, {});
  },
  getDetails(id) {
    return service.get(`/exercise/${id}`);
  },
  getAll() {
      return service.get('/exercise')
  }
};

export default EXERCISE_SERVICE;
