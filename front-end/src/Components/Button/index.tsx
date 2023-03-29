import { DOMAttributes, MouseEventHandler } from 'react';
import * as S from './styles';

interface IButton extends DOMAttributes<HTMLButtonElement> {
color: string;
width: string | number;
height: string | number;
fontSize: string | number;
backgroundColor: string;
text: string;
onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
type?: 'button' | 'submit' | 'reset' | undefined;

}

function Button({color, width, height, fontSize, backgroundColor, text, onClick, type, ...rest}:IButton) {
  return (
    <>
      <S.Container>
        <S.CustomButton 
        color={color}
        width={width}
        height={height}
        fontSize={fontSize}
        backgroundColor={backgroundColor}
        onClick={onClick}
        type={type}
        {...rest}
        >
          <span>{text}</span>
        </S.CustomButton>
      </S.Container>
    </>
  );
}

export default Button;