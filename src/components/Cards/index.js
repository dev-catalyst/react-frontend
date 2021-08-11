import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { apiGetHomeImages } from "../utility/apiUrls";
import Backdrop from "../Loader";

export default function Cards() {
  const classes = useStyles();

  const [cardsData, setCardsData] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getCardsData();
  }, []);
  async function getCardsData(body) {
    setLoader(true);
    try {
      let res = await axios.get(apiGetHomeImages, body);
      if (res.data.Success) {
        setCardsData(res.data.data.data);
        setLoader(false);
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <Backdrop open={loader} />
      <div className={classes.cardContainer}>
        {cardsData.length > 0
          ? cardsData.map((data, index) => {
              return (
                <Card className={classes.root} key={index}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image={`${process.env.REACT_APP_API_URL}${data.path.replace(".", "")}`}
                    />
                    <CardContent>
                      <Typography variant="body2" color="textSecondary" component="p">
                        {data.description ? data.description : ""}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              );
            })
          : null}
      </div>
    </>
  );
}

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  cardContainer: {
    padding: "8%",
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "60px",
    "@media screen and (max-width: 992px)": {
      gridTemplateColumns: "1fr 1fr",
    },
    "@media screen and (max-width: 540px)": {
      gridTemplateColumns: "1fr",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
    },
  },
});
