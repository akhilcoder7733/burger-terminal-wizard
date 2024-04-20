// CustomButton.jsx
import { styled } from '@mui/material/styles';

// Create a styled button component using MUI system
const CustomButton = styled('button')({
  backgroundColor: '#fff',
  border: '0 solid #e2e8f0',
  borderRadius: '1.5rem',
  boxSizing: 'border-box',
  color: '#0d172a',
  cursor: 'pointer',
  display: 'inline-block',
  fontFamily:
    '"Basier circle", -apple-system, system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
  fontSize: '1.1rem',
  fontWeight: 600,
  // lineHeight: 1,
  // padding: '1rem 1.6rem',
  textAlign: 'center',
  textDecoration: 'none #0d172a solid',
  textDecorationThickness: 'auto',
  transition: 'all .1s cubic-bezier(.4, 0, .2, 1)',
  boxShadow: '0px 1px 2px rgba(166, 175, 195, 0.25)',
  userSelect: 'none',
  WebkitUserSelect: 'none',
  touchAction: 'manipulation',
  '&:hover': {
    backgroundColor: '#1e293b',
    color: '#fff',
  },
  '@media (min-width: 768px)': {
    fontSize: '1.125rem',
    padding: '5px 10px',
  },
});

export default CustomButton;
