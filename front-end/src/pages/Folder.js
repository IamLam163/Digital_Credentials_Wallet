import React from 'react'
import axios from 'axios'
import AddFolderButton from './AddFolderButton'
import { useFolder } from '../components/hooks/useFolder'
import { BsFolder } from 'react-icons/bs'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'

function Folder() {
  const { folder } = useFolder('648faee62f6c7a4104ad5ea1');
  const [folders, setFolders] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const state = useFolder()
  console.log(state)
  //fetch all folders
  useEffect(() => {
    (
      async () => {
        try {
          const { data } = await axios.get('/profile');
          setCurrentUser(data);
          let res = await axios.get(`/folder/user/${data?.id}`);
          setFolders(res.data.folder);
        } catch (error) {
          console.log(error);
        }
      }
    )()
  }, [])


  return (
    <>
      <div className='middle'>
        <div className='buttonF'>
          <AddFolderButton currentFolder={folder} />

          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', marginTop: "50px", gap: "20px" }}>
            {
              folders && folders.map(childFolder => (
                <div key={childFolder.id} style={{ alignItems: 'center' }}>
                  <BsFolder style={{ fontSize: '40', color: "white" }} />
                  <p style={{ marginTop: "10px", color: "white" }}>
                    {childFolder.name}
                  </p>

                </div>
              ))}
          </div>

        </div>
      </div>
    </>
  );
}
export default Folder;

/*
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddFolderButton from './AddFolderButton';
import { useFolder } from '../components/hooks/useFolder';
import { BsFolder } from 'react-icons/bs';

function Folder() {
  const { folder, childFolders } = useFolder('648faee62f6c7a4104ad5ea1');
  const [parentFolders, setParentFolders] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // Fetch parent folders
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const { data } = await axios.get('/profile');
  //       setCurrentUser(data);
  //       const res = await axios.get(`/folder/user/${data?.id}`);
  //       const foldersData = res.data.folder;
  //       const parentFoldersData = foldersData.filter(folder => folder.parentId === null);
  //       setParentFolders(parentFoldersData);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   })();
  // }, []);

    useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const { data } = await axios.get('/profile');
        const folderIdResponse = await axios.get(`/folderId/${data.id}`);
        const { folderId } = folderIdResponse.data;
        setCurrentUser({ ...data, folderId });
      } catch (error) {
        console.log(error);
      }
    };

    fetchCurrentUser();
  }, []);


  // const handleParentFolderClick = async (parentFolder) => {
  //   const res = await axios.get(`/folder/${parentFolder.id}/children`);
  //   const childrenFoldersData = res.data.children;
  //   setParentFolders(prevFolders => {
  //     const updatedFolders = [...prevFolders];
  //     const folderIndex = updatedFolders.findIndex(folder => folder.id === parentFolder.id);
  //     if (folderIndex !== -1) {
  //       updatedFolders[folderIndex].children = childrenFoldersData;
  //     }
  //     return updatedFolders;
  //   });
  // };

  return (
    <>
      <div className='middle'>
        <div className='buttonF'>
          <AddFolderButton currentFolder={folder} />

          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', marginTop: "50px", gap: "20px" }}>
            {
              parentFolders.map(parentFolder => (
                <div key={parentFolder.id} style={{ alignItems: 'center' }}>
                  <BsFolder style={{ fontSize: '40', color: "white" }} onClick={() => handleParentFolderClick(parentFolder)} />
                  <p style={{ marginTop: "10px", color: "white" }}>
                    {parentFolder.name}
                  </p>
                  {parentFolder.children && parentFolder.children.map(childFolder => (
                    <div key={childFolder.id} style={{ alignItems: 'center' }}>
                      <BsFolder style={{ fontSize: '40', color: "white" }} />
                      <p style={{ marginTop: "10px", color: "white" }}>
                        {childFolder.name}
                      </p>
                    </div>
                  ))}
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default Folder;
*/
