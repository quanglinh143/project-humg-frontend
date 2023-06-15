import React, { useContext, useMemo } from "react"
import { Skeleton, Slider } from "antd"
import { GlobalState } from "GlobalState"

import classes from "./SideMenu.module.scss"
const SideMenu = () => {
 const values = useContext(GlobalState)
 const [filter, setFilter] = values.productsApi.isFilter
 const [brands] = values.sideMenuApi.isBrands
 const [categories] = values.sideMenuApi.isCategories
 const [loading] = values.sideMenuApi.isLoading
 const [_, setCurrentPage] = values.productsApi.isCurrentPage
 const handleBrandFilter = (event) => {
  const { value } = event.target
  if (filter.brand.includes(value)) {
   setFilter((prev) => {
    return {
     ...prev,
     brand: prev.brand.filter((v) => v !== value),
    }
   })
  } else {
   setFilter((prev) => {
    return {
     ...prev,
     brand: [...prev.brand, value],
    }
   })
  }
  setCurrentPage(0)
 }

 const handleCategoryFilter = (event) => {
  const { value } = event.target
  if (filter.category.includes(value)) {
   setFilter((prev) => {
    return {
     ...prev,
     category: prev.category.filter((v) => v !== value),
    }
   })
  } else {
   setFilter((prev) => {
    return {
     ...prev,
     category: [...prev.category, value],
    }
   })
  }
  setCurrentPage(0)
 }

 const handleChangeValuePrice = (value) => {
  setFilter((prev) => {
   return {
    ...prev,
    price: value,
   }
  })
  setCurrentPage(0)
 }

 const sideMenu = useMemo(() => {
  return [
   {
    filter: categories,
    title: "Thể loại",
    callback: handleCategoryFilter,
   },
   {
    filter: brands,
    title: "Nhãn hàng",
    callback: handleBrandFilter,
   },
  ]
 }, [categories, brands, filter])

 if (loading) return <Skeleton />

 return (
  <div className={classes.container}>
   {sideMenu &&
    sideMenu.map((item, index) => {
     return (
      <div className={classes.refinements} key={`${item.name} ${index}`}>
       <div className={classes.refinements_title}>{item.title}</div>
       <ul className={classes.refinements_list}>
        {item?.filter &&
         item?.filter?.map((child) => {
          return (
           <li className={classes.refinements_list_item} key={child._id}>
            <input
             type="checkbox"
             value={child?._id}
             onChange={item.callback}
             id={child?._id}
            />
            <label
             htmlFor={child?._id}
             className={classes.refinements_list_item_name}
            >
             {" "}
             {child?.name}
            </label>
           </li>
          )
         })}
       </ul>
      </div>
     )
    })}
   <div className={classes.priceRange}>
    <div className={classes.priceRange_title}>Khoảng giá</div>
    <Slider
     min={1}
     max={60000000}
     onChange={handleChangeValuePrice}
     defaultValue={60000000}
     className={classes.priceRange_slide}
    />
   </div>
  </div>
 )
}

export default SideMenu
