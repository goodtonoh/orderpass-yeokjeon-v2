import React from "react";
import { supabase } from "../lib/supabaseClient";

function MenuList({ menu, setSelectedImage }) {
  const handleClick = async (item) => {
    // Modal Popup
    setSelectedImage(`${process.env.PUBLIC_URL}/img/menu/${item.popupImg}`);

    // DB 
    const { error } = await supabase
      .rpc('increment_click', {
        menu_name: item.name,
        menu_category: item.category
      });

    if (error) {
      console.error("DB 저장 오류:", error.message);
    }
  };
  

  return (
    <div className="row">
      {menu.map((item, index) => (
        <div key={index} className="col-md-4 mb-4">
          <div className="card">
            <img
              src={`${process.env.PUBLIC_URL}/img/menu/${item.img}`}
              alt={item.category}
              className="card-img-top img-fluid"
              onClick={() => handleClick(item)}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default MenuList;
