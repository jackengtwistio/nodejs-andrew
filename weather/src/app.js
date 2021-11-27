const express = require("express");
const path = require("path");
const hbs = require("hbs");
const getWeather = require("./utils/getWeather");
const geoCode = require("./utils/geoCode");
const app = express();
const port = 3000;

const viewPath = path.join(__dirname, "../public/views");
const partialPath = path.join(__dirname, "../public/partials");
const publicPath = path.join(__dirname, "../public");

app.set("view engine", "hbs");
app.set("views", viewPath);
app.use(express.static(publicPath));
hbs.registerPartials(partialPath);

app.get("/", (req, res) => {
  res.render("main", {
    title: "Welcome to weather page",
    user: "jack",
  });
});

app.get("/weather", (req, res) => {
  let location = req.query.location;
  const weatherBody = geoCode(location, (error, response) => {
    const { lat, lon } = response;
    if (error) {
      return console.log(`error: ${error}`);
    } else {
      getWeather(lat, lon, (error, weatherObj) => {
        if (error) {
          return res.send(error);
        } else {
          res.render("weather", {
            weatherObj,
            forecast: "forecast",
            location: location,
          });
        }
      });
    }
  });
  if (location) {
    weatherBody;
  } else {
    res.redirect("/pageNotFound");
  }
});

app.get("/about", (req, res) => {
  res.render("about", {
    user: "about",
  });
});

app.get("*", (req, res) => {
  res.render("pageNotFound");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
