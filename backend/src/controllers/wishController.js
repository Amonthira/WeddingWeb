const Wish = require('../models/Wish');

const createWish = async (req, res) => {
  try {
    let { guestName, message } = req.body;

    guestName = guestName?.trim();
    message = message?.trim();

    if (!guestName || !message) {
      return res.status(400).json({
        success: false,
        message: 'Guest name and message are required',
      });
    }

    if (guestName.length > 80) {
      return res.status(400).json({
        success: false,
        message: 'Guest name must not exceed 80 characters',
      });
    }

    if (message.length > 500) {
      return res.status(400).json({
        success: false,
        message: 'Message must not exceed 500 characters',
      });
    }

    const newWish = await Wish.create({
      guestName,
      message,
    });

    
const io = req.app.get("io");
io.emit("newWish", newWish);

    return res.status(201).json({
      success: true,
      message: 'Wish submitted successfully',
      data: newWish,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

const getWishes = async (req, res) => {
  try {
    const wishes = await Wish.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: wishes.length,
      data: wishes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};


module.exports = {
  createWish,
  getWishes,
};