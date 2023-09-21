import { get } from "lodash";
import { Request, Response, NextFunction } from "express";
import { decode } from "../util/jwt.util";
import { reIssueAccessToken } from "../services/session.service";

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = (get(req, "headers.authorization", "") as string).replace(
    /^Bearer\s/,
    ""
  );


  const refreshToken = get(req, "headers.x-refresh") as string;


  console.log(`Value of refreshToken is ${refreshToken}`);

  if (!accessToken) return next();

  const { decoded, expired } = decode(accessToken);

   console.log(`Old decoded value is ${decoded}`);

  if (decoded) {
    // @ts-ignore
    req.user = decoded;

    return next();

  }

  if (expired && refreshToken) {

    const newAccessToken = await reIssueAccessToken({ refreshToken  });

    if (newAccessToken) {
      // Add the new access token to the response header
      res.setHeader("x-access-token", newAccessToken);

      const { decoded } = decode(newAccessToken);

      console.log(`New Decoded value is ${decoded}`);

      // @ts-ignore
      req.user = decoded;
    }

    return next();
  }

  return next();
};

export default deserializeUser;
