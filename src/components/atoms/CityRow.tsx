import { Box, CircularProgress, Grid, SxProps, Theme, Typography } from '@mui/material'
import { ICityWeather } from '../../models/City.model'
import { HTMLAttributes } from 'react'
import { If, Then } from 'react-if'

interface CityRowProps {
  sx?: SxProps<Theme>
  props?: HTMLAttributes<HTMLLIElement>
  city: ICityWeather
  isLoading: boolean
}

function CityRow ({
  sx,
  props,
  city,
  isLoading
}: CityRowProps) {
  return (
    <>
      <If condition={isLoading}>
        <Then>
          <Grid container>
            <Grid item lg={12} xs={12}>
              <Box display='flex' justifyContent='center'>
                <CircularProgress />
              </Box>
            </Grid>
          </Grid>
        </Then>
      </If>

      <If condition={!isLoading}>
        <Then>
          <Box component='li' {...props} sx={{ display: 'flex', gap: 1, ...sx }}>
            <Box sx={{ display: 'flex', ml: 1, flexDirection: 'column' }}>
              <Typography variant='subtitle1'>{city.city_name}</Typography>
              <Typography variant='subtitle1'>{city.state}, {city.country}</Typography>

              <Typography
                sx={{
                  mt: '2px',
                  color: (theme) => theme.palette.text.secondary
                }}
                variant='body2'
              >
                {`min: ${city.weather.list[0].main.temp_min} °C - max: ${city.weather.list[0].main.temp_max} °C` || 'N/A'}
              </Typography>
            </Box>
          </Box>
        </Then>
      </If>
    </>
  )
}

export default CityRow
