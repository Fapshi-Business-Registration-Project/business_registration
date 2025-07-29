import React, * as react from "react";
import styled from "styled-components";

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  rememberMe: boolean;
}

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = react.useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
    rememberMe: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev: FormData) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <PageContainer>
      <FormContainer>
        <FormCard>
          <Header>
            <Title>Welcome!!</Title>
            <LoginPrompt>
              Already have an account? <LoginLink href="#">Log in</LoginLink>
            </LoginPrompt>
          </Header>

          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </InputGroup>

            <InputGroup>
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
            </InputGroup>

            <InputGroup>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </InputGroup>

            <OptionsRow>
              <RememberMe>
                <Checkbox
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <CheckboxLabel htmlFor="rememberMe">Remember me</CheckboxLabel>
              </RememberMe>
              <ForgotPassword href="#">Forgot password?</ForgotPassword>
            </OptionsRow>

            <SubmitButton type="submit">Sign up</SubmitButton>

            <Divider>
              <Line />
              <DividerText>or</DividerText>
              <Line />
            </Divider>

            <SocialButtons>
              <SocialButton type="button">
                <GoogleIcon />
                Sign up with Google
              </SocialButton>
              <SocialButton type="button">
                <FacebookIcon />
                Sign up with Facebook
              </SocialButton>
              <SocialButton type="button">
                <AppleIcon />
                Sign up with Apple
              </SocialButton>
            </SocialButtons>
          </Form>
        </FormCard>
      </FormContainer>
    </PageContainer>
  );
};

// Styled components
const PageContainer = styled.div`
  position: absolute;
  width: 1440px;
  height: 898px;
  left: 0px;
  top: 0px;
  background: #ffffff;
`;

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const FormCard = styled.div`
  width: 718px;
  height: 770px;
  background: #ffffff;
  border: 1px solid rgba(76, 175, 80, 0.05);
  border-radius: 26px;
  padding: 64px;
  box-sizing: border-box;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  margin-bottom: 80px;
`;

const Title = styled.h1`
  font-family: "Poppins", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
  line-height: 48px;
  color: #333333;
  margin: 0;
`;

const LoginPrompt = styled.p`
  font-family: "Poppins", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #333333;
  margin: 0;
`;

const LoginLink = styled.a`
  font-weight: 700;
  color: #333333;
  text-decoration: none;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Label = styled.label`
  font-family: "Poppins", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #666666;
`;

const Input = styled.input`
  width: 100%;
  height: 56px;
  border: 1px solid rgba(102, 102, 102, 0.35);
  border-radius: 12px;
  padding: 0 24px;
  font-family: "Poppins", sans-serif;
  font-size: 16px;
  box-sizing: border-box;

  &::placeholder {
    color: #666666;
  }
`;

const OptionsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RememberMe = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Checkbox = styled.input`
  width: 11.48px;
  height: 11px;
  border: 1px solid rgba(102, 102, 102, 0.56);
  border-radius: 2px;
`;

const CheckboxLabel = styled.label`
  font-family: "Poppins", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  color: #666666;
`;

const ForgotPassword = styled.a`
  font-family: "Poppins", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 20px;
  color: #0d80f2;
  text-decoration: none;
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 44px;
  background: #111111;
  border-radius: 40px;
  border: none;
  color: #ffffff;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 22px;
  line-height: 33px;
  cursor: pointer;
  opacity: 0.25;

  &:hover {
    opacity: 1;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
`;

const Line = styled.div`
  flex: 1;
  height: 0px;
  border: 1px solid rgba(102, 102, 102, 0.35);
`;

const DividerText = styled.span`
  font-family: "Poppins", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #666666;
`;

const SocialButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const SocialButton = styled.button`
  position: relative;
  width: 100%;
  height: 57px;
  background: #ffffff;
  border: 1px solid rgba(102, 102, 102, 0.35);
  border-radius: 12px;
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  font-size: 12.8px;
  line-height: 23px;
  color: #616161;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 40px;
`;

const GoogleIcon = styled.div`
  position: absolute;
  left: 64px;
  width: 18px;
  height: 18px;
  background: conic-gradient(
    from -45deg,
    #ea4335 110deg,
    #4285f4 90deg 180deg,
    #34a853 180deg 270deg,
    #fbbc05 270deg
  );
  border-radius: 50%;
`;

const FacebookIcon = styled.div`
  position: absolute;
  left: 64px;
  width: 18px;
  height: 18px;
  background: #039be5;
  border-radius: 2px;

  &::before {
    content: "";
    position: absolute;
    top: 3px;
    left: 6px;
    width: 6px;
    height: 12px;
    background: white;
    border-radius: 1px;
  }
`;

const AppleIcon = styled.div`
  position: absolute;
  left: 64px;
  width: 18px;
  height: 18px;
  background: black;
  border-radius: 20%;

  &::before {
    content: "";
    position: absolute;
    top: 2px;
    left: 5px;
    width: 8px;
    height: 8px;
    background: black;
    border-radius: 50%;
    border: 2px solid white;
  }
`;

export default RegisterForm;
