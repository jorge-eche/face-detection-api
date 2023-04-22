export const handleApiCall = (req, res) => {
  const returnClarifaiRequestOptions = (imageURL) => {
    console.log("imageURL", imageURL);
    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = "100d7e616b544154a64cf0c855c3ce67";
    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = "jecheverria";
    const APP_ID = "SmartBrainAus";
    // Change these to whatever model and image URL you want to use
    const MODEL_ID = "face-detection";
    const IMAGE_URL = imageURL;

    const raw = JSON.stringify({
      user_app_id: {
        user_id: USER_ID,
        app_id: APP_ID,
      },
      inputs: [
        {
          data: {
            image: {
              url: IMAGE_URL,
            },
          },
        },
      ],
    });

    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Key " + PAT,
      },
      body: raw,
    };

    return requestOptions;
  };

  fetch(
    "https://api.clarifai.com/v2/models/" + "face-detection" + "/outputs",
    returnClarifaiRequestOptions(req.body.input)
  )
    .then((response) => response.json())
    .then((data) => {
      res.json(data);
    });
};

export const handleImage = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => res.json(entries[0].entries))
    .catch((err) => res.status(400).json("unable to get entries"));
};
