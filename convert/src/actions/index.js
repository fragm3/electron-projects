import { ADD_VIDEO, ADD_VIDEOS, REMOVE_VIDEO, REMOVE_ALL_VIDEOS, VIDEO_PROGRESS, VIDEO_COMPLETE } from "./types";
import { ipcRenderer } from 'electron';

export const addVideos = videos => dispatch => {
  ipcRenderer.send('video-added', videos);
  ipcRenderer.on('metadata-complete', (event, videosData) => {
    dispatch({type: ADD_VIDEOS, payload: videosData})
  })
};

export const convertVideos = () => (dispatch, getState) => {
  ipcRenderer.send("conversion-start", videos)

  ipcRenderer.on('conversion-end', (event, {video, outputPath}) => {
    dispatch({ type: VIDEO_COMPLETE, payload: {...video, outputPath}})
  })

  ipcRenderer.on('conversion-process', (event, {video, timemark}) => {
    dispatch({type: VIDEO_PROGRESS, payload: {...video, timemark}})
  })
};

export const showInFolder = outputPath => dispatch => {
  ipcRenderer.send('folder-open')
};

export const addVideo = video => {
  return {
    type: ADD_VIDEO,
    payload: { ...video }
  };
};

export const setFormat = (video, format) => {
  return {
    type: ADD_VIDEO,
    payload: { ...video, format, err: "" }
  };
};

export const removeVideo = video => {
  return {
    type: REMOVE_VIDEO,
    payload: video
  };
};

export const removeAllVideos = () => {
  return {
    type: REMOVE_ALL_VIDEOS
  };
};
