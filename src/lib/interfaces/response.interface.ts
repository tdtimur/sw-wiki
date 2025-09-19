/**
 * A typed wrapper around the standard Fetch API `Response`.
 *
 * The only difference is that `json()` is strongly typed to return `T`,
 * instead of `any`. All other `Response` fields are preserved (except `json` itself).
 *
 * @typeParam T - The shape of the JSON payload.
 *
 * @example
 * ```ts
 * const response: JsonResponse<User> = await fetch("/api/user/1") as JsonResponse<User>;
 * const user = await response.json(); // user is typed as `User`
 * ```
 */
export type JsonResponse<T> = Omit<Response, "json"> & {
  /** Returns the response body as a typed JSON object. */
  json(): Promise<T>;
};

/**
 * Create a mock `JsonResponse` for testing purposes.
 *
 * @param data - The JSON payload to wrap.
 * @param ok - Whether the response should be marked as successful (`true` = 200 OK, `false` = 400 Bad Request). Defaults to `true`.
 * @returns A mock `JsonResponse<T>` object with a typed `json()` method.
 *
 * @example
 * ```ts
 * type Person = { name: string }
 * const mock = mockResponse<Person>({ name: "Luke Skywalker" });
 * console.log((await mock.json()).name); // "Luke Skywalker"
 * ```
 */
export function mockResponse<T>(data: T, ok = true): JsonResponse<T> {
  return {
    ok,
    status: ok ? 200 : 400,
    statusText: ok ? "OK" : "Bad Request",
    headers: new Headers(),
    redirected: false,
    type: "basic",
    url: "",
    body: null,
    bodyUsed: false,
    clone: () => mockResponse(data, ok),
    arrayBuffer: async () => new ArrayBuffer(0),
    blob: async () => new Blob(),
    formData: async () => new FormData(),
    text: async () => JSON.stringify(data),
    json: async () => data,
  } as JsonResponse<T>;
}
