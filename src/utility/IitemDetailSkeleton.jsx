import React from "react";
import { Skeleton } from "@mui/material";

const ItemDetailSkeleton = () => {
    return (
        <div className="item-detail-main">
            <div className="item-detail">
                <div className="item-detail-imgs">
                    <Skeleton variant="rectangular" animation='wave' width={600} height={500} />
                </div>
                <div className="item-detail-body">
                    <div className="item-detail-basic">
                        <div className="item-detail-price">
                            <Skeleton variant="text" animation='wave' width={150} height={40} />
                        </div>
                        <div className="item-detail-tittle">
                            <Skeleton variant="text" animation='wave' width={250} height={30} />
                        </div>
                        <div className="item-detail-row-space-between">
                            <Skeleton variant="text"animation='wave' width={100} height={25} />
                            <Skeleton variant="text"animation='wave' width={100} height={25} />
                        </div>
                    </div>
                    <div className="item-detail-author">
                        <div className="item-detail-author-name">
                            <Skeleton variant="text" animation='wave'width={150} height={40} />
                        </div>
                        <div className="item-detial-contact-button">
                            <Skeleton animation='wave'  width={150} height={80} />
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
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((_, index) => (
                        <div className="all-details" key={index} >
                            <Skeleton variant="text" width={150} height={40} />
                            <Skeleton variant="text" width={100} height={40} />
                        </div>
                    ))}
                </div>
            </div>

            <div className="item-detail-other-details">
                <div className="heading">
                    <h2>
                        <span>Description</span>
                    </h2>
                </div>
                <Skeleton variant="text" width={300} height={100} />
            </div>
        </div>
    );
};

export default ItemDetailSkeleton;
