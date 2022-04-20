import api from "./api";

const addReimburse = (payload) => api.post(null, "api/v1/reimburse", null, payload),
  updateReimburse = (payload) => api.put(null, "api/v1/reimburse", null, payload),
  removeReimburse = (id) => api.delete(null, "api/v1/reimburse/" + id),
  getReimburse = (queries = {}) =>
    api.get(null, `api/v1/reimburse${queries?.id ? `/${queries?.id}` : ``}`, {
      params: queries,
    }),
  getDataSummary = (queries = {}) =>
    api.get(null, `api/v1/admin/data-summary${queries?.id ? `/${queries?.id}` : ``}`, {
      params: queries,
    });

export { addReimburse, getReimburse, removeReimburse, updateReimburse, getDataSummary };
