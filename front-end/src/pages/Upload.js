import React from 'react';
import { useRef } from 'react';
import { Text, Group, Button, createStyles, rem } from '@mantine/core';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { IconCloudUpload, IconX, IconDownload } from '@tabler/icons-react';
import Axios from 'axios';
import { useState } from 'react';
import { Image } from 'cloudinary-react';

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    // marginBottom: rem(30),
    marginTop: rem(200)
  },

  dropzone: {
    borderWidth: rem(1),
    paddingBottom: rem(50),
  },

  icon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4],
  },

  control: {
    position: 'absolute',
    width: rem(250),
    left: `calc(50% - ${rem(125)})`,
    bottom: rem(-20),
  },
}));

const Upload = () => {
  const [imageSelected, setImageSelected] = useState("");
  const { classes, theme } = useStyles();
  const openRef = useRef();

  const uploadImage = async () => {
  console.log('Before selecting file:', imageSelected);
  
  const formData = new FormData();
  formData.append("file", imageSelected);
  formData.append("upload_preset", "fr9mfhdy");

  Axios.post("https://api.cloudinary.com/v1_1/dia49kn8r/image/upload", formData)
    .then((response) => {
      console.log('Upload response:', response);
    })
    .catch((error) => {
      console.log('Upload error:', error);
    });
};

const handleImageChange = (event) => {
  const selectedFile = event.target.files[0];
  console.log('File selected:', selectedFile);
  setImageSelected(selectedFile);
};


// <div>
//   <input type="file" onChange={(event) => setImageSelected(event.target.files[0])} />
//   <button onClick={uploadImage}>Upload</button>
// </div>
  return (
    <div className={classes.wrapper}>
        <Dropzone
        openRef={openRef}
        className={classes.dropzone}
        radius="md"
        accept={[MIME_TYPES.pdf, MIME_TYPES.jpeg, MIME_TYPES.png, MIME_TYPES.gif]}
        onDrop={(files) => {
          console.log('Files dropped:', files[0]);
          alert('File dropped');
          setImageSelected(files[0]);
        }}
      >
        <div style={{ pointerEvents: 'none' }}>
          <Group position="center">
            <Dropzone.Accept>
              <IconDownload
                size={rem(50)}
                color={theme.colors[theme.primaryColor][6]}
                stroke={1.5}
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX size={rem(50)} color={theme.colors.red[6]} stroke={1.5} />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconCloudUpload
                size={rem(50)}
                color={theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black}
                stroke={1.5}
              />
            </Dropzone.Idle>
          </Group>

          <Text ta="center" fw={700} fz="lg" mt="xl">
            <Dropzone.Accept
              onChange={(event) => {
                setImageSelected(event.target.files[0]);
              }}
            >
              Drop files here
            </Dropzone.Accept>
            <Dropzone.Reject>Pdf file less than 30mb</Dropzone.Reject>
            <Dropzone.Idle>Upload resume</Dropzone.Idle>
          </Text>
          <Text ta="center" fz="sm" mt="xs" c="dimmed">
            Drag'n'drop files here to upload.
          </Text>
        </div>
      </Dropzone>

      <Button className={classes.control} size="md" radius="xl" onClick={() => openRef.current?.()}>
        Select files
      </Button>
      <div style={{ marginTop: "50px", justifyContent:"center"}}>
      <Button  variant="outlined" onClick={uploadImage}>Upload</Button>
      </div>
      </div>
      
  );
};
export default Upload;