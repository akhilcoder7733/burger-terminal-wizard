import { styled } from "@mui/system";

const StyledButton = styled('button')({
  display: 'inline-block',
  transition: 'all 0.2s ease-in',
  position: 'relative',
  overflow: 'hidden',
  zIndex: 1,
  color: '#090909',
  padding: '0.7em 1.7em',
  cursor: 'pointer',
  fontSize: '18px',
  borderRadius: '0.5em',
  background: '#e8e8e8',
  border: '1px solid #e8e8e8',
  fontFamily: "Rubik, sans-serif",
  // boxShadow: '6px 6px 12px #c5c5c5, -6px -6px 12px #ffffff',
  '&:active': {
    color: '#666',
    boxShadow: 'inset 4px 4px 12px #c5c5c5, inset -4px -4px 12px #ffffff',
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%) scaleY(1) scaleX(1.25)',
    top: '100%',
    width: '140%',
    height: '180%',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: '50%',
    display: 'block',
    transition: 'all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1)',
    zIndex: -1,
  },
  '&:after': {
    content: '""',
    position: 'absolute',
    left: '55%',
    transform: 'translateX(-50%) scaleY(1) scaleX(1.45)',
    top: '180%',
    width: '160%',
    height: '190%',
    backgroundColor: '#735DA5',
    borderRadius: '50%',
    display: 'block',
    transition: 'all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1)',
    zIndex: -1,
  },
  '&:hover': {
    color: '#ffffff',
    border: '1px solid #735DA5',
  },
  '&:hover:before': {
    top: '-35%',
    backgroundColor: '#735DA5',
    transform: 'translateX(-50%) scaleY(1.3) scaleX(0.8)',
  },
  '&:hover:after': {
    top: '-45%',
    backgroundColor: '#735DA5',
    transform: 'translateX(-50%) scaleY(1.3) scaleX(0.8)',
  },
});

export default StyledButton;
