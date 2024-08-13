const fetchData = async (apiurl, method = 'GET', bodydata = null, headers = {}, params = null) => {
  let url = apiurl;
  if (params) {
    const query = new URLSearchParams(params).toString();
    url += `?${query}`;
  }

  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (bodydata) {
    options.body = JSON.stringify(bodydata);
  }

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error: 'Der er opstået en fejl: ' + error.message };
  }
};

export default fetchData;
