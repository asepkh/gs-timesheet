import api from "./api";

const addProject = (payload) =>
    api.post(null, "api/v1/admin/project", null, payload),
  updateProject = (id, payload) =>
    api.put(null, `api/v1/admin/project/${id}`, null, payload),
  removeProject = (id) => api.delete(null, "api/v1/admin/project/" + id),
  getProject = (queries = {}) =>
    api.get(null, `pub/project${queries?.id ? `/${queries?.id}` : ``}`, {
      params: queries,
    });

export { addProject, updateProject, getProject, removeProject };
