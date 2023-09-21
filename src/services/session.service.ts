// Implementing the service
import { UpdateQuery, FilterQuery } from "mongoose";
import Session, { SessionDocument } from "../models/session.model";
import { FlattenMaps, Types } from "mongoose";
import { UserDocument } from "../models/user.model";
import { sign, decode } from "../util/jwt.util";
import { findUser } from "./user.service";
import config from "config";
import { get } from "lodash";

export async function createSession(userId: string, userAgent: string) {
  const session = await Session.create({
    user: userId,
    userAgent: userAgent,
  });

  return session.toJSON();

}

// function to create an acess token
export async function createAccessToken({
  user,
  session,
}: {
  user: UserDocument | Omit<UserDocument, "password">;
  session: FlattenMaps<SessionDocument & { _id: Types.ObjectId }>;
}) {
  return sign(
    { ...user, session: session._id },
    { expiresIn: config.get("accessTokenTtl") }
  );
}

export async function reIssueAccessToken({
  refreshToken,
}: {
  refreshToken: string;
}) {
  

  // Decode the refresh token
  const { decoded } = decode(refreshToken);

  if (!decoded || !get(decoded, "_id")) return false;

  // Get the session
  const sessionResult = await Session.findById(get(decoded, "_id"));

  const session = sessionResult?.toJSON();

  // Make sure the session is still valid
  if (!session || !session?.valid) return false;

  const users = await findUser({ _id: session.user }, "-password");

  if (!users) return false;

  const accessToken = createAccessToken({ user: users[0], session: session });

  return accessToken;

}

export async function updateUserSession(
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>
) {
  return Session.updateOne(query, update);
}
