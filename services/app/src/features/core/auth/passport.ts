import passport from "passport";
import Exception from "@/util/exception/Exception";
import { Strategy as LocalStrategy, IVerifyOptions } from "passport-local";
import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptions as JwtStrategyOptions,
} from "passport-jwt";
import { JWT_SECRET_KEY } from "@/util/jwt";
import { compareSync } from "@/util/hash";
import { authRepository } from "@/container";

type DoneUser = ExpressRequestUser | false;
type Done = (error: any, user?: DoneUser, options?: IVerifyOptions) => void;

// デフォルト認証
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      session: false,
    },
    async (email, password, done: Done) => {
      try {
        const result = await authRepository.loginByEmail(email);
        if (!result)
          return done(
            new Exception("メールアドレスまたはパスワードが誤っています", 401)
          );

        if (!compareSync(password, result.credential))
          return done(
            new Exception("メールアドレスまたはパスワードが誤っています", 401)
          );

        return done(null, { id: result.id.value });
      } catch (error) {
        return done(error);
      }
    }
  )
);

// JWT認証
const jwtOptions: JwtStrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET_KEY,
};
passport.use(
  new JwtStrategy(jwtOptions, (jwtPayload, done) => {
    done(null, jwtPayload);
  })
);

export default passport;
