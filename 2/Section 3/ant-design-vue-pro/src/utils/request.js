import axios from "axios";
import { notification } from "ant-design-vue";

function request(options) {
  return axios(options).catch((error) => {
    window.myerror = error;
    const {
      response: { status, statusText },
    } = error;
    notification.error({
      //eslint-disable-next-line no-unused-vars
      message: (h) => (
        <div>
          请求错误
          <span style="color:red;">
            {status}:{options.url}
          </span>
        </div>
      ),
      description: statusText,
    });
    return Promise.reject(error);
  });
}

export default request;
