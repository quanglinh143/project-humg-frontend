import React from "react"
import { Modal, Button, Checkbox } from "antd"
import classes from "./ModalDeleteItem.module.scss"

const ModalDeleteItem = ({
 isModalOpen,
 handleConfirm,
 handleCancel,
 text,
}) => {
 return (
  <Modal
   open
   title="Remove the product"
   className={classes.modalUpdate}
   onCancel={handleCancel}
   footer={[
    <Button
     key="1"
     className={classes.modalUpdate_confirm}
     onClick={handleConfirm}
    >
     Confirm
    </Button>,
    <Button
     key="2"
     className={classes.modalUpdate_cancel}
     onClick={handleCancel}
    >
     Cancel
    </Button>,
   ]}
  >
   <div>
    Are you sure you want to remove?{" "}
    <span className={classes.modalUpdate_title}>{text}</span>?
   </div>
  </Modal>
 )
}

export default ModalDeleteItem
