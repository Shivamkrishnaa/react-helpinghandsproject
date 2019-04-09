module.exports = {
  database:
    process.env.DATABASE ||
    "mongodb://shivam:shivam14@ds145704.mlab.com:45704/helpinghands",
  port: process.env.PORT || 4444,
  secret: process.env.SECRET || "helloo"
};
