import axios from "axios";

const yelpFusionBaseURL = process.env.YELP_FUSION_API_URL;

/*
Make a GET request to Yelp Fusion API
for businesses based on keyword term, longitude, latitude
*/
export async function getRelatedBusinesses(term, longitude='', latitude='') {
  try {
    // check if latitude and longitude are not null

    console.log("yelpFusionBaseURL", yelpFusionBaseURL);
    const result = await axios.get(`${yelpFusionBaseURL}/businesses/search?term=${term}`,
      {'headers': {'Authorization': `Bearer ${process.env.YELP_API_KEY}`}
    });
  } catch (ex) {

  }
}

// helper function
