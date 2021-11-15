import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ProductDetails.css";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import HomeIcon from "./Components/HomeIcon"


function ProductDetails() {
  const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
    },
    media: {
      height: "30vh",
      paddingTop: "56.25%", // 16:9
      maxWidth: "50vw",
      margin: "auto"
      
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    avatar: {
    },
  }));
  const { id } = useParams();
  const [infData, setInfData] = useState([]);
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setInfData(data);
      });
  }, [id]);
  //<Card className={classes.root}>

  return (
    <div>
      <Link to="/">
        {" "}
        <div >
          <HomeIcon  className="HomeIcon" />
        </div>
      </Link>
      <Card className="card">
        <CardHeader
          avatar={
            <Avatar aria-label="recipe"   className={classes.avatar}></Avatar>
          }

          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={infData.title}
        />
        <CardMedia
          className={classes.media}
          image={infData.image}
          title={infData.title}
          style={{ image: classes.image }}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            <p className="price">Price: ${infData.price}</p>
            <p>{infData.description}</p>
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>

          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Description:</Typography>
            <Typography paragraph>{infData.description}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
}
export default ProductDetails;
