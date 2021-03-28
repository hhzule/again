import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
      minWidth: 155,
      maxWidth: 250,
      textAlign: "center"
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 10,
    },
    heading:{
        textAlign: "center"

    }
  });


export default function UserInput({weather, weatherData}) {
  
    const classes = useStyles();
    
    return(
        <div>
{weather && <div>    <Typography className={classes.heading} variant="body" component="h1">
           Current Weather
         
        </Typography>
          <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
         {new Date().toISOString()}
        </Typography>
        <Typography variant="h5" component="h2">
          Temp:   <Typography variant="h6" component="h4">
        {weather}
        </Typography>
        </Typography>
    
      </CardContent>
   
    </Card></div> 
}
{weatherData && <div> <Typography  className={classes.heading} variant="body" component="h1">
           Weather Data
         
        </Typography>
{weatherData.map((item, i)=>{
    return (
        
        <div key={i}>
            <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
         {item.date}
        </Typography>
        <Typography variant="h5" component="h2">
          Temp: <Typography variant="h6" component="h4">
        {item.temp}
        </Typography>
        </Typography>
    
      </CardContent>
   
    </Card>
       
        </div>
    )
})}
</div>
}
        </div>
    )
}