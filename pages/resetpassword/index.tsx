import React from 'react'
import Button from '../../components/common/button/Button'
import Fields from '../../components/common/fields/Fields'
import style from '../resetpassword/Reset.module.css'
const index = () => {
  return (
    <>
    <div className={style.reset_header}>
       <div className={style.reset_card}>
          <div className={style.reset_content}>
            <h1 className={style.reset_h1}>Reset Your Password</h1>
            <h3 className={style.reset_h3}>Enter your new password below.</h3>
            <Fields type='password' content="New password" placeholder="Enter your password"  />
            <Fields type='password' content="Confirm new password" placeholder="Enter your password"  />
            <div className={style.reset_btns}>
            <Button data="Reset" />
           </div>
          </div>
       </div>
    </div>
    <div className={style.reset_section}></div>
   </>
  )
}

export default index
