import styled from 'styled-components'
import mobile from './Responsive'

export const btn = {
  backgroundColor: '#FA4A0C',
  borderRadius: '30px',
  top: '30px',
  width: '150px',
  border: 'none',
  fontSize: '19px',
  color: 'white',
  padding: '8px',
  // height: '60px'
  display: 'flex',
  textDecoration: 'underline',
  textDecorationColor: '#FA4A0C',
  textDecorationThickness: '0.0000001px',
}
export const icon = {
  color: '#FA4A0C',
  border: 'none',
  fontSize: '40px',
}
export const Container = styled.div`
  position: fixed;
  top: 0px;
  border-radius: 0 0 24px 24px;
  background-color: #c8c8c8;
  z-index: 3;
  width: 100%;
  height: 60px;
  margin: 15px;
  ${mobile({ height: '150px', margin: '0' })};
`

export const Wrapper = styled.div`
  // position: fixed;
  // top: 0px;
  // border-radius: 0 0 24px 24px;
  // background-color: #c8c8c8;
  // z-index: 3;
  display: flex;
  align-items: center;
  ${mobile({ display: 'flex', flexDirection: 'column' })};
`

export const Right = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  padding-right: 50px;
  ${mobile({ justifyContent: 'space-between', paddingRight: '0px' })};
`

export const MenuItem = styled.div`
  font-size: 1.5rem;
  cursor: pointer;
  margin: 0 15px;
  justify-content: space-between;
  ${mobile({ fontSize: '1rem', margin: '3px 0', padding: '0 50px 0 50px' })};
`
export const Title = styled.h1`
  text-decoration: none;
  font-size: 40px;
  width: 600px;
  padding-left: 100px;
  ${mobile({ width: '80%', padding: '10px 0', textAlign: 'left' })};
`
export const Register = styled.span`
  color: grey;
  position: absolute;
  width: 85px;
  height: 26px;
  left: 326px;
  top: 15px;
  bottom: 40px ${mobile({ marginRight: '0px', padding: '0' })};
`
