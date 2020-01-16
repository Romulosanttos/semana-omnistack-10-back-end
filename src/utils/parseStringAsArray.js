module.exports = array => {
  return array.split(",").map(obj => obj.trim());
};
