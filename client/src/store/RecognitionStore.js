import { makeAutoObservable } from "mobx";

export default class RecognitionStore {
  constructor() {
    this._recognition = [];
    this._channel = "";
    this._summary = "";
    this._tasks = [];
    this._fetchWebSocket = true;
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

  setFetchWebSocket(fetchWebSocket) {
    this._fetchWebSocket = fetchWebSocket;
  }

  get fetchWebSocket() {
    return this._fetchWebSocket;
  }

  setSummary(summary) {
    this._summary = summary;
  }

  get summary() {
    return this._summary;
  }

  setTasks(tasks) {
    this._tasks = tasks;
  }

  get tasks() {
    return JSON.stringify(this._recognition);
  }
}
