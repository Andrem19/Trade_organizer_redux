import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import {createPost} from '../redux/actions'

import { makeStyles } from '@material-ui/core/styles';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import './style.css';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const ToDoForm = ({ createPost, addPosition }) => {
  const classes = useStyles();

    const [nameOfCoin, setNameOfCoin] = useState('')
    const [valueOfCoins, setValueOfCoins] = useState('')
    const [numberOfCoins, setNumberOfCoins] = useState('')
    const [plan, setPlan] = useState('')

      const handleSubmit = (event) => {
          event.preventDefault()
          addPosition(nameOfCoin, valueOfCoins, numberOfCoins, plan)
          setNameOfCoin("")
          setValueOfCoins("")
          setNumberOfCoins("")
          setPlan("")
        }

        const handlekeyPress = (event) => {
          if(event.key === "Enter") {
            handleSubmit(event)
          }
        }

        const [open, setOpen] = useState(false);

        const handleClose = () => {
          setOpen(false);
        };

        const handleOpen = () => {
          setOpen(true);
        };

   return (
     <div className="center">
       <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="on">

         <FormControl className="input">
           <InputLabel htmlFor="component-simple">Coin</InputLabel>
           <Input id="component-simple" type='text' onKeyDown={handlekeyPress} value={nameOfCoin} onChange={event => setNameOfCoin(event.target.value)} />
         </FormControl>

       <FormControl className="input">
         <InputLabel htmlFor="component-simple">Amount</InputLabel>
         <Input id="component-simple" type='number' onKeyDown={handlekeyPress} value={valueOfCoins} onChange={event => setValueOfCoins(event.target.value)} />
       </FormControl>

       <FormControl className="input">
         <InputLabel htmlFor="component-simple">Num. of coins</InputLabel>
         <Input id="component-simple" type='number' onKeyDown={handlekeyPress} value={numberOfCoins} onChange={event => setNumberOfCoins(event.target.value)} />
       </FormControl>

       <FormControl className="input">
         <InputLabel htmlFor="component-simple">%</InputLabel>
         <Input id="component-simple" type='number' onKeyDown={handlekeyPress} value={plan} onChange={event => setPlan(event.target.value)} />
       </FormControl>
       <Button type="submit" variant="contained">Submit</Button>
     </form>
     </div>
  );
}


export default connect(null, {createPost})(ToDoForm)
