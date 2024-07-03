import React,{useState} from 'react'
import axios from 'axios';
import Validation from './registerValidation';
import { useNavigate } from 'react-router-dom';

 function Register() {
  const [values, setValues] = useState({
    admin_fname:'',
    admin_lname:'',
    admin_phone:'',
    admin_email:'',
    admin_pwd:'',
    confirm_pwd:''


})
const navigate=useNavigate();

const [errors, setErrors]= useState({})
const handleInput=(event)=>{
setValues(prev=>({...prev,[event.target.name]:[event.target.value]}))
}

const handleSubmit=(event)=>
{event.preventDefault();

setErrors(Validation(values));
if(errors.admin_fname===""&&errors.admin_lname===""&&errors.admin_phone===""&&errors.admin_email===""&&errors.admin_pwd===""&&errors.confirm_pwd===""){
axios.post('http://localhost:8081/register',values)
.then(res=>{
  navigate('/login2');
})
.catch(err=>console.log(err.response.data));
}

}



  return (

    <div className=' d-flex justify-content-center align-items-center bg-primary vh-100'>
    <div className='bg-white p-3 rounded w-25 '>
      <div className='p-5 ' /*style={{ backgroundColor: '#0D6EFD', borderRadius: '8px' }}*/>
        <form action="" onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
          <div className="mb-3">
            <label htmlFor="admin_fname"><strong>Admin First Name:</strong></label>
            <input type="text" id="admin_fname" name="admin_fname"   placeholder='First Name' onChange={handleInput} className='form-control'/>
            {errors.admin_fname&& <span className='text-danger'>{errors.admin_fname}</span> }

          </div>
          <div className="mb-3">
            <label htmlFor="admin_lname"><strong>Admin Last Name:</strong></label>
            <input type="text" id="admin_lname" name="admin_lname"  placeholder='Last Name' onChange={handleInput} className='form-control' />
            {errors.admin_lname&& <span className='text-danger'>{errors.admin_lname}</span> }

          </div>
          <div className="mb-3">
            <label htmlFor="admin_email"><strong>Admin Email:</strong></label>
            <input type="email" id="admin_email" name="admin_email"  placeholder='Email' onChange={handleInput} className='form-control' />
            {errors.admin_email&& <span className='text-danger'>{errors.admin_email}</span> }

          </div>
          <div className="mb-3">
            <label htmlFor="admin_phone"><strong>Admin Phone:</strong></label>
            <input type="text" id="admin_phone" name="admin_phone"  placeholder='Phone' onChange={handleInput} className='form-control' />
            {errors.admin_phone&& <span className='text-danger'>{errors.admin_phone}</span> }

          </div>
          <div className="mb-3">
            <label htmlFor="admin_pwd"><strong>Set Password:</strong></label>
            <input type="password" id="admin_pwd" name="admin_pwd"  placeholder='Password' onChange={handleInput} className='form-control' />
            {errors.admin_pwd&& <span className='text-danger'>{errors.admin_pwd}</span> }

          </div>
          <div className="mb-3">
            <label htmlFor="confirm_pwd"><strong>Confirm Password:</strong></label>
            <input type="password" id="confirm_pwd" name="confirm_pwd"  placeholder='Confirm Password' onChange={handleInput} className='form-control' />
            {errors.confirm_pwd&& <span className='text-danger'>{errors.confirm_pwd}</span> }

          </div>
          <p></p>
          <button type='submit' onSubmit={handleSubmit} className='btn btn-success w-100'><strong>Add Admin</strong></button>
        </form>
        </div>
    
 </div>
 </div>
  )
}

export default Register;