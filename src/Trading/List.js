import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import {deletePost, changeStyles1, changeStyles2, changeStyles3} from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import {fetchPosts} from '../redux/actions';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto'
  },
  table: {
    minWidth: 650
  }
});


const ExpandableTableRow = ({ children, expandComponent, ...otherProps }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <>
      <TableRow {...otherProps}>
        <TableCell padding="checkbox">
          <IconButton onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {children}
      </TableRow>
      {isExpanded && (
        <TableRow>
          <TableCell padding="checkbox" />
          {expandComponent}
        </TableRow>
      )}
    </>
  );
};

const List = ({syncPosts, changeStyles1, changeStyles2, changeStyles3, deletePost, rawsMap}) => {
  const classes = useStyles();

  const amountOfSell1 = rawsMap.amount2-rawsMap.val/rawsMap.step1
  const amountOfSell2 = rawsMap.amount2-amountOfSell1-rawsMap.val/rawsMap.step2
  const amountOfSell3 = rawsMap.amount2-amountOfSell1-amountOfSell2-rawsMap.val/rawsMap.step3

  const className1 = rawsMap.complete1 ? 'x' : 'xx'
  const className2 = rawsMap.complete2 ? 'x' : 'xx'
  const className3 = rawsMap.complete3 ? 'x' : 'xx'


  //Fetch cryptoList
  const dispatch = useDispatch()
  const cryptos = useSelector((state) => {
    return state.posts.fetchedPosts
  })
  useEffect(() => {
  dispatch(fetchPosts())
  }, [])

const filt = Object.values(cryptos).filter(cryp => cryp.symbol == rawsMap.name).map((n) => (n.quotes.USD.price))*rawsMap.amount-rawsMap.val

  return (
    <div className="withdel">
    <div className="border">
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="simple table">

        <TableHead>
          <TableRow>
            <TableCell padding="checkbox"><div onClick={() => deletePost(rawsMap.id)} className="del"><IconButton className="del" aria-label="delete"><DeleteIcon /></IconButton></div> </TableCell>
            <TableCell align="left">COIN</TableCell>
            <TableCell align="right">VALUE</TableCell>
            <TableCell align="right">AMOUNT</TableCell>
            <TableCell align="right">PERCENT</TableCell>
            <TableCell align="right">BUY PRICE</TableCell>
          </TableRow>
        </TableHead>

      <TableBody>

        <ExpandableTableRow expandComponent={
         <TableCell colSpan="5">

   <TableHead className="tablerow">
      <TableRow>
         <TableCell align="left"><div onClick={rawsMap.d1 ? () => changeStyles1(rawsMap.id, amountOfSell1) : ''}className="d">x </div>Sell Price 1</TableCell>
         <TableCell align="left"><div onClick={rawsMap.d2 && !rawsMap.d1 ? () => changeStyles2(rawsMap.id, amountOfSell2) : ''}className="d">x </div>Sell Price 2</TableCell>
         <TableCell align="left"><div onClick={rawsMap.d3 && !rawsMap.d1 && !rawsMap.d2 ? () => changeStyles3(rawsMap.id, amountOfSell3) : ''}className="d">x </div>Sell Price 3</TableCell>
         <TableCell align="left">Profit/Lose</TableCell>
      </TableRow>
   </TableHead>

          <TableBody>
            <TableRow key={rawsMap.id}>
              <TableCell className={className1} align="right">{((parseInt(rawsMap.step1 * 100)) / 100)}</TableCell>
              <TableCell className={className2} align="right">{((parseInt(rawsMap.step2 * 100)) / 100)}</TableCell>
              <TableCell className={className3} align="right">{((parseInt(rawsMap.step3 * 100)) / 100)}</TableCell>
            <TableCell align="right">{filt.toFixed(3)}</TableCell>
          </TableRow>

          <TableRow key={rawsMap.id}>
            <TableCell className={className1} align="right">{(amountOfSell1).toFixed(6)}</TableCell>
            <TableCell className={className2} align="right">{(amountOfSell2).toFixed(6)}</TableCell>
            <TableCell className={className3} align="right">{(amountOfSell3).toFixed(6)}</TableCell>
          <TableCell align="right"></TableCell>
        </TableRow>

          </TableBody>

         </TableCell>}>

              <TableCell component="th" scope="row">
                {rawsMap.name}
              </TableCell>
              <TableCell align="right">{rawsMap.val}</TableCell>
              <TableCell align="right">{rawsMap.amount}</TableCell>
              <TableCell align="right">{rawsMap.pl}</TableCell>
              <TableCell align="right">{((parseInt(rawsMap.buyPrice * 100)) / 100)}</TableCell>

        </ExpandableTableRow>

        </TableBody>
      </Table>
    </Paper>
    </div>
    </div>
  )
}
const mapStateToProps = state => {
  return {
    syncPosts: state.posts.posts
  }
}
const mapDispatchToProps = dispatch => ({
  deletePost: key => dispatch(deletePost(key)),
  changeStyles1: (key, amountOfSell1) => dispatch(changeStyles1(key, amountOfSell1)),
  changeStyles2: (key, amountOfSell2) => dispatch(changeStyles2(key, amountOfSell2)),
  changeStyles3: (key, amountOfSell3) => dispatch(changeStyles3(key, amountOfSell3))
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
