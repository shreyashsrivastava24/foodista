import React, { useEffect, useRef, useState } from 'react'
import Nav from './Nav'
import CategoryCard from './CategoryCard'
import { categories } from '../category'
import { FaCircleChevronLeft } from 'react-icons/fa6'
import { FaCircleChevronRight } from 'react-icons/fa6'
import { useSelector } from 'react-redux'
import FoodCard from './FoodCard'

function UserDashboard() {
  const { currentCity,shopsInMyCity,itemsInMyCity } = useSelector(state => state.user)
  const cateScrollRef = useRef()
  const shopScrollRef = useRef()
  const [showLeftCateButton, setShowLeftCateButton] = useState(false);
  const [showRightCateButton, setShowRightCateButton] = useState(false);
  const [showLeftShopButton, setShowLeftShopButton] = useState(false);
  const [showRightShopButton, setShowRightShopButton] = useState(false);

  const updateButton = (ref, setLeftButton, setRightButton) => {
    const element = ref.current;
    //client width means wo width jo hme dikh rhi
    // scroll width mtlb pure elem ki width
    if (element) {
      setLeftButton(element.scrollLeft > 0);
      setRightButton(element.scrollLeft + element.clientWidth < element.scrollWidth - 1); // -1 for precision...dikha k kya fayda jb hm aage bdh nhi pa rhe
    }
  };

  const scrollHandler = (ref, direction) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: direction == "left" ? -200 : 200,
        behavior: "smooth"
      })
    }
  }

  useEffect(() => {
  const cateElement = cateScrollRef.current;
  const shopElement = shopScrollRef.current;

  const handleCateScroll = () => {
    updateButton(cateScrollRef, setShowLeftCateButton, setShowRightCateButton);
  };

  const handleShopScroll = () => {
    updateButton(shopScrollRef, setShowLeftShopButton, setShowRightShopButton);
  };

  if (cateElement) {
    updateButton(cateScrollRef, setShowLeftCateButton, setShowRightCateButton);
    cateElement.addEventListener("scroll", handleCateScroll);
  }

  if (shopElement) {
    updateButton(shopScrollRef, setShowLeftShopButton, setShowRightShopButton);
    shopElement.addEventListener("scroll", handleShopScroll);
  }

  return () => {
    if (cateElement) {
      cateElement.removeEventListener("scroll", handleCateScroll);
    }

    if (shopElement) {
      shopElement.removeEventListener("scroll", handleShopScroll);
    }
  };
}, []);

  return (
    <div className='w-screen min-h-screen bg-[#fff9f6] flex flex-col gap-5 items-center overflow-y-auto'>
      <Nav />

      <div className='w-full max-w-6xl flex flex-col gap-5 items-start p-[10px] '>
        <h1 className='text-gray-800 text-2xl sm:text-3xl'>Inspiration for your first order</h1>
        <div className="w-full relative">
          {showLeftCateButton && <button className='absolute left-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10' onClick={() => scrollHandler(cateScrollRef, "left")}><FaCircleChevronLeft /></button>}

          <div className="'w-full flex overflow-x-auto gap-4 pb-2 " ref={cateScrollRef}>
            {categories?.map((cate, index) => {
              return <CategoryCard name={cate.category} image={cate.image} key={index} />
            })}
          </div>

          {showRightCateButton && <button className='absolute right-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10' onClick={() => scrollHandler(cateScrollRef, "right")}><FaCircleChevronRight /></button>}

        </div>
      </div>

      <div className='w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]'>
        <h1 className='text-gray-800 text-2xl sm:text-3xl'>Best Shops in {currentCity}</h1>
        <div className="w-full relative">
          {showLeftShopButton && <button className='absolute left-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10' onClick={() => scrollHandler(shopScrollRef, "left")}><FaCircleChevronLeft /></button>}

          <div className="'w-full flex overflow-x-auto gap-4 pb-2 " ref={shopScrollRef}>
            {shopsInMyCity?.map((shop, index) => {
              return <CategoryCard name={shop.name} image={shop.image} key={index} />
            })}
          </div>

          {showRightShopButton && <button className='absolute right-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10' onClick={() => scrollHandler(shopScrollRef, "right")}><FaCircleChevronRight /></button>}

        </div>
      </div>

      <div className='w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]'>
        <h1 className='text-gray-800 text-2xl sm:text-3xl'>Suggested Food Items</h1>
        <div className='w-full h-auto flex flex-wrap gap-[20px] justify-center'>
          {itemsInMyCity?.map((item,index)=>{
            return <FoodCard key={index} data={item}/>
          })}
        </div>
      </div>

    </div >
  )
}

export default UserDashboard