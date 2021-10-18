import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../../services/Firebase'
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
} from 'firebase/firestore'
import { AiOutlineAlert, AiOutlineCheckSquare } from 'react-icons/ai'
const brandHead = {
  display: 'flex',
  justifyContent: 'space-between',
  margin: '5%',
}
const orderHead = {
  color: '#FA4A0C',
  margin: '5%',
}
const listOut = {
  listStyle: 'none',
  margin: '0 3%',
}
const listIn = {
  opacity: '0.6',
  margin: '5% 4%',
}
const timeLine = {
  display: 'flex',
  justifyContent: 'space-between',
  margin: '0 2% 6%',
  fontWeight: 'bold',
}
const listHead = {
  color: '#FA4A0C',
  display: 'flex',
  justifyContent: 'space-between',
  margin: '2%',
  fontWeight: 'bold',
}
function OrderList() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    async function main() {
      const querySnapshot = await getDocs(collection(db, 'orders'))

      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, ' => ', doc.data())
        setOrders((orders) => [...orders, doc.data()])
      })
    }

    main()
  }, [])
  // console.log(orders[0])
  // orders.map((order,i) => {
  //   if (typeof order[i].dishes != 'undefined')
  //     console.log('The subject Name=' + order[i].dishes)
  // })

  async function handleDone(table) {
    const q = query(collection(db, 'orders'), where('table', '==', table))

    const snap = await getDocs(q)
    snap.forEach((doc) => {
      // deleteDoc(doc)
      console.log(doc)
    })
  }

  return (
    <div>
      <h1 style={brandHead}>
        Swift Snack
        <Link to="/call" style={{ textDecoration: 'none', color: '#FA4A0C' }}>
          <AiOutlineAlert />
        </Link>
      </h1>

      <h2 style={orderHead}>Latest Orders</h2>
      {orders.map((order) => (
        <ul style={listOut}>
          <li>
            <div style={listHead}>
              Table: {order.table}
              <AiOutlineCheckSquare
                size="24px"
                onClick={() => handleDone(order.table)}
              />
            </div>
            <ul style={listIn}>
              {order?.dishes.map((dish) => (
                <li>{dish.title}</li>
              ))}
            </ul>
            <div style={timeLine}>
              <span>Time:</span>
              <span>
                {new Date(order?.timestamp.seconds * 1000).toLocaleDateString()}
              </span>
            </div>
          </li>
        </ul>
      ))}
    </div>
  )
}
export default OrderList
