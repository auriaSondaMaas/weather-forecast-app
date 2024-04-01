import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { ICity } from '../../models/City.model'
import { getWeather } from '../../utils/__api__/weather'
import { useEffect, useState } from 'react'
import { IListWeather } from '../../models/Weather.model'
import { If, Then } from 'react-if'
import ThermostatIcon from '@mui/icons-material/Thermostat'
import AirIcon from '@mui/icons-material/Air'
import WaterDropIcon from '@mui/icons-material/WaterDrop'
import CompressIcon from '@mui/icons-material/Compress'
import { AlertColor, Box, CircularProgress, Table, TableBody, TableCell, TableRow, Tooltip, styled } from '@mui/material'
import NoResults from '../NoResults'
import SnackBar from '../atoms/SnackBar'

interface CardProps {
  city?: ICity
}

// styled components
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontSize: 14,
  paddingTop: 10,
  fontWeight: 600,
  paddingBottom: 10,
  color: theme.palette.grey[900],
  borderBottom: `1px solid ${theme.palette.grey[300]}`
}))

export default function Features ({
  city
}: CardProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [weather, setWeather] = useState<IListWeather[]|undefined>()
  const [openSnackBar, setOpenSnackBar] = useState(false)
  const [message, setMessage] = useState('')
  const [typeSnackBar, setTypeSnackBar] = useState<AlertColor>('error')

  const loadWeather = async ({
    lat,
    lon,
    units
  }: {
    lat?:string,
    lon?: string,
    units?: string,
    }) => {
    try {
      setIsLoading(true)
      const response = await getWeather({ lat, lon, units })
      // Filtrar el response para obtener solo un conjunto de datos por día
      const filteredData = response.list.filter((current, index, array) => {
      // Si es el primer elemento o la fecha es diferente a la fecha del elemento anterior, mantenerlo
        if (index === 0 || new Date(current.dt_txt).toLocaleDateString() !== new Date(array[index - 1].dt_txt).toLocaleDateString()) {
          return true
        }
        return false
      })

      setWeather(filteredData)
    } catch (error) {
      setOpenSnackBar(true)
      setTypeSnackBar('error')
      setMessage('Se ha producido un error. Por favor, inténtelo de nuevo más tarde.')
    } finally {
      setIsLoading(false)
    }
  }

  const loadIcon = (icon: string | undefined) => {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('es-mx', { weekday: 'long' })
  }

  useEffect(() => {
    if (city) {
      loadWeather({ lat: city.lat, lon: city.long, units: 'metric' })
    }

    if (!city) {
      setWeather(undefined)
    }
  }, [city])

  return (
    <>
      <If condition={isLoading}>
        <Then>
          <Grid container>
            <Grid item lg={12} xs={12}>
              <Box display='flex' justifyContent='center'>
                <CircularProgress size='70px' />
              </Box>
            </Grid>
          </Grid>
        </Then>
      </If>
      <If condition={!isLoading && city !== undefined}>
        <Then>
          <Container id='city-information' sx={{ py: { xs: 8, sm: 16 } }}>
            <If condition={weather && weather?.length > 0}>
              <Then>
                <Grid container spacing={6}>
                  <Grid item xs={12} md={6}>
                    <div>
                      <Typography color='text.primary' variant='h4'>
                        El clima hoy en {city?.city_name}
                      </Typography>
                      <Typography color='text.primary' mb={1}>
                        {city?.state}, {city?.country}
                      </Typography>
                      {weather && (
                        <Typography variant='h4' color='text.primary'>
                          <strong>{weather[0].main.temp}°C</strong>
                        </Typography>
                      )}
                      <Stack
                        direction='row'
                        justifyContent='flex-start'
                        alignItems='flex-start'
                        spacing={2}
                        useFlexGap
                        mt={2}
                        mb={2}
                      >
                        <Typography color='text.primary'>
                          Sensación térmica
                        </Typography>
                        {weather && (
                          <Typography color='text.primary'>
                            <strong>{weather[0].main.feels_like}°C</strong>
                          </Typography>
                        )}
                      </Stack>
                    </div>

                    <Stack
                      direction='column'
                      justifyContent='center'
                      alignItems='flex-start'
                      spacing={2}
                      useFlexGap
                      sx={{ width: '100%', display: { xs: 'flex', sm: 'flex' } }}
                    >

                      <Card
                        variant='outlined'
                        component={Button}
                        sx={{
                          p: 3,
                          height: 'fit-content',
                          width: '100%',
                          background: 'none'
                        }}
                      >
                        <Grid
                          container
                          direction='row'
                          justifyContent='flex-start'
                          alignItems='center'
                        >
                          <Grid item xs={12} md={6} mb={2}>
                            <Stack
                              direction='row'
                              justifyContent='flex-start'
                              alignItems='center'
                              spacing={1}
                            >
                              <ThermostatIcon />
                              <Typography>Max./Min.</Typography>
                              {weather && (
                                <Typography>{weather[0].main.temp_max}° / {weather[0].main.temp_min}°</Typography>
                              )}
                            </Stack>
                          </Grid>

                          <Grid item xs={12} md={6} mb={2}>
                            <Stack
                              direction='row'
                              justifyContent='flex-start'
                              alignItems='center'
                              spacing={1}
                            >
                              <WaterDropIcon />
                              <Typography>Humedad</Typography>
                              {weather && (
                                <Typography>{weather[0].main.humidity}%</Typography>
                              )}
                            </Stack>
                          </Grid>

                          <Grid item xs={12} md={6}>
                            <Stack
                              direction='row'
                              justifyContent='flex-start'
                              alignItems='center'
                              spacing={1}
                            >
                              <CompressIcon />
                              <Typography>Presión</Typography>
                              {weather && (
                                <Typography>{weather[0].main.pressure} mb</Typography>
                              )}
                            </Stack>
                          </Grid>

                          <Grid item xs={12} md={6}>
                            <Stack
                              direction='row'
                              justifyContent='flex-start'
                              alignItems='center'
                              spacing={1}
                            >
                              <AirIcon />
                              <Typography>Viento</Typography>
                              {weather && (
                                <Typography>{weather[0].wind.speed} km/h</Typography>
                              )}
                            </Stack>
                          </Grid>

                        </Grid>
                      </Card>
                    </Stack>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{ display: { xs: 'flex', sm: 'flex' }, width: '100%' }}
                  >
                    <Card
                      variant='outlined'
                      sx={{
                        height: '100%',
                        width: '100%',
                        display: { xs: 'flex', sm: 'flex' },
                        pointerEvents: 'none'
                      }}
                    >
                      <Grid
                        container
                        direction='row'
                        justifyContent='center'
                        alignItems='center'
                      >
                        <Grid item md={12} xs={12}>
                          <Table>
                            <TableBody>
                              {weather?.map((item) => (
                                <TableRow key={item.dt}>

                                  <StyledTableCell>
                                    <Tooltip title='Fecha'>

                                      <Typography>
                                        {formatDate(item.dt_txt)}
                                      </Typography>
                                    </Tooltip>

                                  </StyledTableCell>

                                  <StyledTableCell>
                                    {item.main.temp_max}°/{item.main.temp_min}°
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    <Tooltip title={item.weather[0]?.description}>
                                      <img
                                        src={loadIcon(item.weather[0]?.icon)}
                                        alt='logo of weather'
                                      />
                                    </Tooltip>
                                  </StyledTableCell>

                                  <StyledTableCell>
                                    {item.main.humidity}%
                                  </StyledTableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </Grid>

                      </Grid>
                    </Card>
                  </Grid>
                </Grid>
              </Then>
            </If>
            <If condition={weather?.length === 0}>
              <Then>
                <NoResults />
              </Then>
            </If>
          </Container>
        </Then>
      </If>
      <SnackBar
        message={message}
        open={openSnackBar}
        severity={typeSnackBar}
        onClose={() => setOpenSnackBar(false)}
      />
    </>
  )
}
