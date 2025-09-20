type Config = {
  version: string;
  swapiHost: string;
};

const version = "v0.1.3";

let config: Config | undefined = undefined;

export default function getConfig(): Config {
  if (config) return config;
  const swapiHost = process.env.NEXT_PUBLIC_SWAPI_HOST ?? "mock";
  config = {
    version,
    swapiHost,
  };
  return config;
}
