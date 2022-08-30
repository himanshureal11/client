import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { isEmpty } from "lodash";
import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FILE_UPLOAD } from "../../constant";
import { UserContext } from "../../context/user.context";
import Webcam from "react-webcam";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { dataURLtoFile } from "../../constant/helper";
import { useAuth } from "../../stores";

function UserForm(props) {
  const authUser = useAuth(state=>state.user)
  const webCamRef = useRef(null);
  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  const [startTest, setStartTest] = useState(false);
  const [captureImage, setCaptureImage] = useState({
    captureImage: false,
    captureImageType: "",
  });
  const [user, setUser] = useState({
    name: authUser?.name,
    username: authUser?.username,
    mobile: authUser?.mobile,
  });
  const [candidateImage, setCandidateImage] = useState({
    file: [],
    previewImage: "",
  });
  const [candidateImageWithGovernmentId, setCandidateImageWithGovernmentId] =
    useState({
      file: [],
      previewImage: "",
    });
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const updateUser = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const files = [];
    if (!isEmpty(candidateImage.file)) {
      candidateImage.file.forEach((file) => {
        files.push({ file: file, fileType: FILE_UPLOAD.USER_PROFILE_PIC });
      });
    }
    if (!isEmpty(candidateImageWithGovernmentId.file)) {
      candidateImageWithGovernmentId.file.forEach((file) => {
        files.push({
          file: file,
          fileType: FILE_UPLOAD.USER_PIC_WITH_GOVERNMENT_ID,
        });
      });
    }
    formData.append("file", files);
    files.forEach((file) => {
      formData.append(file.fileType, file.file);
    });
    formData.append("data", JSON.stringify(user));
    const result = await userContext.editUser(
      authUser.id,
      formData
    );
    if (result.data.status === "success") {
      setStartTest(true);
    }
  };
  const goToTest = () => {
    navigate(`/question_paper/${authUser?.subject_id}`);
  };
  // const uploadFile = (e) => {
  //     setCandidateImage({
  //         file: [e.target.files[0]],
  //         previewImage: URL.createObjectURL(e.target.files[0])
  //     })
  // }
  // const uploadImageWithGovernmentId = (e) => {
  //     setCandidateImageWithGovernmentId({
  //         file: [e.target.files[0]],
  //         previewImage: URL.createObjectURL(e.target.files[0])
  //     })
  // }
  const openWebCam = (type) => {
    setCaptureImage({
      captureImage: true,
      captureImageType: type,
    });
  };

  const capture = () => {
    const image = webCamRef.current.getScreenshot();
    let imageFile;
    switch (captureImage.captureImageType) {
      case "profilePic":
        imageFile = dataURLtoFile(
          `${image}`,
          `${FILE_UPLOAD.USER_PROFILE_PIC}.png`
        );
        setCandidateImage({
          file: [imageFile],
          previewImage: image,
        });
        setCaptureImage({ captureImage: false, captureImageType: "" });
        break;
      case "picWithGovernmentId":
        imageFile = dataURLtoFile(
          `${image}`,
          `${FILE_UPLOAD.USER_PIC_WITH_GOVERNMENT_ID}.png`
        );
        setCandidateImageWithGovernmentId({
          file: [imageFile],
          previewImage: image,
        });
        setCaptureImage({ captureImage: false, captureImageType: "" });
        break;
      default:
        break;
    }
  };
  return (
    <>
      {captureImage.captureImage && (
        <div style={{ position: "absolute", zIndex: 3 }}>
          <div style={{ display: "block" }}>
            <Webcam
              imageSmoothing={true}
              audio={false}
              ref={webCamRef}
              screenshotFormat="image/png"
            />
          </div>
          <div style={{ display: "block", textAlign: "center" }}>
            <Button onClick={capture} variant="contained" sx={{ m: 2 }}>
              Capture
            </Button>
            <Button
              onClick={() =>
                setCaptureImage({ captureImage: false, captureImageType: "" })
              }
              variant="contained"
              color="error"
              sx={{ m: 2 }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
      {!captureImage.captureImage && (
        <div>
          {startTest ? (
            <Box component={'div'} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}>
            <Button variant="contained" size="large" onClick={goToTest}>
              Start Test {"->"}
            </Button>
            </Box>
          ) : (
            <>
              <Typography className="heading" variant="h3">
                Fill the Details
              </Typography>
              <Box
                component="form"
                sx={{
                  textAlign: "center",
                  display: "flex",
                  "& .MuiTextField-root": { m: 1, width: "50ch" },
                  flexWrap: "wrap",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  name="name"
                  variant="outlined"
                  value={user.name}
                  label="Name"
                  type={"text"}
                  fullWidth
                  sx={{ m: 1 }}
                  onChange={handleChange}
                />
                <TextField
                  name="username"
                  variant="outlined"
                  value={user.username}
                  type={"email"}
                  label="Email"
                  fullWidth
                  sx={{ m: 1 }}
                  onChange={handleChange}
                />
                <TextField
                  name="mobile"
                  variant="outlined"
                  value={user.mobile}
                  label="Mobile"
                  type={"tel"}
                  inputProps={{ maxLength: 10 }}
                  fullWidth
                  sx={{ m: 1 }}
                  onChange={(e) => !isNaN(e.target.value) && handleChange(e)}
                />
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "200px",
                      cursor: "pointer",
                    }}
                    onClick={() => openWebCam("profilePic")}
                  >
                    <PhotoCameraIcon
                      style={{ fontSize: "3rem", color: "#1976d2" }}
                    />
                    <span>Capture Profile Pic</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "200px",
                      cursor: "pointer",
                    }}
                    onClick={() => openWebCam("picWithGovernmentId")}
                  >
                    <PhotoCameraIcon
                      style={{ fontSize: "3rem", color: "#1976d2" }}
                    />
                    <span>Capture Profile Pic with Government Id</span>
                  </div>
                </div>
                <div>
                  {!isEmpty(candidateImage.previewImage) && (
                    <img
                      src={candidateImage.previewImage}
                      alt="candidate profile pic"
                      width={"200px"}
                      height={"200px"}
                      style={{ margin: 10 }}
                    ></img>
                  )}
                  {!isEmpty(candidateImageWithGovernmentId.previewImage) && (
                    <img
                      src={candidateImageWithGovernmentId.previewImage}
                      alt="candidate pic with government id"
                      width={"200px"}
                      height={"200px"}
                      style={{ margin: 10 }}
                    ></img>
                  )}
                </div>
                <div>
                  <Button
                    type="submit"
                    size="large"
                    variant="contained"
                    sx={{ m: 2 }}
                    onClick={updateUser}
                  >
                    Submit
                  </Button>
                </div>
              </Box>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default UserForm;
