<template>
  <div>
    dsds
  </div>
</template>

<style scoped>
.btn-save-div {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 21px;
}
.btn-save-div button {
  height: 37px;
}
.img-selected-wrapper {
  padding: 0 9px;
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
}
.remove-image {
  position: absolute;
  background: #fff;
  border-radius: 3px;
  padding: 1px;
  top: 50%;
  left: 50%;
  margin-top: -12px;
  margin-left: -12px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  opacity: 0;
  color: #ff5722;
  cursor: pointer;
}
.selected-images:hover .remove-image {
  opacity: 1;
}
.selected-images:after {
  content: "";
  height: 100%;
  position: absolute;
  transition: all 0.2s;
  width: 100%;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background-color: rgba(255, 255, 255, 0);
}
.selected-images:hover::after {
  background-color: rgba(255, 255, 255, 0.5);
}
.selected-images {
  max-width: 75px;
  min-height: 75px;
  position: relative;
  width: 100%;
  height: 100%;
  margin-right: 7.5px;
  transition: all 0.2s;
}
.selected-images img {
  border-radius: 6px;
  bottom: 0px;
  height: 100%;
  left: 0px;
  opacity: 1;
  position: absolute;
  right: 0px;
  top: 0px;
  width: 100%;
  object-fit: cover;
}
.dialog-crop-btn {
  padding: 15px;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.dialog-crop-btn button {
  height: 37px;
  margin-right: 1.3%;
}
button.addMore {
  border: 1.3px dashed #213a63;
  margin-right: 5%;
}
.btnContent {
  position: relative;
  top: -5px;
}
.btnContent span {
  position: relative;
  top: 7px;
}

.choose-file-btn {
  /* background-color: rgb(33, 58, 99,0.25); */
  border: 1.3px dashed #213a63;
  width: 155px;
  border-radius: 0.25em;
  height: 41px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.choose-file-btn span {
  position: relative;
  top: 2px;
}
.choose-file-btn i {
  color: #213a63;
  margin-left: 4px;
}
.modal-header {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
}
.md-dialog-title {
  margin-bottom: 9px;
  padding: 13px 19px 0;
  font-size: 16px;
  font-weight: 600;
  opacity: 1;
  color: #222;
}
.modal-close {
  cursor: pointer;
  position: absolute;
  right: 19px;
  top: 12px;
  background-color: #c7ced8;
  border-radius: 50px;
  padding: 3px;
  height: 27px;
  width: 27px;
}
.modal-close i {
  font-size: 20px;
  position: relative;
  top: 1px;
  left: 1px;
  color: #213a63;
}
.md-dialog {
  /* max-width: 599px; */
  width: 100%;
}
.upload-button {
  width: 100%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  padding: 20px 0px;
}
.cropper {
  height: 250px;
  width: 100%;
  background: #ddd;
}

/* loader */
.lds-ellipsis {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 50px;
}
.btn-save {
  height: 30px;
  background-color: #d6e6ff;
  color: #2d2d2d;
}
.lds-ellipsis div {
  position: absolute;
  top: 25px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #dadada;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.lds-ellipsis div:nth-child(1) {
  left: 8px;
  animation: lds-ellipsis1 0.6s infinite;
}
.lds-ellipsis div:nth-child(2) {
  left: 8px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(3) {
  left: 32px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(4) {
  left: 56px;
  animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
}
</style>
