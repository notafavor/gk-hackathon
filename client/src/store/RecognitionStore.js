import { makeAutoObservable } from "mobx";

export default class RecognitionStore {
  constructor() {
    this._recognition = [];
    this._chanel = "";
    makeAutoObservable(this);
  }

  setRecognition(recognition) {
    this._recognition = recognition;
  }

  get recognition() {
    return this._recognition;
  }

  setChanel(chanel) {
    this._chanel = chanel;
  }

  get chanel() {
    return this._chanel;
  }
}
