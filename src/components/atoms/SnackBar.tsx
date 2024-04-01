import { Alert, AlertColor, Snackbar } from '@mui/material'

interface SnackBarProps {
  message: string
  open: boolean
  severity: AlertColor
  onClose: () => void
}

function SnackBar ({ message, open, severity, onClose }:SnackBarProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={1200}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        variant='filled'
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  )
}

export default SnackBar
