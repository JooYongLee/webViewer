import http from "../http-common";

import {saveArrayBuffer} from "./saver.js"
class UploadFilesService {
  upload(file, onUploadProgress) {
    let formData = new FormData();

    formData.append("file", file);

    return http.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
  }

  getFiles() {
    return http.get("/files");
  }

  // axios({
  //   url: 'http://localhost:5000/static/example.pdf',
  //   method: 'GET',
  //   responseType: 'blob', // important
  // })
  // downloadFile(name){
  //   return axios({

  //   })
  // }

  downloadFile(name){
    return http.get("/files/" + name ,  {
      onDownloadProgress: (progressEvent) => {
        console.log(progressEvent.loaded / progressEvent.total)

        // let downloadCount = DownloadCount(
        //   progressEvent.timeStamp,
        //   progressEvent.total,
        //   progressEvent.loaded
        // );
        // let percentCompleted = Math.round(
        //   (progressEvent.loaded * 100) / progressEvent.total
        // );
        // setProgressing(percentCompleted);
        // dispatch({
        //   type: "downloading",
        //   payload: downloadCount.toFixed(1),
        // });
      },
      responseType: "blob"
    })
    .then( res => {
      // console.log( atob(res.data) )
      console.log(res.data)
      console.log(typeof res.data)
      saveArrayBuffer(res.data, name)
    })
  }


}

export default new UploadFilesService();
