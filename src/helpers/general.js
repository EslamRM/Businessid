export default {
  slugify(text, ampersand = "and") {
    const a = "àáäâèéëêìíïîòóöôùúüûñçßÿỳýœæŕśńṕẃǵǹḿǘẍźḧ";
    const b = "aaaaeeeeiiiioooouuuuncsyyyoarsnpwgnmuxzh";
    const p = new RegExp(a.split("").join("|"), "g");

    return text
      .toString()
      .toLowerCase()
      .replace(/[\s_]+/g, "-")
      .replace(p, c => b.charAt(a.indexOf(c)))
      .replace(/&/g, `-${ampersand}-`)
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-")
      .replace(/^-+|-+$/g, "");
  },
  substring(start, end, str) {
    if (str.length > 17) {
      const text = str.substring(start, end);
      return text + "...";
    } else {
      return str;
    }
  },
  // This Helper Accepts:
  // 1. Array - Input Array
  // eg: [
  //   {
  //     name: "value",
  //     id: "1"
  //   },
  //   {
  //     name: "value2",
  //     id: 2
  //   }
  // ]
  // 2. Key which we want to match with the value
  // Eg: keyOfValue = name
  // 3. valueToBeMatched lets say it be "value2"
  // implemented in changeAddress.vue
  selectObjectFromArray(array, keyOfValue, valueToBeMatched, index) {
    var object;
    var idOfArray;
    array.forEach((item, id) => {
      if (item[keyOfValue] == valueToBeMatched) {
        object = item;
        idOfArray = id;
      }
    });
    if (index) {
      return idOfArray;
    }
    return object;
  },

  successPopup(message, time = 2500) {
    return {
      position: "center",
      icon: "success",
      title: message ? message : "Successfully Submitted",
      showConfirmButton: false,
      timer: time
    };
  },

  errorPopup(message, time = 10000) {
    return {
      position: "center",
      icon: "error",
      title: message ? message : "Please Try Again.",
      showConfirmButton: true,
      timer: time,
      timerProgressBar: true
    };
  },

  // Encode Base 64 String
  // to pass HTML Data To JSON we encode String
  encode(string) {
    return btoa(string);
  },

  decode(string) {
    return atob(string);
  }
};
