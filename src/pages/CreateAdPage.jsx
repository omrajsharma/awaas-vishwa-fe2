import React, { useState } from "react";
import { v4 as uuidV4 } from "uuid";
import alert from "../utility/alert";
import {
  TextField,
  Button,
  FormLabel,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Select,
  MenuItem,
} from "@mui/material";
import { ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../FirebaseConfig";
import { Navigate } from "react-router-dom";


const CreateAdPage = () => {
  const [redirectToHome, setRedirectToHome] = React.useState(false);
  const [imagePaths, setImagePaths] = React.useState([]);
  const [files, setFiles] = React.useState();
  const [bedrooms, setBedrooms] = useState();
  const [bathrooms, setBathrooms] = useState();
  const [furnished, setFurnished] = useState();
  const [constructionStatus, setConstructionStatus] = useState();
  const [listedBy, setListedBy] = useState();
  const [carParking, setCarParking] = useState();
  const [facing, setFacing] = useState();
  const tittle = React.useRef();
  const location = React.useRef();
  const maintenance = React.useRef();
  const area = React.useRef();
  const floor = React.useRef();
  const floorNo = React.useRef();
  const price = React.useRef();
  const description = React.useRef();
  const imgList = React.useRef([]);
  const listType = React.useRef();
  // const imagesToShow = imagePaths.slice(0, 12);

  const onImageChange = (event) => {
    if (event.target.files) {
      setFiles(event.target.files);
      let imagePathList = [];
      for (const file of event.target.files) {
        imagePathList.push(URL.createObjectURL(file));
      }
      setImagePaths(imagePathList);
    }
  };

  const submitAd = async (event) => {
    event.preventDefault();

    const tittleVal = tittle.current.value;
    const priceVal = Number(price.current.value);
    const locationVal = location.current.value;
    const areaVal = area.current.value;
    const maintenanceVal = maintenance.current.value;
    const floorVal = floor.current.value;
    const floorNoVal = floorNo.current.value;
    const descriptionVal = description.current.value;
    const listTypeVal = listType.current;

    if (!listType) {
      alert('Please select Category', 'error')
      return
    }
    if (!furnished) {
      alert('Please select Furnished Status', 'error')
      return
    }
    if (!constructionStatus) {
      alert('Please select Construction Status', 'error')
      return
    }
    if (!facing) {
      alert('Please select facing', 'error')
      return
    }
    if (!bathrooms) {
      alert('Please select bathrooms', 'error')
      return
    }
    if (!carParking) {
      alert('Please select Car Parking', 'error')
      return
    }
    if (!bedrooms) {
      alert('Please select bedrooms', 'error')
      return
    }
    if (!listedBy) {
      alert('Please select listedBy', 'error')
      return
    }
    if (tittleVal.length < 5 || tittleVal.length > 100) {
      alert('Title length should be greater than equals to 5 and less equals to 100 characters', 'error')
      return
    }
    if (locationVal.length < 3 || locationVal.length > 100) {
      alert('Location length should be greater than equals to 3 and less equals to 100 characters', 'error')
      return
    }
    if (priceVal < 0 || priceVal > 1000000000) {
      alert('Price should be greater than 0 and less than 100,00,00,000', 'error')
      return
    }
    if (areaVal < 0 || areaVal > 1000000000) {
      alert('Area should be greater than 0 and less than 100,00,00,000 sq2ft', 'error')
      return
    }
    if (maintenanceVal < 0 || maintenanceVal > 1000000000) {
      alert('Maintenance should be greater than 0 and less than 100,00,00,000', 'error')
      return
    }
    if (floorVal > 100) {
      alert('Floor should be less than 100', 'error')
      return
    }
    if (descriptionVal.length > 1000) {
      alert('Description length should be less than 1000 characters', 'error')
      return
    }
    if (floorNoVal > 100) {
      alert('Floor no. should be less than 100', 'error')
      return
    }
    if (files.length > 10) {
      alert('Maximum 10 images are allowed to be uploaded', 'error')
      return
    }

    // for uploading multiple images with differend uid
    for (const file of files) {
      const fileExt = file.name.split(".").pop();
      const randomFileName = `${uuidV4()}.${fileExt}`;
      const storageRef = ref(storage, `/ad-imgs/${randomFileName}`);
      const upload = uploadBytesResumable(storageRef, file);
      imgList.current.push(
       `https://firebasestorage.googleapis.com/v0/b/awaas-vishwa-51984.appspot.com/o/ad-imgs%2F${randomFileName}?alt=media&token=7c6aacd4-3d16-4b4c-89d9-28f9341f4f89`
       );
      }
    const imgListVal = imgList.current;

    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        tittle: tittleVal,
        price: priceVal,
        area: areaVal,
        maintenance: maintenanceVal,
        floor: floorVal,
        location: locationVal,
        floorNo: floorNoVal,
        bedrooms: bedrooms,
        bathrooms: bathrooms,
        furnished: furnished,
        constructionStatus: constructionStatus,
        listedBy: listedBy,
        description: descriptionVal,
        imgList: imgListVal,
        listType: listTypeVal,
        carParking: carParking,
        facing: facing
      }),
      credentials: 'include'   //fot storing cookies
    })
    const data = await response.json();
    if (response.ok) {            //for checking working is okk or not
      alert(data.success, 'success')
      setRedirectToHome(true);
    } else {
      alert(data.error, 'error')
    }
  };
  if (redirectToHome) {
    return <Navigate to={'/'} />
  }

  return (
    <div className="create-ad-page">
      <div className="create-ad-container">
        <div className="create-ad-form">
          <img src="TAB LOGO.png" alt="" />
          <h1>List Your Property</h1>
          <form onSubmit={submitAd}>
            <div className="radio-tool">
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label" required>
                  Select Category
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  onChange={(event) => {
                    listType.current = event.target.value;
                  }}
                >
                  <FormControlLabel
                    value="Sell: House & Apartments"
                    control={<Radio />}
                    label="Sell: House & Apartments"
                  />
                  <FormControlLabel
                    value="Rent: House & Apartments"
                    control={<Radio />}
                    label="Rent: House & Apartments"
                  />
                </RadioGroup>
                <br />
              </FormControl>
            </div>

            <TextField
              fullWidth
              id="outlined-basic"
              label="Title"
              variant="outlined"
              required
              inputRef={tittle}
              sx={{ marginTop: "10px" }}
            />
            <div className="radio-toolbar">
              <FormLabel id="demo-row-radio-buttons-group-label" required>
                Bedrooms
              </FormLabel>
              <br />

              <input
                type="radio"
                id="radioApple"
                name="radioBed"
                value="1"
                checked={bedrooms === "1"}
                onChange={(e) => setBedrooms(e.target.value)} /*defaultChecked*/
              />
              <label htmlFor="radioApple">1</label>

              <input
                type="radio"
                id="radioBanana"
                name="radioBed"
                value="2"
                checked={bedrooms === "2"}
                onChange={(e) => setBedrooms(e.target.value)}
              />
              <label htmlFor="radioBanana">2</label>

              <input
                type="radio"
                id="radioOrange"
                name="radioBed"
                value="3"
                checked={bedrooms === "3"}
                onChange={(e) => setBedrooms(e.target.value)}
              />
              <label htmlFor="radioOrange">3</label>

              <input
                type="radio"
                id="radioGrapes"
                name="radioBed"
                value="4"
                checked={bedrooms === "4"}
                onChange={(e) => setBedrooms(e.target.value)}
              />
              <label htmlFor="radioGrapes">4</label>

              <input
                type="radio"
                id="radioMango"
                name="radioBed"
                value="4+"
                checked={bedrooms === "4+"}
                onChange={(e) => setBedrooms(e.target.value)}
              />
              <label htmlFor="radioMango">4+</label>
            </div>
            <div className="radio-toolbar">
              <FormLabel id="demo-row-radio-buttons-group-label" required>
                Bathrooms
              </FormLabel>
              <br />

              <input
                type="radio"
                id="radio1"
                name="radioBath"
                value="1"
                checked={bathrooms === "1"}
                onChange={(e) =>
                  setBathrooms(e.target.value)
                } /*defaultChecked*/
              />
              <label htmlFor="radio1">1</label>

              <input
                type="radio"
                id="radio2"
                name="radioBath"
                value="2"
                checked={bathrooms === "2"}
                onChange={(e) => setBathrooms(e.target.value)}
              />
              <label htmlFor="radio2">2</label>

              <input
                type="radio"
                id="radio3"
                name="radioBath"
                value="3"
                checked={bathrooms === "3"}
                onChange={(e) => setBathrooms(e.target.value)}
              />
              <label htmlFor="radio3">3</label>

              <input
                type="radio"
                id="radio3+"
                name="radioBath"
                value="3+"
                checked={bathrooms === "3+"}
                onChange={(e) => setBathrooms(e.target.value)}
              />
              <label htmlFor="radio3+">3+</label>
            </div>
            <div className="radio-toolbar">
              <FormLabel id="demo-row-radio-buttons-group-label" required>
                Furnished
              </FormLabel>
              <br />

              <input
                type="radio"
                id="radioFurnished"
                name="radioFurn"
                value="Fully-Furnished"
                checked={furnished === "Fully-Furnished"}
                onChange={(e) =>
                  setFurnished(e.target.value)
                } /*defaultChecked*/
              />
              <label htmlFor="radioFurnished">Fully Furnished</label>

              <input
                type="radio"
                id="radioSemi"
                name="radioFurn"
                value="Semi-Furnished"
                checked={furnished === "Semi-Furnished"}
                onChange={(e) => setFurnished(e.target.value)}
              />
              <label htmlFor="radioSemi">Semi Furnished</label>

              <input
                type="radio"
                id="radioUn"
                name="radioFurn"
                value="Unfurnished"
                checked={furnished === "Unfurnished"}
                onChange={(e) => setFurnished(e.target.value)}
              />
              <label htmlFor="radioUn">Unfurnished</label>
            </div>
            <div className="radio-toolbar">
              <FormLabel id="demo-row-radio-buttons-group-label" required>
                Construction Status
              </FormLabel>
              <br />

              <input
                type="radio"
                id="radioNewLaunch"
                name="radioConst"
                value="New-Launch"
                checked={constructionStatus === "New-Launch"}
                onChange={(e) =>
                  setConstructionStatus(e.target.value)
                } /*defaultChecked*/
              />
              <label htmlFor="radioNewLaunch">New Launch</label>

              <input
                type="radio"
                id="radioReadytoMove"
                name="radioConst"
                value="Ready-To-Move"
                checked={constructionStatus === "Ready-To-Move"}
                onChange={(e) => setConstructionStatus(e.target.value)}
              />
              <label htmlFor="radioReadytoMove">Ready to Move</label>

              <input
                type="radio"
                id="radioUnderConstruction"
                name="radioConst"
                value="Under-Construction"
                checked={constructionStatus === "Under-Construction"}
                onChange={(e) => setConstructionStatus(e.target.value)}
              />
              <label htmlFor="radioUnderConstruction">Under Construction</label>
            </div>
            <div className="radio-toolbar">
              <FormLabel id="demo-row-radio-buttons-group-label" required>
                Listed By
              </FormLabel>
              <br />

              <input
                type="radio"
                id="radioBuilder"
                name="radioList"
                value="Builder"
                checked={listedBy === "Builder"}
                onChange={(e) => setListedBy(e.target.value)} /*defaultChecked*/
              />
              <label htmlFor="radioBuilder">Builder</label>

              <input
                type="radio"
                id="radioDealer"
                name="radioList"
                value="Dealer"
                checked={listedBy === "Dealer"}
                onChange={(e) => setListedBy(e.target.value)}
              />
              <label htmlFor="radioDealer">Dealer</label>

              <input
                type="radio"
                id="radioOwner"
                name="radioList"
                value="Owner"
                checked={listedBy === "Owner"}
                onChange={(e) => setListedBy(e.target.value)}
              />
              <label htmlFor="radioOwner">Owner</label>
            </div>

            <FormControl
              fullWidth
              sx={{ marginTop: "15px", width: "100%" }}
              required
            >
              <InputLabel htmlFor="outlined-adornment-amount">Price</InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                startAdornment={
                  <InputAdornment position="start">Rs.</InputAdornment>
                }
                label="Amount"
                type="number"
                inputRef={price}
              />
            </FormControl>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Location"
              variant="outlined"
              inputRef={location}
              required
              sx={{ marginTop: "10px" }}
            />
            <TextField
              fullWidth
              id="outlined-basic"
              label="Super Builtup area (ft²) "
              variant="outlined"
              type="number"
              inputRef={area}
              required
              sx={{ marginTop: "10px" }}
            />
            <TextField
              fullWidth
              id="outlined-basic"
              label="Maintenance (Monthly)"
              variant="outlined"
              type="number"
              inputRef={maintenance}
              sx={{ marginTop: "10px" }}
            />
            <TextField
              fullWidth
              id="outlined-basic"
              label="Total Floors"
              variant="outlined"
              type="number"
              inputRef={floor}
              sx={{ marginTop: "10px" }}
            />
            <TextField
              fullWidth
              id="outlined-basic"
              label="Floor No."
              type="number"
              variant="outlined"
              inputRef={floorNo}
              sx={{ marginTop: "10px" }}
            />
            <div className="radio-toolbar">
              <FormLabel id="demo-row-radio-buttons-group-label">
                Car Parking
              </FormLabel>
              <br />

              <input
                type="radio"
                id="radioCar1"
                name="radioCar"
                value="1"
                checked={carParking === "1"}
                onChange={(e) =>
                  setCarParking(e.target.value)
                } /*defaultChecked*/
              />
              <label htmlFor="radioCar1">1</label>

              <input
                type="radio"
                id="radioCar2"
                name="radioCar"
                value="2"
                checked={carParking === "2"}
                onChange={(e) => setCarParking(e.target.value)}
              />
              <label htmlFor="radioCar2">2</label>

              <input
                type="radio"
                id="radioCar3"
                name="radioCar"
                value="3"
                checked={carParking === "3"}
                onChange={(e) => setCarParking(e.target.value)}
              />
              <label htmlFor="radioCar3">3</label>

              <input
                type="radio"
                id="radioCar4"
                name="radioCar"
                value="3+"
                checked={carParking === "3+"}
                onChange={(e) => setCarParking(e.target.value)}
              />
              <label htmlFor="radioCar4">3+</label>
            </div>

            <FormControl fullWidth>
              <InputLabel
                id="demo-simple-select-label"
                sx={{ marginTop: "12px" }}
              >
                Facing
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={facing}
                label="Facing"
                sx={{ marginTop: "12px" }}
                onChange={(event) => setFacing(event.target.value)}
              // onChange={handleChange}
              >
                <MenuItem value={'East'}>East</MenuItem>
                <MenuItem value={'North'}>North</MenuItem>
                <MenuItem value={'North East'}>North East</MenuItem>
                <MenuItem value={'North West'}>North West</MenuItem>
                <MenuItem value={'South East'}>South East</MenuItem>
                <MenuItem value={'South West'}>South West</MenuItem>
                <MenuItem value={'West'}>West</MenuItem>
                <MenuItem value={'South'}>South</MenuItem>
              </Select>
            </FormControl>
            <FormLabel
              id="demo-row-radio-buttons-group-label"
              required
              className="photos"
            >
              Upload Upto 12 Photos
            </FormLabel>
            
            <CreateAdImgGallery imagePaths={imagePaths} />

            <input
              type="file"
              accept="image/*"
              onChange={onImageChange}
              multiple
            /> 
            <TextField
              id="outlined-multiline-static"
              label="Enter Extra Details"
              multiline
              rows={8}
              inputRef={description}
              sx={{ width: "100%", marginTop: "10px" }}
              defaultValue=""
            />
            <div className="button1">
              <Button
                variant="contained"
                sx={{
                  fontSize: "16px",
                  marginTop: "10px",
                  width: "100%",
                  backgroundColor: "rgb(153,50,204)",
                }}
                type="submit"
              >
                Publish Your Ad
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
function CreateAdImgGallery({ imagePaths }) {
if (imagePaths) {
return (
<div className="create-ad-img-container">
{
        imagePaths.map((imgPath) => (
<div className="create-ad-img">
<img src={imgPath} alt="" />
</div>
))
}
      </div>
);
}
}

export default CreateAdPage;
