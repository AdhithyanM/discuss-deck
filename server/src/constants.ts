import config from "config";

export const __prod__ = config.get("env") === "production";
