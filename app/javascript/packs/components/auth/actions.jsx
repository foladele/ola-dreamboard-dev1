

export const logout = () => {
  return {
    type: 'LOGOUT',
  }
}

export const loggedIn = (id, apiKey) => {
  return {
    type: 'LOGIN',
    id,
    apiKey,
  }
}

export const handleLogin = (email, password, redirect, history) => {
  // console.log("history ", history);
  return(dispatch) => {
    $.ajax({
      url: '/users/sign_in',
      type: 'POST',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').last().attr('content'));
        // console.log("xhr: ", xhr);
      },
      data: { user: { email, password }},
      dataType: 'JSON'
    }).done( response => {
      history.push(redirect);
      localStorage.setItem('apiKey', response.api_key);
      localStorage.setItem('userId', response.id);
      dispatch(loggedIn(response.id, response.api_key));
      // console.log(history)
      
    }).fail( response => {
      // TODO: Handle this better
      console.log("Failed: ", response);
    })
  }
}

export const handleLogout = (history) => {
  return(dispatch) => {
    $.ajax({
      url: '/users/sign_out',
      beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').last().attr('content'))},
      type: 'DELETE',
      dataType: 'JSON'
    }).done( response => {
      localStorage.removeItem('apiKey');
      localStorage.removeItem('userId');
      dispatch(logout());
      history.push('/');
    }).fail( response => {
      // TODO: Handle this better
    })
  }
}