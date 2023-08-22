import React, { useRef, useState } from "react";
import { Text, Group, Button, createStyles, rem } from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { IconCloudUpload, IconX, IconDownload } from "@tabler/icons-react";
// import { Events } from 'react-scroll';
import axios from "axios";
// import { withRouter } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./dropZone.css";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    marginBottom: rem(30),
    marginTop: rem(50),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },

  dropzone: {
    borderWidth: rem(2),
    borderRadius: rem(8),
    padding: rem(40),
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    boxShadow:
      theme.colorScheme === "dark" ? theme.shadows.sm : theme.shadows.lg,
    transition: "border-color 0.2s ease",
    minHeight: rem(200),

    "&:hover": {
      borderColor: theme.colors.blue[6],
    },
  },

  icon: {
    color: theme.colors.blue[6],
  },

  control: {
    marginTop: rem(20),
  },
  embed: {
    width: "100%",
    height: "500px",
    marginTop: rem(20),
  },
  cancelBtn: {
    marginTop: rem(10),
  },
}));

function DropzoneButton({ history }) {
  const { classes, theme } = useStyles();
  const openRef = useRef();
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedPdf, setUploadedPdf] = useState(null);
  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setUploadedPdf(URL.createObjectURL(event.target.files[0]));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { data } = await axios.get("/profile");
    const userId = data.id;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("file", file);
    formData.append("owner", userId);

    try {
      const response = await axios.post("/pdf", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          );
          setUploadProgress(progress);
        },
      });

      console.log(response.data);
      navigate("/mycv");
    } catch (error) {
      console.log(error);
      // Handle error
    }
  };

  return (
    <div className={classes.wrapper}>
      <Dropzone
        openRef={openRef}
        onDrop={() => { }}
        className={classes.dropzone}
        radius="xl"
        accept={[MIME_TYPES.pdf]}
        maxSize={30 * 1024 ** 2}
        onDropAccepted={handleSubmit}
      >
        <div style={{ pointerEvents: "none" }}>
          {uploadedPdf ? (
            <embed
              src={uploadedPdf}
              type="application/pdf"
              className={classes.embed}
            />
          ) : (
            <Group position="center">
              <Dropzone.Accept>
                <IconDownload
                  size={rem(50)}
                  color={theme.colors[theme.primaryColor][6]}
                  stroke={1.5}
                />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX
                  size={rem(50)}
                  color={theme.colors.red[6]}
                  stroke={1.5}
                />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <IconCloudUpload
                  size={rem(50)}
                  color={theme.colors.blue[6]}
                  stroke={1.5}
                />
              </Dropzone.Idle>
            </Group>
          )}

          <Text ta="center" fw={700} fz="lg" mt="xl">
            <Dropzone.Accept>Drop files here</Dropzone.Accept>
            <Dropzone.Reject>Pdf file less than 30mb</Dropzone.Reject>
            <Dropzone.Idle>Upload resume</Dropzone.Idle>
          </Text>
          <Text ta="center" fz="sm" mt="xs" c="dimmed">
            Drag'n'drop files here to upload. We can accept only <i>.pdf</i>{" "}
            files that are less than 30mb in size.
          </Text>
        </div>
      </Dropzone>

      <Button
        className={classes.control}
        size="md"
        radius="xl"
        variant="outline"
        onClick={() => openRef.current?.()}
      >
        Select files
      </Button>
      <Button onClick={handleSubmit} sx={{ marginTop: "30px", width: "150px" }}>
        Upload
      </Button>

      <input
        type="text"
        value={name}
        onChange={handleNameChange}
        placeholder="Enter name"
        style={{ marginTop: "1rem", padding: "0.5rem" }}
      />

      <input
        type="file"
        onChange={handleFileChange}
        style={{ marginTop: "2rem" }}
        className="file-input"
      />

      {uploadProgress > 0 && (
        <Text
          style={{
            marginTop: "1rem",
            fontSize: "1rem",
            fontWeight: "bold",
            color: "green",
            textAlign: "center",
          }}
        >
          {uploadProgress}% uploaded
        </Text>
      )}
    </div>
  );
}

export default DropzoneButton;
