import { Paper, Typography } from '@mui/material'

export default function NoResults () {
  return (
    <Paper>

      <Typography gutterBottom align='center' variant='subtitle1'>
        No encontrado.
      </Typography>

      <Typography variant='body2' align='center'>
        No se encontraron resultados. Intente con otra búsqueda
      </Typography>
    </Paper>
  )
}
