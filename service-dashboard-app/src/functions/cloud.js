export const getAccessToken = () => {
  const params = {
    grant_type: "password",
    username: "api.demo2",
    password: "8u2VDw3ATu3SKBn",
  };

  const init = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: JSON.stringify(params),
    mode: "no-cors",
    // cache: "default",
  };

  const request = new Request("https://api.uptimeworks.com/auth/token", init);
  return request;
};

export const getMeasurementPoints = (token, siteID) => {
  const init = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      companyId: "0771cc5c-4c4c-4b87-be5c-6819a7357155",
      Authorization: `Bearer ${token}`,
    },
    mode: "cors",
    cache: "default",
  };

  const request = new Request(
    `https://api.uptimeworks.com/api/v1/point/listpoints/${siteID}/`,
    init
  );
  return request;
};

export const getMeasurementsUTC = (token, pointID, timestamp) => {
  const init = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      companyId: "0771cc5c-4c4c-4b87-be5c-6819a7357155",
      Authorization: `Bearer ${token}`,
    },
    mode: "cors",
    cache: "default",
  };

  const request = new Request(
    `https://api.uptimeworks.com/api/v1/point/readingsbyutcdatetime/${pointID}/${timestamp}`,
    init
  );
  return request;
};

export const getMeasurementsUNIX = (token, pointID, timestamp) => {
  const init = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      companyId: "0771cc5c-4c4c-4b87-be5c-6819a7357155",
      Authorization: `Bearer ${token}`,
    },
    mode: "cors",
    cache: "default",
  };

  const request = new Request(
    `https://api.uptimeworks.com/api/v1/point/readingsbyepoch/${pointID}/${timestamp}`,
    init
  );
  return request;
};
