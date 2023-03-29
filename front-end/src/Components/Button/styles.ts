import styled from '@emotion/styled';
import { Button } from '@chakra-ui/react';

export const Container = styled.div``

export const CustomButton = styled(Button)`
  width: ${props => props.width}em;
  height: ${props => props.height}em;
  font-size: ${props => props.fontSize}px;
  color: ${props => props.color};
  background-color: ${props => props.backgroundColor};
  border-radius: 8px;
  border: none;
;`