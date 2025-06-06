import React from "react";
import "./CategoryCard.css";
import UseCategoryIcon from "../../../customhooks/useCategoryIcon";

const CategoryCard = ({ name, category }) => {
  const CategoryIcon = UseCategoryIcon(category);
  return (
    <div className="category-card">
      <div className="category-icon-container">
        <CategoryIcon className="category_icon" />
      </div>
      <span className="category-name">{name}</span>
    </div>
  );
};

export default CategoryCard;
