import React, { useState } from 'react'

function mukeem() {

    const [harry ,setharry]=useState("mukeem");

    const handelper = ()=>{

        setharry("riyaz")
    }


  return {

    harry,
    handelper

  }
}

export default mukeem
