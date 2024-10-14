import axios from "axios";
import qs from "query-string";

/**
 * Основной Axios клиент для взаимодействия с админским API.
 *
 * @constant
 * @type {import('axios').AxiosInstance}
 *
 * @property {string} baseURL - Базовый URL админского API, взятый из переменной окружения.
 * @property {Object} headers - Заголовки запроса, устанавливающие тип контента как JSON.
 * @property {boolean} withCredentials - Флаг, указывающий на необходимость отправки куки с запросами.
 *
 * @example
 * const response = await client.get('/users');
 */
export const client = axios.create({
  baseURL: process.env.EXPO_PUBLIC_ADMIN_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

/**
 * Интерцептор ответов для основного клиента.
 * Автоматически извлекает данные из ответа или обрабатывает ошибки.
 */
client.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    return Promise.reject(error);
  },
);

/**
 * Axios клиент для взаимодействия с API OpenRouteService.
 *
 * @constant
 * @type {import('axios').AxiosInstance}
 *
 * @property {string} baseURL - Базовый URL API OpenRouteService.
 * @property {Object} params - Параметры запроса по умолчанию, включая API ключ и язык.
 * @property {Object} headers - Заголовки запроса, включающие авторизационный токен.
 * @property {Function} paramsSerializer - Функция для сериализации параметров запроса.
 *
 * @example
 * const route = await openRouteClient.get('/v2/directions/driving-car', { params: { start: '8.681495,49.41461', end: '8.687872,49.420318' } });
 */
export const openRouteClient = axios.create({
  baseURL: "https://api.openrouteservice.org",
  params: {
    api_key: process.env.EXPO_PUBLIC_OPEN_ROUTE_SERVICE_API_TOKEN,
    lang: "ru",
    sources: "openstreetmap",
  },
  headers: {
    Authorization: process.env.EXPO_PUBLIC_OPEN_ROUTE_SERVICE_API_TOKEN,
  },
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "comma" }),
});
