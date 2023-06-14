import axios from 'axios';
import { useEffect, useReducer } from 'react';

const ACTIONS = {
  SELECT_FOLDER: 'select-folder',
  UPDATE_FOLDER: 'update-folder',
};

const ROOT_FOLDER = { name: 'Root', id: null, path: [] };

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.SELECT_FOLDER:
      return {
        folderId: payload.folderId,
        folder: payload.folder,
        childFolders: [],
        childFiles: [],
      };
    case ACTIONS.UPDATE_FOLDER:
      return {
        ...state,
        folder: payload.folder,
      };
    default:
      return state;
  }
}

export function useFolder(folderId = null, folder = null) {
  const [state, dispatch] = useReducer(reducer, {
    folderId,
    folder,
    childFolders: [],
    childFiles: [],
  });

  useEffect(() => {
    dispatch({ type: ACTIONS.SELECT_FOLDER, payload: { folderId, folder } });
  }, [folderId, folder]);

  useEffect(() => {
    if (folderId == null) {
      return dispatch({
        type: ACTIONS.UPDATE_FOLDER,
        payload: { folder: ROOT_FOLDER },
      });
    }

    axios
      .get(`/folder/${folderId}`)
      .then(({ data }) => {
        const folder = data.folder;
        dispatch({ type: ACTIONS.UPDATE_FOLDER, payload: { folder: ROOT_FOLDER } });

        folder.childFolders.forEach((childFolder) => {
          dispatch({ type: ACTIONS.UPDATE_FOLDER, payload: { folder: childFolder } });
          console.log(childFolder);
        });
      })
      .catch(() => {
        dispatch({ type: ACTIONS.UPDATE_FOLDER, payload: { folder: ROOT_FOLDER } });
      });
  }, [folderId]);

  // useEffect(() => {
  //   // data = { folderId, folder };
  //   // where("parentId", "==", folderId)
  //   //   .get()
  // }, [folderId]);

  return state;
}
