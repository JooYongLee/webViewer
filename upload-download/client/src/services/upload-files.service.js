import http from "../http-common";

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
    })
    .then( res => console.log(res))
  }


}

export default new UploadFilesService();
