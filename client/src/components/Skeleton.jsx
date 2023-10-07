import React from "react"
import Skeleton from "react-loading-skeleton";

const CustomSkeleton = ({ errorMessage }) => {
    return (
        <div id="Skeleton" className="col p-2">
            {errorMessage ? `Error: ${errorMessage}` : 'Loading:'} <Skeleton count={5}/>
            {!errorMessage && <Skeleton count={5} />}
        </div>
    )
}

export default CustomSkeleton