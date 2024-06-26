import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function ResetPassword() {
 
 
    return (
   <div className="container mt-5">

      <div className="row justify-content-center">

      <div className="col-md-6">
      <div className="bg-white p-4 rounded border shadow">
      <Form>
      <Form.Group className="mb-4" controlId="formBasicEmail">
        <Form.Label className="form-label">Enter OTP:</Form.Label>
        <Form.Control type="number"  />
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-4" controlId="formBasicPassword">
        <Form.Label className="form-label"> Create new password:</Form.Label>
        <Form.Control type="password" />
      </Form.Group>

      <Form.Group className="mb-4" controlId="formBasicPassword">
        <Form.Label className="form-label">Confirm Password:</Form.Label>
        <Form.Control type="password"  />
      </Form.Group>      
      <Form.Group className="mb-4" controlId="formBasicCheckbox">
       <Button style={{width:"110px",height:"40px"}}>
        Resend OTP
       </Button>

    
      </Form.Group>
      <Button variant="primary" type="submit">
        Create new password
      </Button>
    </Form>
    </div>

      </div>
      </div>

   </div>
  );
}

export default ResetPassword;