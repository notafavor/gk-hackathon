import { makeAutoObservable } from "mobx";

export default class RecognitionStore {
  constructor() {
    this._recognition = [];
    this._channel = "";
    makeAutoObservable(this);
  }

  setRecognition(recognition) {
    this._recognition = recognition;
  }

  get recognition() {
    return this._recognition;
  }

  setChannel(channel) {
    this._channel = channel;
  }

  get channel() {
    return this._channel;
  }
}
