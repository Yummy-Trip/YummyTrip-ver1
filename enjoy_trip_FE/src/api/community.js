import http from "./http.js";


async function list(success, fail) {
    await http.get(`/community/list`).then(success).catch(fail);
  }

async function content(postData, success, fail) {
    http.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
    await http.post(`/community/content`, postData).then(success).catch(fail);
  }

  async function view(planId, success, fail) {
    await http.get(`/community/list/${planId}`).then(success).catch(fail);
  }


export { list, content, view };
