import Navbar from '../Navbar'
import { Link, useHistory } from 'react-router-dom'
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import {
  Container,
  Title,
  Wrapper,
  Top,
  TopButton,
  Product,
  Image,
  ProductName,
  ProductPrice,
  Total,
  Bottom,
  TableNumber,
} from '../../styles/cart.styles'
import { clearCart, getCartItems } from '../../services/Localstorage'
import { db } from '../../services/Firebase'

function calculateTotalPrice(cartItems) {
  var total = 0
  if (cartItems)
    cartItems.forEach((item) => {
      total += item.price
    })
  return total
}

const Cart = () => {
  const history = useHistory()

  const cart = getCartItems() || []
  // console.log('cart 🛒', cart)
  const totalPrice = calculateTotalPrice(cart)

  async function handleOrder() {
    // console.log('place order btn')
    try {
      await addDoc(collection(db, 'orders'), {
        table: 21,
        timestamp: Timestamp.fromDate(new Date()),
        dishes: [...cart],
      })
    } catch (e) {
      console.error('Error adding document: ', e)
    }
    history.push('/order-successful')
    clearCart()
  }

  return (
    <Container>
      <Navbar />
      <Wrapper>
        <Title>YOUR ORDERS</Title>
        <Top>
          <Link to="/">
            <TopButton>CONTINUE ORDERING</TopButton>
          </Link>
          <TableNumber>Table: {'7'}</TableNumber>
        </Top>
        <Bottom>
          <div>
            {cart &&
              cart.map((item, id) => (
                <Product key={id}>
                  <Image alt={item.title} src={item.img} />
                  <ProductName>
                    <span>
                      <b>{item.title}</b>
                    </span>
                    {/* <ProductAmountContainer>
                      <AiOutlineMinus />
                      <ProductAmount>1</ProductAmount>
                      <AiOutlinePlus />
                    </ProductAmountContainer> */}
                    <ProductPrice>
                      {'Rs. '} {'  '}
                      {item.price} {'   /-'}
                    </ProductPrice>
                  </ProductName>
                </Product>
              ))}
          </div>
          <Total>
            <b>Total Price: </b>
            <span>Rs. {totalPrice}</span>
          </Total>
          <Link to="/order-success">
            <TopButton
              t="filled"
              onClick={() => handleOrder()}
              disabled={cart.length === 0}
            >
              PLACE ORDER
            </TopButton>
          </Link>
        </Bottom>
      </Wrapper>
    </Container>
  )
}

// export const totalItems = totalOfItems(Cart);
export default Cart
