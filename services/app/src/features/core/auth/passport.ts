import passport from "passport";
import Exception from "@/util/exception/Exception";
import AuthCredential from "./domain/model/AuthCredential";
import { Strategy as LocalStrategy, IVerifyOptions } from "passport-local";
import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptions as JwtStrategyOptions,
} from "passport-jwt";
import { Strategy as GithubStrategy } from "passport-github2";
import { JWT_SECRET_KEY } from "@/util/jwt";
import { compareSync } from "@/util/hash";
import { authRepository } from "@/container";
import { GeneratedId } from "@/features/shared/Id";

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
        const result: AuthCredential<GeneratedId> | null =
          await authRepository.loginByEmail(email); // VSCodeの不具合で補完が効かなくなることがあるため、型を明示的に指定
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

// Github認証
passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID ?? "INVALID_CLIENT_ID",
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "INVALID_CLIENT_SECRET",
      callbackURL: "http://localhost:3001/api/v1/auth/github/callback",
    },
    async (accessToken: string, _: string, profile: any, done: Done) => {
      try {
        const result = await authRepository.authByGithub(
          profile.username,
          profile.id,
          accessToken
        );
        return done(null, { id: result.id.value });
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;
