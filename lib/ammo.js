// import { jwt_decode } from "jwt-decode";
// import { jwtDecode } from "jwt-decode";
// import { APIURL } from "./envvariable";
// export const graphQLUrl = APIURL + "/graphql";
// import { Upload } from "tus-js-client";

export async function postResult(url, data, token) {
  console.log(url, "url");
  var headers = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: headers,
      // credentials: "include",
      body: JSON.stringify(data),
    });
    // console.log(res, "res");

    return { status: res.status, data: await res.json(data) };
  } catch (e) {
    console.log(e, "error");
    return { data: { status_code: 505, errorMsg: e.message } };
  }
}

export async function getResult(url, token, params) {
  var headers = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  //encode url params
  if (params) {
    url =
      url +
      "?" +
      Object.keys(params)
        .map((key) => key + "=" + params[key])
        .join("&");
  }
  console.log(url, token, "urll");
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: headers,
      credentials: "include",
    });
    return { data: await res.json() };
  } catch (e) {
    console.log(e, "error");
    return { data: { status_code: 505, errorMsg: e.message } };
  }
}

export async function uploadImage(url, data, token) {
  var headers = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const res = await postResult(url, { filename: data.name });
    const presigned_url = res.data;
    await fetch(presigned_url, {
      method: "PUT",
      body: data,
    });
    const genUrl = presigned_url.split("?")[0];
    return { data: await res.json(genUrl) };
  } catch (e) {
    return { data: { status_code: 505, errorMsg: e.message } };
  }
}

// Function to perform the mutation via fetch
export const getPresignedUrl = async (filename, token = "") => {
  const query = `
    mutation MyMutation($filename: String!) {
      awsUrl(filename: $filename)
    }
  `;

  const variables = {
    filename,
  };

  try {
    const response = await fetch(graphQLUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    const jsonResponse = await response.json();

    if (!response.ok || jsonResponse.errors) {
      throw new Error(
        jsonResponse.errors
          ? jsonResponse.errors[0].message
          : "Failed to fetch presigned URL"
      );
    }

    return jsonResponse.data.awsUrl;
  } catch (error) {
    console.error("Error fetching presigned URL:", error.message);
    throw error;
  }
};

export const imageUploadHandlerGQL = async (file, token = "") => {
  try {
    const filename = file.name || "unnamed-file";
    const presignedUrl = await getPresignedUrl(filename, token);
    const uploadResponse = await fetch(presignedUrl, {
      method: "PUT",
      body: file,
    });

    if (!uploadResponse.ok) {
      throw new Error("Image upload failed");
    }
    const uploadedImageUrl = presignedUrl.split("?")[0];

    return { data: uploadedImageUrl, statusCode: 200 }; // Successful upload
  } catch (error) {
    return { statusCode: 505, message: error.message };
  }
};

export function renameKeys(obj, oldKey, newKey) {
  obj[newKey] = obj[oldKey];
  delete obj[oldKey];
}

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function recrusiveSearch(obj, matcher, callback) {
  let found = false;
  finder(obj, matcher, callback);
  function finder(obj, matcher, callback) {
    if (found) {
      return;
    }
    if (matcher(obj)) {
      callback(obj);
      found = true;
      return;
    }
    for (let key in obj) {
      if (typeof obj[key] === "object") {
        finder(obj[key], matcher, callback);
      }
    }
  }
}

export function getCookie(name, cookieReq) {
  let cookieValue = null;
  let cookies = [];
  try {
    cookies = document.cookie.split(";");
  } catch (err) {
    if (cookieReq) {
      cookies = cookieReq.split(";");
    } else {
      return null;
    }
  }

  if (cookies) {
    cookies.forEach((cookie) => {
      const cookieArr = cookie.split("=");
      console.log(cookieArr);
      if (cookieArr[0].trim() === name) {
        cookieValue = cookieArr[1];
      } else {
        cookieValue = null;
      }
    });
  }

  return cookieValue;
}

export function isTokenExpired(token) {
  try {
    const decoded = jwtDecode(token);
    if (decoded.exp < Date.now() / 1000) {
      // Checking if token is expired.
      return true;
    } else return false;
  } catch (err) {
    return true;
  }
}

export function getUnique(arr, comp) {
  // store the comparison  values in array
  const unique = arr
    .map((e) => e[comp])

    // store the indexes of the unique objects
    .map((e, i, final) => final.indexOf(e) === i && i)

    // eliminate the false indexes & return unique objects
    .filter((e) => arr[e])
    .map((e) => arr[e]);

  return unique;
}

export const getBlob = async (fileUri) => {
  const resp = await fetch(fileUri);
  const imageBody = await resp.blob();
  return imageBody;
};

export const generatePassword = () => {
  const possibleCharacters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&";
  let randomPassword = "";
  for (let i = 0; i < 8; i++) {
    randomPassword += possibleCharacters.charAt(
      Math.floor(Math.random() * possibleCharacters.length)
    );
  }
  if (/(?=.*[0-9])(?=.*[!@#\$%\^&])/.test(randomPassword)) {
    return randomPassword;
  } else {
    return generatePassword();
  }
};

export const queryFetch = async (url, query, variables, token) => {
  const headers = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: headers,
      credentials: "include",
      body: JSON.stringify({
        query: query,
        variables: variables,
      }),
    });
    return { data: await res.json() };
  } catch (e) {
    return { data: { status_code: 505, errorMsg: e.message } };
  }
};

