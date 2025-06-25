import React from "react";

function MenuListNew({ menu, onItemClick, setSelectedImage }) {
  return (
    <div className="row">
      {menu.map((item, index) => (
        <div key={index} className="col-md-4 mb-4">
          <div className="card">
            <img
              src={`${process.env.PUBLIC_URL}/img/menu/${item.img}`}
              alt={item.category}
              className="card-img-top img-fluid"
              style={{ cursor: "pointer" }}
              onClick={() => onItemClick(item)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default MenuListNew;
