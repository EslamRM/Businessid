import axios from "axios";
export default {
  methods: {

    //5. Upload File and get urls  -> For Add Products Bcz they include update product too.
    async getFileUrls_variation(self, fileArray, fileUrlArray) {
      if (fileArray.length <= 0) return "empty";
      try {
        await Promise.all(
          fileArray.map(async file => {
            if (!file.blob) return fileUrlArray.push(file.src);
            // Prepare Form Data
            let formData = await new FormData();
            await formData.append("file", file.blob, file.name);
            // Now Send it
            const response = await axios.post("/api_fileupload_google", formData, {
              headers: {
                "Content-Type": "multipart/form-data"
              }
            });
            console.log("file submit", response);
            // Store The Url in files Array of Form
            await fileUrlArray.push(response.data.results.files[0].fileUrl);
          })
        );
        return "success";
      } catch (error) {
        self.loading = true;
        console.log(error);
        self.$helpers.errorPopup("Error Adding Images.");
        return "fail";
      }
    },

  }
}