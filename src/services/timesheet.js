import api from "./api";

const addTimesheet = (payload) => api.post(null, "api/v1/timesheet", null, payload),
  removeTimesheet = (id) => api.delete(null, "api/v1/timesheet/" + id),
  getTimesheet = (queries = {}) =>
    api.get(null, `api/v1/timesheet${queries?.id ? `/${queries?.id}` : ``}`, {
      params: queries,
    }),
  getDataSummary = (queries = {}) =>
    api.get(null, `api/v1/admin/data-summary${queries?.id ? `/${queries?.id}` : ``}`, {
      params: queries,
    });

export { addTimesheet, getTimesheet, removeTimesheet, getDataSummary };
