import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptions,
} from "passport-jwt";
import { JWT_SECRET_KEY } from "@/util/jwt";

// デフォルト認証
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      session: false,
    },
    (email, password, done) => {
      if (email === "test@example.com" && password === "password") {
        return done(null, { id: 1, email });
      } else {
        return done(null, false, {
          message: "メールアドレスまたはパスワードが誤っています",
        });
      }
    }
  )
);

// JWT認証
const jwtOptions: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET_KEY,
};
passport.use(
  new JwtStrategy(jwtOptions, (jwtPayload, done) => {
    done(null, jwtPayload);
  })
);

export default passport;
