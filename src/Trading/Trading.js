import React, {useState, useEffect} from 'react';
import List from './List';
import ToDoForm from './ToDoForm';
import {connect} from 'react-redux';
import {createPost} from '../redux/actions'


const Trading = ({createPost, syncPosts}) => {

  const [position, setPosition] = useState([])

  const addPosition = (nameOfCoin, valueOfCoins, numberOfCoins, plan) => {
    let buyPrice, kof1, step1, step2, step3, profit
    buyPrice = valueOfCoins/numberOfCoins
    kof1 = valueOfCoins / "100" * plan + parseFloat(valueOfCoins)
    step1 = kof1/numberOfCoins
    step2 = kof1/(valueOfCoins/step1)
    step3 = kof1/(valueOfCoins/step2)
    if(nameOfCoin && valueOfCoins && numberOfCoins && plan) {
      const newItem = {
        id: Math.random().toString(36).substr(2,9),
        name: nameOfCoin,
        val: valueOfCoins,
        amount: numberOfCoins,
        amount2: numberOfCoins,
        pl: plan,
        buyPrice: buyPrice,
        step1: step1,
        step2: step2,
        step3: step3,
        complete1: false,
        complete2: false,
        complete3: false,
        d1: true,
        d2: true,
        d3: true
      }
      setPosition([...position, newItem])
      createPost(newItem)
    }
  }


    return (
        <div>
          <header>
            <ToDoForm addPosition={addPosition}/>
              {syncPosts.map((rawsMap) => {
                return (
            <List
              rawsMap={rawsMap}
              />
            )
            })}
          </header>
        </div>
    )
}

const mapStateProps = state => {
  return {
    syncPosts: state.posts.posts
  }
}

export default connect(mapStateProps, {createPost})(Trading)
