import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import MenuListNew from '../components/MenuListNew';
import Modal from '../components/Modal';
import { supabase } from '../lib/supabaseClient';
import axios from 'axios';

function MainT1() {
  const { tableId } = useParams();
  const [menu, setMenu] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  // const navigate = useNavigate();

  useEffect(() => {
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/track-visit`)
      .catch(err => console.error('방문자 기록 실패', err));
  }, []);

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/menuData.json`)
      .then((res) => res.json())
      .then((data) => setMenu(data))
      .catch((err) => console.error("메뉴 데이터를 불러오지 못했습니다", err));
  }, []);

  const handleClick = async (item) => {
    setSelectedImage(`${process.env.PUBLIC_URL}/img/menu/${item.popupImg}`);

    const { error: updateError } = await supabase
      .rpc('increment_click', {
        menu_name: item.name,
        menu_category: item.category
      });

    const { error: insertError } = await supabase
      .from('menu_clicks')
      .insert({
        menu_id: item.id,
        menu_category: item.category,
        menu_name: item.name,
        table_name: tableId || 'unknown',
      });

    if (updateError || insertError) {
      console.error('DB 저장 오류:', updateError || insertError);
    }
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  
  return (
    <div className="container mt-4">
      
        {/* <button 
            onClick={() => navigate("/checkout")}
            className="payment-text-button"
            style={{ marginBottom: "20px" }}
        >
            💳 1000원 결제하기
        </button> */}

        {/* 🔥 상단 배너 */}
        <div className="text-center mb-4">
            <img
            src={`${process.env.PUBLIC_URL}/img/menu/topBanner.png`}
            alt="배너 이미지"
            style={{ width: "100%", maxHeight: "750px", objectFit: "cover", borderRadius: "10px" }}
            />
        </div>

        {/* 🔥 Navbar */}
        <nav className="navbar">
            <button onClick={() => scrollToSection("main")}>대표메뉴</button>
            <button onClick={() => scrollToSection("newMenu")}>신메뉴</button>
            <button onClick={() => scrollToSection("comboMenu")}>세트메뉴</button>
            <button onClick={() => scrollToSection("sides")}>안주류</button>
            <button onClick={() => scrollToSection("fries")}>튀김류</button>
            <button onClick={() => scrollToSection("soups")}>탕류</button>
            <button onClick={() => scrollToSection("snacks")}>마른안주</button>
            <button onClick={() => scrollToSection("beer")}>주류</button>
            <button onClick={() => scrollToSection("drinks")}>음료</button>
        </nav>

        {/* <h1 className="text-center">🍗 Menu 🍗</h1> */}
        {/* 🔥 메뉴 리스트 */}
        <div id="main">
            <h2 className="menu-title">대표메뉴</h2>
            <MenuListNew menu={menu.filter((item) => item.category === "대표메뉴")} onItemClick={handleClick} setSelectedImage={setSelectedImage} />
        </div>

        <div id="newMenu">
            <h2 className="menu-title">신메뉴</h2>
            <MenuListNew menu={menu.filter((item) => item.category === "신메뉴")} onItemClick={handleClick} setSelectedImage={setSelectedImage} />
        </div>

        <div id="comboMenu">
            <h2 className="menu-title">세트메뉴</h2>
            <MenuListNew menu={menu.filter((item) => item.category === "세트메뉴")} onItemClick={handleClick} setSelectedImage={setSelectedImage} />
        </div>

        <div id="sides">
            <h2 className="menu-title">안주류</h2>
            <MenuListNew menu={menu.filter((item) => item.category === "안주류")} onItemClick={handleClick} setSelectedImage={setSelectedImage} />
        </div>

        <div id="fries">
            <h2 className="menu-title">튀김류</h2>
            <MenuListNew menu={menu.filter((item) => item.category === "튀김류")} onItemClick={handleClick} setSelectedImage={setSelectedImage} />
        </div>

        <div id="soups">
            <h2 className="menu-title">탕류</h2>
            <MenuListNew menu={menu.filter((item) => item.category === "탕류")} onItemClick={handleClick} setSelectedImage={setSelectedImage} />
        </div>

        <div id="snacks">
            <h2 className="menu-title">마른안주</h2>
            <MenuListNew menu={menu.filter((item) => item.category === "마른안주")} onItemClick={handleClick} setSelectedImage={setSelectedImage} />
        </div>

        <div id="beer">
            <h2 className="menu-title">주류</h2>
            <MenuListNew menu={menu.filter((item) => item.category === "주류")} onItemClick={handleClick} setSelectedImage={setSelectedImage} />
        </div>

        <div id="drinks">
            <h2 className="menu-title">음료</h2>
            <MenuListNew menu={menu.filter((item) => item.category === "음료")} onItemClick={handleClick} setSelectedImage={setSelectedImage} />
        </div>

        {selectedImage && <Modal img={selectedImage} onClose={() => setSelectedImage(null)} />}
           
    </div>
  );
}

export default MainT1;
