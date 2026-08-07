import React from 'react'
import useCart from '../../hocks/useCart'
import CircularProgress from '@mui/material/CircularProgress';
import { Alert, AlertTitle } from "@mui/material";
export default function Cart() {
  const { data, isLoading, isError } = useCart();
  if (isLoading) return <CircularProgress/>
  if (isError) return( <Alert severity="error">
  <AlertTitle>Error</AlertTitle>
  Failed to fetch cart items. Please try again later.
</Alert>
  )

  return <>
  {console.log(data)}
  
  </>
}
