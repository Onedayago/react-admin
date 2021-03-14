import styled from "styled-components";
import PropTypes from 'prop-types';

export const Bg = styled.div`
  background-repeat:no-repeat;
  background-size:100% 100%;
  background-image: url(${props =>  props.bg});
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
`

Bg.defaultProps = {
  bg: ''
}

Bg.propTypes = {
  bg: PropTypes.string
}

export const Content = styled.div`
  align-self: center;
`


export const login_input={
  width: '368px',
  height: '40px',
  padding: 0,
}

export const login_btn={
  backgroundColor: '#1890ff',
  width: '368px',
  height: '40px',
  color: 'white',
  borderRadius: '4px',
}

