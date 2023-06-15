import React, { useContext, useEffect, useState } from "react"
import Loading from "utils/Loading"
import ProductItem from "./ProductItem"
import NotFound from "utils/NotFound"
import Paginate from "components/paginate"
import DailyDiscover from "components/dailyDiscover"
import { GlobalState } from "GlobalState.js"

import classes from "./Products.module.scss"

const Products = () => {
 const values = useContext(GlobalState)
 const [products] = values.productsApi.products
 const [loading] = values.productsApi.isLoading
 const [totalProducts] = values.productsApi.isTotal
 const [isCheck, setIsCheck] = useState(false)

 const [pageCount] = values.productsApi.isPageCount
 const [currentPage, setCurrentPage] = values.productsApi.isCurrentPage
 const handlePageClick = async (e) => {
  setCurrentPage(e.selected)
 }
 useEffect(() => {
  window.scrollTo(0, 0)
 }, [currentPage])

 if (loading)
  return (
   <div className={classes.loading}>
    <Loading />
   </div>
  )
 return (
  <div className={classes.container}>
   {totalProducts > 0 && (
    <div className={classes.notiResult}>
     Bạn có &nbsp; <span>{totalProducts}</span> &nbsp; sản phẩm có sẵn
    </div>
   )}

   {products && products.length !== 0 ? (
    <>
     <div className={classes.item}>
      {products.map((product) => {
       return (
        <ProductItem
         product={product}
         key={product._id}
         isCheck={isCheck}
         onSetIsCheck={setIsCheck}
        />
       )
      })}
     </div>
     <Paginate
      onHandlePageClick={handlePageClick}
      pageCount={pageCount}
      currentPage={currentPage}
     />
    </>
   ) : (
    <div className={classes.notfound}>
     <NotFound />
    </div>
   )}
   <DailyDiscover />
  </div>
 )
}

export default Products
