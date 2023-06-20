import passport from "passport"

export const passportError = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, (error, user, info) => {
      if (error) { // Token errros (invalid token, invalid format, no exist)
        return next(error)
      }

      if (!user) {  // User dont exist
        return res.status(401).send({ error: info.message ? info.message : info.toString() })
      }

      req.user = user // If exist continue
      next()
    })(req, res, next)
  }
}