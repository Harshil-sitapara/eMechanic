import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "react-bootstrap/Button";
import Container from "@material-ui/core/Container";
import { useForm } from "react-hook-form";
import AuthService from "../../services/member/auth_service";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import "../Home/Login.css";
import { useSnackbar } from "notistack";


export default function Member_Login(props) {
  const { handleSubmit, register, errors } = useForm({
    mode: "onBlur",
  });
  const { enqueueSnackbar } = useSnackbar();
  const onSubmit = async (values) => {
    try {
      const response = await AuthService.login(values.email, values.password);
      console.log(values.email, values.password);
      console.log("response__", response);
  
      if (response && response.role === "ADMIN") {
        console.log("calling onSubmit");
        props.history.push("/admin_home");
        window.location.reload();
      } else if (response && response.role === "MECHANIC") {
        console.log("calling onSubmit");
        props.history.push("/mechanic_home");
        window.location.reload();
      } else {
        props.history.push("/member_login");
        // alert("Invalid email or password!!");
        enqueueSnackbar('Invalid Email or password!',{
          variant: "error",
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // alert("Invalid email or password!");
        enqueueSnackbar('Invalid Email or password!',{
          variant: "error",
        });
      } else {
        console.error("Error:", error);
      }
    }
  };
  return (
    <Container maxWidth="xs">
      <div className="login__form">
        <Avatar>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          SIGN IN
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Email Address"
            type="email"
            name="email"
            inputRef={register({
              required: "Email is Required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && <span className="span">{errors.email.message}</span>}
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            name="password"
            inputRef={register({
              required: "Password is Required",
            })}
          />
          {errors.password && (
            <span className="span">{errors.password.message}</span>
          )}
          <Button
            className="signin__button"
            type="submit"
            block
            color="primary"
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
}
