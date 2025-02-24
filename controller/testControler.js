const testUserController = (req, res) => {
  try {
    res.setHeader(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, private"
    );
    res.status(200).send({
      success: true,
      message: "test user data API",
    });
  } catch (error) {
    console.log("Error in test API");
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
};
module.exports = { testUserController };
