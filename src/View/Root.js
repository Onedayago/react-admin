import React from 'react'
import { renderRoutes } from "react-router-config";

const Root =({route})=>{
  return(
    <div>
      {/* child routes won't render without this */}
      {renderRoutes(route.routes)}
    </div>
  )
}

export default Root
