import React from "react";
import "./CategoryCard.css"

const CategoryCard = ({name, icon}) => {
    return(
        <div className="category-card">
            <div className="category-icon">{icon}</div>
            <span className="category-name">{name}</span>
        </div>
    );
}

export default CategoryCard;