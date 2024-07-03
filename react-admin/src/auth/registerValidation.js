function Validation(values) {
    //alert("");
    let error = {};
    const admin_email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const admin_pwd_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{6,}$/;
    const confirm_pwd_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{6,}$/;

    if (values.admin_fname === "") {
        error.admin_fname = "Name should not be empty";
      }  else {
        error.admin_fname = "";
      }
    if (values.admin_lname === "") {
        error.admin_lname = "Name should not be empty";
      } else {
        error.admin_lname = "";
      }
    if (values.admin_phone === "") {
        error.admin_phone = "Phone should not be empty";
      }  else {
        error.admin_phone = "";
      }
    if (values.admin_email === "") {
        error.admin_email = "Email should not be empty";
      } else {
        error.admin_email = "";
      }
  
    if (values.admin_pwd === "") {
      error.admin_pwd = "Password should not be empty";
    }  else {
      error.admin_pwd = "";
    }
    if (values.confirm_pwd === "") {
        error.confirm_pwd = "Name should not be empty";
     } else {
        error.confirm_pwd = "";
      } 
  
    return error;
  }

  export default Validation;