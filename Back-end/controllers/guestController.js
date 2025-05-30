const Guest = require('../models/Guest');

exports.getGuests = async (req, res) => {
  const guests = await Guest.find();
  res.json(guests);
};

exports.addGuest = async (req, res) => {
  const guest = new Guest(req.body);
  await guest.save();
  res.status(201).json(guest);
};

exports.deleteGuest = async (req, res) => {
  await Guest.findByIdAndDelete(req.params.id);
  res.status(204).end();
};
