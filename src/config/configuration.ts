import * as process from "process";

export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432
  },
  jwt_secret: "THIS_IS_MY_SECRET_TOKEN",
  MAPBOX_API_KEY: "pk.eyJ1IjoiYWJic2VudCIsImEiOiJjbGY5anppYzAxYnhtNDRwYzN6djU4eTVjIn0.h7hX7UQt5oeFP8MdTlbnKA",
  SQUARE_UP_ACCESS_TOKEN:process.env.SQUARE_UP_ACCESS_TOKEN
});
