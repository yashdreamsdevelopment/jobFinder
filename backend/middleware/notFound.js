module.exports = (req, res) => {
  console.log("not found middleware");
  res.status(404).redirect("/404");
};
