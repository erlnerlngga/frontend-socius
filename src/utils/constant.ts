function URL_IMAGE_UPLOAD(): string {
  if (process.env.URL_IMAGE_UPLOAD !== undefined) {
    return process.env.URL_IMAGE_UPLOAD;
  }

  return "";
}

function URL_API(): string {
  if (process.env.URL_API !== undefined) {
    return process.env.URL_API;
  }

  return "";
}

function WS_URL(): string {
  if (process.env.WS_URL !== undefined) {
    return process.env.WS_URL;
  }

  return "";
}

function URL_THIS(): string {
  if (process.env.URL_THIS !== undefined) {
    return process.env.URL_THIS;
  }

  return "";
}

const env = {
  url_image: URL_IMAGE_UPLOAD(),
  url_api: URL_API(),
  url_this: URL_THIS(),
  url_ws: WS_URL(),
};

export default env;
