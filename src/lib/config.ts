type Config = {
  version: string;
  swapiHost: string;
  isMock(): boolean;
};

const version = "v0.1.5";

let config: Config | undefined = undefined;

export default function getConfig(): Config {
  if (config) return config;
  const swapiHost = process.env.NEXT_PUBLIC_SWAPI_HOST ?? "mock";
  config = {
    version,
    swapiHost,
    isMock() {
      return !this.swapiHost.startsWith("http");
    },
  };
  return config;
}
