import Axios from 'axios';

const instance = Axios.create({
  baseURL: 'http://eit-service.azurewebsites.net',
  withCredentials: false,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
});

export const getCitiesAPI = () =>
  instance.get(`http://eit-service.azurewebsites.net/api/Citi`).then();

export const loginAPI = (username, password) =>
  instance
    .get(
      'http://eit-service.azurewebsites.net/api/User?username=' +
      username +
      '&password=' +
      password +
      '&isLogin=true'
    )
    .then();

export const getConfigDataAPI = () =>
  instance.get('http://eit-service.azurewebsites.net/api/ConfigData').then();

export const postConfigDataAPI = ({ MaxWeight, PriceNovApr10, PriceNovApr1050, PriceNovApr50, PriceMayOct10, PriceMayOct1050, PriceMayOct50 }) =>
  instance
    .post(
      'http://eit-service.azurewebsites.net/api/ConfigData?maxWeight=' + MaxWeight
      + '&pricePerSegment114=' + PriceNovApr10 + "," + PriceNovApr1050 + "," + PriceNovApr50
      + '&pricePerSegment510=' + PriceMayOct10 + "," + PriceMayOct1050 + "," + PriceMayOct50
    )
    .then();

export const getRoutesAPI = ({ from, to, weight, type, height, depth, breadth }) =>
  instance
    .get(
      "http://eit-service.azurewebsites.net/api/InternalRouting?from="
      + from + "&to=" + to + "&weight=" + weight + "&parcelType=" + type + "&height=" + height + "&depth=" + depth + "&breadth=" + breadth
    )
    .then();