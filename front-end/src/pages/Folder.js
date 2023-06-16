import React from 'react'
import axios from 'axios'
import AddFolderButton from './AddFolderButton'
import { useFolder } from '../components/hooks/useFolder'
import { BsFolder } from 'react-icons/bs'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'

function Folder() {
  const { folder } = useFolder("6489b2187e46e11301c3eac3");
  const [folders, setFolders] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
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
          <Link to='/upload'>
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
          </Link>
        </div>
      </div>
    </>
  );
}
export default Folder;

