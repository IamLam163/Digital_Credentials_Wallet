import { useEffect, useReducer } from "react";
import axios from "axios";

const ACTIONS = {
  SELECT_FOLDER: "select-folder",
  UPDATE_FOLDER: "update-folder",
};

const ROOT_FOLDER = { name: "Root", id: null, path: [] };

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.SELECT_FOLDER:
      return {
        folderId: payload.folderId,
        folder: payload.folder,
        childFiles: [],
        childFolders: [],
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
    folder: null,
    childFolders: [],
    childFiles: []
  })

  useEffect(() => {
    dispatch({ type: ACTIONS.SELECT_FOLDER, payload: { folderId, folder } })
  }, [folderId, folder])

  useEffect(() => {
    if (folderId) {
      const fetchFolder = async () => {
        try {
          const { data } = await axios.get(`/folder/${folderId}`);
          console.log(data)
          dispatch({
            type: ACTIONS.UPDATE_FOLDER,
            payload: { folder: data.folder }
          });
        } catch (error) {
          console.log(error);
        }
      };

      fetchFolder();
    } else {
      // If folderId is null, reset the folder to the root folder
      dispatch({
        type: ACTIONS.UPDATE_FOLDER,
        payload: { folder: ROOT_FOLDER }
      });
    }
  }, [folderId]);//removed folder

  return state;
}
