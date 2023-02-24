import { Alert } from '@mui/material';
import useAlert from '@/hook/useAlerta';

const AlertPopup = () => {
  const { text, type } = useAlert();

  if (text && type) {
    return (
      <Alert
        severity={type}
        sx={{
          position: 'fixed',
          width: 'fit-content',
          border: '1px solid #000',
          top:'16%',
          left:'70%',
          zIndex: 1001,
        }}
      >
        {text}
      </Alert>
    );
  } else {
    return <></>;
  }
};

export default AlertPopup;