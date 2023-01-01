import { Card ,CardContent , Typography } from '@material-ui/core'
import React from 'react'
import './Table.css'

const InfoBox = ({title , cases , total}) => {
  return (
    <Card className = "infobox" style={{"background-color" : "#D3D3D3"}}>
        <CardContent>
            <Typography className='infoBox__title' color="textSecondary">
                {title}
            </Typography>
            
            <div className='infoBox__cases'>{cases} Today</div>

            <Typography className = "infoBox__total" color="textSecondary">
                <h3>{total} Total</h3>
            </Typography>
        </CardContent>
    </Card>
  )
}

export default InfoBox
