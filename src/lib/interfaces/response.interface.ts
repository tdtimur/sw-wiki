// a generic fetch response helper
export type JsonResponse<T> = Omit<Response, "json"> & {
  json(): Promise<T>;
};

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
