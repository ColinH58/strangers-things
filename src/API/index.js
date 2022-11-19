export const getPosts = async () => {
    const url =
      "https://strangers-things.herokuapp.com/api/2112-FTB-ET-WEB-PT/posts";
    const token = localStorage.getItem("token");
    const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        },
    });
    const json = await response.json();
    return json;
  };
  
  export const createNewPost = async (newPost) => {
    console.log(newPost)
    const url =
      "https://strangers-things.herokuapp.com/api/2112-FTB-ET-WEB-PT/posts";
    const token = localStorage.getItem("token");
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(newPost),
    });
    const json = await response.json();
    console.log(json);
    return json;
  };
  
  export const updatePost = async (postToUpdate, postId) => {
    const url =
    `https://strangers-things.herokuapp.com/api/2112-FTB-ET-WEB-PT/posts/${postId}`;
    const token = localStorage.getItem("token");
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(postToUpdate),
    });
  
    const json = await response.json();
    return json;
  };
  
  export const deletePost = async (postId) => {
    const url = `https://strangers-things.herokuapp.com/api/2112-FTB-ET-WEB-PT/posts/${postId}`;
    const token = localStorage.getItem("token");
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      },
    });

    const json = await response.json();
    return json;
  };
  
  export const accountCreation = async (username, password) => {
    await fetch(
      "https://strangers-things.herokuapp.com/api/2112-FTB-ET-WEB-PT/users/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            username: username,
            password: password,
          },
        }),
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        localStorage.setItem("token", result.data.token);
      })
      .catch(console.error);
  };
  
  export const accountLogin = async (username, password) => {
    await fetch(
      "https://strangers-things.herokuapp.com/api/2112-FTB-ET-WEB-PT/users/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            username: username,
            password: password,
          },
        }),
      }
    )
      .then((response) => response.json())
      .then((result) => {
        localStorage.setItem("token", result.data.token);
        console.log(result);
      })
      .catch(console.error);
  };
  
  export const testAuthentication = async () => {
    const url = 'https://strangers-things.herokuapp.com/api/2112-FTB-ET-WEB-PT/test/me';
    const token = localStorage.getItem('token')
    const response = await fetch(url, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const json = await response.json();
    return json.success;
  };