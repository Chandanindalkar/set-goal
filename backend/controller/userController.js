

const getMe = async (req, res) => {
    res.json({message: 'user data display'})
  })




module.exports = {
    registerUser,
    loginUser,
    getMe,
  }