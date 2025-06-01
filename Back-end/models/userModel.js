const findUserByEmail = (email, callback) => {
  const adminEmail = "admin@empresa.com"
  const adminPassword = "admin123"

  if (email === adminEmail) {
    callback(null, [{ id: 1, email: adminEmail, senha: adminPassword }])
  } else {
    callback(null, [])
  }
}

module.exports = { findUserByEmail }
