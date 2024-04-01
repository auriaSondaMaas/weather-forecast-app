import { AlertColor, alpha } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { ICity } from '../../models/City.model'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { getAllCities } from '../../utils/__api__/city'
import AutocompleteBasic from '../atoms/AutoCompleteBasic'
import { getWeather } from '../../utils/__api__/weather'
import CityRow from '../atoms/CityRow'
import SnackBar from '../atoms/SnackBar'

interface SearchCityProps {
  setCurrentCity: Dispatch<SetStateAction<ICity|undefined>>
}

export default function SearchCity ({ setCurrentCity }:SearchCityProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [citiesList, setCitiesList] = useState<ICity[]>()
  const [city, setCity] = useState<ICity|undefined>()
  const [openSnackBar, setOpenSnackBar] = useState(false)
  const [message, setMessage] = useState('')
  const [typeSnackBar, setTypeSnackBar] = useState<AlertColor>('error')

  const loadCitites = async ({ q }: {q?:string}) => {
    try {
      setIsLoading(true)
      const response = await getAllCities({ q })
      const filteredResponse = response.filter((city) => city.result_type === 'city')

      const citiesWithWeather = await Promise.all(filteredResponse.map(async (city) => {
        const weatherResponse = await loadWeather({ lat: city.lat, lon: city.long, cnt: 1, units: 'metric' })
        return { ...city, weather: weatherResponse }
      }))

      setCitiesList(citiesWithWeather)
    } catch (error) {
      setOpenSnackBar(true)
      setTypeSnackBar('error')
      setMessage('Se ha producido un error. Por favor, inténtelo de nuevo más tarde.')
    } finally {
      setIsLoading(false)
    }
  }

  const loadWeather = async ({
    lat,
    lon,
    units,
    cnt
  }: {
    lat?:string,
    lon?: string,
    units?: string,
    cnt?:number}) => {
    try {
      setIsLoading(true)
      const response = await getWeather({ lat, lon, units, cnt })
      return response
    } catch (error) {
      setOpenSnackBar(true)
      setTypeSnackBar('error')
      setMessage('Se ha producido un error. Por favor, inténtelo de nuevo más tarde.')
    } finally {
      setIsLoading(false)
    }
  }

  const hanldeSearch = async (val:string) => {
    try {
      loadCitites({ q: val })
    } catch (error) {
      setOpenSnackBar(true)
      setTypeSnackBar('error')
      setMessage('Se ha producido un error. Por favor, inténtelo de nuevo más tarde.')
    }
  }

  useEffect(() => {
    loadCitites({ q: '' })
  }, [])

  useEffect(() => {
    if (!city) {
      setCurrentCity(undefined)
    }
  }, [city, setCurrentCity])

  return (
    <Box
      id='hero'
      sx={(theme) => ({
        width: '100%',
        backgroundImage:
          theme.palette.mode === 'light'
            ? 'linear-gradient(180deg, #CEE5FD, #FFF)'
            : `linear-gradient(#02294F, ${alpha('#090E10', 0.0)})`,
        backgroundSize: '100% 20%',
        backgroundRepeat: 'no-repeat'
      })}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 }
        }}
      >
        <Stack spacing={2} useFlexGap sx={{ width: { xs: '100%', sm: '70%' } }}>
          <Typography
            variant='h1'
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignSelf: 'center',
              textAlign: 'center',
              fontSize: 'clamp(3.5rem, 10vw, 4rem)'
            }}
          >
            Destinos &nbsp;
            <Typography
              component='span'
              variant='h1'
              sx={{
                fontSize: 'clamp(3rem, 10vw, 4rem)',
                color: (theme) =>
                  theme.palette.mode === 'light' ? 'primary.main' : 'primary.light'
              }}
            >
              Únicos
            </Typography>
          </Typography>
          <Typography
            textAlign='center'
            color='text.secondary'
            sx={{ alignSelf: 'center', width: { sm: '100%', md: '80%' } }}
          >
            Descubre la diversidad de climas en nuestros variados destinos.
            Puedes seleccionar una ciudad de la lista o escribir el nombre de
            cualquier ciudad de México o USA disponible
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignSelf='center'
            spacing={1}
            useFlexGap
            sx={{ pt: 2, width: { xs: '100%', sm: '50%' } }}
          >

            <AutocompleteBasic
              label='Ciudades'
              options={citiesList}
              getOptionLabel={(option) => option.city_name}
              onChange={(e) => {
                setCity(e)
              }}
              onInputChange={(e) => {
                hanldeSearch(e.target.value)
              }}
              noOptionsText='No se encontraron resultados'
              sx={{ width: '100%' }}
              renderOption={(props, option) => (
                <CityRow
                  key={option.id}
                  props={props}
                  city={option}
                  isLoading={isLoading}
                />
              )}
            />

            <Button variant='contained' color='primary' onClick={() => setCurrentCity(city)}>
              Buscar
            </Button>
          </Stack>
        </Stack>
        <SnackBar
          message={message}
          open={openSnackBar}
          severity={typeSnackBar}
          onClose={() => setOpenSnackBar(false)}
        />
      </Container>
    </Box>
  )
}
