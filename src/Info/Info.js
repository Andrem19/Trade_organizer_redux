import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {fetchPosts} from '../redux/actions';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const  Info = () => {
const classes = useStyles();

useEffect(() => {
dispatch(fetchPosts())
},[])

const dispatch = useDispatch()
const cryptoTable = useSelector(state => state.posts.fetchedPosts)

const loading = useSelector(state => state.app.loading)

if (loading) {
  return (
    <LinearProgress />
  )
}


let crypto = Object.values(cryptoTable).filter(cryp => cryp.id == "eth-ethereum" || cryp.id == "btc-bitcoin" || cryp.id == "ada-cardano" || cryp.id == "cake-pancakeswap" || cryp.id == "dot-polkadot" || cryp.id == "xrp-xrp" || cryp.id == "bnb-binance-coin" || cryp.id == "matic-polygon" || cryp.id == "uni-uniswap")

    return (
      <div>
        <TableContainer component={Paper}>
    <Table className={classes.table} aria-label="simple table">
      <TableHead>
        <TableRow>

          <TableCell align="left">Symbol</TableCell>
          <TableCell align="left">Price</TableCell>
          <TableCell align="left">Market Cap</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>

        {crypto.map((crypto) => (
          <TableRow key={crypto.id}>
            <TableCell align="left">{crypto.name}</TableCell>
            <TableCell align="left">{crypto.quotes.USD.price}</TableCell>
            <TableCell align="left">{crypto.quotes.USD.market_cap}</TableCell>
          </TableRow>
        ))}

      </TableBody>
    </Table>
  </TableContainer>
      </div>
    )
}
export default connect(null, null)(Info)
