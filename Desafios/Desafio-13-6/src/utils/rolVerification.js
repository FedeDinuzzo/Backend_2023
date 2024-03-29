export const roleVerification = (roles) => {

  return async (req, res, next) => {
    let bandera = 0
    let userAccess = {}
    if (req.user.user[0]) {
      userAccess = req.user.user[0]
    } else {
      userAccess = req.user.user
    }

    if (!req.user) {
      return res.status(401).send({ error: "User not authorized" })
    }

    if (!roles.includes(userAccess.rol)) {
      return bandera = 1              
    }

    if (bandera == 1) {
      return res.status(401).send({ error: "User without permissions" })
    }

    next()
  }
} 