///

export const uploadVimeoVideoHandler = async (file, uploadURL) => {
  const res = await uploadURL({
    variables: { filename: file.name },
  });
  if (res) {
    try {
      const presigned_url = res?.data?.awsUrl;
      const imgRes = await fetch(presigned_url, {
        method: "PUT",
        body: file,
      });
      if (imgRes) {
        console.log(presigned_url.split("?")[0], "jfdk");
        return { data: presigned_url.split("?")[0], statusCode: 200 };
      }
    } catch (err) {
      return { statusCode: 505, message: err.message };
    }
  }
};

////vimeo video upload

const UPLOAD_VIDEO_IN_VEMIO = `query MyQuery(
  $description: String
  $redirect_url: String
  $size: String!
  $title: String!
) {
  uploadVideo(
    schema: {
      description: $description
      redirect_url: $redirect_url
      size: $size
      title: $title
    }
  ) {
    data {
      approach
      status
      upload_link
      uri
    }
    message
    statusCode
  }
}`;

export const createVimeoVideoSpaceLink = async (
  url = graphQLUrl,
  variables,
  token
) => {
  const headers = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: headers,
      credentials: "include",
      body: JSON.stringify({
        query: UPLOAD_VIDEO_IN_VEMIO,
        variables: variables,
      }),
    });
    return { data: await res.json() };
  } catch (e) {
    return { data: { status_code: 505, errorMsg: e.message } };
  }
};
export const genericVimeoUpload = async (
  selectedFile,
  metadata,
  setProgress,
  token
) => {
  if (!selectedFile) {
    alert("Select a file");
    return;
  }

  let variables = {
    description: metadata.description,
    redirect_url: "https://skillwallet.com",
    size: String(selectedFile.size),
    title: metadata.title,
  };

  let upload_link = "";
  let videoUrl = "";

  await createVimeoVideoSpaceLink(
    graphQLUrl,
    {
      ...variables,
    },
    token
  ).then((res) => {
    if (!res?.data?.data) {
      return {
        data: {
          statusCode: 505,
          message: "Failed to upload",
        },
      };
    }
    if (res?.data?.data?.uploadVideo?.statusCode == 200) {
      console.log(res?.data?.data?.uploadVideo?.data, "jcnkjdsnck2");
      upload_link = res?.data?.data?.uploadVideo?.data?.upload_link;
      videoUrl = res?.data?.data?.uploadVideo?.data?.uri;
    } else {
      return {
        data: {
          statusCode: res?.data?.data?.uploadVideo?.statusCode,
          message: res?.data?.data?.uploadVideo?.message,
        },
      };
    }
  });

  const uploadFilePath = upload_link;

  return new Promise((resolve, reject) => {
    const upload = new Upload(selectedFile, {
      uploadUrl: uploadFilePath,
      retryDelays: [0, 1000, 3000, 5000],
      metadata: {
        filename: selectedFile.name,
        filetype: selectedFile.type,
      },
      onError: (error) => {
        reject({ data: { statusCode: 505, message: "Failed to upload" } });
      },
      onProgress: (bytesUploaded, bytesTotal) => {
        const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
        setProgress(percentage);
      },
      onSuccess: () => {
        resolve({
          data: {
            statusCode: 200,
            message: "File uploaded successfully",
            videoLink: videoUrl,
          },
        });
      },
    });
    upload.start();
  });
};

//vimeo upload end

export const getAllSkills = async (token) => {
  let url = graphQLUrl;
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // Define your GraphQL query
  const graphqlQuery = {
    query: `
      query {
        SkillsList {
          data {
            _id
            label
            value
          }
          message
          statusCode
        }
      }
    `,
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: headers,
      credentials: "include",
      body: JSON.stringify(graphqlQuery), // Include the GraphQL query in the request body
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const result = await res.json();
    return { data: result.data };
  } catch (e) {
    return { data: { status_code: 505, errorMsg: e.message } };
  }
};
export const getAllCategory = async (token) => {
  let url = graphQLUrl;
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // Define your GraphQL query
  const graphqlQuery = {
    query: `
      query {
        externshipCategoryList {
          data {
            _id
            label
            value
          }
          message
          statusCode
        }
      }
    `,
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: headers,
      credentials: "include",
      body: JSON.stringify(graphqlQuery), // Include the GraphQL query in the request body
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const result = await res.json();
    return { data: result.data };
  } catch (e) {
    return { data: { status_code: 505, errorMsg: e.message } };
  }
};
