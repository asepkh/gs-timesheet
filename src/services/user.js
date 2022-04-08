import api from "./api";

const register = (payload) => api.post(null, "pub/register", null, payload),
  checkUser = () => api.get(null, "api/v1/profile"),
  removeUser = (id) => api.delete(null, "api/v1/admin/user/" + id),
  login = (payload) => api.post(null, "pub/login", null, payload),
  updateUser = (id, payload) =>
    api.put(null, `api/v1/user/${id}`, null, payload),
  updateProfile = (payload) => api.put(null, `api/v1/profile`, null, payload),
  getUser = (queries = {}) =>
    api.get(null, `api/v1/admin/user${queries?.id ? `/${queries?.id}` : ``}`, {
      params: queries,
    }),
  changePassword = (payload) =>
    api.post(null, `api/v1/changePassword`, null, payload);

export {
  register,
  checkUser,
  login,
  getUser,
  removeUser,
  updateUser,
  updateProfile,
  changePassword,
};
