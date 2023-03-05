interface requestOptions {
  url: string;
  /** @defaultValue 'get' */
  method?: string;
  body?: object;
  qs?: object;
  contentType?: string;
}

const fetchData = async (params: requestOptions) => {
  // console.log(params)
  const {
    url,
    method = 'GET',
    body,
    qs,
    contentType = 'application/json',
  } = params;

  let qsStr = '';
  if (qs && Object.keys(qs).length) {
    const qsObj = new URLSearchParams(qs as any);
    qsStr = qsObj.toString();
  }

  const opt = {
    method,
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      'Content-Type': contentType,
    },
    credentials: 'include' as RequestCredentials,
  };

  const res = await fetch(`${process.env.API_URL}${url}?${qsStr}`, opt);
  if (res.status >= 400) {
    // if (res.status === 401) {
    //   // eventHandler(events.LOGIN_NEED, '请先登录')
    //   return (window.location.href = '/');
    // }
    // return eventHandler(events.FETCH_FAILED, res.statusText)
  }
  // console.log(res.statusCode)
  return res.json();
};

export default fetchData;
