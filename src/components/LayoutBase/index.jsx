import { Layout } from "antd"
import Header from "components/LayoutBase/header"
import Footer from "components/LayoutBase/footer"
import classes from "./LayoutBase.module.scss"
const { Content } = Layout
const LayoutBase = ({ children }) => {
 return (
  <div>
   <Header />
   <Content className={classes.content}>{children}</Content>
   <Footer />
  </div>
 )
}

export default LayoutBase
