import http from "../utility/http-commons";

const login = (typeLogin, data) => http.post(`/${typeLogin}/login`, data);

const getBeritaUser = (id) => http.get(`/berita/label/${id}`);

const getBerita = () => http.get('/berita');

const postBerita = (data) => http.post('/berita', data);

const postBeritaExcel = (data) => http.post('/berita/excel', data);

const putBerita = (data, id) => http.put(`/berita/${id}`, data);

const deleteBerita = (id) => http.delete(`/berita/${id}`);

const getUserLabel = () => http.get('/userlabel');

const addUserLabel = (data) => http.post('/userlabel', data);

const updateUserLabel = (data, id) => http.put(`/userlabel/${id}`, data);

const deleteUserLabel = (id) => http.delete(`/userlabel/${id}`);

const getLabel = () => http.get('/label');

const addManyLabel = (data) => http.post('/label/many', data);

const getBeritaLabel = (id) => http.get(`/berita/label/${id}`);

const labeledByUser = (data, id) => http.put(`/label/${id}`, data);

const services = {
    login,
    getBeritaUser,
    getBerita,
    postBerita,
    postBeritaExcel,
    putBerita,
    deleteBerita,
    getUserLabel,
    addUserLabel,
    updateUserLabel,
    deleteUserLabel,
    getLabel,
    addManyLabel,
    getBeritaLabel,
    labeledByUser,
};

export default services;