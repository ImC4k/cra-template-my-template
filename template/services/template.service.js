import api from './api.service';

const path = '/api/templates';

export const getTemplates = async () => {
    try {
        const { data } = await api.get(`${path}`);
        return data;
    }
    catch ({response}) {
        console.error(`failed api call: ${response}`);
    }
};