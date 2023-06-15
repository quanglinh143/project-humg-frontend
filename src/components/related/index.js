import React, { useRef, useState } from "react"
import NotFound from "utils/NotFound"
import ArrowButton from "atomics/arrow-button"
import { Carousel } from "antd"
import ProductItem from "components/products/ProductItem"

import classes from "./Related.module.scss"

const Related = ({ data, text, description }) => {
 const carouselRef = useRef()
 const settings = {
  infinite: true,
  slidesToShow: data.length > 4 ? 4 : data.length,
  slidesToScroll: 1,

  style: {
   margin: "0 16px",
  },
  responsive: [
   {
    breakpoint: 1300,
    settings: {
     slidesToShow: data.length > 3 ? 3 : data.length,
    },
   },
   {
    breakpoint: 1024,
    settings: {
     slidesToShow: data.length > 2 ? 2 : data.length,
    },
   },
   {
    breakpoint: 860,
    settings: {
     slidesToShow: 1,
    },
   },
  ],
 }
 const handlePrevSlide = () => {
  carouselRef.current.prev()
 }
 const handleNextSlide = () => {
  carouselRef.current.next()
 }

 return (
  <div className={classes.related}>
   <div className={classes.related_headContent}>
    <h2 className={classes.related_title}>{text}</h2>
    {data?.length > 0 && (
     <ArrowButton
      onHandlePrevSlide={handlePrevSlide}
      onHandleNextSlide={handleNextSlide}
     />
    )}
   </div>
   <div>
    {data?.length > 0 ? (
     <Carousel
      ref={carouselRef}
      {...settings}
      className={classes.related_slider}
     >
      {data?.map((product) => {
       return <ProductItem key={product._id} product={product} />
      })}
     </Carousel>
    ) : (
     <NotFound description={description} />
    )}
   </div>
  </div>
 )
}

export default Related
