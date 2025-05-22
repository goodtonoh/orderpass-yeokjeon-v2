import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import MenuList from "./components/MenuList";
import Modal from "./components/Modal";
import { CheckoutPage } from "./components/Checkout";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

function App() {
  const [menu, setMenu] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/menuData.json`)
      .then((res) => res.json())
      .then((data) => setMenu(data))
      .catch((err) => console.error("메뉴 데이터를 불러오지 못했습니다", err));
  }, []);
  
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  

  return (
    <div className="container mt-4">
      <Routes>
        <Route 
          path="/" 
          element={
            <>
            {/* 🔥 선결제 */}
            <button 
              onClick={() => navigate("/checkout")} 
              className="payment-text-button"
              style={{ marginBottom: "20px" }}
            >
              💳 1000원 결제하기
            </button>
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

            {/* <h1 className="text-center">🍗 메뉴 🍗</h1> */}
            {/* 🔥 메뉴 리스트 */}
            <div id="main">
              <h2 className="menu-title">대표메뉴</h2>
              <MenuList menu={menu.filter((item) => item.category === "대표메뉴")} setSelectedImage={setSelectedImage} />
            </div>

            <div id="newMenu">
              <h2 className="menu-title">신메뉴</h2>
              <MenuList menu={menu.filter((item) => item.category === "신메뉴")} setSelectedImage={setSelectedImage} />
            </div>

            <div id="comboMenu">
              <h2 className="menu-title">세트메뉴</h2>
              <MenuList menu={menu.filter((item) => item.category === "세트메뉴")} setSelectedImage={setSelectedImage} />
            </div>

            <div id="sides">
              <h2 className="menu-title">안주류</h2>
              <MenuList menu={menu.filter((item) => item.category === "안주류")} setSelectedImage={setSelectedImage} />
            </div>

            <div id="fries">
              <h2 className="menu-title">튀김류</h2>
              <MenuList menu={menu.filter((item) => item.category === "튀김류")} setSelectedImage={setSelectedImage} />
            </div>

            <div id="soups">
              <h2 className="menu-title">탕류</h2>
              <MenuList menu={menu.filter((item) => item.category === "탕류")} setSelectedImage={setSelectedImage} />
            </div>

            <div id="snacks">
              <h2 className="menu-title">마른안주</h2>
              <MenuList menu={menu.filter((item) => item.category === "마른안주")} setSelectedImage={setSelectedImage} />
            </div>

            <div id="beer">
              <h2 className="menu-title">주류</h2>
              <MenuList menu={menu.filter((item) => item.category === "주류")} setSelectedImage={setSelectedImage} />
            </div>

            <div id="drinks">
              <h2 className="menu-title">음료</h2>
              <MenuList menu={menu.filter((item) => item.category === "음료")} setSelectedImage={setSelectedImage} />
            </div>

            {selectedImage && <Modal img={selectedImage} onClose={() => setSelectedImage(null)} />}
            </>
          } 
        />
      {/* 🔥 Checkout 페이지 설정 */}
      <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </div>
  );
}

export default App;
