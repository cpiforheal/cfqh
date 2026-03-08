import { CLOUD_ENV_ID, CLOUD_TRACE_USER } from '../config/cloud';

let cloudInitialized = false;

export function canUseCloud() {
  return typeof wx !== 'undefined' && !!wx.cloud;
}

export function initCloud() {
  if (cloudInitialized) {
    return true;
  }

  if (!canUseCloud()) {
    return false;
  }

  const options = { traceUser: CLOUD_TRACE_USER };

  if (CLOUD_ENV_ID) {
    options.env = CLOUD_ENV_ID;
  }

  wx.cloud.init(options);
  cloudInitialized = true;
  return true;
}

export async function callCloudFunction(name, data) {
  if (!initCloud()) {
    throw new Error('云开发尚未初始化');
  }

  const response = await wx.cloud.callFunction({
    name,
    data: data || {}
  });

  return response.result;
}
