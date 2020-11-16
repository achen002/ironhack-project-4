import axios from 'axios';

const baseURL = process.env.REACT_APP_SERVER_POINT;

const service = axios.create({
  baseURL,
  withCredentials: true
});

const WORKOUT_SERVICE = {
  createWorkout(userId, workoutData) {
    return service.post(`/workout/${userId}`, workoutData);
  },
  update(id, workoutData) {
    return service.post(`/workout/${id}/update`, workoutData);
  },
  delete(id) {
    return service.post(`/workout/${id}/delete`, {});
  },
  getDetails(id) {
    return service.get(`/workout/${id}`);
  },
  getAllWorkouts(id) {
    return service.get(`/workouts/${id}`)
  }
};

export default WORKOUT_SERVICE;
