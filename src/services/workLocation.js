import api from "./api";

const addWorkLocation = (payload) =>
    api.post(null, "api/v1/admin/workLocation", null, payload),
  updateWorkLocation = (id, payload) =>
    api.put(null, `api/v1/admin/workLocation/${id}`, null, payload),
  removeWorkLocation = (id) =>
    api.delete(null, "api/v1/admin/workLocation/" + id),
  getWorkLocation = (queries = {}) =>
    api.get(null, `pub/workLocation${queries?.id ? `/${queries?.id}` : ``}`, {
      params: queries,
    });

export {
  addWorkLocation,
  updateWorkLocation,
  getWorkLocation,
  removeWorkLocation,
};
