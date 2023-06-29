export const roleVerification = (roles) => {

  return async (req, res, next) => {
    let bandera = 0
    let userAccess = {}
    if (req.user.user[0]) {
      userAccess = req.user.user[0]
    } else{
      userAccess = req.user.user
    }

    if (!req.user) {
      return res.status(401).send({ error: "User not authorized" })
    }
    roles.forEach(rolEnviado => {
      if (userAccess.rol != rolEnviado) { // The user does not have the required role for this route and this role
        return bandera = 1              
      }
    })

    if (bandera == 1) {
      return res.status(401).send({ error: "User without permissions" })
    }

    next()
  }
} 