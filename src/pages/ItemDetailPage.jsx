import React from "react";
import { useParams, Navigate } from "react-router-dom";
import { numberToCommaString } from '../utility/numberUtils';
import { itemDateFormatter } from '../utility/DateUtils';
import { Button } from "@mui/material";
import ItemDetailSkeleton from "../utility/IitemDetailSkeleton";
import { UserContext } from "../context/UserContext";
import alert from "../utility/alert";

const ItemDetailPage = () => {
    const { userInfo } = React.useContext(UserContext);
    const [redirectToLogin, setRedirectToLogin ]  = React.useState(false);
    const { itemId } = useParams();
    const [itemDetails, setItemDetails] = React.useState();
    const [disableInterestBtn, setDisableInterestBtn] = React.useState(false);

    React.useEffect(() => {
        fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/items/${itemId}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.data) {
                    setItemDetails(data.data);
                } else {
                }
            });
    }, []);

    const handleContact = () => {
        if (!userInfo) {
            setRedirectToLogin(true);
            alert('First You Need To Login! Then You Can Send Your Interest.', 'error')
            return;
        }
        // api request to send email to the author
        fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/items/lead`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
                itemId: itemId
            }),
            credentials: 'include'
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.success) {
                    alert(data.success, 'success')
                    setDisableInterestBtn(true);
                }
                if (data.error) {
                    alert(data.error, 'error')
                    setDisableInterestBtn(true);
                }
            });
    }

    if (redirectToLogin) {
        return <Navigate to='/login' />
    }

    if (!itemDetails) {
        return <ItemDetailSkeleton />;
    }
    return (
        <div className="item-detail-main">
            <div className="item-detail">
                <div className="item-detail-imgs">
                    {itemDetails?.imgList?.map(imgUrl => <img src={imgUrl} />)}
                </div>
                <div className="item-detail-body">
                    <div className="item-detail-basic">
                        <div className="item-detail-price">
                            ₹ {numberToCommaString(itemDetails.price)}
                        </div>
                        <div className="item-detail-tittle">{itemDetails.tittle}</div>
                        <div className="item-detail-row-space-between">
                            <p>{itemDetails.location}</p>
                            <p>{itemDateFormatter(itemDetails.updatedAt)}</p>
                        </div>
                    </div>
                    <div className="item-detail-author">
                        <div className="item-detail-author-name">{itemDetails.author.name}</div>
                        <div className="item-detial-contact-button">
                            <Button variant='contained' disabled={disableInterestBtn} onClick={handleContact}>Send Interest</Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="item-detail-other-details">
                <div className="heading">
                    <h2>
                        <span>Details</span>
                    </h2>
                </div>
                <div className="all-details">
                    <div className="all-details"><p>Bedrooms:</p> {itemDetails.bedrooms}</div>
                    <div className="all-details"><p>Bathrooms:</p> {itemDetails.bathrooms}</div>
                    <div className="all-details"><p>Furnished Status:</p> {itemDetails.furnished}</div>
                    <div className="all-details"><p>Construction Status:</p> {itemDetails.constructionStatus}</div>
                    <div className="all-details"><p>Listed by:</p> {itemDetails.listedBy}</div>
                    <div className="all-details"><p>Super BuildUp Area(sq2ft):</p> {itemDetails.area}</div>
                    <div className="all-details"><p>Monthly Maintenance:</p> {itemDetails.maintenance}</div>
                    <div className="all-details"><p>Total Floor:</p> {itemDetails.floor}</div>
                    <div className="all-details"><p>Floor No:</p> {itemDetails.floorNo}</div>
                    <div className="all-details"><p>Car Parking:</p> {itemDetails.carParking}</div>
                    <div className="all-details"><p>Facing:</p> {itemDetails.facing}</div>
                </div>
            </div>

            <div className="item-detail-other-details">
                <div className="heading">
                    <h2>
                        <span>Description</span>
                    </h2>
                </div>
                <p>{itemDetails.description}</p>
            </div>
        </div>
    );

};

export default ItemDetailPage;
