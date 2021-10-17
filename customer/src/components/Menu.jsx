import { addCartItem } from '../services/Localstorage'
import {
  Container,
  Wrapper,
  Image,
  Content,
  Title,
  Subtitle,
  Price,
  Desc,
  Button,
  Time,
} from '../styles/menu.styles'
// import data from '../utils/data'

const Menu = ({ menu }) => {
  return (
    <Container>
      {menu.map((item) => {
        console.log(item)
        return (
          <Wrapper key={item.id}>
            <Image src={item.img}></Image>
            <Content>
              <Title>
                <Subtitle>{item.title}</Subtitle>
                <Price>Rs. {item.price}</Price>
              </Title>
              <Desc>{item.desc}</Desc>
              <Time>Prep time: {item.prepare} mins</Time>
              <Button onClick={() => addCartItem(item)}>Add to List</Button>
            </Content>
          </Wrapper>
        )
      })}
    </Container>
  )
}

export default Menu
