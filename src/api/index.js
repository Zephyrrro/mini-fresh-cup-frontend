import axios from 'axios';

const baseUrl =
  process.env.NODE_ENV === 'development' ? '/api' : 'http://47.106.250.72:8889';

let request = axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: sessionStorage.getItem('token')
      ? `Bearer ${sessionStorage.getItem('token')}`
      : '',
  },
});

export const login = (identity, data) => {
  return request.post(`/auth/${identity}`, data).then(res => {
    const {
      success,
      data: { bearToken },
    } = res.data;
    if (success) {
      request = axios.create({
        baseURL: baseUrl,
        headers: {
          Authorization: `Bearer ${bearToken}`,
        },
      });
      return { data: { success, bearToken } };
    }
    return { data: null };
  });
};
